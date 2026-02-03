"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const featuredWheels = [
    {
        id: 1,
        name: "Apex RS",
        size: '21" / 22"',
        finish: "Brushed Titanium",
        price: "45 000 kr",
        tag: "Track Focused",
        image: "/video-poster.jpg", // Placeholder
    },
    {
        id: 2,
        name: "Veloci GT",
        size: '20" / 21"',
        finish: "Gloss Black",
        price: "38 000 kr",
        tag: "Grand Touring",
        image: "/video-poster.jpg",
    },
    {
        id: 3,
        name: "Carbon Elite",
        size: '22"',
        finish: "Matte Carbon",
        price: "52 000 kr",
        tag: "Hypercar Spec",
        image: "/video-poster.jpg",
    },
];

export default function ProductSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section ref={containerRef} className="relative bg-[#050505] py-32" id="products">
            <div className="container mx-auto px-6 mb-24">
                <div className="flex flex-col items-start">
                    <span className="text-xl md:text-3xl font-display text-white tracking-[0.2em] mb-0 ml-2">THE</span>
                    <h2 className="font-display font-black text-[#C8AA6E] italic leading-[0.85] tracking-tighter uppercase break-normal max-w-[100vw]" style={{ fontSize: "clamp(2rem, 8vw, 10rem)" }}>
                        COLLECTION
                    </h2>
                </div>
            </div>

            <div className="flex flex-col gap-32">
                {featuredWheels.map((wheel, index) => (
                    <div key={wheel.id} className="sticky top-20 min-h-[80vh] flex flex-col md:flex-row items-center border-t border-white/10 bg-[#050505] py-10">
                        {/* Image Side */}
                        <div className="md:w-1/2 w-full h-[50vh] md:h-full relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-[#C8AA6E] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                            <div className="w-full h-full bg-[#111] flex items-center justify-center relative">
                                <h3 className="text-[20vw] font-display text-white/5 absolute select-none">0{index + 1}</h3>
                                {/* Placeholder for wheel image */}
                                <div className="w-[80%] aspect-square rounded-full border border-white/10 relative z-10 group-hover:scale-105 transition-transform duration-700">
                                    <div className="absolute inset-4 rounded-full border border-[#C8AA6E]/20" />
                                </div>
                            </div>
                        </div>

                        {/* Info Side */}
                        <div className="md:w-1/2 w-full p-10 flex flex-col justify-end items-start h-full">
                            <span className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] mb-4 border border-[#C8AA6E] px-3 py-1 rounded-full">{wheel.tag}</span>
                            <h3 className="text-6xl md:text-8xl font-display text-white uppercase mb-2">{wheel.name}</h3>
                            <div className="flex items-center gap-6 text-gray-400 font-mono text-sm mb-10">
                                <span>{wheel.size}</span>
                                <span>//</span>
                                <span>{wheel.finish}</span>
                            </div>

                            <div className="flex items-center justify-between w-full border-t border-white/10 pt-10">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-[#606060] mb-1">Från Pris</span>
                                    <span className="text-2xl text-white font-display">{wheel.price}</span>
                                </div>
                                <Link href={`/collection/${wheel.id}`} className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#C8AA6E] transition-colors">
                                    Konfigurera
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-32">
                <Link href="/collection" className="text-xl uppercase tracking-[0.5em] text-white hover:text-[#C8AA6E] underline underline-offset-8 decoration-1 decoration-[#333] hover:decoration-[#C8AA6E] transition-all">
                    Visa Alla Modeller
                </Link>
            </div>

        </section>
    );
}
