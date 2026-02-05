"use client";

import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";

// Architecture Collections
const COLLECTIONS = [
    {
        id: "MONOBLOCK",
        name: "Monoblock",
        tagline: "Pure Performance",
        description: "Smidd i ett enda stycke. Den ultimata balansen mellan vikt och styrka.",
        startPrice: 3850,
        image: "/wheel_monoblock_v2.png",
        specs: ["Flow Formed", "Lättvikt", "Street/Track"]
    },
    {
        id: "TWOPIECE",
        name: "2-Piece",
        tagline: "Infinite Possibilities",
        description: "Tvådelad konstruktion för maximal anpassning av offset och djup.",
        startPrice: 4800,
        image: "/wheel_twopiece_v2.png",
        specs: ["Deep Dish", "Modular", "Custom Offset"]
    },
    {
        id: "BEADLOCK",
        name: "Beadlock",
        tagline: "Off-Road Ready",
        description: "Säkrad däckmontering för extrema förhållanden och låga lufttryck.",
        startPrice: 4800,
        image: "/wheel_beadlock_v2.png", // Using placeholder until beadlock image is ready
        specs: ["True Beadlock", "Off-Road", "Heavy Duty"]
    },
    {
        id: "AERODISC",
        name: "Aerodisc",
        tagline: "The Future",
        description: "Aerodynamisk effektivitet möter hypercar-estetik.",
        startPrice: 10850,
        image: "/wheel_aerodisc_v2.png",
        specs: ["Aero", "Carbon Look", "High Speed"]
    }
];

function CollectionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const regNumber = searchParams.get("reg");
    const [hovered, setHovered] = useState<string | null>(null);

    const handleConfigure = (archId: string) => {
        // Here we could pass the architecture as a query param if we wanted to pre-select it in Bespoke
        // For now, just taking them to the start of the journey
        // In a real app: router.push(`/bespoke?arch=${archId}`);
        router.push('/bespoke');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C8AA6E] selection:text-black">
            <Header />

            <main className="pt-32 pb-20 px-8">
                <div className="max-w-[1800px] mx-auto">

                    {/* Hero Text */}
                    <div className="mb-24">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] block mb-4"
                        >
                            The Collection
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-display uppercase max-w-4xl leading-[0.9]"
                        >
                            Engineered for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Perfection</span>
                        </motion.h1>

                        {regNumber && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 flex items-center gap-4 text-white/40"
                            >
                                <span className="text-sm uppercase tracking-widest">Kurerat för</span>
                                <span className="px-3 py-1 border border-white/20 text-white font-display tracking-wider">
                                    {regNumber}
                                </span>
                            </motion.div>
                        )}
                    </div>

                    {/* Collection Grid */}
                    <div className="grid md:grid-cols-2 gap-1">
                        {COLLECTIONS.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHovered(item.id)}
                                onMouseLeave={() => setHovered(null)}
                                className="group relative aspect-[4/3] md:aspect-[16/9] border border-white/5 bg-black overflow-hidden cursor-pointer"
                                onClick={() => handleConfigure(item.id)}
                            >
                                {/* Image Background */}
                                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-4 md:p-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start">
                                    <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                                        <span className="text-[#C8AA6E] text-xs uppercase tracking-widest mb-2 block font-bold">
                                            {item.tagline}
                                        </span>
                                        <h2 className="text-4xl md:text-6xl font-display uppercase mb-4 text-white">
                                            {item.name}
                                        </h2>
                                        <p className="text-white/60 max-w-md text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden md:block">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center gap-6">
                                            <span className="text-white font-bold text-lg">
                                                Från {item.startPrice.toLocaleString('sv-SE')} kr
                                            </span>
                                            <span className="flex items-center gap-2 text-[#C8AA6E] text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                                Konfigurera
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Index Number */}
                                <div className="absolute top-8 right-8 text-white/10 font-display text-4xl hidden md:block">
                                    0{index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-32 text-center border-t border-white/10 pt-20">
                        <h3 className="text-2xl font-display uppercase mb-6">Skapa ditt mästerverk</h3>
                        <p className="text-white/50 mb-8 max-w-lg mx-auto">
                            Varje uppsättning tillverkas på beställning efter dina exakta specifikationer.
                        </p>
                        <Link
                            href="/bespoke"
                            className="inline-block px-12 py-4 bg-[#C8AA6E] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            Starta Konfigurator
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default function CollectionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <CollectionContent />
        </Suspense>
    );
}
