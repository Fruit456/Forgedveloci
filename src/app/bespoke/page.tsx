"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function BespokePage() {
    const [formData, setFormData] = useState({
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        desiredSize: "",
        desiredFinish: "",
        notes: "",
        email: "",
        phone: "",
        disclaimerAccepted: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.disclaimerAccepted) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
                <motion.div
                    className="text-center max-w-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Success Icon */}
                    <motion.div
                        className="w-24 h-24 mx-auto mb-10 relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                    >
                        <div className="absolute inset-0 border border-[#d4b896]/20 rounded-full" />
                        <div className="absolute inset-2 border border-[#d4b896]/40 rounded-full" />
                        <div className="absolute inset-4 bg-[#d4b896]/10 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#d4b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </motion.div>

                    <h1 className="font-display text-4xl text-white mb-4">Förfrågan Mottagen</h1>
                    <p className="text-[#606060] text-base leading-relaxed mb-10">
                        Vårt ingenjörsteam kommer granska din begäran och kontakta dig inom 48 timmar med en offert.
                    </p>

                    <Link href="/">
                        <motion.button
                            className="px-10 py-4 border border-[#252525] text-[12px] uppercase tracking-[0.2em] text-[#808080] hover:border-[#d4b896] hover:text-[#d4b896] transition-all duration-500"
                            whileHover={{ scale: 1.02 }}
                        >
                            Tillbaka till Start
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass">
                <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                    <Link href="/" className="group">
                        <span className="font-display text-2xl tracking-wide text-white">Forged</span>
                        <span className="font-display text-2xl tracking-wide text-gradient-gold">Veloci</span>
                    </Link>
                    <Link
                        href="/collection"
                        className="text-[12px] uppercase tracking-[0.15em] text-[#606060] hover:text-[#d4b896] transition-colors duration-500"
                    >
                        Kollektion
                    </Link>
                </nav>
            </header>

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Page Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.4em] text-[#d4b896]/60 mb-4">Bespoke Ateljé</p>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                            Skapa Din
                            <span className="block text-gradient-gold italic">Egen Vision</span>
                        </h1>
                        <p className="text-[#606060] text-base max-w-md mx-auto leading-relaxed">
                            Beställ ett unikt set smidda fälgar, skräddarsydda efter dina exakta specifikationer.
                        </p>

                        {/* Decorative line */}
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4b896]/30 to-transparent mx-auto mt-10" />
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-12"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Vehicle Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4b896]">01</span>
                                <div className="flex-1 h-px bg-[#1a1a1a]" />
                                <h2 className="text-[12px] uppercase tracking-[0.2em] text-[#808080]">Fordon</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">Märke</label>
                                    <input
                                        type="text"
                                        name="vehicleMake"
                                        value={formData.vehicleMake}
                                        onChange={handleChange}
                                        placeholder="t.ex. BMW"
                                        required
                                        className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#404040] focus:border-[#d4b896] transition-all duration-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">Modell</label>
                                    <input
                                        type="text"
                                        name="vehicleModel"
                                        value={formData.vehicleModel}
                                        onChange={handleChange}
                                        placeholder="t.ex. M4 Competition"
                                        required
                                        className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#404040] focus:border-[#d4b896] transition-all duration-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">Årsmodell</label>
                                <input
                                    type="text"
                                    name="vehicleYear"
                                    value={formData.vehicleYear}
                                    onChange={handleChange}
                                    placeholder="t.ex. 2024"
                                    className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#404040] focus:border-[#d4b896] transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Wheel Specifications */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4b896]">02</span>
                                <div className="flex-1 h-px bg-[#1a1a1a]" />
                                <h2 className="text-[12px] uppercase tracking-[0.2em] text-[#808080]">Specifikationer</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">Önskad Storlek</label>
                                    <select
                                        name="desiredSize"
                                        value={formData.desiredSize}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white focus:border-[#d4b896] transition-all duration-500 appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23505050'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                                    >
                                        <option value="">Välj storlek</option>
                                        <option value="18">18 tum</option>
                                        <option value="19">19 tum</option>
                                        <option value="20">20 tum</option>
                                        <option value="21">21 tum</option>
                                        <option value="22">22 tum</option>
                                        <option value="custom">Specialmått</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">Önskad Finish</label>
                                    <input
                                        type="text"
                                        name="desiredFinish"
                                        value={formData.desiredFinish}
                                        onChange={handleChange}
                                        placeholder="t.ex. Borstad Brons"
                                        className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#404040] focus:border-[#d4b896] transition-all duration-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">Din Vision</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Beskriv dina önskemål, inspiration eller specifika krav..."
                                    rows={4}
                                    className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#404040] focus:border-[#d4b896] transition-all duration-500 resize-none"
                                />
                            </div>
                        </div>

                        {/* Upload Zone */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4b896]">03</span>
                                <div className="flex-1 h-px bg-[#1a1a1a]" />
                                <h2 className="text-[12px] uppercase tracking-[0.2em] text-[#808080]">Referensbild</h2>
                            </div>

                            <motion.div
                                className={`relative border border-dashed ${dragActive ? 'border-[#d4b896]' : 'border-[#252525]'} p-12 text-center cursor-pointer transition-all duration-500 hover:border-[#d4b896]/50`}
                                onDragEnter={() => setDragActive(true)}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={() => setDragActive(false)}
                                whileHover={{ scale: 1.005 }}
                            >
                                {/* Corner decorations */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#d4b896]/20" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#d4b896]/20" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d4b896]/20" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4b896]/20" />

                                <svg className="w-10 h-10 mx-auto text-[#303030] mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-[#505050] text-sm mb-2">Dra och släpp en inspirationsbild</p>
                                <p className="text-[#303030] text-xs">eller klicka för att bläddra</p>
                            </motion.div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4b896]">04</span>
                                <div className="flex-1 h-px bg-[#1a1a1a]" />
                                <h2 className="text-[12px] uppercase tracking-[0.2em] text-[#808080]">Kontaktuppgifter</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">E-post</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="din@email.se"
                                        required
                                        className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#404040] focus:border-[#d4b896] transition-all duration-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#505050] mb-3">Telefon</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+46 70 123 45 67"
                                        className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#404040] focus:border-[#d4b896] transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <motion.div
                            className="relative bg-[#0a0a0a] border border-[#1a1a1a] p-8"
                            whileHover={{ borderColor: "rgba(212, 184, 150, 0.1)" }}
                        >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#d4b896]/10" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#d4b896]/10" />

                            <label className="flex items-start gap-5 cursor-pointer">
                                <div className="relative mt-1">
                                    <input
                                        type="checkbox"
                                        name="disclaimerAccepted"
                                        checked={formData.disclaimerAccepted}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 border border-[#303030] bg-[#050505] peer-checked:border-[#d4b896] peer-checked:bg-[#d4b896]/10 transition-all duration-300" />
                                    <svg
                                        className="absolute inset-0 w-5 h-5 text-[#d4b896] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 p-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-[#606060] text-sm leading-relaxed">
                                    <strong className="text-[#909090]">Viktigt:</strong> Jag förstår att ForgedVeloci skapar unika tolkningar baserade på min inspiration.
                                    Den slutgiltiga produkten kommer vara en original ForgedVeloci-design, inte en replika av refererade fälgar.
                                </span>
                            </label>
                        </motion.div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={!formData.disclaimerAccepted || isSubmitting}
                            className={`w-full py-5 text-[12px] uppercase tracking-[0.2em] font-medium transition-all duration-500 ${formData.disclaimerAccepted
                                    ? "btn-premium"
                                    : "bg-[#151515] text-[#404040] cursor-not-allowed border border-[#1a1a1a]"
                                }`}
                            whileHover={formData.disclaimerAccepted ? { scale: 1.01 } : {}}
                            whileTap={formData.disclaimerAccepted ? { scale: 0.99 } : {}}
                        >
                            {isSubmitting ? (
                                <motion.span
                                    className="inline-flex items-center gap-3"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Skickar Förfrågan...
                                </motion.span>
                            ) : (
                                "Begär Offert"
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </main>
        </div>
    );
}
