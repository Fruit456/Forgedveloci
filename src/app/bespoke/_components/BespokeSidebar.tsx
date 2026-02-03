"use client";

import { motion } from "framer-motion";
import { BespokeState } from "./types";

interface BespokeSidebarProps {
    state: BespokeState;
}

export default function BespokeSidebar({ state }: BespokeSidebarProps) {
    const { step, vehicle, config } = state;

    return (
        <div className="hidden md:flex w-full md:w-1/3 bg-[#080808] border-l border-white/5 flex-col p-12 font-mono text-[10px] text-gray-500 relative z-20 shadow-2xl h-screen sticky top-0">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8AA6E]/50 to-transparent opacity-20" />

            {/* HUD Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-12">
                <div>
                    <span className="block uppercase tracking-[0.2em] mb-2 text-[#444]">Session ID</span>
                    <span className="text-white text-lg font-bold tracking-widest">FV-{Math.floor(Math.random() * 99999)}</span>
                </div>
                <div className="text-right">
                    <span className="flex items-center justify-end gap-2 text-[#C8AA6E] animate-pulse uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-[#C8AA6E]"></span>
                        LIVE LINK
                    </span>
                </div>
            </div>

            <div className="space-y-10 flex-1 overflow-y-auto custom-scrollbar pr-2">
                {/* 01: Vehicle Data */}
                <div className="relative group">
                    <div className={`absolute -left-4 top-1 w-1 h-3 transition-colors duration-500 ${vehicle ? "bg-[#C8AA6E]" : "bg-[#222]"}`} />
                    <span className={`block uppercase tracking-[0.3em] mb-3 transition-colors ${vehicle ? "text-white" : "text-[#444]"}`}>01 // FORDONS DATA</span>
                    {vehicle ? (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border border-white/10 bg-white/5 p-4 relative overflow-hidden group-hover:border-[#C8AA6E]/30 transition-colors"
                        >
                            <div className="flex justify-between text-white text-sm font-bold uppercase mb-1">
                                <span>{vehicle.make}</span>
                                <span className="text-[#C8AA6E]">{vehicle.year}</span>
                            </div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider">{vehicle.model}</div>
                            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-[#555]">
                                <span>PCD: 5x112</span>
                                <span>CB: 66.6</span>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-24 border border-dashed border-[#222] flex items-center justify-center text-[#333]">
                            VÄNTAR PÅ DATA...
                        </div>
                    )}
                </div>

                {/* 02: Architecture */}
                <div className="relative group">
                    <div className={`absolute -left-4 top-1 w-1 h-3 transition-colors duration-500 ${config.architecture ? "bg-[#C8AA6E]" : "bg-[#222]"}`} />
                    <span className={`block uppercase tracking-[0.3em] mb-3 transition-colors ${step >= 2 ? "text-white" : "text-[#444]"}`}>02 // KONSTRUKTION</span>
                    {config.architecture ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border border-[#C8AA6E] bg-[#C8AA6E]/10 p-4"
                        >
                            <span className="block text-white text-lg font-display uppercase">{config.architecture}</span>
                            <span className="text-[#C8AA6E] uppercase tracking-wider">VALD</span>
                        </motion.div>
                    ) : (
                        <div className="h-16 border border-dashed border-[#222] flex items-center justify-center text-[#333]">
                            {step < 2 ? "LÅST" : "EJ VALT"}
                        </div>
                    )}
                </div>

                {/* 03: Finish */}
                <div className="relative group">
                    <div className={`absolute -left-4 top-1 w-1 h-3 transition-colors duration-500 ${config.finish ? "bg-[#C8AA6E]" : "bg-[#222]"}`} />
                    <span className={`block uppercase tracking-[0.3em] mb-3 transition-colors ${step >= 3 ? "text-white" : "text-[#444]"}`}>03 // YTBEHANDLING</span>
                    {config.finish ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border border-[#C8AA6E] bg-[#C8AA6E]/10 p-4"
                        >
                            <span className="block text-white text-lg font-display uppercase">{config.finish}</span>
                            <span className="text-[#C8AA6E] uppercase tracking-wider">VALD</span>
                        </motion.div>
                    ) : (
                        <div className="h-16 border border-dashed border-[#222] flex items-center justify-center text-[#333]">
                            {step < 3 ? "LÅST" : "EJ VALT"}
                        </div>
                    )}
                </div>

                {/* 04: Allocation */}
                <div className="relative group">
                    <div className={`absolute -left-4 top-1 w-1 h-3 transition-colors duration-500 ${step === 4 ? "bg-[#C8AA6E]" : "bg-[#222]"}`} />
                    <span className={`block uppercase tracking-[0.3em] mb-3 transition-colors ${step >= 4 ? "text-white" : "text-[#444]"}`}>04 // ALLIKERING</span>
                    <div className={`h-16 border border-dashed flex items-center justify-center text-[#333] transition-colors ${step === 4 ? "border-[#C8AA6E]/30 text-[#C8AA6E]" : "border-[#222]"}`}>
                        {step === 4 ? "IN PROGRESS" : "LÅST"}
                    </div>
                </div>
            </div>

            <div className="mt-auto mb-10 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-4 text-[#666]">
                    <span className="uppercase tracking-widest text-[10px]">SYSTEM STATUS</span>
                    <span className="font-mono text-[#C8AA6E]">{(step / 4 * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-[#111] h-[2px] relative overflow-hidden">
                    <motion.div
                        className="bg-[#C8AA6E] h-full shadow-[0_0_10px_#C8AA6E]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    />
                </div>
            </div>
        </div>
    );
}
