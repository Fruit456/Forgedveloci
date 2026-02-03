"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BespokeConfig } from "./types";

interface AllocationRequestProps {
    onComplete: () => void;
    onBack: () => void;
    config: BespokeConfig;
}

export default function AllocationRequest({ onComplete, onBack, config }: AllocationRequestProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mimic API
        await new Promise(r => setTimeout(r, 2000));
        onComplete();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-3xl mx-auto w-full"
        >
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
                <div>
                    <span className="text-[#C8AA6E] font-mono text-xs tracking-[0.4em] uppercase block mb-2">Fas 04 /// Bekräftelse</span>
                    <h1 className="font-display text-4xl md:text-5xl text-white uppercase">Säkra Allokering</h1>
                </div>
                <button onClick={onBack} className="text-white/30 hover:text-white uppercase text-xs tracking-widest transition-colors mb-auto">
                    ← TILLBAKA
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Form Side */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#555] ml-1">Fullständigt Namn</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#050505] border border-white/10 p-4 text-white font-mono focus:border-[#C8AA6E] outline-none transition-colors"
                            placeholder="ENTER NAME"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#555] ml-1">E-postadress</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#050505] border border-white/10 p-4 text-white font-mono focus:border-[#C8AA6E] outline-none transition-colors"
                            placeholder="ENTER EMAIL"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#555] ml-1">Telefonnummer</label>
                        <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#050505] border border-white/10 p-4 text-white font-mono focus:border-[#C8AA6E] outline-none transition-colors"
                            placeholder="+46..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#C8AA6E] text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors mt-8 relative overflow-hidden group"
                    >
                        <span className="relative z-10">
                            {isSubmitting ? "TRANSMITTING..." : "SKICKA FÖRFRÅGAN"}
                        </span>
                        {isSubmitting && (
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        )}
                    </button>
                </form>

                {/* Summary Side */}
                <div className="border border-white/5 bg-white/[0.02] p-8 h-fit">
                    <h3 className="text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6">Konfiguration</h3>

                    <div className="space-y-6 text-sm">
                        <div>
                            <span className="block text-[#555] text-[10px] uppercase tracking-widest mb-1">Architecture</span>
                            <span className="text-white font-display text-xl uppercase">{config.architecture || "PENDING"}</span>
                        </div>
                        <div>
                            <span className="block text-[#555] text-[10px] uppercase tracking-widest mb-1">Surface Finish</span>
                            <span className="text-white font-display text-xl uppercase">{config.finish || "PENDING"}</span>
                        </div>
                        <div>
                            <span className="block text-[#555] text-[10px] uppercase tracking-widest mb-1">Total Est. Production Time</span>
                            <span className="text-[#C8AA6E] font-mono text-lg">5-7 WEEKS</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-[#444] leading-relaxed">
                        Genom att skicka denna förfrågan reserverar du en plats i kön. Våra ingenjörer kommer att granska din konfiguration och kontakta dig inom 24h för 3D-renderingar och slutgiltig offert.
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
