"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

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

export default function ProductSection() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative bg-[#050505] py-32" id="products">
            <div className="container mx-auto px-6 mb-24 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start max-w-4xl mx-auto">
                    <span className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] block mb-4">Kollektionen</span>
                    <h2 className="text-5xl md:text-8xl font-display uppercase leading-[0.9] text-white">
                        VÅRA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C8AA6E] to-[#C8AA6E]">ARKITEKTURER</span>
                    </h2>
                </div>
            </div>

            <div className="flex flex-col gap-0 max-w-[1800px] mx-auto">
                {COLLECTIONS.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="group relative h-[80vh] flex flex-col md:flex-row items-center border-t border-white/5 bg-black overflow-hidden"
                    >
                        {/* Image Side */}
                        <div className="md:w-3/5 w-full h-[50vh] md:h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-black z-0" />
                            <div className="absolute inset-0 z-10 p-4 md:p-16">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                />
                            </div>
                            {/* Large Index Number */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-display text-white/[0.03] select-none z-0 pointer-events-none">
                                0{index + 1}
                            </div>
                        </div>

                        {/* Info Side */}
                        <div className="md:w-2/5 w-full p-8 md:p-20 flex flex-col justify-center items-start z-20">
                            <span className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] mb-4 font-bold">
                                {item.tagline}
                            </span>
                            <h3 className="text-4xl md:text-6xl font-display text-white uppercase mb-6">
                                {item.name}
                            </h3>
                            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
                                {item.description}
                            </p>

                            <div className="flex items-center justify-between w-full border-t border-white/5 pt-10 mt-auto">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-white/30 mb-1">Från Pris</span>
                                    <span className="text-3xl text-white font-display">
                                        {item.startPrice.toLocaleString('sv-SE')} kr
                                    </span>
                                </div>
                                <Link
                                    href="/bespoke"
                                    className="px-10 py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 flex items-center gap-3"
                                >
                                    Konfigurera
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-32">
                <Link href="/collection" className="group inline-flex items-center gap-4 text-xl uppercase tracking-[0.5em] text-white hover:text-[#C8AA6E] transition-all">
                    Visa Hela Kollektionen
                    <motion.span
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        &rarr;
                    </motion.span>
                </Link>
            </div>

        </section>
    );
}
