"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Share2,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  MapPin,
  Utensils,
  ChefHat,
  X,
  Flame,
  ShieldCheck,
  Check,
  RotateCcw,
  ArrowRight,
  Soup,
  Eye,
  HelpCircle,
  ShoppingBag,
  MessageCircle,
  Award,
  Star,
  DollarSign,
  TrendingUp,
  Quote,
  LogIn,
  UserPlus,
} from "lucide-react";

// Paleta OllaCercana
const ORANGE = "#F0822D";
const GREEN = "#62B869";
const YELLOW = "#F4C430";
const RED_TERRA = "#C84B31";
const COAL = "#2B2117";

const MONO = "font-['Courier_New',monospace]";
const HAND = "font-['Caveat',cursive]";
const SERIF = "font-['Playfair_Display',serif]";

export interface SpatialDish {
  id: string;
  name: string;
  category: "Sopas" | "Almuerzos" | "Vegetariano" | "Postres";
  cook: string;
  cookId: string;
  cookAvatar: string;
  cookRole: string;
  image: string;
  price: string;
  rawPrice: number;
  rating: string;
  reviewsCount: number;
  distance: string;
  walkMinutes: number;
  residentialComplex: string;
  portionsLeft: number;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  grandmaNote: string;
  cookingTime: string;
  dietaryTags: string[];
}

export const FEATURED_TEASER_DISH: SpatialDish = {
  id: "dish-ajiaco-teaser",
  name: "Ajiaco Santafereño de la Casa",
  category: "Sopas",
  cook: "Cocinera de Tradición",
  cookId: "cocinera-tradicional",
  cookAvatar: "/images/dona_rosa_mascot.jpg",
  cookRole: "Receta de hogar · Barrio San Luis",
  image: "/images/menu_ajiaco.jpg",
  price: "$18.000",
  rawPrice: 18000,
  rating: "4.9",
  reviewsCount: 128,
  distance: "A 350 m",
  walkMinutes: 4,
  residentialComplex: "Conjunto San Luis",
  portionsLeft: 4,
  badge: "Muestra del Día",
  shortDesc: "Tres papas andinas, pechuga desmechada tierna, mazorca dulce y crema fresca.",
  fullDesc:
    "Receta tradicional santafereña preparada a fuego lento durante tres horas en olla gruesa. Una muestra representativa de los platos caseros que se comparten entre vecinos en OllaCercana. Para descubrir más ollas y porciones calientes, explora El Libretón.",
  grandmaNote: "El truco está en que la papa criolla se deshaga solita para espesar el caldo, sin agregar harinas jamás.",
  cookingTime: "Fuego lento 3h 15m",
  dietaryTags: ["Sin Gluten", "100% Casero", "Porción Limitada"],
};

export interface CarouselScreen {
  id: string;
  type: "map" | "dish" | "mascot" | "cook" | "buyer";
  tabLabel: string;
  tabIcon: string;
  badge: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  image: string;
  overlayMetric: string;
  overlaySub: string;
  description: string;
  highlightLabel: string;
  highlightValue: string;
  highlightPill: string;
  actionLabel: string;
  actionHref?: string;
}

export const CAROUSEL_SCREENS: CarouselScreen[] = [
  {
    id: "screen-map",
    type: "map",
    tabLabel: "Mapa Cercano",
    tabIcon: "📍",
    badge: "Radar de Cocinas Activas",
    categoryTag: "GEOLOCALIZACIÓN · BARRIO EN VIVO",
    title: "Cocinas Cercanas en tu Barrio",
    subtitle: "Ollas activas a 500m – 2km de tu portería",
    image: "/images/header_chalkboard_banner_adapted.jpg",
    overlayMetric: "500m – 2km",
    overlaySub: "10 ollas activas hoy",
    description:
      "Ubica en tiempo real qué ollas se están preparando a pocas cuadras. Consulta distancias exactas a pie y recoge en portería sin intermediarios.",
    highlightLabel: "📍 RADAR VECINAL",
    highlightValue: "A 4 – 12 min a pie",
    highlightPill: "Sin Domiciliarios",
    actionLabel: "Explorar Mapa en Vivo",
    actionHref: "/cocineras-cercanas",
  },
  {
    id: "screen-dish",
    type: "dish",
    tabLabel: "Plato Teaser",
    tabIcon: "🍲",
    badge: "Muestra Exclusiva de Hoy",
    categoryTag: "FOGÓN TRADICIONAL · TEASER",
    title: "Ajiaco Santafereño de la Casa",
    subtitle: "Cocinera de Tradición · Conjunto San Luis",
    image: "/images/menu_ajiaco.jpg",
    overlayMetric: "$18.000",
    overlaySub: "Solo 4 porciones hoy",
    description:
      "Una pequeña muestra de la comida casera que vive en el barrio. Para preservar la magia del descubrimiento, explora las demás ollas en El Libretón.",
    highlightLabel: "📍 CERCA A TI",
    highlightValue: "A 350 m · 4 min a pie",
    highlightPill: "Porción Caliente",
    actionLabel: "Apartar esta porción",
  },
  {
    id: "screen-mascot",
    type: "mascot",
    tabLabel: "La Abuelita",
    tabIcon: "👵",
    badge: "Anfitriona del Barrio",
    categoryTag: "BIENVENIDA A OLLACERCANA",
    title: "La Abuelita te da la bienvenida",
    subtitle: "Conectando cocinas reales en tu conjunto",
    image: "/images/abuelita_3d_hq.jpg",
    overlayMetric: "100% Casero",
    overlaySub: "Hecho a fuego lento",
    description:
      "¡Hola, vecino! Aquí celebramos la sazón casera de las familias del barrio. Platos recién preparados con amor, precios justos y encuentro cálido en portería.",
    highlightLabel: "👵 SAZÓN COMUNITARIA",
    highlightValue: "Comida de verdad y confianza",
    highlightPill: "0% Comisiones",
    actionLabel: "Descubrir El Libretón",
    actionHref: "/menu",
  },
  {
    id: "screen-cook",
    type: "cook",
    tabLabel: "Modo Cocinera",
    tabIcon: "👩‍🍳",
    badge: "Espacio de Cocina & Olla Verde",
    categoryTag: "PANTALLA INTERNA · MODO COCINERA",
    title: "Tu Cocina, Tus Porciones",
    subtitle: "Publica tus platos y gana en tu barrio",
    image: "/images/cook_earnings_zero_commission.jpg",
    overlayMetric: "0% Comisión",
    overlaySub: "⭐ 4.9 Reputación Vecinal",
    description:
      "¿Cocinaste de más en casa? Publica en 1 minuto. Los platos expiran a las 4 horas para asegurar frescura total sin presiones ni cobros de plataforma.",
    highlightLabel: "🎖️ SELLO OLLA VERDE",
    highlightValue: "Todo el pago va directo a ti",
    highlightPill: "Ingreso Vecinal",
    actionLabel: "Conocer Modo Cocinera",
    actionHref: "/cuenta/cocina",
  },
  {
    id: "screen-buyer",
    type: "buyer",
    tabLabel: "Vecino Comensal",
    tabIcon: "🛍️",
    badge: "Pasaporte & Reservas Activas",
    categoryTag: "PANTALLA INTERNA · PERFIL & PEDIDOS",
    title: "Tus Pedidos & Vecino Fiel",
    subtitle: "Aparta porciones y coordina en portería",
    image: "/images/vecino_fiel_hero_scene.jpg",
    overlayMetric: "Vecino Fiel",
    overlaySub: "5% de descuento por racha",
    description:
      "Aparta tu plato con 1 toque sin tarjetas bancarias. Chatea directamente con quien cocina, acuerda la entrega en portería y acumula sellos de fidelidad.",
    highlightLabel: "🛍️ GESTIÓN EN PORTERÍA",
    highlightValue: "Pagas directo al recibir",
    highlightPill: "Chat Interno",
    actionLabel: "Ver Mis Reservas",
    actionHref: "/cuenta/reservas",
  },
];

export default function SpatialCoverflowHero() {
  const router = useRouter();
  // Inicia en índice 2 (La Abuelita, centro) con pantallas/tarjetas a ambos lados según diseño interactivo
  const [activeIndex, setActiveIndex] = useState(2);
  const [expandedDish, setExpandedDish] = useState<SpatialDish | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({ "dish-ajiaco-teaser": true });
  const [isAudioSimmering, setIsAudioSimmering] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Modal para Apartar Porción (redirige a iniciar sesión o registro)
  const [authPromptDish, setAuthPromptDish] = useState<SpatialDish | null>(null);

  // Selector de rol interactivo
  const [activeRole, setActiveRole] = useState<"comprador" | "cocinera">("comprador");

  // Modal / Drawer de Preguntas Frecuentes
  const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentScreen = CAROUSEL_SCREENS[activeIndex] || CAROUSEL_SCREENS[2];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = !prev[id];
      showToast(next ? "❤️ ¡Guardado en tus favoritos!" : "Retirado de tus favoritos.");
      return { ...prev, [id]: next };
    });
  };

  // Cuando se pulsa Apartar Porción: abre el modal de registro/login
  const handleOpenAuthPrompt = (dish: SpatialDish, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAuthPromptDish(dish);
  };

  // Desplazamiento suave al frame de la abuelita cocinando (al ~92% del scroll de la cocina)
  const handleScrollToAbuelitaKitchen = (e: React.MouseEvent) => {
    e.preventDefault();
    const container = document.getElementById("kitchen-scroll");
    if (!container) return;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: container.offsetTop + scrollableHeight * 0.92,
      behavior: "smooth",
    });
  };

  // Sonido ambiente sintetizado
  const toggleSimmerAudio = () => {
    if (isAudioSimmering) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsAudioSimmering(false);
      showToast("🔇 Sonido de cocina silenciado");
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(360, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      setIsAudioSimmering(true);
      showToast("🍲 Sonido ambiente activado: hervor y vapor en la cocina");
    } catch {
      showToast("Audio no disponible en este navegador");
    }
  };

  // Inclinación con mouse
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: x * 8, y: -y * 8 });
  };
  const handleCardMouseLeave = () => setCardTilt({ x: 0, y: 0 });

  // Deslizamiento táctil / ratón
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 55) {
      if (diff > 0 && activeIndex > 0) setActiveIndex((p) => p - 1);
      else if (diff < 0 && activeIndex < CAROUSEL_SCREENS.length - 1) setActiveIndex((p) => p + 1);
      setIsDragging(false);
    }
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => setDragStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0 && activeIndex > 0) setActiveIndex((p) => p - 1);
      else if (diff < 0 && activeIndex < CAROUSEL_SCREENS.length - 1) setActiveIndex((p) => p + 1);
    }
  };

  // Preguntas Frecuentes
  const FAQS = [
    {
      q: "¿Cómo y cuándo se paga la comida?",
      a: "El trato es 100% directo entre vecinos. Pagas al momento de recibir tu porción en portería: en efectivo, Nequi o Daviplata. OllaCercana no retiene tu dinero ni cobra comisiones ocultas.",
    },
    {
      q: "¿Dónde se realiza la entrega?",
      a: "Acuerdas la entrega por el chat privado de la reserva (normalmente en la portería de tu conjunto o un punto cercano conocido). Por seguridad, nunca se publican números de apartamento ni direcciones privadas.",
    },
    {
      q: "¿Qué pasa si una porción no se confirma en 10 minutos?",
      a: "Si la cocinera no confirma en ~10 minutos, la reserva se libera sola automáticamente para que no te quedes esperando y puedas elegir otro plato caliente.",
    },
    {
      q: "¿Puedo vender comida si cocino en casa y no soy restaurante?",
      a: "¡Sí! OllaCercana nació para familias y vecinos que cocinan rico y les sobran porciones. Publicas en 1 minuto y generas un ingreso justo sin montar un negocio formal.",
    },
    {
      q: "¿Cómo garantizan la frescura de la comida?",
      a: "Cada publicación expira sola a las 4 horas de haber sido creada. Así garantizamos que todo lo que ves en la plataforma fue cocinado el mismo día.",
    },
  ];

  return (
    <div className="relative w-full font-sans select-none overflow-hidden pb-12">
      {/* ========================================================================= */}
      {/* 0. PUENTE DE TRANSICIÓN: CONEXIÓN SUAVE CON EL FOGÓN DE LA ABUELITA       */}
      {/* ========================================================================= */}
      <div className="relative z-30 flex items-center justify-center pt-2 mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F4C430]/30 bg-[#2B2117]/85 px-4 py-1.5 text-xs font-bold text-[#F4C430] shadow-xl backdrop-blur-xl">
          <span className="flex h-2 w-2 rounded-full bg-[#62B869] animate-pulse" />
          <span>El fogón de la abuelita está servido · Conoce las ollas del barrio</span>
          <ChevronDown className="h-3.5 w-3.5 text-[#F0822D]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VISIONOS TOP CAPSULE (Barra Flotante de Estado)                        */}
      {/* ========================================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-white/15 bg-[#2B2117]/80 px-4 py-2 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#F0822D] to-[#C84B31] text-white shadow">
              <Utensils className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold tracking-wide text-[#FAF3E7]">OllaCercana</span>
            <span className={`${MONO} text-[9px] font-bold text-[#F4C430] uppercase`}>· VISOR ESPACIAL 3D</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-[#FAF3E7]/90">
            <MapPin className="h-3 w-3 text-[#62B869]" />
            <span className={`${MONO} text-[11px] font-bold`}>Radio 500m – 2km</span>
            <span className="flex h-2 w-2 rounded-full bg-[#62B869] animate-pulse" />
            <span className="text-[10px] text-[#62B869] font-bold">10 ollas activas hoy</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Simmer Toggle */}
            <button
              type="button"
              onClick={toggleSimmerAudio}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                isAudioSimmering
                  ? "border-[#62B869] bg-[#62B869]/20 text-[#62B869]"
                  : "border-white/15 bg-white/5 text-[#FAF3E7]/80 hover:text-white"
              }`}
              title="Sonido de cocina"
            >
              {isAudioSimmering ? <Volume2 className="h-3 w-3 animate-pulse" /> : <VolumeX className="h-3 w-3" />}
              <span className="hidden sm:inline">{isAudioSimmering ? "Hervor activo" : "Sonido cocina"}</span>
            </button>

            {/* Ayuda Rápida */}
            <button
              type="button"
              onClick={() => setHelpDrawerOpen(true)}
              className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-[#FAF3E7]/85 hover:border-[#F4C430] hover:text-[#F4C430] transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3 w-3 text-[#F4C430]" />
              <span>Ayuda</span>
            </button>

            {/* Compartir */}
            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  showToast("¡Enlace copiado para compartir con tus vecinos!");
                }
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FAF3E7]/80 hover:text-[#F0822D] transition-colors"
              title="Compartir"
            >
              <Share2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO HEADLINE (Con Espacio Limpio, Sin Tarjetas Sobrepuestas)           */}
      {/* ========================================================================= */}
      <div className="relative z-20 text-center px-4 mb-3 pt-1">
        <p className={`${MONO} text-[10px] font-bold tracking-[0.25em] text-[#F4C430] uppercase mb-1`}>
          COCINA CASERA DE BARRIO · HECHA A FUEGO LENTO
        </p>
        <h2 className={`${SERIF} text-3xl sm:text-4xl lg:text-5xl text-[#FAF3E7] font-bold tracking-tight leading-tight`}>
          Lo cercano{" "}
          <span className="italic" style={{ color: ORANGE }}>
            también alimenta.
          </span>
        </h2>

        {/* Selector de Pantallas del Carrusel: Exactamente la misma estructura de botones con z-40 */}
        <div className="mt-4 mb-0 flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 backdrop-blur-xl shadow-xl max-w-fit mx-auto relative z-40 pointer-events-auto">
          {CAROUSEL_SCREENS.map((screen, idx) => (
            <button
              key={screen.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeIndex === idx
                  ? "bg-[#F0822D] text-[#2B2117] shadow-md shadow-[#F0822D]/30 scale-105"
                  : "border border-white/10 bg-white/5 text-[#FAF3E7]/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              <span>{screen.tabIcon} {screen.tabLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 3. ESCENARIO CENTRAL: VISOR 3D COVERFLOW (Equidistante entre filtros y dock) */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 mt-8 sm:mt-10">
        <div className="w-full flex flex-col items-center">
          <div className="relative min-h-[480px] sm:min-h-[500px] w-full flex items-center justify-center">
            <div
              className="relative w-full max-w-4xl h-[470px] sm:h-[490px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {CAROUSEL_SCREENS.map((screen, index) => {
                const diff = index - activeIndex;
                const isCenter = diff === 0;

                const translateX = diff * 68;
                const translateZ = -Math.abs(diff) * 135;
                const rotateY = diff * -20;
                const scale = Math.max(0.72, 1 - Math.abs(diff) * 0.14);
                const opacity = Math.abs(diff) > 2 ? 0 : Math.max(0.35, 1 - Math.abs(diff) * 0.35);
                const zIndex = 25 - Math.abs(diff) * 8;
                const pointerEvents = Math.abs(diff) > 1 ? "none" : "auto";

                const tiltTransform = isCenter ? `rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg)` : "";

                return (
                  <div
                    key={screen.id}
                    onClick={() => {
                      if (!isCenter) setActiveIndex(index);
                    }}
                    className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out will-change-transform"
                    style={{
                      width: "min(88vw, 360px)",
                      transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale}) ${tiltTransform}`,
                      opacity,
                      zIndex,
                      pointerEvents,
                    }}
                    onMouseMove={isCenter ? handleCardMouseMove : undefined}
                    onMouseLeave={isCenter ? handleCardMouseLeave : undefined}
                  >
                    {/* Tarjeta de Cristal Ampliada y Destacada */}
                    <div
                      className={`group relative overflow-hidden rounded-3xl border transition-all ${
                        isCenter
                          ? "border-white/35 bg-[#2B2117]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-[#F0822D]/40"
                          : "border-white/10 bg-[#2B2117]/75 shadow-lg backdrop-blur-md"
                      } backdrop-blur-2xl p-3.5 sm:p-4`}
                    >
                      {/* Visual Superior de la Pantalla */}
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-2xl bg-black/40 shadow-inner">
                        {screen.type === "map" ? (
                          <div className="relative h-full w-full bg-[#181D1A] overflow-hidden flex items-center justify-center">
                            <Image
                              src={screen.image}
                              alt={screen.title}
                              fill
                              sizes="360px"
                              className="object-cover opacity-30 brightness-75 filter blur-[0.5px]"
                            />
                            {/* SVG Radar rings overlay */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 220">
                              <defs>
                                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                                  <stop offset="0%" stopColor="#62B869" stopOpacity="0.35" />
                                  <stop offset="100%" stopColor="#62B869" stopOpacity="0" />
                                </radialGradient>
                              </defs>
                              <circle cx="180" cy="110" r="95" fill="none" stroke="#62B869" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
                              <circle cx="180" cy="110" r="65" fill="none" stroke="#62B869" strokeWidth="1" opacity="0.45" />
                              <circle cx="180" cy="110" r="35" fill="url(#radarGlow)" stroke="#62B869" strokeWidth="1.5" opacity="0.65" />
                              {/* Beacon dots */}
                              <circle cx="130" cy="75" r="4" fill="#F4C430" />
                              <circle cx="230" cy="85" r="5" fill="#62B869" />
                              <circle cx="195" cy="150" r="4.5" fill="#F0822D" />
                              <circle cx="180" cy="110" r="5" fill="#62B869" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2117] via-transparent to-black/35" />
                          </div>
                        ) : (
                          <>
                            <Image
                              src={screen.image}
                              alt={screen.title}
                              fill
                              sizes="360px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              priority={isCenter}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2117] via-transparent to-black/35" />
                          </>
                        )}

                        {/* Badges y Botones superiores sobre la imagen */}
                        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                          <span className="rounded-full bg-black/75 border border-white/20 px-2.5 py-1 text-[10px] font-bold text-[#F4C430] backdrop-blur-md shadow-md">
                            {screen.badge}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {screen.type === "dish" ? (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedDish(FEATURED_TEASER_DISH);
                                  }}
                                  className="flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white shadow backdrop-blur-md hover:bg-white/20 cursor-pointer"
                                  title="Ver detalle"
                                >
                                  <Maximize2 className="h-3.5 w-3.5" />
                                  <span>Ver</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleFavorite("dish-ajiaco-teaser", e)}
                                  className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/20 backdrop-blur-md cursor-pointer ${
                                    favorites["dish-ajiaco-teaser"] ? "bg-[#C84B31] text-white" : "bg-black/70 text-white/80"
                                  }`}
                                >
                                  <Heart className={`h-3.5 w-3.5 ${favorites["dish-ajiaco-teaser"] ? "fill-white" : ""}`} />
                                </button>
                              </>
                            ) : screen.type === "cook" ? (
                              <span className="rounded-full bg-[#62B869]/20 border border-[#62B869]/40 px-2 py-0.5 text-[10px] font-bold text-[#62B869] backdrop-blur-md">
                                Sello Olla Verde
                              </span>
                            ) : screen.type === "buyer" ? (
                              <span className="rounded-full bg-[#C84B31]/20 border border-[#C84B31]/40 px-2 py-0.5 text-[10px] font-bold text-[#FDF3D6] backdrop-blur-md">
                                Pasaporte
                              </span>
                            ) : screen.type === "map" ? (
                              <span className="rounded-full bg-[#62B869]/20 border border-[#62B869]/40 px-2 py-0.5 text-[10px] font-bold text-[#62B869] backdrop-blur-md flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#62B869] animate-ping" />
                                En vivo
                              </span>
                            ) : (
                              <span className="rounded-full bg-[#F4C430]/20 border border-[#F4C430]/40 px-2 py-0.5 text-[10px] font-bold text-[#F4C430] backdrop-blur-md">
                                Oficial
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Métricas destacadas sobre la foto */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between">
                          <span className="text-2xl sm:text-3xl font-black text-[#F4C430] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                            {screen.overlayMetric}
                          </span>
                          <span className="rounded-full bg-black/70 border border-white/20 px-2.5 py-1 text-[10px] font-bold text-[#FAF3E7] shadow-md uppercase tracking-wider backdrop-blur-md">
                            {screen.overlaySub}
                          </span>
                        </div>
                      </div>

                      {/* Datos de la Pantalla */}
                      <div className="mt-3 text-left">
                        <div className="flex items-center justify-between text-[10px] text-[#FAF3E7]/70 font-mono">
                          <span className="font-bold text-[#F0822D]">{screen.categoryTag}</span>
                          <span className="text-[#F4C430] font-bold">{index + 1} / {CAROUSEL_SCREENS.length}</span>
                        </div>

                        <h3 className={`${SERIF} text-lg sm:text-xl font-bold text-[#FAF3E7] line-clamp-1 mt-1`}>
                          {screen.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-[#FAF3E7]/80 line-clamp-1 mt-0.5">
                          {screen.subtitle}
                        </p>

                        {/* Cápsula de Proximidad / Característica Destacada */}
                        <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl border-2 border-[#62B869] bg-gradient-to-r from-[#62B869]/30 via-[#231A12]/95 to-[#2B2117]/95 px-3 py-2.5 shadow-[0_0_25px_rgba(98,184,105,0.45)] ring-1 ring-[#62B869]/40">
                          <div className="flex items-center gap-2.5">
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#62B869] shadow-[0_0_12px_rgba(98,184,105,0.8)] shrink-0">
                              {screen.type === "map" || screen.type === "dish" ? (
                                <>
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#62B869] opacity-75" />
                                  <MapPin className="relative h-4.5 w-4.5 fill-[#2B2117] text-[#FAF3E7] animate-bounce shrink-0" />
                                </>
                              ) : screen.type === "cook" ? (
                                <ChefHat className="h-4.5 w-4.5 text-[#2B2117]" />
                              ) : screen.type === "buyer" ? (
                                <ShoppingBag className="h-4.5 w-4.5 text-[#2B2117]" />
                              ) : (
                                <Sparkles className="h-4.5 w-4.5 text-[#2B2117]" />
                              )}
                            </div>

                            <div className="flex flex-col text-left leading-none">
                              <span className="text-[9px] font-mono font-bold text-[#62B869] uppercase tracking-wider">
                                {screen.highlightLabel}
                              </span>
                              <span className="text-sm sm:text-base font-black text-[#FAF3E7] tracking-tight mt-0.5">
                                {screen.highlightValue}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 rounded-full bg-black/75 border border-[#F4C430]/60 px-2.5 py-1 text-xs font-black text-[#F4C430] shadow-md shrink-0">
                            <Clock className="h-3.5 w-3.5 text-[#F4C430]" />
                            <span>{screen.highlightPill}</span>
                          </div>
                        </div>

                        {/* Botón de Acción Principal */}
                        {screen.type === "dish" ? (
                          <button
                            type="button"
                            onClick={(e) => handleOpenAuthPrompt(FEATURED_TEASER_DISH, e)}
                            className="mt-3 w-full rounded-2xl bg-[#F0822D] py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#2B2117] hover:bg-[#F4C430] transition-all shadow-lg hover:shadow-[#F0822D]/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Utensils className="h-4 w-4" />
                            <span>{screen.actionLabel}</span>
                          </button>
                        ) : (
                          <Link
                            href={screen.actionHref || "/"}
                            className="mt-3 w-full rounded-2xl bg-[#F0822D] py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#2B2117] hover:bg-[#F4C430] transition-all shadow-lg hover:shadow-[#F0822D]/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {screen.type === "map" && <MapPin className="h-4 w-4" />}
                            {screen.type === "mascot" && <Sparkles className="h-4 w-4" />}
                            {screen.type === "cook" && <ChefHat className="h-4 w-4" />}
                            {screen.type === "buyer" && <ShoppingBag className="h-4 w-4" />}
                            <span>{screen.actionLabel}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dock Flotante */}
          <div className="flex flex-col items-center gap-1.5 mt-8 sm:mt-10 relative z-30">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#2B2117]/85 px-3 py-1 shadow-lg backdrop-blur-2xl">
              <button
                type="button"
                onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
                disabled={activeIndex === 0}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[#FAF3E7] hover:bg-white/15 disabled:opacity-30"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <div
                onClick={() => {
                  if (currentScreen.type === "dish") {
                    setExpandedDish(FEATURED_TEASER_DISH);
                  } else if (currentScreen.actionHref) {
                    router.push(currentScreen.actionHref);
                  }
                }}
                className="flex items-center gap-2 px-1 cursor-pointer"
              >
                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#F0822D]">
                  <Image src={currentScreen.image} alt={currentScreen.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col text-left leading-none max-w-[130px] sm:max-w-[180px]">
                  <span className="text-xs font-bold text-[#FAF3E7] truncate">{currentScreen.title}</span>
                  <span className="text-[9px] text-[#FAF3E7]/60 truncate">{currentScreen.subtitle}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  if (currentScreen.type === "dish") {
                    handleToggleFavorite("dish-ajiaco-teaser", e);
                  } else {
                    showToast("✨ ¡Sección explorada con éxito!");
                  }
                }}
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  currentScreen.type === "dish" && favorites["dish-ajiaco-teaser"]
                    ? "bg-[#C84B31]/20 text-[#C84B31]"
                    : "bg-white/5 text-white/70"
                }`}
              >
                <Heart
                  className={`h-3 w-3 ${
                    currentScreen.type === "dish" && favorites["dish-ajiaco-teaser"] ? "fill-[#C84B31]" : ""
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveIndex((p) => Math.min(CAROUSEL_SCREENS.length - 1, p + 1))}
                disabled={activeIndex === CAROUSEL_SCREENS.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[#FAF3E7] hover:bg-white/15 disabled:opacity-30"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Paginación */}
            <div className="flex items-center gap-1">
              {CAROUSEL_SCREENS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "w-4 bg-[#F0822D]" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. PILARES DE OLLACERCANA: INSIGNIAS, RESEÑAS, ECONOMÍA Y CONFIANZA       */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-7 sm:mt-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
          
          {/* Card 1: Valor Diferenciador - Sello Olla Verde */}
          <div className="rounded-3xl border-2 border-white/15 bg-gradient-to-b from-[#2B2117]/95 via-[#221811]/95 to-[#18110B]/95 p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:border-[#F4C430]/60 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(244,196,48,0.15)] group">
            <div>
              <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 mb-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4C430]/20 text-[#F4C430]">
                  <Award className="h-4.5 w-4.5 text-[#F4C430]" />
                </div>
                <span className={`${MONO} text-xs font-bold text-[#F4C430] uppercase tracking-wider`}>
                  VALOR DIFERENCIADOR
                </span>
              </div>
              
              <div className="flex items-start gap-3.5 mt-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-[#62B869] bg-[#FAF3E7] p-1 shadow-lg group-hover:scale-105 transition-transform">
                  <Image src="/images/sello_olla_verde.png" alt="Sello Olla Verde" fill className="object-contain" />
                </div>
                <div className="leading-tight">
                  <span className="text-sm sm:text-base font-extrabold text-[#62B869] flex items-center gap-1.5">
                    Sello Olla Verde · 7 PT
                  </span>
                  <span className="text-[11px] font-mono text-[#F4C430] block mt-0.5">
                    Insignia de Excelencia Vecinal
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#FAF3E7]/85 mt-2 leading-relaxed">
                    Premio a cocineras que venden el 100% de sus porciones 7 días seguidos. Cero desperdicio y garantía de comida fresca en el conjunto.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-white/15 flex items-center justify-between text-xs text-[#FAF3E7]/85">
              <span className="flex items-center gap-1 font-semibold">
                <Star className="h-3.5 w-3.5 text-[#F4C430] fill-[#F4C430]" /> Cocineras con 4.8+
              </span>
              <span className="rounded-full bg-[#F4C430]/15 border border-[#F4C430]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#F4C430]">
                ⭐ Sazón Verificada
              </span>
            </div>
          </div>

          {/* Card 2: Reseña Real de Vecino */}
          <div className="rounded-3xl border-2 border-white/15 bg-gradient-to-b from-[#2B2117]/95 via-[#221811]/95 to-[#18110B]/95 p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:border-[#62B869]/60 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(98,184,105,0.15)] group">
            <div>
              <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 mb-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#62B869]/20 text-[#62B869]">
                  <Quote className="h-4.5 w-4.5 text-[#62B869]" />
                </div>
                <span className={`${MONO} text-xs font-bold text-[#62B869] uppercase tracking-wider`}>
                  RESEÑAS DEL BARRIO
                </span>
              </div>
              <p className={`${SERIF} text-sm sm:text-base text-[#FAF3E7] italic leading-relaxed mt-2`}>
                &ldquo;El ajiaco tradicional sabe idéntico al de mi abuela. Llegó humeante y calientito a la portería de la Torre 2 en solo 5 minutos.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#62B869]/20 border border-[#62B869]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#62B869]">
                  ✓ Vecino Verificado
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-[#FAF3E7]/80">
              <span className="font-bold text-[#FAF3E7]">Vecino Comensal · Conjunto San Luis</span>
              <span className="text-sm tracking-widest text-[#F4C430]">★★★★★</span>
            </div>
          </div>

          {/* Card 3: Comparador de Precios */}
          <div className="rounded-3xl border-2 border-white/15 bg-gradient-to-b from-[#2B2117]/95 via-[#221811]/95 to-[#18110B]/95 p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:border-[#62B869]/60 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(98,184,105,0.15)] group">
            <div>
              <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 mb-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#62B869]/20 text-[#62B869]">
                  <TrendingUp className="h-4.5 w-4.5 text-[#62B869]" />
                </div>
                <span className={`${MONO} text-xs font-bold text-[#62B869] uppercase tracking-wider`}>
                  ECONOMÍA DEL BARRIO
                </span>
              </div>

              <div className="space-y-2 text-xs mt-3">
                <div className="flex justify-between items-center bg-black/40 border border-white/10 px-3.5 py-2.5 rounded-xl">
                  <span className="text-[#FAF3E7]/70 text-xs">Domicilio de app tradicional:</span>
                  <span className="line-through text-[#C84B31] font-bold text-xs sm:text-sm">$28k – $38k</span>
                </div>
                <div className="flex justify-between items-center bg-[#62B869]/20 border-2 border-[#62B869] px-3.5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(98,184,105,0.25)]">
                  <span className="text-[#FAF3E7] font-bold text-xs sm:text-sm">OllaCercana (A pie):</span>
                  <span className="text-[#62B869] font-black text-sm sm:text-base">$8k – $18k</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#FAF3E7]/80 mt-3 text-center border-t border-white/15 pt-3 leading-snug">
              Ahorras más del 50% y comes comida casera de verdad sin sobrecostos de entrega.
            </p>
          </div>

          {/* Card 4: Seguridad y Confianza */}
          <div className="rounded-3xl border-2 border-white/15 bg-gradient-to-b from-[#2B2117]/95 via-[#221811]/95 to-[#18110B]/95 p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:border-[#F4C430]/60 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(244,196,48,0.15)] group">
            <div>
              <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 mb-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4C430]/20 text-[#F4C430]">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#F4C430]" />
                </div>
                <span className={`${MONO} text-xs font-bold text-[#F4C430] uppercase tracking-wider`}>
                  CONFIANZA VECINAL
                </span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#FAF3E7]/85 mt-3">
                <li className="flex items-center gap-2">
                  <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#62B869]/20 text-[#62B869] font-bold text-xs">✓</span>
                  <span>Vecinas verificadas en tu conjunto.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#62B869]/20 text-[#62B869] font-bold text-xs">✓</span>
                  <span>Paga directo al recibir en portería.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#62B869]/20 text-[#62B869] font-bold text-xs">✓</span>
                  <span>Sin comisiones abusivas a cocineras.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-white/15 text-xs font-mono font-bold text-[#F4C430] text-center">
              100% Comunitario y Hecho en el Barrio
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ¿QUÉ PUEDES HACER EN OLLACERCANA? (COMPRADOR VS COCINERA)               */}
      {/* ========================================================================= */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-white/10">
        <div className="text-center mb-6">
          <p className={`${MONO} text-[10px] font-bold tracking-[0.25em] text-[#F4C430] uppercase mb-1`}>
            GUÍA DE LA COMUNIDAD · CERO COMPLICACIONES
          </p>
          <h3 className={`${SERIF} text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF3E7]`}>
            ¿Cómo se vive <span style={{ color: ORANGE }}>OllaCercana</span>?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#FAF3E7]/80 max-w-xl mx-auto">
            Elige tu rol en el barrio para ver todo lo que puedes hacer en la aplicación:
          </p>

          {/* Toggle de Rol (Comprador vs Cocinera) */}
          <div className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-black/40 p-1 shadow-lg backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setActiveRole("comprador")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeRole === "comprador"
                  ? "bg-[#F0822D] text-[#2B2117] shadow-md scale-105"
                  : "text-[#FAF3E7]/80 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Como Comprador</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("cocinera")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeRole === "cocinera"
                  ? "bg-[#62B869] text-[#2B2117] shadow-md scale-105"
                  : "text-[#FAF3E7]/80 hover:text-white"
              }`}
            >
              <ChefHat className="h-4 w-4" />
              <span>Como Cocinera</span>
            </button>
          </div>
        </div>

        {/* Tarjetas según el rol activo */}
        <AnimatePresence mode="wait">
          {activeRole === "comprador" ? (
            <motion.div
              key="comprador-guide"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {/* Tarjeta 1: Menú */}
              <div className="rounded-2xl border border-white/15 bg-[#2B2117]/85 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0822D]/20 border border-[#F0822D]/50 text-[#F0822D] mb-3">
                    <Soup className="h-5 w-5" />
                  </div>
                  <span className={`${MONO} text-[10px] font-bold text-[#F4C430] uppercase tracking-wider`}>
                    1. EN EL MENÚ DEL DÍA
                  </span>
                  <h4 className="text-base font-bold text-[#FAF3E7] mt-1">Explora & Aparta tu Porción</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-[#FAF3E7]/80 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F0822D] mt-0.5">•</span>
                      <span>Descubre platos caseros reales a 500m – 2km de tu edificio o conjunto.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F0822D] mt-0.5">•</span>
                      <span><strong>Aparta en 1 toque</strong>: tienes 10 minutos de reserva garantizada sin tarjetas ni pagos por adelantado.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F0822D] mt-0.5">•</span>
                      <span>Filtra por sopas, almuerzos, vegetariano, postres y platos sin gluten.</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/menu"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#F0822D]/50 bg-[#F0822D]/10 py-2 text-xs font-bold text-[#F0822D] hover:bg-[#F0822D] hover:text-[#2B2117] transition-all"
                >
                  <span>Explorar el Menú</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Tarjeta 2: Mapa */}
              <div className="rounded-2xl border border-white/15 bg-[#2B2117]/85 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#62B869]/20 border border-[#62B869]/50 text-[#62B869] mb-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className={`${MONO} text-[10px] font-bold text-[#62B869] uppercase tracking-wider`}>
                    2. EN EL MAPA DE COCINERAS
                  </span>
                  <h4 className="text-base font-bold text-[#FAF3E7] mt-1">Encuentra Quién Cocina Cerca</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-[#FAF3E7]/80 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#62B869] mt-0.5">•</span>
                      <span>Mira en el mapa las ollas activas alrededor de tu ubicación actual.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#62B869] mt-0.5">•</span>
                      <span>Calcula tus minutos a pie (ej. 4 min caminando a la portería de al lado).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#62B869] mt-0.5">•</span>
                      <span>Privacidad total: solo ves el conjunto o barrio, nunca direcciones privadas.</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/cocineras-cercanas"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#62B869]/50 bg-[#62B869]/10 py-2 text-xs font-bold text-[#62B869] hover:bg-[#62B869] hover:text-[#2B2117] transition-all"
                >
                  <span>Abrir Mapa Cercano</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Tarjeta 3: Perfil y Pago */}
              <div className="rounded-2xl border border-white/15 bg-[#2B2117]/85 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4C430]/20 border border-[#F4C430]/50 text-[#F4C430] mb-3">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className={`${MONO} text-[10px] font-bold text-[#F4C430] uppercase tracking-wider`}>
                    3. EN TU PERFIL & PEDIDOS
                  </span>
                  <h4 className="text-base font-bold text-[#FAF3E7] mt-1">Coordina, Recoge & Paga</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-[#FAF3E7]/80 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F4C430] mt-0.5">•</span>
                      <span>Habla con tu vecina por el chat interno para acordar el encuentro en portería.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F4C430] mt-0.5">•</span>
                      <span><strong>Paga al recibir</strong>: efectivo, Nequi o Daviplata directo, sin intermediarios.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F4C430] mt-0.5">•</span>
                      <span>Califica la sazón de la vecina y guarda tus cocineras favoritas del barrio.</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/cuenta/reservas"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#F4C430]/50 bg-[#F4C430]/10 py-2 text-xs font-bold text-[#F4C430] hover:bg-[#F4C430] hover:text-[#2B2117] transition-all"
                >
                  <span>Ver Mis Reservas</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cocinera-guide"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {/* Tarjeta Cocinera 1: Publicar */}
              <div className="rounded-2xl border border-white/15 bg-[#2B2117]/85 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#62B869]/20 border border-[#62B869]/50 text-[#62B869] mb-3">
                    <Flame className="h-5 w-5" />
                  </div>
                  <span className={`${MONO} text-[10px] font-bold text-[#62B869] uppercase tracking-wider`}>
                    1. EN TU COCINA / PUBLICAR
                  </span>
                  <h4 className="text-base font-bold text-[#FAF3E7] mt-1">Comparte lo que Sobró</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-[#FAF3E7]/80 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#62B869] mt-0.5">•</span>
                      <span>¿Cocinaste de más? Sube foto, porciones y precio ($8k-$18k) en 1 minuto.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#62B869] mt-0.5">•</span>
                      <span><strong>Frescura automática</strong>: tu plato expira a las 4 horas para que no cocines bajo presión.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#62B869] mt-0.5">•</span>
                      <span>Monetiza los sobrantes de tu cocina sin montar un negocio formal.</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/cuenta/cocina"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#62B869]/50 bg-[#62B869]/10 py-2 text-xs font-bold text-[#62B869] hover:bg-[#62B869] hover:text-[#2B2117] transition-all"
                >
                  <span>Publicar un Plato</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Tarjeta Cocinera 2: Reservas */}
              <div className="rounded-2xl border border-white/15 bg-[#2B2117]/85 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0822D]/20 border border-[#F0822D]/50 text-[#F0822D] mb-3">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className={`${MONO} text-[10px] font-bold text-[#F4C430] uppercase tracking-wider`}>
                    2. GESTIÓN DE RESERVAS
                  </span>
                  <h4 className="text-base font-bold text-[#FAF3E7] mt-1">Confirmación sin Fricción</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-[#FAF3E7]/80 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F0822D] mt-0.5">•</span>
                      <span>Cuando un vecino aparta, tienes ~10 minutos para confirmar con un toque.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F0822D] mt-0.5">•</span>
                      <span>Si no puedes despachar, la porción se libera sola sin penalizaciones.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F0822D] mt-0.5">•</span>
                      <span>Coordina la hora de recogida en la portería de tu conjunto por el chat.</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/cuenta/reservas"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#F0822D]/50 bg-[#F0822D]/10 py-2 text-xs font-bold text-[#F0822D] hover:bg-[#F0822D] hover:text-[#2B2117] transition-all"
                >
                  <span>Gestionar Reservas</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Tarjeta Cocinera 3: Cobro y Olla Verde */}
              <div className="rounded-2xl border border-white/15 bg-[#2B2117]/85 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4C430]/20 border border-[#F4C430]/50 text-[#F4C430] mb-3">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className={`${MONO} text-[10px] font-bold text-[#F4C430] uppercase tracking-wider`}>
                    3. INSIGNIAS & REPUTACIÓN
                  </span>
                  <h4 className="text-base font-bold text-[#FAF3E7] mt-1">Gana el Sello Olla Verde</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-[#FAF3E7]/80 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F4C430] mt-0.5">•</span>
                      <span><strong>0% comisiones de plataforma</strong>: todo el dinero de tus vecinos va a tu cuenta.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F4C430] mt-0.5">•</span>
                      <span>Gana el sello <strong>Olla Verde</strong> por vender todas tus porciones 7 días consecutivos.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#F4C430] mt-0.5">•</span>
                      <span>Gana clientes recurrentes que aman la buena sazón de hogar.</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/cuenta/perfil"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#F4C430]/50 bg-[#F4C430]/10 py-2 text-xs font-bold text-[#F4C430] hover:bg-[#F4C430] hover:text-[#2B2117] transition-all"
                >
                  <span>Mi Perfil de Cocinera</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 5. CENTRO DE AYUDA INTERACTIVO & PREGUNTAS FRECUENTES                     */}
      {/* ========================================================================= */}
      <section className="relative z-30 max-w-4xl mx-auto px-4 mt-12">
        <div className="rounded-2xl border border-white/15 bg-[#2B2117]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4C430]/20 border border-[#F4C430]/50 text-[#F4C430]">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#FAF3E7]">Centro de Ayuda de OllaCercana</h4>
                <p className="text-xs text-[#FAF3E7]/70">¿Tienes dudas de cómo funciona o pasó algo con tu pedido?</p>
              </div>
            </div>

            <Link
              href="/ayuda"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#F4C430]/60 bg-[#F4C430]/10 px-4 py-1.5 text-xs font-bold text-[#F4C430] hover:bg-[#F4C430] hover:text-[#2B2117] transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Hablar con la Abuelita</span>
            </Link>
          </div>

          {/* Acordeón de Preguntas Frecuentes */}
          <div className="mt-4 space-y-2 text-left">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/5 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-left text-xs sm:text-sm font-bold text-[#FAF3E7] hover:text-[#F4C430] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#F0822D] text-lg font-mono ml-2">
                    {selectedFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {selectedFaq === idx && (
                  <div className="px-3 pb-3 text-xs text-[#FAF3E7]/80 leading-relaxed border-t border-white/5 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#FAF3E7]/60">
            <span>¿Necesitas ayuda adicional con un vecino? Escríbenos a soporte comunitario.</span>
            <Link href="/ayuda" className="font-bold text-[#F0822D] hover:underline">
              Ir a la Guía Paso a Paso →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CIERRE CÁLIDO & RETORNO AL FRAME DE LA ABUELITA COCINANDO               */}
      {/* ========================================================================= */}
      <div className="relative z-30 text-center mt-12 px-4">
        <p className={`${HAND} text-3xl sm:text-4xl text-[#FAF3E7]`}>
          La mejor receta es la que se comparte con el vecino.
        </p>
        
        {/* Este botón regresa suavemente al frame exacto de la abuelita cocinando */}
        <button
          type="button"
          onClick={handleScrollToAbuelitaKitchen}
          className={`${MONO} mt-4 inline-flex items-center gap-2 rounded-xl border border-[#F0822D] bg-[#F0822D] px-6 py-2.5 text-xs font-bold text-[#2B2117] shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Volver a la cocina de la abuelita
        </button>

        <div className={`${MONO} text-[10px] text-[#8A7860] tracking-widest uppercase mt-6`}>
          OllaCercana · Conectando Cocinas Reales en el Barrio
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. MODAL DE AUTENTICACIÓN / REGISTRO AL APARTAR PORCIÓN                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {authPromptDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthPromptDish(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-[#2B2117]/95 p-6 text-center text-[#FAF3E7] shadow-2xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setAuthPromptDish(null)}
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative mx-auto mb-3 h-16 w-16 overflow-hidden rounded-2xl border-2 border-[#F0822D] shadow-lg">
                <Image src={authPromptDish.image} alt={authPromptDish.name} fill className="object-cover" />
              </div>

              <span className={`${MONO} text-[10px] font-bold text-[#F4C430] uppercase tracking-wider`}>
                ¡ESTÁS A UN PASO DE TU COMIDA!
              </span>
              <h3 className={`${SERIF} text-2xl font-bold text-[#FAF3E7] mt-1`}>
                Apartar {authPromptDish.name}
              </h3>
              <p className="mt-2 text-xs text-[#FAF3E7]/80 leading-relaxed">
                Para guardar tu porción por 10 minutos y coordinar la entrega en portería con {authPromptDish.cook}, inicia sesión o crea tu cuenta de vecino:
              </p>

              <div className="mt-5 space-y-2.5">
                <Link
                  href="/cuenta"
                  onClick={() => setAuthPromptDish(null)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F0822D] py-3 text-xs font-bold text-[#2B2117] hover:bg-[#F4C430] transition-colors shadow-md"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Link>
                <Link
                  href="/cuenta/registro"
                  onClick={() => setAuthPromptDish(null)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 text-xs font-bold text-[#FAF3E7] hover:bg-white/10 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Crear Cuenta de Vecino</span>
                </Link>
              </div>

              <p className={`${MONO} text-[10px] text-[#FAF3E7]/60 mt-4`}>
                Precio: {authPromptDish.price} · Se paga al recibir en portería
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 8. MODAL EXPANDIDO DE DETALLES DEL PLATO                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {expandedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedDish(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/20 bg-[#2B2117]/95 p-5 text-left text-[#FAF3E7] shadow-2xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setExpandedDish(null)}
                className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-black/40">
                <Image src={expandedDish.image} alt={expandedDish.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2117] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-[#F4C430]">
                  {expandedDish.badge}
                </span>
                <span className="absolute bottom-3 right-3 text-xl font-black text-[#F4C430]">
                  {expandedDish.price}
                </span>
              </div>

              <div className="mt-4">
                <span className={`${MONO} text-[10px] font-bold text-[#62B869] uppercase`}>
                  {expandedDish.category} · HECHO EN CASA
                </span>
                <h3 className={`${SERIF} text-2xl font-bold text-[#FAF3E7] mt-0.5`}>{expandedDish.name}</h3>

                <div className="mt-3 flex items-center justify-between gap-2.5 rounded-2xl border border-white/15 bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={expandedDish.cookAvatar}
                      alt={expandedDish.cook}
                      width={44}
                      height={44}
                      className="rounded-full border-2 border-[#F0822D]"
                    />
                    <div className="flex flex-col text-xs">
                      <span className="font-bold text-[#FAF3E7] text-sm">{expandedDish.cook}</span>
                      <span className="text-[#FAF3E7]/70 text-[11px]">{expandedDish.cookRole}</span>
                      <span className="text-[#FAF3E7]/90 font-mono text-[11px] mt-0.5">🏢 {expandedDish.residentialComplex}</span>
                    </div>
                  </div>

                  {/* Pin Proximidad Destacado en el Modal */}
                  <div className="flex flex-col items-end gap-1 rounded-xl border border-[#62B869] bg-[#62B869]/20 px-3 py-1.5 shadow-[0_0_15px_rgba(98,184,105,0.25)] shrink-0">
                    <div className="flex items-center gap-1.5 text-[#62B869] font-extrabold text-xs">
                      <MapPin className="h-3.5 w-3.5 fill-[#62B869] text-[#2B2117] animate-bounce" />
                      <span>{expandedDish.distance}</span>
                    </div>
                    <span className="text-[10px] text-[#F4C430] font-mono font-bold flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {expandedDish.walkMinutes} min a pie
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-[#FAF3E7]/85 leading-relaxed">{expandedDish.fullDesc}</p>

                <div className="mt-3 rounded-xl border border-[#F4C430]/30 bg-[#F4C430]/10 p-3">
                  <p className={`${MONO} text-[9px] font-bold text-[#F4C430] uppercase mb-0.5`}>Consejo de la Abuela</p>
                  <p className={`${HAND} text-xl text-[#FDF3D6]`}>&ldquo;{expandedDish.grandmaNote}&rdquo;</p>
                </div>

                <div className="mt-4 flex gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={(e) => {
                      setExpandedDish(null);
                      handleOpenAuthPrompt(expandedDish, e);
                    }}
                    className="flex-1 rounded-xl bg-[#F0822D] py-2.5 text-xs font-bold text-[#2B2117] hover:bg-[#F4C430] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Utensils className="h-4 w-4" />
                    <span>Apartar porción ({expandedDish.price})</span>
                  </button>

                  <Link
                    href="/menu"
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-[#FAF3E7] hover:bg-white/10 flex items-center justify-center"
                  >
                    Ver en Menú
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 9. DRAWER EMERGENTE DE AYUDA                                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {helpDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHelpDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/20 bg-[#2B2117]/95 p-6 text-left text-[#FAF3E7] shadow-2xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setHelpDrawerOpen(false)}
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4C430]/20 border border-[#F4C430]/50 text-[#F4C430]">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#FAF3E7]">Preguntas Frecuentes & Soporte</h3>
                  <p className="text-xs text-[#FAF3E7]/70">Resolvemos tus dudas al instante</p>
                </div>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs font-bold text-[#F4C430]">{faq.q}</p>
                    <p className="mt-1 text-xs text-[#FAF3E7]/80 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/ayuda"
                  className="rounded-xl bg-[#F0822D] py-2.5 text-center text-xs font-bold text-[#2B2117] hover:bg-[#F4C430] transition-colors"
                >
                  Abrir Guía Completa de Ayuda
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-[#2B2117]/95 px-4 py-2 text-xs font-bold text-[#FAF3E7] shadow-2xl backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#F4C430]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
