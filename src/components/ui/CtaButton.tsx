import { useRef } from "react";
import { sileo } from "sileo";

interface Props {
  propType: "success" | "error" | "warning" | "info" | "action" | "promise";
  propFill?: string;
  buttonClic?: {
    title: string;
    onClick?: () => void;
    url?: string;
    copyValue?: string;
  };
  propDesc: string;
  propTitle: string;
  audioSrc?: string;
  propPromise?: Promise<any> | (() => Promise<any>);
}

export const CtaButton = ({
  audioSrc,
  propFill,
  propType,
  buttonClic,
  propDesc,
  propTitle,
  propPromise,
}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = async () => {
    // Audio
    if (audioSrc != null && audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch {
        // Audio playback may fail due to browser autoplay policy
      }
    }

    // Prepare final button for Sileo
    const finalButton = buttonClic
      ? {
          title: buttonClic.title,
          onClick: () => {
            if (buttonClic.copyValue) {
              navigator.clipboard
                .writeText(buttonClic.copyValue)
                .catch(() => {});
            }
            if (buttonClic.url) {
              window.location.href = buttonClic.url;
            }
            if (buttonClic.onClick) {
              buttonClic.onClick();
            }
          },
        }
      : undefined;

    // Toast
    try {
      switch (propType) {
        case "success":
          sileo.success({
            title: propTitle,
            description: propDesc,
            fill: propFill,
            button: finalButton,
          });
          break;
        case "error":
          sileo.error({
            title: propTitle,
            description: propDesc,
            fill: propFill,
            button: finalButton,
          });
          break;
        case "warning":
          sileo.warning({
            title: propTitle,
            description: propDesc,
            fill: propFill,
            button: finalButton,
          });
          break;
        case "info":
          sileo.info({
            title: propTitle,
            description: propDesc,
            fill: propFill,
            button: finalButton,
          });
          break;
        case "action":
          sileo.action({
            title: propTitle,
            description: propDesc,
            fill: propFill,
            button: finalButton,
          });
          break;
        case "promise":
          if (propPromise) {
            sileo.promise(propPromise, {
              loading: { title: "Cargando..." },
              success: {
                title: propTitle,
                description: propDesc,
                fill: propFill,
                button: finalButton,
              },
              error: {
                title: "Error",
                description: "Ocurrió un error",
                fill: propFill,
              },
            });
          }
          break;
      }
    } catch {
      // Toast rendering failed silently
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer select-none inline-block outline-none bg-transparent border-none p-0"
      >
        <h2 className="text-3xl md:text-6xl font-black text-primary uppercase leading-tight mb-6 md:mb-10 hover:scale-105 transition-transform duration-300">
          {propTitle}
        </h2>
      </button>
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload="none" />}
    </>
  );
};
