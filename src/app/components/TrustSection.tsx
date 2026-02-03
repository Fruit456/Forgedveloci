"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stages = [
    {
        id: "raw",
        title: "01. RÅMATERIAL",
        desc: "Varje fälg börjar som 80kg solid 6061-T6 Aluminum. Militär specifikation för maximal densitet.",
        visual: (
            <div className="w-full h-full border border-[#C8AA6E]/20 bg-[#C8AA6E]/5 relative flex items-center justify-center overflow-hidden">
                <img
                    src="/raw_block.png"
                    alt="Råmaterial 6061-T6"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 right-10 font-mono text-xs text-[#C8AA6E] border border-[#C8AA6E] px-2 py-1">
                    ALLOY: 6061-T6<br />DENSITY: 2.70 g/cm³
                </div>
            </div>
        )
    },
    {
        id: "cnc",
        title: "02. CNC-FRÄSNING",
        desc: "80% av materialet fräses bort med mikrometerprecision. Endast den strukturellt optimala kärnan återstår.",
        visual: (
            <div className="w-full h-full border border-white/20 bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
                <img
                    src="/cnc_milling.png"
                    alt="CNC Milling Process"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute p-4 top-10 right-10 font-mono text-xs text-[#C8AA6E] bg-black/50 backdrop-blur-sm border-l-2 border-[#C8AA6E]">
                    X: 124.442<br />Y: 89.001<br />Z: -4.220
                </div>
            </div>
        )
    },
    {
        id: "finish",
        title: "03. HANDFINISH",
        desc: "Maskinen ger formen. Människan ger själen. 40 timmar manuell borstning för vår signatur-finish.",
        visual: (
            <div className="w-full h-full border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-black relative flex items-center justify-center overflow-hidden">
                <img
                    src="/hand_finishing.png"
                    alt="Hand Finishing"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-110"
                />
                <span className="absolute text-[#C8AA6E] font-display text-4xl opacity-50 mix-blend-overlay tracking-[1em]">PERFEKTION</span>
            </div>
        )
    }
];

export default function TrustSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-10 left-10 z-10 select-none">
                    <h2 className="font-display font-extrabold text-[#C8AA6E] opacity-20 uppercase tracking-tighter" style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}>ENGINEERING</h2>
                </div>

                <motion.div style={{ x }} className="flex gap-20 pl-[10vw]">
                    {stages.map((stage) => (
                        <div key={stage.id} className="relative h-[70vh] w-[80vw] md:w-[60vw] flex-shrink-0 flex flex-col md:flex-row border border-white/10 bg-[#0a0a0a]">
                            <div className="flex-1 p-10 flex flex-col justify-end border-r border-white/10 relative">
                                <span className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] mb-4">PROCESS</span>
                                <h3 className="font-display text-4xl md:text-6xl text-white mb-6 uppercase leading-none">{stage.title}</h3>
                                <p className="text-gray-400 text-lg max-w-sm leading-relaxed">{stage.desc}</p>
                            </div>
                            <div className="flex-1 relative overflow-hidden group">
                                {stage.visual}
                            </div>
                        </div>
                    ))}
                    {/* Final spacer */}
                    <div className="w-[10vw]" />
                </motion.div>
            </div>
        </section>
    );
}
