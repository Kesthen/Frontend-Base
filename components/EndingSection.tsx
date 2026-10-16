"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Check,
  ChefHat,
  Clock,
  HandCoins,
  HeartHandshake,
  Leaf,
  MapPin,
  MessageCircle,
  MousePointer2,
  RotateCcw,
  Search,
  Soup,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* Paleta del Manual de Identidad OllaCercana v2.0 */
const ORANGE = "#FF6600"; // primario / CTA
const GREEN = "#80E600"; // confirmación / disponible
const YELLOW = "#FFD700"; // tiempo límite / alerta
const COAL = "#121212"; // antracita

const MONO = "font-['Courier_New',monospace]";
const HAND = "font-['Caveat',cursive]";

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const TEAM = [
  { name: "Daniel Camilo Mosquera Martínez", tilt: -2 },
  { name: "Juan Manuel Garzón Viracacha", tilt: 1.5 },
  { name: "Kevin Andrey Ángel Acevedo", tilt: -1 },
  { name: "Julián Felipe Morales Zambrano", tilt: 2 },
  { name: "Santiago Andrés García Almario", tilt: -1.5 },
];

type Value = { icon: LucideIcon; title: string; text: string };
const VALUES: Value[] = [
  {
    icon: HeartHandshake,
    title: "Confianza vecinal",
    text: "La cercanía física reemplaza la calificación anónima de una app grande.",
  },
  {
    icon: Wallet,
    title: "Economía real",
    text: "Comida casera entre $8.000 y $12.000, frente a domicilios de $25.000 a $35.000.",
  },
  {
    icon: Leaf,
    title: "Cero desperdicio",
    text: "Cada porción publicada es comida que ya no se pierde por falta de un comprador cercano.",
  },
  {
    icon: HandCoins,
    title: "Ingreso sin fricción",
    text: "Monetiza los sobrantes de tu cocina sin montar un negocio formal.",
  },
];

type Mode = "comer" | "cocinar";
type Step = { icon: LucideIcon; title: string; text: string };

const RECIPES: Record<
  Mode,
  { label: string; ingredients: string; steps: Step[] }
> = {
  comer: {
    label: "Quiero comer",
    ingredients: "Tu celular, hambre y un vecino que cocine cerca.",
    steps: [
      {
        icon: Search,
        title: "Busca cerca de ti",
        text: "Mira los platos de tu edificio o barrio, entre 500 m y 2 km a la redonda.",
      },
      {
        icon: Clock,
        title: "Apartar porción",
        text: "Toca el botón y listo: la cocinera tiene ~10 min para confirmar. Si no, la porción se libera sola.",
      },
      {
        icon: MessageCircle,
        title: "Habla con tu vecina",
        text: "Acuerden el punto de entrega por el chat. Solo ves su conjunto o barrio, nunca su dirección exacta.",
      },
      {
        icon: Wallet,
        title: "Recoge y paga al recibir",
        text: "Efectivo, Nequi o Daviplata. OllaCercana no procesa dinero: el trato es entre vecinos.",
      },
    ],
  },
  cocinar: {
    label: "Quiero cocinar",
    ingredients: "Tu cocina, una porción de más y ganas de compartir.",
    steps: [
      {
        icon: ChefHat,
        title: "Publica tu plato",
        text: "Sube la foto, el precio, las porciones, el horario y tu punto de entrega.",
      },
      {
        icon: Clock,
        title: "Confirma las reservas",
        text: "Cuando un vecino aparta, tienes ~10 min para confirmar o la porción vuelve a estar disponible.",
      },
      {
        icon: MapPin,
        title: "Entrega en tu punto",
        text: "Coordina por el chat y cobra al entregar, sin intermediarios abusivos.",
      },
      {
        icon: Soup,
        title: "Tu plato se retira solo",
        text: "A las 4 horas la publicación expira. Así todo lo que se ve está fresco.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

const fmtExpiry = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
};
const fmtClock = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/* ------------------------------------------------------------------ */
/* Radio hiperlocal (500 m → 2 km)                                     */
/* ------------------------------------------------------------------ */

function RadiusMap({ animate }: { animate: boolean }) {
  const houses = [
    [62, 70], [142, 58], [150, 128], [52, 138], [100, 30], [96, 172], [28, 100],
  ];
  const trees = [
    [78, 52], [128, 84], [74, 150], [168, 96], [124, 168],
  ];
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Mapa del radio hiperlocal: de 500 metros a 2 kilómetros alrededor de una olla"
      className="w-full max-w-[280px] mx-auto"
    >
      {/* anillos */}
      <circle cx="100" cy="100" r="88" fill="none" stroke="#634931" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#634931" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
      <circle cx="100" cy="100" r="28" fill={ORANGE} fillOpacity="0.14" stroke={ORANGE} strokeWidth="1.5" />

      {/* pulso */}
      {animate && (
        <motion.circle
          cx="100" cy="100" r="28" fill="none" stroke={ORANGE} strokeWidth="2"
          initial={{ r: 28, opacity: 0.8 }}
          animate={{ r: 90, opacity: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* casas y árboles */}
      {houses.map(([x, y], i) => (
        <path
          key={`h${i}`}
          d={`M${x - 6} ${y + 5} V${y - 1} L${x} ${y - 7} L${x + 6} ${y - 1} V${y + 5} Z`}
          fill={YELLOW} stroke="#634931" strokeWidth="1"
        />
      ))}
      {trees.map(([x, y], i) => (
        <circle key={`t${i}`} cx={x} cy={y} r="4.5" fill={GREEN} stroke="#3d6b00" strokeWidth="1" />
      ))}

      {/* olla */}
      <g transform="translate(100 102)">
        <path d="M-11 -3 H11 V6 a5 5 0 0 1 -5 5 H-6 a5 5 0 0 1 -5 -5 Z" fill={COAL} />
        <path d="M-11 0 h-4 M11 0 h4" stroke={COAL} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M-12 -4 H12" stroke={COAL} strokeWidth="2.5" strokeLinecap="round" />
        {animate ? (
          [-5, 0, 5].map((dx, i) => (
            <motion.path
              key={i}
              d={`M${dx} -8 q-3 -4 0 -8 q3 -4 0 -8`}
              fill="none" stroke="#634931" strokeWidth="1.4" strokeLinecap="round"
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: [0, 0.9, 0], y: [2, -4, -8] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))
        ) : (
          <path d="M0 -8 q-3 -4 0 -8 q3 -4 0 -8" fill="none" stroke="#634931" strokeWidth="1.4" />
        )}
      </g>

      {/* etiquetas */}
      <g className={MONO} fontSize="8" fontWeight="700" fill="#4a3b2c">
        <text x="100" y="142" textAnchor="middle">500 m</text>
        <text x="100" y="9" textAnchor="middle">2 km</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Demo: "Apartar porción"                                             */
/* ------------------------------------------------------------------ */

function PortionDemo() {
  const [expiry, setExpiry] = useState(3 * 3600 + 12 * 60);
  const [left, setLeft] = useState<number | null>(null); // null = sin reservar

  useEffect(() => {
    const id = setInterval(() => setExpiry((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (left === null) return;
    const t = setTimeout(
      () => setLeft((l) => (l === null ? null : l <= 0 ? null : l - 1)),
      left <= 0 ? 2600 : 1000
    );
    return () => clearTimeout(t);
  }, [left]);

  const released = left === 0;
  const reserved = left !== null && left > 0;

  return (
    <div
      className="rounded-xl p-5 shadow-[0_12px_30px_rgba(0,0,0,0.45)] border border-white/10 font-sans"
      style={{ backgroundColor: COAL, color: "#ffffff" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] font-semibold tracking-wide rounded-full px-2.5 py-0.5 border"
          style={{ color: GREEN, borderColor: GREEN }}
        >
          DISPONIBLE
        </span>
        <span className="text-xs font-medium" style={{ color: YELLOW }}>
          Expira en {fmtExpiry(expiry)}
        </span>
      </div>
      <h4 className="text-lg font-semibold leading-tight">Bandeja paisa</h4>
      <p className="text-sm text-white/70 mt-0.5">Cocina de Marta</p>
      <p className="text-xs font-medium text-white/60 mt-2">
        0.5 km · 3 porciones · $12.000
      </p>

      <button
        type="button"
        onClick={() => setLeft(reserved || released ? null : 600)}
        disabled={released}
        className="mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
        style={{
          backgroundColor: reserved ? "transparent" : ORANGE,
          color: reserved ? GREEN : COAL,
          border: reserved ? `1.5px solid ${GREEN}` : "1.5px solid transparent",
        }}
      >
        {reserved ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Check className="w-4 h-4" aria-hidden="true" /> Porción apartada
          </span>
        ) : (
          "Apartar porción"
        )}
      </button>

      <div aria-live="polite" className="mt-3 min-h-[2.5rem] text-xs text-white/80">
        {reserved && (
          <>
            <p>
              Tienes ~10 min para confirmar:{" "}
              <strong style={{ color: YELLOW }}>{fmtClock(left as number)}</strong>
            </p>
            <div className="h-1 mt-2 rounded bg-white/15 overflow-hidden">
              <div
                className="h-full transition-[width] duration-1000 ease-linear"
                style={{ width: `${((left as number) / 600) * 100}%`, backgroundColor: YELLOW }}
              />
            </div>
            <button
              type="button"
              onClick={() => setLeft(null)}
              className="mt-2 inline-flex items-center gap-1 text-white/60 hover:text-white"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" /> Cancelar
            </button>
          </>
        )}
        {released && <p>La reserva se liberó sola. Así de simple.</p>}
        {left === null && (
          <p className="text-white/50">Pruébalo: así se aparta una porción en la app.</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sección                                                             */
/* ------------------------------------------------------------------ */

export default function EndingSection() {
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<Mode>("comer");
  const recipe = RECIPES[mode];

  const tabBtn = (m: Mode) =>
    `px-4 py-2 text-sm font-bold border-2 border-[#735e45] transition-all ${MONO} ${
      mode === m
        ? "text-[#121212] shadow-[2px_2px_0px_#4a3b2c]"
        : "bg-[#e8deba] text-[#4a3b2c] hover:bg-[#f0e6c4]"
    }`;

  return (
    <section id="ending" className="relative z-20 bg-[#3a3528] px-4 pb-20 sm:px-8">
      {/* borde rasgado */}
      <div
        className="absolute top-0 left-0 w-full h-8 -translate-y-[90%] z-30"
        style={{
          clipPath:
            "polygon(0% 100%, 5% 20%, 10% 100%, 15% 10%, 20% 90%, 25% 0%, 30% 100%, 35% 20%, 40% 90%, 45% 10%, 50% 80%, 55% 0%, 60% 100%, 65% 10%, 70% 90%, 75% 20%, 80% 100%, 85% 0%, 90% 90%, 95% 10%, 100% 100%)",
          backgroundColor: "#3a3528",
        }}
      />

      <div className="mx-auto max-w-5xl pt-14">
        {/* ---------- Encabezado ---------- */}
        <div className="text-center mb-12">
          <p className={`${MONO} text-xs tracking-[0.35em] text-[#d8cca6]/70 mb-3`}>
            OLLACERCANA · DOSW 2026
          </p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${HAND} text-6xl sm:text-7xl font-bold text-[#efe3bf] leading-none`}
          >
            Lo cercano también <span style={{ color: ORANGE }}>alimenta.</span>
          </motion.h2>
          <p className={`${MONO} text-[#d8cca6] mt-4 text-sm sm:text-base tracking-wide`}>
            “Comida casera a un paso de tu puerta”
          </p>
        </div>

        {/* ---------- SOBRE NOSOTROS ---------- */}
        <div className="relative bg-[#dfcc99] p-6 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#a38c64] rounded-sm">
          <span className={`absolute -top-4 left-6 sm:left-10 bg-[#634931] text-[#efe3bf] ${MONO} text-xs font-bold tracking-[0.3em] px-4 py-1.5 -rotate-1 shadow-md`}>
            SOBRE NOSOTROS
          </span>

          <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 items-center pt-4">
            <div>
              <RadiusMap animate={!reduce} />
              <p className={`${MONO} text-center text-xs font-bold text-[#634931] tracking-widest mt-2`}>
                RADIO HIPERLOCAL · 500 M – 2 KM
              </p>
            </div>

            <div className={`${MONO} text-[#4a3b2c]`}>
              <h3 className="text-2xl font-bold text-[#634931] mb-3">
                Una olla grande, compartida entre vecinos.
              </h3>
              <p className="text-sm font-bold leading-relaxed opacity-90">
                OllaCercana es una red hiperlocal que conecta a quienes cocinan de
                más con vecinos cercanos que quieren comer casero a un precio
                justo. Sin intermediarios abusivos, sin calificaciones anónimas:
                aquí la confianza la da la cercanía.
              </p>

              {/* tickets de precio */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="border-2 border-dashed border-[#a38c64] bg-[#e8deba] p-3 rotate-[-1.5deg]">
                  <p className="text-[10px] font-bold tracking-widest opacity-70">DOMICILIO CONVENCIONAL</p>
                  <p className="text-lg font-bold line-through decoration-[#E5484D] decoration-2 mt-1">
                    $25k – $35k
                  </p>
                </div>
                <div className="border-2 border-[#735e45] bg-[#fff3c4] p-3 rotate-[1.5deg] shadow-[3px_3px_0_#4a3b2c]">
                  <p className="text-[10px] font-bold tracking-widest opacity-70">COMIDA CASERA CERCANA</p>
                  <p className="text-lg font-bold mt-1" style={{ color: "#b34700" }}>
                    $8k – $12k
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* valores */}
          <div className="mt-10">
            <p className={`${MONO} text-xs font-bold tracking-[0.3em] text-[#634931] mb-4`}>
              NUESTROS INGREDIENTES
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <li
                    key={v.title}
                    tabIndex={0}
                    className={`group relative h-full border-2 border-[#735e45] bg-[#e8deba] p-4 outline-none transition-all duration-300 ${MONO}
                      hover:bg-[#fff3c4] hover:shadow-[3px_3px_0_#4a3b2c] hover:-translate-y-1 hover:rotate-[-1deg]
                      focus-visible:bg-[#fff3c4] focus-visible:shadow-[3px_3px_0_#4a3b2c] focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#FF6600]`}
                  >
                    {/* Ondas que invitan a acercar el mouse; desaparecen al hacer hover/focus.
                        Solo en dispositivos con mouse (en táctil el texto ya está visible). */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 top-[58%] hidden items-center justify-center transition-opacity duration-200 [@media(hover:hover)]:flex group-hover:opacity-0 group-focus-visible:opacity-0"
                    >
                      {[0, 1, 2].map((r) => (
                        <motion.span
                          key={r}
                          className="absolute w-14 h-14 rounded-full border-2"
                          style={{ borderColor: ORANGE }}
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={reduce ? { scale: 0.4 + r * 0.5, opacity: 0.35 } : { scale: [0.4, 1.7], opacity: [0.7, 0] }}
                          transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, delay: r * 0.8, ease: "easeOut" }}
                        />
                      ))}
                      <MousePointer2
                        className="relative w-5 h-5 text-[#634931] fill-[#efe3bf]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="inline-flex w-9 h-9 rounded-full items-center justify-center mb-2 bg-[#634931] text-[#efe3bf] transition-colors duration-300 group-hover:bg-[#FF6600] group-hover:text-[#121212] group-focus-visible:bg-[#FF6600] group-focus-visible:text-[#121212]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="block text-sm font-bold text-[#4a3b2c]">{v.title}</span>
                    {/* El texto siempre ocupa su espacio (sin saltos de layout).
                        Con mouse aparece al pasar el cursor; en táctil queda visible. */}
                    <span className="block pt-2 text-xs font-bold leading-relaxed text-[#4a3b2c] transition-all duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0">
                      {v.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* equipo */}
          <div className="mt-10 pt-6 border-t border-dashed border-[#a38c64]">
            <p className={`${MONO} text-xs font-bold tracking-[0.3em] text-[#634931] mb-4`}>
              LOS COCINEROS DE ESTA RECETA
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-4">
              {TEAM.map((m, i) => (
                <motion.li
                  key={m.name}
                  initial={reduce ? false : { opacity: 0, y: 16, rotate: m.tilt }}
                  whileInView={{ opacity: 1, y: 0, rotate: m.tilt }}
                  whileHover={reduce ? undefined : { rotate: 0, scale: 1.06 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="relative bg-[#e8deba] border border-[#c4a974] shadow-[2px_3px_8px_rgba(43,33,23,0.25)] px-4 py-2"
                >
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-[#d6c7a1]/90 -rotate-2 border border-[#c9b98f]" />
                  <span className={`${HAND} text-2xl font-bold text-[#4a3b2c]`}>{m.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- CÓMO USARLA: RECETA ---------- */}
        <div className="relative mt-16 bg-[#dfcc99] p-6 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#a38c64] rounded-sm">
          <span className={`absolute -top-4 left-6 sm:left-10 bg-[#634931] text-[#efe3bf] ${MONO} text-xs font-bold tracking-[0.3em] px-4 py-1.5 rotate-1 shadow-md`}>
            RECETA · CÓMO USAR OLLACERCANA
          </span>

          {/* sello */}
          <div className="hidden sm:flex absolute -top-5 right-8 w-20 h-24 border-2 border-white p-1 rotate-12 bg-[#3a3528] shadow-md flex-col items-center justify-center text-center overflow-hidden">
            <span className="text-[8px] text-white absolute top-1 uppercase tracking-tighter">Hecho en el barrio</span>
            <UtensilsCrossed className="w-10 h-10 text-white opacity-80 mt-2" aria-hidden="true" />
            <span className="text-white text-[9px] font-bold absolute bottom-1">100% casero</span>
          </div>

          <div className="pt-4">
            <h3 className={`${HAND} text-5xl font-bold text-[#634931] leading-none`}>
              Se prepara en 4 pasos
            </h3>
            <p className={`${MONO} text-sm font-bold text-[#4a3b2c] mt-2 opacity-80`}>
              Elige tu rol y mira cómo hierve la cosa.
            </p>

            {/* pestañas */}
            <div role="tablist" aria-label="Tipo de uso" className="flex gap-3 mt-6">
              {(Object.keys(RECIPES) as Mode[]).map((m) => (
                <button
                  key={m}
                  role="tab"
                  type="button"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={tabBtn(m)}
                  style={mode === m ? { backgroundColor: ORANGE } : undefined}
                >
                  {RECIPES[m].label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 mt-8">
            <div className={`${MONO} text-[#4a3b2c]`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mode}
                  role="tabpanel"
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-sm font-bold border-b border-dashed border-[#a38c64] pb-3 mb-5">
                    <span className="text-[#634931] tracking-widest">INGREDIENTES: </span>
                    {recipe.ingredients}
                  </p>

                  <ol className="relative space-y-5">
                    <span aria-hidden="true" className="absolute left-[17px] top-3 bottom-3 w-0.5 border-l-2 border-dashed border-[#a38c64]" />
                    {recipe.steps.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.li
                          key={s.title}
                          initial={reduce ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * i, duration: 0.3 }}
                          className="relative flex gap-4"
                        >
                          <span
                            className="relative z-10 shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#4a3b2c]"
                            style={{ backgroundColor: i === 1 ? YELLOW : "#fff3c4", color: COAL }}
                          >
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-[#634931]">
                              {i + 1}. {s.title}
                            </p>
                            <p className="text-xs font-bold leading-relaxed opacity-85 mt-0.5">{s.text}</p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ol>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* demo interactiva */}
            <div className="relative">
              <p className={`${MONO} text-xs font-bold tracking-[0.3em] text-[#634931] mb-3`}>
                PRUÉBALO TÚ MISMO
              </p>
              <div className="rotate-[1deg]">
                <PortionDemo />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Cierre ---------- */}
        <div className="text-center mt-16">
          <p className={`${HAND} text-4xl sm:text-5xl font-bold text-[#efe3bf]`}>
            La mejor receta es la que se comparte con el vecino.
          </p>
          <Link
            href="#kitchen-scroll"
            className={`mt-6 inline-flex items-center gap-2 ${MONO} font-bold text-[#121212] border-2 border-[#121212] px-6 py-2.5 shadow-[3px_3px_0px_#121212] hover:translate-y-[2px] hover:shadow-none transition-all`}
            style={{ backgroundColor: ORANGE }}
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>

        <div className={`text-center mt-12 ${MONO} text-xs text-[#a3977c] tracking-widest uppercase`}>
          Copyright 2026 OllaCercana. All rights reserved.
        </div>
      </div>
    </section>
  );
}