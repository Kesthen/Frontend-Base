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

const SPATIAL_DISHES: SpatialDish[] = [
  {
    id: "dish-ajiaco",
    name: "Ajiaco Santafereño de Doña Rosa",
    category: "Sopas",
    cook: "Doña Rosa Helena",
    cookId: "dona-rosa",
    cookAvatar: "/images/dona_rosa_mascot.jpg",
    cookRole: "Cocinera tradicional · 35 años en el barrio",
    image: "/images/menu_ajiaco.jpg",
    price: "$18.000",
    rawPrice: 18000,
    rating: "4.9",
    reviewsCount: 124,
    distance: "A 350 m",
    walkMinutes: 4,
    residentialComplex: "Conjunto San Luis",
    portionsLeft: 4,
    badge: "Favorito del Barrio",
    shortDesc: "Tres tipos de papas andinas, pechuga desmechada tierna, guascas y alcaparras.",
    fullDesc:
      "Receta tradicional santafereña preparada a fuego lento durante tres horas en olla gruesa. Combinamos papa criolla que deshace el caldo, papa pastusa y sabanera en tajadas firmes, mazorca tierna y pechuga deshilachada a mano con crema de leche fresca.",
    grandmaNote: "El truco está en que la papa criolla se deshaga solita para espesar el caldo, sin agregar harinas jamás.",
    cookingTime: "Fuego lento 3h 15m",
    dietaryTags: ["Sin Gluten", "100% Casero"],
  },
  {
    id: "dish-bandeja",
    name: "Bandeja Casera con Chicharrón",
    category: "Almuerzos",
    cook: "Don Carlos Arango",
    cookId: "don-carlos",
    cookAvatar: "/images/abuelita_3d_mascot.jpg",
    cookRole: "Maestro del fogón · Vecino Torre 5",
    image: "/images/menu_cazuela.jpg",
    price: "$22.000",
    rawPrice: 22000,
    rating: "4.8",
    reviewsCount: 98,
    distance: "A 600 m",
    walkMinutes: 7,
    residentialComplex: "Torres de Chapinero",
    portionsLeft: 5,
    badge: "Recién Salido",
    shortDesc: "Frijoles cargamanto en olla de barro, chicharrón crocante, plátano maduro y aguacate.",
    fullDesc:
      "Frijoles cargamanto remojados desde la víspera con pezuña y aliño criollo. Acompañados de chicharrón crocante de 12 cortes al punto exacto, carne molida especiada, arroz blanco brillante, tajadas de plátano maduro y aguacate mantequilla recién tajado.",
    grandmaNote: "Un chorrito de panela raspada al hervir los frijoles les da ese color dorado y quita cualquier acidez.",
    cookingTime: "Cocción lenta 4 horas",
    dietaryTags: ["Abundante", "Sabor Paisa"],
  },
  {
    id: "dish-sancocho",
    name: "Sancocho Criollo en Olla de Barro",
    category: "Sopas",
    cook: "Don Luis Fernando",
    cookId: "don-luis",
    cookAvatar: "/images/dona_rosa_mascot.jpg",
    cookRole: "Especialista en leña y caldos",
    image: "/images/olla_dish_1.jpg",
    price: "$19.000",
    rawPrice: 19000,
    rating: "4.9",
    reviewsCount: 112,
    distance: "A 1.1 km",
    walkMinutes: 12,
    residentialComplex: "Residencias Colina",
    portionsLeft: 3,
    badge: "Olla al Carbón",
    shortDesc: "Tres carnes doradas, yuca harinosa de montaña, mazorca dulce y ají casero picadito.",
    fullDesc:
      "Sancocho campesino con gallina criolla, costilla de res tierna y magro de cerdo. Caldo denso aromatizado con cilantro cimarrón, plátano verde quebrado a uña y yuca algodonosa que se disuelve en el paladar.",
    grandmaNote: "El plátano nunca se pica con cuchillo de metal, se quiebra con la mano para no negrear el caldo.",
    cookingTime: "Fuego pausado 3h 40m",
    dietaryTags: ["Sin Lactosa", "Energía Criolla"],
  },
  {
    id: "dish-pollo",
    name: "Pollo Guisado en Salsa Criolla",
    category: "Almuerzos",
    cook: "Doña Marta Cecilia",
    cookId: "dona-marta",
    cookAvatar: "/images/abuelita_3d_hq.jpg",
    cookRole: "Recetas de familia boyacense",
    image: "/images/dish_pollo_chalk.jpg",
    price: "$17.000",
    rawPrice: 17000,
    rating: "4.8",
    reviewsCount: 89,
    distance: "A 800 m",
    walkMinutes: 9,
    residentialComplex: "Conjunto El Rosal",
    portionsLeft: 4,
    badge: "Sin Gluten",
    shortDesc: "Pierna pernil marinada con ahogado de tomate chonto, cebolla junca y papitas criollas.",
    fullDesc:
      "Pollo fresco de campo dorado en sartén de hierro y luego sumergido en abundante hogao de tomate chonto madurado bajo el sol, ajo campesino y cebolla junca picada finita.",
    grandmaNote: "El guiso no se apresura: diez minutos sofriendo la cebolla antes del tomate hacen el milagro del sabor.",
    cookingTime: "Estofado 1h 45m",
    dietaryTags: ["Sin Gluten", "Poco Aceite"],
  },
  {
    id: "dish-lentejas",
    name: "Lentejas de la Huerta con Tajadas",
    category: "Vegetariano",
    cook: "María Elena Gómez",
    cookId: "maria-elena",
    cookAvatar: "/images/dona_rosa_mascot.jpg",
    cookRole: "Cocina consciente y huerta urbana",
    image: "/images/hero_plate_gourmet.jpg",
    price: "$15.000",
    rawPrice: 15000,
    rating: "4.7",
    reviewsCount: 76,
    distance: "A 1.2 km",
    walkMinutes: 14,
    residentialComplex: "Altos del Salitre",
    portionsLeft: 2,
    badge: "100% Vegano",
    shortDesc: "Lentejas estofadas con zanahoria, pimientos asados, arroz blanco suelto y tajadas maduras.",
    fullDesc:
      "Lentejas pardinas cocidas a fuego manso con laurel fresco, pimentón rojo asado, zanahoria en daditos y comino tostado. Viene servida con arroz blanco vaporizado y tajadas doradas.",
    grandmaNote: "Tostar una pizca de comino entero en sartén seca antes de agregarlo al guiso despierta el sabor de la tierra.",
    cookingTime: "Cocción suave 1h 10m",
    dietaryTags: ["Vegano", "Vegetariano"],
  },
  {
    id: "dish-mondongo",
    name: "Mondongo Tradicional de la Abuela",
    category: "Sopas",
    cook: "Doña Rosa Helena",
    cookId: "dona-rosa",
    cookAvatar: "/images/dona_rosa_mascot.jpg",
    cookRole: "Receta transmitida por 3 generaciones",
    image: "/images/olla_dish_2.jpg",
    price: "$18.500",
    rawPrice: 18500,
    rating: "4.9",
    reviewsCount: 94,
    distance: "A 500 m",
    walkMinutes: 6,
    residentialComplex: "Conjunto San Luis",
    portionsLeft: 4,
    badge: "Receta de la Abuela",
    shortDesc: "Papas criollas y pastusas, cerdo tierno, arveja verde y cilantro fresco picado.",
    fullDesc:
      "Mondongo lavado y cocinado minuciosamente con limón y especias andinas. Servido con ahogado casero, arroz blanco suelto, banano dulce y arepa calientica.",
    grandmaNote: "Hervir con cáscara de naranja y hierbabuena le quita cualquier pesadez y deja un aroma delicioso.",
    cookingTime: "Cocción lenta 4h 30m",
    dietaryTags: ["Tradicional", "Energía Criolla"],
  },
  {
    id: "dish-cazuela",
    name: "Cazuela Campesina de Frijol y Plátano",
    category: "Almuerzos",
    cook: "Don Carlos Arango",
    cookId: "don-carlos",
    cookAvatar: "/images/abuelita_3d_mascot.jpg",
    cookRole: "Sabor del campo a la ciudad",
    image: "/images/menu_cazuela.jpg",
    price: "$20.000",
    rawPrice: 20000,
    rating: "4.8",
    reviewsCount: 65,
    distance: "A 700 m",
    walkMinutes: 8,
    residentialComplex: "Torres de Chapinero",
    portionsLeft: 3,
    badge: "Plato Fuerte",
    shortDesc: "Frijoles cargamanto estofados con maíz tierno, carne desmechada y plátano maduro.",
    fullDesc:
      "Una cazuela humeante servida en plato de barro. Incluye frijoles bien sazonados con aliños naturales, trocitos de carne dorada, maíz tierno dulce y plátano frito.",
    grandmaNote: "Dejar reposar 15 minutos fuera del fuego antes de servir para que el caldo espese como crema.",
    cookingTime: "Cocción 3h 20m",
    dietaryTags: ["Abundante", "Sabor de Hogar"],
  },
  {
    id: "dish-arepas",
    name: "Arepas de Choclo con Queso Campesino",
    category: "Almuerzos",
    cook: "Doña Carmen Alicia",
    cookId: "dona-carmen",
    cookAvatar: "/images/dona_rosa_mascot.jpg",
    cookRole: "Experta en maíz de Boyacá",
    image: "/images/olla_dish_2.jpg",
    price: "$8.500",
    rawPrice: 8500,
    rating: "4.9",
    reviewsCount: 160,
    distance: "A 400 m",
    walkMinutes: 5,
    residentialComplex: "Residencias El Carmen",
    portionsLeft: 8,
    badge: "Maíz 100% Fresco",
    shortDesc: "Choclo desgranado al molino de piedra, mantequilla de finca y cuajada fresca dorada.",
    fullDesc:
      "Preparadas artesanalmente cada mañana con choclo tierno molido en casa, panela raspada y mantequilla de vaca. Sobre la plancha de hierro se doran lentamente y se coronan con queso campesino derretido.",
    grandmaNote: "El maíz tierno debe asarse a fuego medio en tiesto de barro con hojas de mazorca para atrapar el aroma.",
    cookingTime: "Asadas al momento 15m",
    dietaryTags: ["Vegetariano", "Sin Conservantes"],
  },
  {
    id: "dish-postre",
    name: "Arroz con Leche de la Tradición",
    category: "Postres",
    cook: "Doña Lucía Vargas",
    cookId: "dona-lucia",
    cookAvatar: "/images/abuelita_3d_mascot.jpg",
    cookRole: "Repostera casera desde 1978",
    image: "/images/menu_postre.jpg",
    price: "$6.000",
    rawPrice: 6000,
    rating: "4.9",
    reviewsCount: 142,
    distance: "A 900 m",
    walkMinutes: 10,
    residentialComplex: "Bosques de Granada",
    portionsLeft: 6,
    badge: "Receta de 1954",
    shortDesc: "Arroz cremoso con astillas de canela criolla, uvas pasas al vapor y raspadura de panela.",
    fullDesc:
      "Arroz cocido en leche pura de vaca con astillas de canela dulce y corteza fina de limón amarillo. Endulzado naturalmente con leche condensada artesanal y una caricia de panela raspada.",
    grandmaNote: "Revolver siempre con cuchara de palo en forma de ocho para que no se pegue ni se ahúme.",
    cookingTime: "Fuego tenue 50m",
    dietaryTags: ["Vegetariano", "Dulce Tradición"],
  },
  {
    id: "dish-natas",
    name: "Postre de Natas Santafereño",
    category: "Postres",
    cook: "Doña Lucía Vargas",
    cookId: "dona-lucia",
    cookAvatar: "/images/abuelita_3d_mascot.jpg",
    cookRole: "Tradición colonial de Bogotá",
    image: "/images/libreton_book_bg.jpg",
    price: "$7.500",
    rawPrice: 7500,
    rating: "4.8",
    reviewsCount: 88,
    distance: "A 900 m",
    walkMinutes: 10,
    residentialComplex: "Bosques de Granada",
    portionsLeft: 5,
    badge: "Sabor Colonial",
    shortDesc: "Capas de nata pura de leche hervida lentamente, almíbar de canela y uvas pasas.",
    fullDesc:
      "El postre insignia de las abuelas bogotanas. Requiere recolectar pacientemente las natas de la leche entera en hervor tenue durante horas, bañadas en un almíbar dorado con clavo y canela.",
    grandmaNote: "La paciencia es todo: recolectar cada nata con cuidado y no apresurar el almíbar.",
    cookingTime: "Elaboración lenta 3h",
    dietaryTags: ["Vegetariano", "Patrimonio Dulce"],
  },
];

const CATEGORIES = ["Todos", "Sopas", "Almuerzos", "Vegetariano", "Postres"] as const;

export default function SpatialCoverflowHero() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  // Inicia en índice 2 (Sancocho Criollo) con platos a ambos lados (izquierda y derecha) según Imagen 3
  const [activeIndex, setActiveIndex] = useState(2);
  const [expandedDish, setExpandedDish] = useState<SpatialDish | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({ "dish-ajiaco": true });
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

  // Platos filtrados
  const filteredDishes = SPATIAL_DISHES.filter((dish) => {
    if (activeCategory === "Todos") return true;
    return dish.category === activeCategory;
  });

  useEffect(() => {
    if (activeIndex >= filteredDishes.length) {
      setActiveIndex(Math.max(0, filteredDishes.length - 1));
    }
  }, [activeCategory, filteredDishes.length, activeIndex]);

  const currentDish = filteredDishes[activeIndex] || filteredDishes[0];

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
      else if (diff < 0 && activeIndex < filteredDishes.length - 1) setActiveIndex((p) => p + 1);
      setIsDragging(false);
    }
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => setDragStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0 && activeIndex > 0) setActiveIndex((p) => p - 1);
      else if (diff < 0 && activeIndex < filteredDishes.length - 1) setActiveIndex((p) => p + 1);
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
          <span>El fogón de Doña Rosa está servido · Conoce las ollas del barrio</span>
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

        {/* Filtros de Categoría: Posición natural bajo el título con z-40 para interacción garantizada */}
        <div className="mt-4 mb-0 flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 backdrop-blur-xl shadow-xl max-w-fit mx-auto relative z-40 pointer-events-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setActiveIndex(cat === "Todos" ? 2 : 0);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#F0822D] text-[#2B2117] shadow-md shadow-[#F0822D]/30 scale-105"
                  : "border border-white/10 bg-white/5 text-[#FAF3E7]/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              {cat === "Todos" && `✨ Todos (${SPATIAL_DISHES.length})`}
              {cat === "Sopas" && "🍲 Sopas"}
              {cat === "Almuerzos" && "🍛 Almuerzos"}
              {cat === "Vegetariano" && "🥗 Vegetariano"}
              {cat === "Postres" && "🍮 Postres"}
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
              {filteredDishes.map((dish, index) => {
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
                    key={dish.id}
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
                      {/* Foto del Plato (Más grande y apetecible) */}
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-2xl bg-black/40 shadow-inner">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          sizes="360px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={isCenter}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2117] via-transparent to-black/35" />

                        {/* Botones y Badges sobre la foto */}
                        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                          <span className="rounded-full bg-black/70 border border-[#F4C430]/40 px-2.5 py-1 text-[10px] font-bold text-[#F4C430] backdrop-blur-md shadow-md">
                            {dish.badge}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedDish(dish);
                              }}
                              className="flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white shadow backdrop-blur-md hover:bg-white/20 cursor-pointer"
                              title="Ver detalle"
                            >
                              <Maximize2 className="h-3.5 w-3.5" />
                              <span>Ver</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleToggleFavorite(dish.id, e)}
                              className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/20 backdrop-blur-md cursor-pointer ${
                                favorites[dish.id] ? "bg-[#C84B31] text-white" : "bg-black/70 text-white/80"
                              }`}
                            >
                              <Heart className={`h-3.5 w-3.5 ${favorites[dish.id] ? "fill-white" : ""}`} />
                            </button>
                          </div>
                        </div>

                        {/* Precio, Porciones y Pin destacado sobre la foto */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between">
                          <span className="text-2xl sm:text-3xl font-black text-[#F4C430] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                            {dish.price}
                          </span>
                          <span className="rounded-full bg-[#62B869] px-2.5 py-1 text-[10px] font-black text-[#2B2117] shadow-md uppercase tracking-wider">
                            {dish.portionsLeft} porciones
                          </span>
                        </div>
                      </div>

                      {/* Datos del Plato */}
                      <div className="mt-3 text-left">
                        <div className="flex items-center justify-between text-[10px] text-[#FAF3E7]/70 font-mono">
                          <span className="font-bold text-[#F0822D]">{dish.category.toUpperCase()} · HECHO EN CASA</span>
                          <span className="text-[#F4C430] font-bold">{index + 1} / {filteredDishes.length}</span>
                        </div>

                        <h3 className={`${SERIF} text-lg sm:text-xl font-bold text-[#FAF3E7] line-clamp-1 mt-1`}>
                          {dish.name}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-[#FAF3E7]/80 line-clamp-1 mt-0.5">
                          {dish.cook} · {dish.residentialComplex}
                        </p>

                        {/* =================================================================== */}
                        {/* PIN DESTACADO: CÁPSULA LUMINOSA DE PROXIMIDAD HIPER-LOCAL           */}
                        {/* =================================================================== */}
                        <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl border-2 border-[#62B869] bg-gradient-to-r from-[#62B869]/30 via-[#231A12]/95 to-[#2B2117]/95 px-3 py-2.5 shadow-[0_0_25px_rgba(98,184,105,0.45)] ring-1 ring-[#62B869]/40">
                          <div className="flex items-center gap-2.5">
                            {/* Radar Beacon Pin */}
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#62B869] shadow-[0_0_12px_rgba(98,184,105,0.8)] shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#62B869] opacity-75" />
                              <MapPin className="relative h-4.5 w-4.5 fill-[#2B2117] text-[#FAF3E7] animate-bounce shrink-0" />
                            </div>
                            
                            <div className="flex flex-col text-left leading-none">
                              <span className="text-[9px] font-mono font-bold text-[#62B869] uppercase tracking-wider">
                                📍 CERCA A TI
                              </span>
                              <span className="text-sm sm:text-base font-black text-[#FAF3E7] tracking-tight mt-0.5">
                                {dish.distance}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 rounded-full bg-black/75 border border-[#F4C430]/60 px-2.5 py-1 text-xs font-black text-[#F4C430] shadow-md shrink-0">
                            <Clock className="h-3.5 w-3.5 text-[#F4C430]" />
                            <span>{dish.walkMinutes} min a pie</span>
                          </div>
                        </div>

                        {/* Botón Apartar Porción: Abre Modal de Iniciar Sesión / Registro */}
                        <button
                          type="button"
                          onClick={(e) => handleOpenAuthPrompt(dish, e)}
                          className="mt-3 w-full rounded-2xl bg-[#F0822D] py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#2B2117] hover:bg-[#F4C430] transition-all shadow-lg hover:shadow-[#F0822D]/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Utensils className="h-4 w-4" />
                          <span>Apartar porción</span>
                        </button>
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

              <div onClick={() => setExpandedDish(currentDish)} className="flex items-center gap-2 px-1 cursor-pointer">
                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#F0822D]">
                  <Image src={currentDish.image} alt={currentDish.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col text-left leading-none max-w-[130px] sm:max-w-[180px]">
                  <span className="text-xs font-bold text-[#FAF3E7] truncate">{currentDish.name}</span>
                  <span className="text-[9px] text-[#FAF3E7]/60 truncate">{currentDish.cook} · {currentDish.price}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleToggleFavorite(currentDish.id, e)}
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  favorites[currentDish.id] ? "bg-[#C84B31]/20 text-[#C84B31]" : "bg-white/5 text-white/70"
                }`}
              >
                <Heart className={`h-3 w-3 ${favorites[currentDish.id] ? "fill-[#C84B31]" : ""}`} />
              </button>

              <button
                type="button"
                onClick={() => setActiveIndex((p) => Math.min(filteredDishes.length - 1, p + 1))}
                disabled={activeIndex === filteredDishes.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[#FAF3E7] hover:bg-white/15 disabled:opacity-30"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Paginación */}
            <div className="flex items-center gap-1">
              {filteredDishes.map((_, i) => (
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

      {/* ========================================================================= */}
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
                &ldquo;El ajiaco de Doña Rosa sabe idéntico al de mi abuela. Llegó humeante y calientito a la portería de la Torre 2 en solo 5 minutos.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#62B869]/20 border border-[#62B869]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#62B869]">
                  ✓ Vecino Verificado
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-[#FAF3E7]/80">
              <span className="font-bold text-[#FAF3E7]">Carlos M. · Conjunto San Luis</span>
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
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F0822D] py-3 text-xs font-bold text-[#2B2117] hover:bg-[#F4C430] transition-colors shadow-md"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Link>
                <Link
                  href="/cuenta/registro"
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
