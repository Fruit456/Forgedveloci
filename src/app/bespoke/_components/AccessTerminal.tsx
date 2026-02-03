"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { VehicleData } from "./types";

interface AccessTerminalProps {
    onVehicleFound: (data: VehicleData) => void;
    onNext: () => void;
}

export default function AccessTerminal({ onVehicleFound, onNext }: AccessTerminalProps) {
    const [regInput, setRegInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [vehicle, setVehicle] = useState<VehicleData | null>(null);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
    };

    const handleSearch = async () => {
        if (!regInput || regInput.length < 3) return;
        setIsSearching(true);
        setLogs([]);
        setVehicle(null); // Reset previous search

        // Simulate terminal sequence
        addLog(`INITIATING CONNECTION TO BV-NET...`);
        await new Promise(r => setTimeout(r, 600));
        addLog(`HANDSHAKE ESTABLISHED. SECURE.`);
        await new Promise(r => setTimeout(r, 600));
        addLog(`QUERYING REGISTRY FOR [${regInput}]...`);
        await new Promise(r => setTimeout(r, 800));

        // MOCK DATA
        const mockVehicle: VehicleData = {
            make: "PORSCHE",
            model: "911 GT3 RS",
            year: "2024",
            fitment: "VERIFIERAD"
        };

        addLog(`MATCH FOUND: ${mockVehicle.make} ${mockVehicle.model}`);
        addLog(`DOWNLOADING BLUEPRINTS... DONE.`);

        setVehicle(mockVehicle);
        onVehicleFound(mockVehicle);
        setIsSearching(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="space-y-12 max-w-4xl mx-auto w-full"
        >
            <div>
                <span className="text-[#C8AA6E] font-mono text-xs tracking-[0.4em] uppercase block mb-4 glow-text animate-pulse">
                    System Status: Online /// Fas 01
                </span>
                <h1 className="font-display text-5xl md:text-7xl text-white uppercase leading-none mb-6 tracking-tight">
                    ACCESS<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#555]">TERMINAL</span>
                </h1>
            </div>

            <div className="space-y-6 relative">
                <div className="relative group">
                    <input
                        autoFocus
                        type="text"
                        value={regInput}
                        onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="REGISTRERINGSNUMMER"
                        maxLength={8}
                        disabled={isSearching || !!vehicle}
                        className="w-full bg-transparent border-b border-white/10 py-6 text-3xl md:text-6xl font-mono text-white placeholder-white/5 focus:border-[#C8AA6E] outline-none transition-all uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {/* Scanner Line Effect */}
                    {isSearching && (
                        <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-[#C8AA6E] shadow-[0_0_20px_#C8AA6E] z-10"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                    )}

                    {/* Decoration corners */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C8AA6E]/30" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C8AA6E]/30" />
                </div>

                {/* Terminal Output */}
                {(isSearching || logs.length > 0) && (
                    <div className="font-mono text-[10px] md:text-xs text-[#C8AA6E]/80 space-y-1 h-20 overflow-hidden">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {log}
                            </motion.div>
                        ))}
                    </div>
                )}

                {!vehicle && !isSearching && (
                    <button
                        onClick={handleSearch}
                        disabled={!regInput}
                        className="group relative px-10 py-5 bg-white/5 border border-white/10 text-white overflow-hidden transition-all hover:border-[#C8AA6E]/50 disabled:opacity-50 disabled:grayscale"
                    >
                        <div className="absolute inset-0 bg-[#C8AA6E] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[0.2em] group-hover:text-black flex items-center gap-2">
                            INITIERA ANALYS <span className="text-[10px]">→</span>
                        </span>
                    </button>
                )}

                {/* Success State */}
                {vehicle && !isSearching && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="border border-[#C8AA6E] bg-[#C8AA6E]/5 p-8 relative overflow-hidden backdrop-blur-sm"
                    >
                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C8AA6E]" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C8AA6E]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C8AA6E]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C8AA6E]" />

                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#C8AA6E] rounded-full animate-ping" />
                            <span className="text-[10px] text-[#C8AA6E] uppercase font-bold tracking-wider">FITMENT BEKRÄFTAD</span>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-4">
                            <div>
                                <span className="block text-[#606060] font-mono text-[10px] uppercase tracking-widest mb-1">Tillverkare / Modell</span>
                                <span className="block text-3xl font-display text-white tracking-wide leading-none">{vehicle.make} <br /> {vehicle.model}</span>
                            </div>
                            <div>
                                <span className="block text-[#606060] font-mono text-[10px] uppercase tracking-widest mb-1">Årsmodell</span>
                                <span className="block text-3xl font-display text-white tracking-wide">{vehicle.year}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={onNext}
                                className="flex-1 py-4 bg-[#C8AA6E] text-black uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors relative overflow-hidden"
                            >
                                <span className="relative z-10">STARTA KONFIGURATION</span>
                            </button>
                            <button
                                onClick={() => { setVehicle(null); setRegInput(""); setLogs([]); }}
                                className="px-6 py-4 border border-white/20 text-white/50 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-xs"
                            >
                                Rensa
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
