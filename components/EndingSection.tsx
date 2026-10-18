"use client";

import React from "react";
import SpatialCoverflowHero from "./SpatialCoverflowHero";

export default function EndingSection() {
  return (
    <section
      id="ending"
      className="relative z-20 w-full px-3 pt-10 pb-16 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-md"
      style={{
        background:
          "linear-gradient(to bottom, rgba(43,33,23,0) 0%, rgba(43,33,23,0.38) 90px, rgba(43,33,23,0.78) 220px, rgba(28,20,13,0.95) 420px, rgba(28,20,13,0.99) 100%)",
      }}
    >
      {/* Luz ambiental cálida de fogón y calor de hogar (Efecto sutil de cocina) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#F0822D]/20 via-[#F4C430]/6 to-transparent blur-2xl"
      />
      
      {/* Viñeta radial suave de calor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(240,130,45,0.14),transparent_60%)]"
      />

      <div className="relative z-10 w-full mx-auto">
        <SpatialCoverflowHero />
      </div>
    </section>
  );
}