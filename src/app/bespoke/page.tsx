"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
        specs: ["Vikt från 8.2kg", "Max last 900kg", "Flow-formed"],
        image: "/wheel_monoblock_v2.png",
        price: "XX XXX" // TODO: Lägg in pris
    },
    {
        id: "TWOPIECE",
        name: "2-Piece",
        tagline: "Infinite Possibilities",
        description: "Split-rim konstruktion med synliga titanium-bultar. Djup dish och oändliga anpassningsmöjligheter.",
        specs: ["Anpassad offset", "Deep dish", "Polerad läpp"],
        image: "/wheel_twopiece_v2.png",
        price: "XX XXX" // TODO: Lägg in pris
    },
    {
        id: "AERODISC",
        name: "Aerodisc",
        tagline: "The Future",
        description: "Aerodynamisk disc-design för ultimat prestanda. Kolfiber-ytbehandling, hypercar-estetik.",
        specs: ["Aero-optimerad", "Kolfiber", "Hypercar-stil"],
        image: "/wheel_aerodisc_v2.png",
        price: "XX XXX" // TODO: Lägg in pris
    }
];

const FINISHES = [
    // Standard lack - Ingen extra kostnad (12 vanliga färger)
    { id: "GLOSS_BLACK", name: "Gloss Svart", hex: "#0a0a0a", type: "Standard", price: 0 },
    { id: "SATIN_BLACK", name: "Satin Svart", hex: "#1a1a1a", type: "Standard", price: 0 },
    { id: "GLOSS_GUNMETAL", name: "Gunmetal", hex: "#2d2d2d", type: "Standard", price: 0 },
    { id: "GLOSS_ANTHRACITE", name: "Anthracite", hex: "#383838", type: "Standard", price: 0 },
    { id: "GLOSS_SILVER", name: "Silver", hex: "#c0c0c0", type: "Standard", price: 0 },
    { id: "GLOSS_WHITE", name: "Vit", hex: "#f5f5f5", type: "Standard", price: 0 },
    { id: "GLOSS_BRONZE", name: "Bronze", hex: "#cd7f32", type: "Standard", price: 0 },
    { id: "GLOSS_GOLD", name: "Guld", hex: "#d4af37", type: "Standard", price: 0 },
    { id: "GLOSS_RED", name: "Röd", hex: "#8b0000", type: "Standard", price: 0 },
    { id: "GLOSS_BLUE", name: "Blå", hex: "#1a3a5c", type: "Standard", price: 0 },
    { id: "GLOSS_GREEN", name: "British Racing Green", hex: "#004225", type: "Standard", price: 0 },
    { id: "GLOSS_PURPLE", name: "Midnight Purple", hex: "#1e0033", type: "Standard", price: 0 },
    // Premium finish - +2000kr (endast Borstad och Polerad)
    { id: "BRUSHED", name: "Borstad", hex: "#8a8a8a", type: "Premium", price: 2000 },
    { id: "POLISHED", name: "Polerad", hex: "#e8e8e8", type: "Premium", price: 2000 },
];

const DIAMETERS = [16, 17, 18, 19, 20, 21, 22, 23, 24];
const WIDTHS = [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0];

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
            const timer = setTimeout(() => {
                setShowIntro(false);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [showIntro]);

    const handleVehicleSearch = async () => {
        if (!regInput || regInput.length < 3) return;
        setIsSearching(true);
        await new Promise(r => setTimeout(r, 1500));
        setVehicle({
            make: "PORSCHE",
            model: "911 GT3 RS",
            year: "2024"
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
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
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
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="text-white text-xl tracking-[0.2em] font-display hover:text-[#C8AA6E] transition-colors">
                    FORGED<span className="text-[#C8AA6E]">VELOCI</span>
                </Link>
                <div className="hidden md:flex items-center gap-4 text-xs tracking-widest text-white/50 uppercase">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C8AA6E] animate-pulse"></span>
                        Atelier Open
                    </span>
                </div>
            </header>

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
                            isSearching={isSearching}
                            vehicle={vehicle}
                            onSearch={handleVehicleSearch}
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
                            vehicle={vehicle}
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
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-30"
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

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-[#C8AA6E] rounded-full" />
                </div>
            </motion.div>
        </motion.section>
    );
}

function VehiclePhase({
    regInput,
    setRegInput,
    isSearching,
    vehicle,
    onSearch,
    onNext,
    onBack
}: {
    regInput: string;
    setRegInput: (v: string) => void;
    isSearching: boolean;
    vehicle: VehicleData | null;
    onSearch: () => void;
    onNext: () => void;
    onBack: () => void;
}) {
    return (
        <motion.section
            key="vehicle"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center px-8 py-32"
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
                    Ange ditt registreringsnummer så hämtar vi fordonsdata och säkerställer perfekt passform.
                </p>

                <div className="space-y-8">
                    <div className="relative">
                        <input
                            type="text"
                            value={regInput}
                            onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === "Enter" && onSearch()}
                            placeholder="ABC 123"
                            maxLength={7}
                            disabled={isSearching || !!vehicle}
                            className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#C8AA6E] py-6 text-4xl md:text-6xl font-mono text-white placeholder-white/10 outline-none transition-colors uppercase tracking-[0.3em] text-center disabled:opacity-50"
                        />
                        {isSearching && (
                            <motion.div
                                className="absolute bottom-0 left-0 h-[2px] bg-[#C8AA6E]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                    </div>

                    {!vehicle && !isSearching && (
                        <button
                            onClick={onSearch}
                            disabled={regInput.length < 3}
                            className="w-full py-5 border border-white/20 text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Verifiera Fordon
                        </button>
                    )}

                    {vehicle && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-[#C8AA6E]/30 p-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[#C8AA6E] text-xs uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#C8AA6E] rounded-full animate-pulse" />
                                    Verifierad
                                </span>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-white/30 text-xs hover:text-white transition-colors"
                                >
                                    Ändra
                                </button>
                            </div>
                            <div className="text-3xl font-display uppercase mb-2">
                                {vehicle.make} {vehicle.model}
                            </div>
                            <div className="text-white/50">{vehicle.year}</div>

                            <button
                                onClick={onNext}
                                className="mt-8 w-full py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                Fortsätt till Design
                            </button>
                        </motion.div>
                    )}
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
            className="min-h-screen flex flex-col px-8 py-32"
        >
            <div className="max-w-7xl mx-auto w-full">
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
                <p className="text-white/50 text-lg mb-16 max-w-xl">
                    Välj konstruktionen som definierar din hjuluppsättning.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {ARCHITECTURES.map((arch, i) => (
                        <motion.button
                            key={arch.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => onSelect(arch.id)}
                            onMouseEnter={() => setHovered(arch.id)}
                            onMouseLeave={() => setHovered(null)}
                            className={`group relative aspect-[3/4] overflow-hidden border transition-all duration-500 text-left ${hovered === arch.id ? "border-[#C8AA6E]" : "border-white/10"
                                }`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={arch.image}
                                    alt={arch.name}
                                    fill
                                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="text-[#C8AA6E] text-xs uppercase tracking-widest mb-2">
                                    {arch.tagline}
                                </span>
                                <h3 className="text-3xl font-display uppercase mb-3 group-hover:text-[#C8AA6E] transition-colors">
                                    {arch.name}
                                </h3>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                    {arch.description}
                                </p>

                                {/* Price */}
                                <div className="text-[#C8AA6E] text-lg font-bold mb-4">
                                    Från {arch.price} kr
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {arch.specs.map((spec) => (
                                        <span
                                            key={spec}
                                            className="text-[10px] uppercase tracking-wider px-2 py-1 border border-white/20 text-white/60"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover CTA */}
                                <motion.div
                                    className="mt-6 flex items-center gap-2 text-[#C8AA6E] text-sm uppercase tracking-widest"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: hovered === arch.id ? 1 : 0, x: hovered === arch.id ? 0 : -10 }}
                                >
                                    Välj {arch.name}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.div>
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
            className="min-h-screen flex items-center justify-center px-8 py-32"
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
    frontSize,
    rearSize,
    onSelect,
    onNext,
    onBack
}: {
    frontSize: string | null;
    rearSize: string | null;
    onSelect: (front: string, rear: string) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const [frontDiameter, setFrontDiameter] = useState(20);
    const [frontWidth, setFrontWidth] = useState(9.0);
    const [rearDiameter, setRearDiameter] = useState(20);
    const [rearWidth, setRearWidth] = useState(10.0);

    const handleContinue = () => {
        const front = `${frontDiameter}×${frontWidth}`;
        const rear = `${rearDiameter}×${rearWidth}`;
        onSelect(front, rear);
        onNext();
    };

    return (
        <motion.section
            key="dimensions"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center px-8 py-32"
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
                        <div className="flex items-center justify-center gap-4">
                            <WheelPicker
                                values={DIAMETERS}
                                selected={frontDiameter}
                                onSelect={setFrontDiameter}
                                suffix='"'
                                label="Diameter"
                            />
                            <span className="text-4xl text-white/20 font-light">×</span>
                            <WheelPicker
                                values={WIDTHS}
                                selected={frontWidth}
                                onSelect={setFrontWidth}
                                suffix='J'
                                label="Bredd"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <span className="text-[#C8AA6E] text-2xl font-display">{frontDiameter}×{frontWidth}</span>
                        </div>
                    </div>

                    {/* Rear Wheel */}
                    <div>
                        <h3 className="text-xl font-display uppercase mb-8 text-white/80 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#C8AA6E] rounded-full"></span>
                            Bakhjul
                        </h3>
                        <div className="flex items-center justify-center gap-4">
                            <WheelPicker
                                values={DIAMETERS}
                                selected={rearDiameter}
                                onSelect={setRearDiameter}
                                suffix='"'
                                label="Diameter"
                            />
                            <span className="text-4xl text-white/20 font-light">×</span>
                            <WheelPicker
                                values={WIDTHS}
                                selected={rearWidth}
                                onSelect={setRearWidth}
                                suffix='J'
                                label="Bredd"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <span className="text-[#C8AA6E] text-2xl font-display">{rearDiameter}×{rearWidth}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    className="mt-16 w-full py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                    Fortsätt till Reservation
                </button>
            </div>
        </motion.section>
    );
}

// iOS-style Wheel Picker Component
function WheelPicker({
    values,
    selected,
    onSelect,
    suffix,
    label
}: {
    values: number[];
    selected: number;
    onSelect: (val: number) => void;
    suffix: string;
    label: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const itemHeight = 48;

    const selectedIndex = values.indexOf(selected);

    // Debounced scroll handler - only fires after scrolling stops
    const handleScroll = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (!containerRef.current) return;
            const scrollTop = containerRef.current.scrollTop;
            const index = Math.round(scrollTop / itemHeight);
            const clampedIndex = Math.max(0, Math.min(index, values.length - 1));

            if (values[clampedIndex] !== undefined && values[clampedIndex] !== selected) {
                onSelect(values[clampedIndex]);
            }

            // Snap to exact position
            containerRef.current.scrollTo({
                top: clampedIndex * itemHeight,
                behavior: 'smooth'
            });
        }, 100);
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = selectedIndex * itemHeight;
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            <span className="text-white/40 text-xs uppercase tracking-widest mb-2">{label}</span>
            <div className="relative">
                {/* Selection highlight */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-[#C8AA6E]/50 pointer-events-none z-10" />
                {/* Fade overlays */}
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="h-36 w-24 overflow-y-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Padding items for scroll effect */}
                    <div className="h-12" />
                    {values.map((val) => (
                        <button
                            key={val}
                            onClick={() => {
                                onSelect(val);
                                if (containerRef.current) {
                                    const index = values.indexOf(val);
                                    containerRef.current.scrollTo({
                                        top: index * itemHeight,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className={`h-12 w-full flex items-center justify-center transition-all duration-200 ${selected === val
                                ? 'text-white text-2xl font-bold'
                                : 'text-white/30 text-lg'
                                }`}
                        >
                            {val}{suffix}
                        </button>
                    ))}
                    <div className="h-12" />
                </div>
            </div>
        </div>
    );
}

function ReservePhase({
    vehicle,
    config,
    onBack
}: {
    vehicle: VehicleData | null;
    config: WheelConfig;
    onBack: () => void;
}) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
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
                className="min-h-screen flex items-center justify-center px-8 py-32"
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
            className="min-h-screen flex items-center justify-center px-8 py-32"
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
                        <textarea
                            placeholder="Övriga önskemål (valfritt)"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            rows={3}
                            className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-[#C8AA6E] outline-none transition-colors resize-none"
                        />

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
                        {vehicle && (
                            <div>
                                <span className="text-white/40 uppercase tracking-widest text-xs block mb-1">Fordon</span>
                                <span className="text-white text-lg">{vehicle.make} {vehicle.model} ({vehicle.year})</span>
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
                                <span className="text-white text-lg">{FINISHES.find(f => f.id === config.finish)?.name}</span>
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

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-white/40 text-xs uppercase tracking-widest">Produktionstid</span>
                            <span className="text-[#C8AA6E]">6-8 veckor</span>
                        </div>
                    </div>

                    <p className="mt-8 text-white/30 text-xs leading-relaxed">
                        Genom att skicka reservationen bekräftar du intresse. Slutgiltigt pris och detaljer
                        fastställs i samråd med din designkonsult.
                    </p>
                </div>
            </div>
        </motion.section>
    );
}
