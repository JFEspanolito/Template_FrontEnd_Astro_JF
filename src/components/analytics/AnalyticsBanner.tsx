"use client";

import { useState, useEffect, useCallback } from "react";
import { injectSpeedInsights } from "@vercel/speed-insights";
import Modal from "@/components/ui/Modal";

// --- Tipado Stark (Adiós al 'any') ---
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = import.meta.env.PUBLIC_GA_ID ?? "";
const CLARITY_ID = import.meta.env.PUBLIC_CLARITY_ID ?? "";
const CONSENT_KEY = "eb_consent";

// Helpers de persistencia
const getConsent = (): string => {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_KEY}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
};

const setConsent = (val: "accepted" | "denied") => {
  if (typeof document === "undefined") return;
  const expiration = new Date();
  expiration.setFullYear(expiration.getFullYear() + 1);
  document.cookie = `${CONSENT_KEY}=${val}; expires=${expiration.toUTCString()}; path=/; samesite=lax`;
};

export default function AnalyticsBanner() {
  const [consent, setConsentState] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const loadScripts = useCallback(() => {
    if (typeof window === "undefined") return;

    // Google Analytics Protocol
    if (GA_ID && !window.gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: any[]) => { (window.dataLayer as any[]).push(args); };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID);
    }

    // Microsoft Clarity Protocol
    if (CLARITY_ID && !window.clarity) {
      (function(c: any, l: any, a: any, r: any, i: any){
        c[a] = c[a] || function(){ (c[a].q = c[a].q || []).push(arguments); };
        const t = l.createElement(r); t.async = true; t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        if (y?.parentNode) y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_ID);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const saved = getConsent();
    setConsentState(saved);

    // Vercel Speed Insights (Siempre se inyecta, es anónimo por defecto)
    injectSpeedInsights();

    if (saved === "accepted") loadScripts();
  }, [loadScripts]);

  const handleAccept = () => {
    setConsent("accepted");
    setConsentState("accepted");
    loadScripts();
  };

  const handleDecline = () => {
    setConsent("denied");
    setConsentState("denied");
  };

  if (!mounted || consent !== "") return null;

  return (
    /* ATENCIÓN: Aquí asumo que tu Modal.tsx ha sido ajustado para 
      funcionar como wrapper Y como componente de store. 
    */
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-6 pointer-events-none">
      <div className="
        pointer-events-auto w-full max-w-lg 
        bg-[var(--card-background)] border border-[var(--border-dim-one)] 
        p-6 rounded-2xl shadow-[var(--shadow-soft)] animate-in fade-in slide-in-from-bottom-4
      ">
        <h3 className="text-lg font-display font-bold text-[var(--foreground-highlight-one)] mb-2">
          Configuración de Privacidad
        </h3>
        <p className="text-sm font-body text-[var(--foreground-color)] mb-6 leading-relaxed">
          Para optimizar este hangar, utilizamos Google Analytics y Microsoft Clarity. 
          Tú decides si activamos los sensores de telemetría o mantenemos el sigilo total.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleDecline}
            className="
              px-4 py-2 text-sm font-bold rounded-lg transition-all
              bg-[var(--btn-secondary)] text-[var(--btn-text-secondary)]
              hover:opacity-80
            "
          >
            Solo esenciales
          </button>
          <button
            onClick={handleAccept}
            className="
              px-4 py-2 text-sm font-bold rounded-lg transition-all
              bg-[var(--btn-primary)] text-[var(--btn-text-primary)]
              hover:shadow-soft active:scale-95
            "
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}