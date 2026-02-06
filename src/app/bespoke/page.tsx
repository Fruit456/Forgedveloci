"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";

// ============================================================================
// TYPES
// ============================================================================
type Phase = "intro" | "vehicle" | "architecture" | "surface" | "dimensions" | "reserve";

interface VehicleData {
    make: string;
    model: string;
    year: string;
}

interface WheelConfig {
    architecture: string | null;
    finish: string | null;
    frontSize: string | null;
    rearSize: string | null;
}

// ============================================================================
// DATA
// ============================================================================
const ARCHITECTURES = [
    {
        id: "MONOBLOCK",
        name: "Monoblock",
        tagline: "Pure Performance",
        description: "Smidd i ett enda stycke från flygplansaluminium 6061-T6. Maximal styvhet, minimal vikt.",
        specs: ["Vikt från 8.2kg", "Max last 900kg", "Flow-formed", "Superconcave"],
        image: "/wheel_monoblock_v2.png",
        startPrice: 3850
    },
    {
        id: "TWOPIECE",
        name: "2-Piece",
        tagline: "Infinite Possibilities",
        description: "Split-rim konstruktion med synliga titanium-bultar. Djup dish och oändliga anpassningsmöjligheter.",
        specs: ["Anpassad offset", "Deep dish", "Polerad läpp"],
        image: "/wheel_twopiece_v2.png",
        startPrice: 4800
    },
    {
        id: "BEADLOCK",
        name: "Beadlock",
        tagline: "Off-Road Ready",
        description: "Beadlock-ring för extrema förhållanden. Säkrar däcket vid lågt lufttryck för offroad och racing.",
        specs: ["True beadlock", "Racing-spec", "Lågtryckskapabel"],
        image: "/wheel_beadlock_v2.png",
        startPrice: 4800
    },
    {
        id: "AERODISC",
        name: "Aerodisc",
        tagline: "The Future",
        description: "Aerodynamisk disc-design för ultimat prestanda. Kolfiber-ytbehandling, hypercar-estetik.",
        specs: ["Aero-optimerad", "Kolfiber", "Hypercar-stil"],
        image: "/wheel_aerodisc_v2.png",
        startPrice: 10850, // Monoblock base + 7000kr aerodisc
        isAerodisc: true
    }
];

const FINISHES = [
    // Standard lack - Ingen extra kostnad (12 vanliga färger)
    { id: "GLOSS_BLACK", name: "Gloss Svart", hex: "#0a0a0a", type: "Standard", price: 0 },
    { id: "SATIN_BLACK", name: "Satin Svart", hex: "#1a1a1a", type: "Standard", price: 0 },
    { id: "GUNMETAL", name: "Gunmetal", hex: "#3d3d3d", type: "Standard", price: 0 },
    { id: "ANTHRACITE", name: "Anthracite", hex: "#2b2b2b", type: "Standard", price: 0 },
    { id: "SILVER", name: "Silver", hex: "#c0c0c0", type: "Standard", price: 0 },
    { id: "WHITE", name: "Vit", hex: "#f5f5f5", type: "Standard", price: 0 },
    { id: "BRONZE", name: "Bronze", hex: "#8B6914", type: "Standard", price: 0 },
    { id: "GOLD", name: "Guld", hex: "#D4AF37", type: "Standard", price: 0 },
    { id: "RED", name: "Röd", hex: "#8B0000", type: "Standard", price: 0 },
    { id: "BLUE", name: "Blå", hex: "#1a237e", type: "Standard", price: 0 },
    { id: "BRITISH_GREEN", name: "British Racing Green", hex: "#004225", type: "Standard", price: 0 },
    { id: "PURPLE", name: "Midnight Purple", hex: "#2E1A47", type: "Standard", price: 0 },
    // Premium finishes
    { id: "BRUSHED", name: "Borstad", hex: "#a8a8a8", type: "Premium", price: 2000 },
    { id: "POLISHED", name: "Polerad", hex: "#e8e8e8", type: "Premium", price: 2000 },
];

// Pris per fälg baserat på diameter och arkitektur
const MONOBLOCK_PRICES: { [key: number]: number } = {
    17: 3850,
    18: 4050,
    19: 4690,
    20: 4870,
    21: 4990,
    22: 5230,
    23: 5670,
    24: 6075
};

const TWOPIECE_PRICES: { [key: number]: number } = {
    18: 4800,
    19: 4999,
    20: 5349,
    21: 5599,
    22: 5899,
    23: 6120,
    24: 6349
};

// Aerodisc = Monoblock pris + 7000kr per fälg
const AERODISC_SURCHARGE = 7000;

// Beadlock = samma pris som 2-piece
const BEADLOCK_PRICES = TWOPIECE_PRICES;

// Get price based on architecture and diameter
function getWheelPrice(architecture: string, diameter: number): number {
    switch (architecture) {
        case "MONOBLOCK":
            return MONOBLOCK_PRICES[diameter] || 0;
        case "TWOPIECE":
        case "BEADLOCK":
            return TWOPIECE_PRICES[diameter] || 0;
        case "AERODISC":
            return (MONOBLOCK_PRICES[diameter] || 0) + AERODISC_SURCHARGE;
        default:
            return MONOBLOCK_PRICES[diameter] || 0;
    }
}

// Get available diameters for architecture
function getAvailableDiameters(architecture: string): number[] {
    if (architecture === "TWOPIECE" || architecture === "BEADLOCK") {
        return [18, 19, 20, 21, 22, 23, 24]; // No 17" for 2-piece/beadlock
    }
    return [17, 18, 19, 20, 21, 22, 23, 24];
}

const WIDTHS = [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0];
const ET_VALUES = [15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function BespokeAtelier() {
    const [phase, setPhase] = useState<Phase>("intro");
    const [vehicle, setVehicle] = useState<VehicleData | null>(null);
    const [config, setConfig] = useState<WheelConfig>({
        architecture: null,
        finish: null,
        frontSize: null,
        rearSize: null
    });
    const [regInput, setRegInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    // Auto-advance from intro after delay
    useEffect(() => {
        if (showIntro) {
            // Check if mobile (width < 768px)
            const isMobile = window.innerWidth < 768;
            const delay = isMobile ? 0 : 1500; // 0ms delay on mobile, 1.5s on desktop

            const timer = setTimeout(() => {
                setShowIntro(false);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [showIntro]);

    const handleVehicleSearch = async () => {
        if (!regInput || regInput.length < 3) return;
        setIsSearching(true);
        // Simulate brief validation
        await new Promise(r => setTimeout(r, 600));

        // We just store the reg number as "verified" without external data
        setVehicle({
            make: "Fordon",
            model: "Registrerat",
            year: ""
        });
        setIsSearching(false);
    };

    const goToPhase = (p: Phase) => setPhase(p);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#C8AA6E] selection:text-black">

            {/* CINEMATIC INTRO OVERLAY */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black hidden md:flex items-center justify-center cursor-pointer"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        onClick={() => setShowIntro(false)} // Tap to skip
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="mb-6"
                            >
                                <Image
                                    src="/LOGOvit.png"
                                    alt="ForgedVeloci"
                                    width={200}
                                    height={120}
                                    className="w-40 md:w-56 h-auto"
                                />
                            </motion.div>
                            <motion.div
                                className="text-white/50 text-sm md:text-lg tracking-[0.5em] uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                            >
                                Bespoke Atelier
                            </motion.div>
                            <motion.div
                                className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-[#C8AA6E] to-transparent w-48 md:w-64"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ delay: 2, duration: 1 }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C8AA6E]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C8AA6E]/5 blur-[200px] rounded-full" />
            </div>

            {/* HEADER */}
            <Header />

            {/* MAIN CONTENT */}
            <main className="relative z-10">
                <AnimatePresence mode="wait">

                    {/* PHASE: INTRO / HERO */}
                    {phase === "intro" && !showIntro && (
                        <HeroPhase onStart={() => goToPhase("vehicle")} />
                    )}

                    {/* PHASE: VEHICLE */}
                    {phase === "vehicle" && (
                        <VehiclePhase
                            regInput={regInput}
                            setRegInput={setRegInput}
                            onNext={() => goToPhase("architecture")}
                            onBack={() => goToPhase("intro")}
                        />
                    )}

                    {/* PHASE: ARCHITECTURE */}
                    {phase === "architecture" && (
                        <ArchitecturePhase
                            selected={config.architecture}
                            onSelect={(id) => {
                                setConfig({ ...config, architecture: id });
                                setTimeout(() => goToPhase("surface"), 300);
                            }}
                            onBack={() => goToPhase("vehicle")}
                        />
                    )}

                    {/* PHASE: SURFACE */}
                    {phase === "surface" && (
                        <SurfacePhase
                            selected={config.finish}
                            onSelect={(id) => {
                                setConfig({ ...config, finish: id });
                                setTimeout(() => goToPhase("dimensions"), 300);
                            }}
                            onBack={() => goToPhase("architecture")}
                        />
                    )}

                    {/* PHASE: DIMENSIONS */}
                    {phase === "dimensions" && (
                        <DimensionsPhase
                            architecture={config.architecture}
                            frontSize={config.frontSize}
                            rearSize={config.rearSize}
                            onSelect={(front, rear) => {
                                setConfig({ ...config, frontSize: front, rearSize: rear });
                            }}
                            onNext={() => goToPhase("reserve")}
                            onBack={() => goToPhase("surface")}
                        />
                    )}

                    {/* PHASE: RESERVE */}
                    {phase === "reserve" && (
                        <ReservePhase
                            regNumber={regInput}
                            config={config}
                            onBack={() => goToPhase("dimensions")}
                        />
                    )}

                </AnimatePresence>
            </main>

            {/* PROGRESS INDICATOR */}
            {phase !== "intro" && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                    {["vehicle", "architecture", "surface", "dimensions", "reserve"].map((p, i) => (
                        <div
                            key={p}
                            className={`w-8 h-1 rounded-full transition-all duration-500 ${["vehicle", "architecture", "surface", "dimensions", "reserve"].indexOf(phase) >= i
                                ? "bg-[#C8AA6E]"
                                : "bg-white/20"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ============================================================================
// PHASE COMPONENTS
// ============================================================================

function HeroPhase({ onStart }: { onStart: () => void }) {
    return (
        <motion.section
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative"
        >
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
                {/* Mobile Static Image */}
                <div className="absolute inset-0 md:hidden">
                    <Image
                        src="/video-poster.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                </div>

                {/* Desktop Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hidden md:block w-full h-full object-cover opacity-30"
                    poster="/video-poster.jpg"
                >
                    <source src="/Luxury_Automotive_Commercial_Generated.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.p
                    className="text-[#C8AA6E] text-sm tracking-[0.4em] uppercase mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Bespoke Wheel Manufacturing
                </motion.p>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-[0.9] mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Your Vision.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8AA6E] to-[#8B7355]">
                        Forged Reality.
                    </span>
                </motion.h1>

                <motion.p
                    className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Varje hjul vi skapar är en unik komposition av precision, material och personlighet.
                    Inga kompromisser. Ingen massproduktion. Bara perfektion.
                </motion.p>

                <motion.button
                    onClick={onStart}
                    className="group relative px-12 py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-[0.2em] overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Påbörja Din Design
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>

                <motion.div
                    className="mt-16 flex items-center justify-center gap-12 text-white/40 text-xs uppercase tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <span>6-8 Veckors Produktion</span>
                    <span className="w-1 h-1 rounded-full bg-[#C8AA6E]" />
                    <span>Handtillverkad</span>
                    <span className="w-1 h-1 rounded-full bg-[#C8AA6E]" />
                    <span>Limiterad Produktion</span>
                </motion.div>
            </div>
        </motion.section>
    );
}

function VehiclePhase({
    regInput,
    setRegInput,
    onNext,
    onBack
}: {
    regInput: string;
    setRegInput: (v: string) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const handleContinue = () => {
        if (regInput.length >= 2) {
            onNext();
        }
    };

    return (
        <motion.section
            key="vehicle"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center px-8 py-24 md:py-32"
        >
            <div className="max-w-3xl w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/40 hover:text-white text-sm uppercase tracking-widest mb-12 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Tillbaka
                </button>

                <span className="text-[#C8AA6E] text-xs tracking-[0.4em] uppercase block mb-4">Steg 01 / 05</span>
                <h2 className="text-4xl md:text-6xl font-display uppercase mb-4">Ditt Fordon</h2>
                <p className="text-white/50 text-lg mb-12 max-w-xl">
                    Ange ditt registreringsnummer för att fortsätta.
                </p>

                <div className="space-y-8">
                    <div className="relative">
                        <input
                            type="text"
                            value={regInput}
                            onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                            placeholder="ABC 123"
                            maxLength={7}
                            className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#C8AA6E] py-6 text-4xl md:text-6xl font-mono text-white placeholder-white/10 outline-none transition-colors uppercase tracking-[0.3em] text-center"
                            autoFocus
                        />
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={regInput.length < 2}
                        className="w-full py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Fortsätt till Design
                    </button>
                </div>
            </div>
        </motion.section>
    );
}

function ArchitecturePhase({
    selected,
    onSelect,
    onBack
}: {
    selected: string | null;
    onSelect: (id: string) => void;
    onBack: () => void;
}) {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <motion.section
            key="architecture"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex flex-col px-8 py-24 md:py-32"
        >
            <div className="max-w-[1800px] mx-auto w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/40 hover:text-white text-sm uppercase tracking-widest mb-12 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Tillbaka
                </button>

                <span className="text-[#C8AA6E] text-xs tracking-[0.4em] uppercase block mb-4">Steg 02 / 05</span>
                <h2 className="text-4xl md:text-6xl font-display uppercase mb-4">Arkitektur</h2>
                <p className="text-white/50 text-lg mb-4 max-w-xl">
                    Välj konstruktionen som definierar din hjuluppsättning.
                </p>
                <p className="text-white/30 text-sm italic mb-8 max-w-xl">
                    Visade designer är inspiration — varje hjul skapas unikt efter din vision.
                </p>

                {/* Bespoke Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 p-6 border border-[#C8AA6E]/20 bg-gradient-to-r from-[#C8AA6E]/5 to-transparent"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#C8AA6E]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#C8AA6E] text-lg">✦</span>
                        </div>
                        <div>
                            <h4 className="text-white font-display uppercase tracking-wide mb-2">Inga gränser</h4>
                            <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                                Designerna du ser är endast startpunkter. Våra ingenjörer arbetar med dig för att skapa exakt det du drömmer om — från spoke-mönster till unika detaljer. Allt är möjligt.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-4">
                    {ARCHITECTURES.map((arch, i) => (
                        <motion.button
                            key={arch.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => onSelect(arch.id)}
                            onMouseEnter={() => setHovered(arch.id)}
                            onMouseLeave={() => setHovered(null)}
                            className={`group relative h-full flex flex-col border transition-all duration-500 text-left bg-zinc-900/50 ${hovered === arch.id ? "border-[#C8AA6E]" : "border-white/10"
                                }`}
                        >
                            {/* Image Section (Top 50%) */}
                            <div className="relative h-[200px] md:h-[340px] w-full overflow-hidden border-b border-white/5 bg-black">
                                <Image
                                    src={arch.image}
                                    alt={arch.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-contain group-hover:scale-105 transition-all duration-700"
                                />
                            </div>

                            {/* Content Section (Bottom) */}
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <span className="text-[#C8AA6E] text-xs uppercase tracking-widest mb-3 font-bold">
                                    {arch.tagline}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-display uppercase mb-4 text-white">
                                    {arch.name}
                                </h3>
                                <div className="text-[#C8AA6E] text-xl font-bold mb-4">
                                    Från {arch.startPrice.toLocaleString('sv-SE')} kr
                                </div>
                                <p className="text-white/40 text-sm mb-8 leading-relaxed flex-1">
                                    {arch.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {arch.specs.slice(0, 3).map((spec) => (
                                        <span
                                            key={spec}
                                            className="text-[10px] uppercase tracking-wider px-3 py-1.5 border border-white/10 text-white/50 rounded-sm"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

            </div>
        </motion.section>
    );
}

function SurfacePhase({
    selected,
    onSelect,
    onBack
}: {
    selected: string | null;
    onSelect: (id: string) => void;
    onBack: () => void;
}) {
    return (
        <motion.section
            key="surface"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center px-8 py-24 md:py-32"
        >
            <div className="max-w-5xl w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/40 hover:text-white text-sm uppercase tracking-widest mb-12 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Tillbaka
                </button>

                <span className="text-[#C8AA6E] text-xs tracking-[0.4em] uppercase block mb-4">Steg 03 / 05</span>
                <h2 className="text-4xl md:text-6xl font-display uppercase mb-4">Ytfinish</h2>
                <p className="text-white/50 text-lg mb-12 max-w-xl">
                    Välj den finish som kompletterar din vision.
                </p>

                {/* Standard Finishes */}
                <div className="mb-12">
                    <h3 className="text-white/60 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-white/20"></span>
                        Standard Lack — Ingår i priset
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {FINISHES.filter(f => f.type === "Standard").map((finish, i) => (
                            <motion.button
                                key={finish.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => onSelect(finish.id)}
                                className="group relative aspect-square border border-white/10 hover:border-[#C8AA6E] transition-all p-4 flex flex-col items-center justify-center bg-white/[0.02]"
                            >
                                <div
                                    className="w-16 h-16 rounded-full mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 border-black/50"
                                    style={{ backgroundColor: finish.hex }}
                                >
                                    <div className="w-full h-full rounded-full relative overflow-hidden">
                                        <div className="absolute top-2 left-3 w-6 h-3 bg-white/20 rounded-full blur-sm -rotate-45" />
                                    </div>
                                </div>
                                <span className="text-white text-sm font-display uppercase group-hover:text-[#C8AA6E] transition-colors">
                                    {finish.name}
                                </span>
                                <span className="text-green-500/80 text-xs mt-1">Inkluderat</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Egen färg - Custom color input */}
                    <div className="mt-6">
                        <button
                            onClick={() => {
                                const customColor = prompt("Ange din önskade färg (t.ex. RAL-kod, lackkod eller beskrivning):");
                                if (customColor) {
                                    onSelect(`CUSTOM:${customColor}`);
                                }
                            }}
                            className="w-full border border-dashed border-white/30 hover:border-[#C8AA6E] transition-all p-6 flex items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.05]"
                        >
                            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center bg-gradient-to-br from-red-500/20 via-blue-500/20 to-green-500/20">
                                <span className="text-white text-xl">?</span>
                            </div>
                            <div className="text-left">
                                <span className="text-white font-display uppercase block">Egen Färg</span>
                                <span className="text-white/50 text-xs">Ange valfri RAL-kod, lackkod eller beskrivning</span>
                            </div>
                            <span className="text-green-500/80 text-xs ml-auto">Inkluderat</span>
                        </button>
                    </div>
                </div>

                {/* Premium Finishes */}
                <div className="mb-12">
                    <h3 className="text-white/60 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[#C8AA6E]/50"></span>
                        Premium Finish — +2 000 kr
                    </h3>
                    <p className="text-white/40 text-sm mb-6">Metallisk ytbehandling som kräver extra bearbetning.</p>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                        {FINISHES.filter(f => f.type === "Premium").map((finish, i) => (
                            <motion.button
                                key={finish.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 + 0.2 }}
                                onClick={() => onSelect(finish.id)}
                                className="group relative aspect-[4/3] border border-[#C8AA6E]/30 hover:border-[#C8AA6E] transition-all p-6 flex flex-col items-center justify-center bg-[#C8AA6E]/5"
                            >
                                <div
                                    className="w-16 h-16 rounded-full mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 border-[#C8AA6E]/30"
                                    style={{
                                        backgroundColor: finish.hex,
                                        backgroundImage: finish.id === "BRUSHED"
                                            ? "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
                                            : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)"
                                    }}
                                />
                                <span className="text-white text-lg font-display uppercase group-hover:text-[#C8AA6E] transition-colors">
                                    {finish.name}
                                </span>
                                <span className="text-[#C8AA6E] text-xs mt-1">+2 000 kr</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

function DimensionsPhase({
    architecture,
    frontSize,
    rearSize,
    onSelect,
    onNext,
    onBack
}: {
    architecture: string | null;
    frontSize: string | null;
    rearSize: string | null;
    onSelect: (front: string, rear: string) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const arch = architecture || "MONOBLOCK";
    const availableDiameters = getAvailableDiameters(arch);
    const defaultDiameter = availableDiameters.includes(20) ? 20 : availableDiameters[0];

    const [frontDiameter, setFrontDiameter] = useState(defaultDiameter);
    const [frontWidth, setFrontWidth] = useState(9.0);
    const [frontET, setFrontET] = useState(35);
    const [rearDiameter, setRearDiameter] = useState(defaultDiameter);
    const [rearWidth, setRearWidth] = useState(10.0);
    const [rearET, setRearET] = useState(35);

    const frontPrice = getWheelPrice(arch, frontDiameter);
    const rearPrice = getWheelPrice(arch, rearDiameter);
    const totalPrice = (frontPrice * 2) + (rearPrice * 2);

    const handleContinue = () => {
        const front = `${frontDiameter}×${frontWidth} ET${frontET}`;
        const rear = `${rearDiameter}×${rearWidth} ET${rearET}`;
        onSelect(front, rear);
        onNext();
    };

    return (
        <motion.section
            key="dimensions"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center px-8 py-24 md:py-32"
        >
            <div className="max-w-4xl w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/40 hover:text-white text-sm uppercase tracking-widest mb-12 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Tillbaka
                </button>

                <span className="text-[#C8AA6E] text-xs tracking-[0.4em] uppercase block mb-4">Steg 04 / 05</span>
                <h2 className="text-4xl md:text-6xl font-display uppercase mb-4">Dimensioner</h2>
                <p className="text-white/50 text-lg mb-16 max-w-xl">
                    Välj diameter och bredd för fram- och bakhjul.
                </p>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Front Wheel */}
                    <div>
                        <h3 className="text-xl font-display uppercase mb-8 text-white/80 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#C8AA6E] rounded-full"></span>
                            Framhjul
                        </h3>
                        <div className="flex items-center justify-center gap-3">
                            <WheelPicker
                                values={availableDiameters}
                                selected={frontDiameter}
                                onSelect={setFrontDiameter}
                                suffix='"'
                                label="Diameter"
                            />
                            <span className="text-3xl text-white/20 font-light">×</span>
                            <WheelPicker
                                values={WIDTHS}
                                selected={frontWidth}
                                onSelect={setFrontWidth}
                                suffix='J'
                                label="Bredd"
                            />
                            <WheelPicker
                                values={ET_VALUES}
                                selected={frontET}
                                onSelect={setFrontET}
                                suffix=''
                                label="ET"
                                prefix="ET"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <span className="text-[#C8AA6E] text-2xl font-display">{frontDiameter}×{frontWidth} ET{frontET}</span>
                            <div className="text-white/50 text-sm mt-1">
                                {frontPrice.toLocaleString('sv-SE')} kr/st
                            </div>
                        </div>
                    </div>

                    {/* Rear Wheel */}
                    <div>
                        <h3 className="text-xl font-display uppercase mb-8 text-white/80 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#C8AA6E] rounded-full"></span>
                            Bakhjul
                        </h3>
                        <div className="flex items-center justify-center gap-3">
                            <WheelPicker
                                values={availableDiameters}
                                selected={rearDiameter}
                                onSelect={setRearDiameter}
                                suffix='"'
                                label="Diameter"
                            />
                            <span className="text-3xl text-white/20 font-light">×</span>
                            <WheelPicker
                                values={WIDTHS}
                                selected={rearWidth}
                                onSelect={setRearWidth}
                                suffix='J'
                                label="Bredd"
                            />
                            <WheelPicker
                                values={ET_VALUES}
                                selected={rearET}
                                onSelect={setRearET}
                                suffix=''
                                label="ET"
                                prefix="ET"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <span className="text-[#C8AA6E] text-2xl font-display">{rearDiameter}×{rearWidth} ET{rearET}</span>
                            <div className="text-white/50 text-sm mt-1">
                                {rearPrice.toLocaleString('sv-SE')} kr/st
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="mt-12 p-6 border border-[#C8AA6E]/30 bg-[#C8AA6E]/5">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-white/60 text-sm uppercase tracking-widest">Totalt för 4 fälgar</span>
                            <div className="text-white/40 text-xs mt-1">
                                2× Fram ({frontPrice.toLocaleString('sv-SE')} kr) + 2× Bak ({rearPrice.toLocaleString('sv-SE')} kr)
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[#C8AA6E] text-3xl font-bold">
                                {totalPrice.toLocaleString('sv-SE')} kr
                            </span>
                        </div>
                    </div>
                </div>

                {/* Non-binding reassurance */}
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white/60 text-sm">
                        <span className="text-green-400 font-bold">Icke bindande</span> — Prisuppgifterna är endast vägledande. Slutgiltigt pris bekräftas innan beställning.
                    </span>
                </div>

                <button
                    onClick={handleContinue}
                    className="mt-6 w-full py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                    Fortsätt till Reservation
                </button>
            </div>
        </motion.section>
    );
}

// Simple Picker Component with Up/Down arrows
function WheelPicker({
    values,
    selected,
    onSelect,
    suffix,
    label,
    prefix = ""
}: {
    values: number[];
    selected: number;
    onSelect: (val: number) => void;
    suffix: string;
    label: string;
    prefix?: string;
}) {
    const selectedIndex = values.indexOf(selected);

    const handleUp = () => {
        if (selectedIndex > 0) {
            onSelect(values[selectedIndex - 1]);
        }
    };

    const handleDown = () => {
        if (selectedIndex < values.length - 1) {
            onSelect(values[selectedIndex + 1]);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <span className="text-white/40 text-xs uppercase tracking-widest mb-4">{label}</span>

            {/* Up Arrow */}
            <button
                onClick={handleUp}
                disabled={selectedIndex === 0}
                className="w-16 h-10 flex items-center justify-center text-white/30 hover:text-[#C8AA6E] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
            </button>

            {/* Value Display */}
            <div className="relative my-2">
                <div className="w-24 h-16 border border-[#C8AA6E]/50 bg-[#C8AA6E]/10 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">{prefix}{selected}{suffix}</span>
                </div>
            </div>

            {/* Down Arrow */}
            <button
                onClick={handleDown}
                disabled={selectedIndex === values.length - 1}
                className="w-16 h-10 flex items-center justify-center text-white/30 hover:text-[#C8AA6E] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
}

function ReservePhase({
    regNumber,
    config,
    onBack
}: {
    regNumber: string;
    config: WheelConfig;
    onBack: () => void;
}) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "", referenceImages: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 2000));
        setIsComplete(true);
    };

    if (isComplete) {
        return (
            <motion.section
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen flex items-center justify-center px-8 py-24 md:py-32"
            >
                <div className="max-w-2xl text-center">
                    <motion.div
                        className="w-24 h-24 bg-[#C8AA6E] rounded-full mx-auto mb-8 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                    >
                        <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                    <h2 className="text-5xl font-display uppercase mb-6">Reservation Bekräftad</h2>
                    <p className="text-white/60 text-lg mb-8">
                        Din plats i produktionskön är nu säkrad. En av våra designkonsulter kommer kontakta dig
                        inom 24 timmar för att finslipa detaljerna och presentera 3D-renderingar.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 border border-white/20 text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                        Till Startsidan
                    </Link>
                </div>
            </motion.section>
        );
    }

    return (
        <motion.section
            key="reserve"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center px-8 py-24 md:py-32"
        >
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16">
                {/* Form */}
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/40 hover:text-white text-sm uppercase tracking-widest mb-12 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Tillbaka
                    </button>

                    <span className="text-[#C8AA6E] text-xs tracking-[0.4em] uppercase block mb-4">Steg 05 / 05</span>
                    <h2 className="text-4xl md:text-5xl font-display uppercase mb-4">Säkra Din Plats</h2>
                    <p className="text-white/50 text-lg mb-12">
                        Fyll i dina uppgifter så kontaktar vi dig inom 24h.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            required
                            placeholder="Fullständigt namn"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-[#C8AA6E] outline-none transition-colors"
                        />
                        <input
                            type="email"
                            required
                            placeholder="E-postadress"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-[#C8AA6E] outline-none transition-colors"
                        />
                        <input
                            type="tel"
                            required
                            placeholder="Telefonnummer"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-[#C8AA6E] outline-none transition-colors"
                        />
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 block">
                                Beskriv din vision
                            </label>
                            <textarea
                                placeholder="Berätta hur du vill att dina fälgar ska se ut — stil, spoke-design, detaljer, inspiration..."
                                value={form.notes}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                rows={4}
                                className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-white/30 focus:border-[#C8AA6E] outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Reference Images Upload */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 block">
                                Referensbilder (valfritt)
                            </label>
                            <div className="border border-dashed border-white/20 p-6 hover:border-[#C8AA6E]/50 transition-colors cursor-pointer">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    id="reference-images"
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files) {
                                            // Store file names for display
                                            const fileNames = Array.from(files).map(f => f.name).join(', ');
                                            setForm({ ...form, referenceImages: fileNames });
                                        }
                                    }}
                                />
                                <label htmlFor="reference-images" className="cursor-pointer flex flex-col items-center gap-3">
                                    <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-white/40 text-sm text-center">
                                        Ladda upp inspirationsbilder eller exempel på designer du gillar
                                    </span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "Skickar..." : "Bekräfta Reservation"}
                        </button>
                    </form>
                </div>

                {/* Summary */}
                <div className="bg-white/[0.02] border border-white/10 p-8 h-fit sticky top-32">
                    <h3 className="text-xl font-display uppercase mb-8 pb-4 border-b border-white/10">
                        Din Konfiguration
                    </h3>

                    <div className="space-y-6 text-sm">
                        {regNumber && (
                            <div>
                                <span className="text-white/40 uppercase tracking-widest text-xs block mb-1">Registreringsnummer</span>
                                <span className="text-white text-lg font-mono tracking-wider">{regNumber}</span>
                            </div>
                        )}
                        {config.architecture && (
                            <div>
                                <span className="text-white/40 uppercase tracking-widest text-xs block mb-1">Arkitektur</span>
                                <span className="text-white text-lg">{config.architecture}</span>
                            </div>
                        )}
                        {config.finish && (
                            <div>
                                <span className="text-white/40 uppercase tracking-widest text-xs block mb-1">Ytfinish</span>
                                <span className="text-white text-lg">{FINISHES.find(f => f.id === config.finish)?.name || config.finish}</span>
                            </div>
                        )}
                        {config.frontSize && config.rearSize && (
                            <div>
                                <span className="text-white/40 uppercase tracking-widest text-xs block mb-1">Dimensioner</span>
                                <span className="text-white text-lg">
                                    Fram: {config.frontSize} / Bak: {config.rearSize}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                        <h4 className="text-white/60 uppercase tracking-widest text-xs mb-4">Prisindikation</h4>

                        {config.frontSize && config.rearSize && (() => {
                            const arch = config.architecture || "MONOBLOCK";
                            const frontDiam = parseInt(config.frontSize.split('×')[0]);
                            const rearDiam = parseInt(config.rearSize.split('×')[0]);
                            const wheelPrice = (getWheelPrice(arch, frontDiam) * 2) + (getWheelPrice(arch, rearDiam) * 2);
                            const finishData = FINISHES.find(f => f.id === config.finish);
                            const finishPrice = finishData?.price || 0;
                            const totalPrice = wheelPrice + finishPrice;

                            return (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">4× Fälgar</span>
                                        <span className="text-white">{wheelPrice.toLocaleString('sv-SE')} kr</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Ytfinish ({finishData?.name || 'Standard'})</span>
                                        <span className="text-white">{finishPrice > 0 ? `+${finishPrice.toLocaleString('sv-SE')} kr` : 'Inkluderat'}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-white/10">
                                        <span className="text-white font-bold uppercase tracking-widest text-sm">Totalt</span>
                                        <span className="text-[#C8AA6E] text-2xl font-bold">{totalPrice.toLocaleString('sv-SE')} kr</span>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-white/40 text-xs uppercase tracking-widest">Produktionstid</span>
                            <span className="text-[#C8AA6E]">6-8 veckor</span>
                        </div>
                    </div>

                    {/* Non-binding reassurance */}
                    <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <span className="text-green-400 font-bold text-sm block mb-1">Icke bindande förfrågan</span>
                                <span className="text-white/50 text-xs leading-relaxed block">
                                    Detta är en intresseanmälan, inte ett köp. Vi kontaktar dig för att diskutera detaljer och bekräfta slutgiltigt pris innan något är bindande.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
