import { useState, useEffect, useCallback } from "react";
import inject from "@vercel/speed-insights";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// En Astro las variables de entorno se acceden vía import.meta.env
const GA_ID = import.meta.env.PUBLIC_GA_ID ?? "";
const CLARITY_ID = import.meta.env.PUBLIC_CLARITY_ID ?? "";

function getConsent(): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/(?:^|; )eb_consent=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : "";
}

function writeConsentCookie(val: string) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  document.cookie = `eb_consent=${encodeURIComponent(val)}; expires=${d.toUTCString()}; path=/; samesite=lax`;
}

function dntEnabled() {
  if (typeof navigator === "undefined") return false;
  return (
    navigator.doNotTrack === "1" ||
    (window as any)?.doNotTrack === "1" ||
    (navigator as any).msDoNotTrack === "1"
  );
}

export default function AnalyticsBanner() {
  const [consent, setConsentState] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Carga de scripts manual (reemplazo de next/script)
  const loadScripts = useCallback(() => {
    if (!GA_ID || !CLARITY_ID || dntEnabled()) return;

    // Google Analytics
    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer?.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    // Clarity
    (function(c: any, l: any, a: any, r: any, i: any){
      let t: any;
      let y: any;
      c[a] = c[a] || function(){ (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      (t as HTMLScriptElement).async = true;
      (t as HTMLScriptElement).src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      if (y && y.parentNode) y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }, []);

  useEffect(() => {
    setMounted(true);
    const savedConsent = getConsent();
    setConsentState(savedConsent);

    // Inicializar Speed Insights (use exported method)
    if (inject && typeof (inject as any).injectSpeedInsights === "function") {
      (inject as any).injectSpeedInsights();
    }

    if (savedConsent === "accepted") {
      loadScripts();
    }
  }, [loadScripts]);

  const accept = () => {
    writeConsentCookie("accepted");
    setConsentState("accepted");
    loadScripts();
  };

  const decline = () => {
    writeConsentCookie("denied");
    setConsentState("denied");
  };

  // No renderizar nada en el servidor para evitar saltos de hidratación
  if (!mounted || dntEnabled() || consent !== "") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0f172a] text-white shadow-xl"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 p-4">
        <p className="text-sm opacity-90">
          Utilizamos cookies para mejorar tu experiencia y analizar el tráfico (GA/Clarity).
        </p>
        <div className="flex gap-3">
          <button 
            onClick={accept} 
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold transition-opacity hover:opacity-90"
          >
            Aceptar
          </button>
          <button 
            onClick={decline} 
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}