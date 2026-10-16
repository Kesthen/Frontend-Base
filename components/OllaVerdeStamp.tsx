"use client";

import { useEffect, useState } from "react";
import { Award, CalendarDays } from "lucide-react";
import { getActiveOllaVerdeAwards, OllaVerdeAward, sharesResidentialComplex } from "@/lib/ollacercana-store";

interface OllaVerdeStampProps {
  residentialComplex?: string;
  compact?: boolean;
}

export default function OllaVerdeStamp({ residentialComplex, compact = false }: OllaVerdeStampProps) {
  const [awards, setAwards] = useState<OllaVerdeAward[]>([]);

  useEffect(() => {
    const refreshAwards = () => setAwards(getActiveOllaVerdeAwards());
    refreshAwards();
    window.addEventListener("ollaverde-progress-updated", refreshAwards);
    window.addEventListener("storage", refreshAwards);
    return () => {
      window.removeEventListener("ollaverde-progress-updated", refreshAwards);
      window.removeEventListener("storage", refreshAwards);
    };
  }, []);

  const award = awards.find((item) => sharesResidentialComplex(item.residentialComplex, residentialComplex));
  if (!award) return null;

  const expiry = new Date(award.validUntil).toLocaleDateString("es-CO", { day: "numeric", month: "short" });
  return (
    <span
      title={`Sello oficial Olla Verde · 7 PT. ${award.residentialComplex} completó la meta de vender todas sus porciones durante 7 días consecutivos. Vigente hasta el ${expiry}.${award.isDemo ? " Ejemplo de demostración." : ""}`}
      aria-label={`Sello Olla Verde de 7 PT para ${award.residentialComplex}${award.isDemo ? ", ejemplo de demostración" : ""}`}
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border border-[#76834d] bg-[#f5f0d9] text-[#394528] shadow-sm ${compact ? "px-1.5 py-1" : "px-2 py-1"}`}
    >
      <span aria-hidden="true" className={`relative shrink-0 overflow-hidden rounded-full border border-[#b38a54] bg-[#fff9e8] ${compact ? "h-8 w-8" : "h-10 w-10"}`}>
        <img src="/images/sello_olla_verde.png" alt="" className="absolute inset-0 h-full w-full scale-[1.8] -translate-x-[22%] translate-y-[19%] object-contain" />
      </span>
      {!compact && (
        <span className="flex flex-col text-left leading-tight">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide"><Award className="h-3 w-3 text-[#52663d]" /> Olla Verde · 7 PT</span>
          <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#6c6748]"><CalendarDays className="h-2.5 w-2.5" /> Vigente hasta {expiry}</span>
          {award.isDemo && <span className="text-[8px] font-bold uppercase tracking-wide text-[#8c5b34]">Ejemplo de meta cumplida</span>}
        </span>
      )}
    </span>
  );
}
