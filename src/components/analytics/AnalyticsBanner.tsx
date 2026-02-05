import { useState, useEffect, useCallback } from "react";
import inject from "@vercel/speed-insights";
import Modal from "@/components/ui/Modal"; // Tu componente Headless UI

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

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

export default function AnalyticsBanner() {
  const [consent, setConsentState] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const loadScripts = useCallback(() => {
    if (!GA_ID || !CLARITY_ID) return;

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
      let t: any; let y: any;
      c[a] = c[a] || function(){ (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = true; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      if (y && y.parentNode) y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }, []);

  useEffect(() => {
    setMounted(true);
    const savedConsent = getConsent();
    setConsentState(savedConsent);

    // Speed Insights
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

  // Evitamos renderizado en servidor
  if (!mounted) return null;

  return (
    <Modal 
      isModalOpen={consent === ""} 
      setIsModalOpen={() => {}} // Pasamos función vacía para que no se cierre al hacer click fuera
      title="Configuración de Cookies"
      preventClose={true} // Usamos tu prop para obligar a elegir
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-300">
          Utilizamos cookies para mejorar tu experiencia y analizar el tráfico mediante Google Analytics y Microsoft Clarity.
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={decline} 
            className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Solo esenciales
          </button>
          <button 
            onClick={accept} 
            className="px-4 py-2 text-sm font-bold text-white rounded-lg bg-primary hover:opacity-90 transition-opacity"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </Modal>
  );
}