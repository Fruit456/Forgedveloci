"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SurfaceSelectorProps {
    onSelect: (finish: string) => void;
    onBack: () => void;
}

const FINISHES = [
    { id: "BRUSHED_CLEAR", name: "Brushed Clear", type: "PREMIUM", color: "bg-[#e2e2e2]" },
    { id: "BRUSHED_TITANIUM", name: "Brushed Titanium", type: "PREMIUM", color: "bg-[#8a8a8a]" },
    { id: "BRUSHED_BRONZE", name: "Brushed Bronze", type: "PREMIUM", color: "bg-[#cd7f32]" },
    { id: "SOLID_BLACK", name: "Satin Black", type: "STANDARD", color: "bg-[#1a1a1a]" },
    { id: "SOLID_WHITE", name: "Gloss White", type: "STANDARD", color: "bg-[#ffffff]" },
    { id: "POLISHED", name: "Mirror Polished", type: "BESPOKE", color: "bg-gradient-to-tr from-gray-300 via-white to-gray-300" },
    { id: "GOLD_PLATED", name: "24k Gold", type: "BESPOKE", color: "bg-[#FFD700]" },
    { id: "CARBON_OVERLAY", name: "Carbon Overlay", type: "BESPOKE", color: "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-black" },
];

export default function SurfaceSelector({ onSelect, onBack }: SurfaceSelectorProps) {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8 max-w-5xl mx-auto w-full"
        >
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                    <span className="text-[#C8AA6E] font-mono text-xs tracking-[0.4em] uppercase block mb-2">Fas 03 /// Ytbehandling</span>
                    <h1 className="font-display text-4xl md:text-5xl text-white uppercase">Välj Finish</h1>
                </div>
                <button onClick={onBack} className="text-white/30 hover:text-white uppercase text-xs tracking-widest transition-colors">
                    ← TILLBAKA
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {FINISHES.map((finish, i) => (
                    <motion.button
                        key={finish.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => onSelect(finish.name)}
                        onMouseEnter={() => setHovered(finish.id)}
                        onMouseLeave={() => setHovered(null)}
                        className="group relative aspect-square border border-white/10 hover:border-[#C8AA6E] transition-all bg-[#080808] overflow-hidden flex flex-col items-center justify-center p-4"
                    >
                        {/* Color Swatch Circle */}
                        <div className={`w-24 h-24 rounded-full shadow-2xl mb-6 relative ${finish.color} border-4 border-black/50 group-hover:scale-110 transition-transform duration-500`}>
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] pointer-events-none" />
                            {/* Shine effect */}
                            <div className="absolute top-2 left-4 w-8 h-4 bg-white/20 rounded-full blur-md transform -rotate-45" />
                        </div>

                        <div className="text-center">
                            <span className="text-[10px] text-[#555] font-mono uppercase tracking-widest block mb-1">{finish.type}</span>
                            <span className="text-white font-display text-lg uppercase group-hover:text-[#C8AA6E] transition-colors">{finish.name}</span>
                        </div>

                        {/* Hover Tech Overlay */}
                        {hovered === finish.id && (
                            <motion.div
                                layoutId="tech-overlay"
                                className="absolute inset-0 border-[2px] border-[#C8AA6E] pointer-events-none p-2"
                            >
                                <div className="absolute top-0 left-0 bg-[#C8AA6E] text-black text-[9px] font-bold px-1">REF: {finish.id}</div>
                                <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#C8AA6E] animate-ping" />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>

            <div className="p-6 border border-white/5 bg-white/5 mt-8 flex items-start gap-4">
                <div className="text-[#C8AA6E] text-2xl font-mono">!</div>
                <div>
                    <h4 className="text-white font-bold uppercase text-sm mb-1">Custom Matchning</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        Vi erbjuder även Paint-to-Sample (PTS) matchning mot fordonets lackkod eller fysiskt prov.
                        Detta kan diskuteras med din designkonsult i nästa steg.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
