"use client";

import React from "react";
import SpatialCoverflowHero from "./SpatialCoverflowHero";

export default function EndingSection() {
  return (
    <section
      id="ending"
      className="relative z-20 w-full px-3 pt-6 pb-16 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(43,33,23,0.65) 0%, rgba(43,33,23,0.88) 180px, rgba(43,33,23,0.96) 100%), url('/images/kitchen_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Luz ambiental cálida de cocina en la parte superior */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F0822D]/15 via-transparent to-transparent"
      />

      <div className="relative z-10 w-full mx-auto">
        <SpatialCoverflowHero />
      </div>
    </section>
  );
}