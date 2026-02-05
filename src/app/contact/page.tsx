"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for form submission logic
        console.log("Form submitted:", formState);
        alert("Tack för ditt meddelande. Vi återkommer inom kort.");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C8AA6E] selection:text-black">

            <Header />

            <main className="pt-32 pb-20 px-8">
                <div className="max-w-[1800px] mx-auto">

                    {/* Hero Text */}
                    <div className="mb-24 text-center md:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] block mb-4"
                        >
                            Kundservice & Ateljé
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-display uppercase leading-[0.9] mb-8"
                        >
                            Kom i <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Kontakt</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/60 text-lg max-w-2xl leading-relaxed"
                        >
                            Oavsett om du vill diskutera en unik kommission eller har frågor om vår kollektion, är vårt team redo att assistera.
                            Vi strävar efter att svara på alla förfrågningar inom 24 timmar.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 md:gap-32">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Namn</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#C8AA6E] transition-colors rounded-none"
                                        placeholder="DITT NAMN"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#C8AA6E] transition-colors rounded-none"
                                        placeholder="DIN EMAIL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Ärende</label>
                                    <select
                                        value={formState.subject}
                                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white focus:outline-none focus:border-[#C8AA6E] transition-colors rounded-none appearance-none cursor-pointer"
                                    >
                                        <option>Allmän fråga</option>
                                        <option>Bespoke Commission</option>
                                        <option>Produktfråga</option>
                                        <option>Press & Media</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Meddelande</label>
                                    <textarea
                                        rows={6}
                                        required
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#C8AA6E] transition-colors rounded-none resize-none"
                                        placeholder="HUR KAN VI HJÄLPA DIG?"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-[#C8AA6E] text-black font-bold uppercase tracking-[0.2em] py-5 hover:bg-white transition-colors"
                                >
                                    Skicka Meddelande
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-16"
                        >
                            <div>
                                <h3 className="text-2xl font-display uppercase mb-6 text-white">Kontaktuppgifter</h3>
                                <div className="space-y-4">
                                    <a href="mailto:info@forgedveloci.com" className="block text-xl md:text-2xl hover:text-[#C8AA6E] transition-colors">
                                        info@forgedveloci.com
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-display uppercase mb-6 text-white">Socialt</h3>
                                <div className="flex gap-8">
                                    <a href="https://www.instagram.com/forgedveloci" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white uppercase tracking-widest text-sm transition-colors">Instagram</a>
                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-xs uppercase tracking-widest">
                <span>&copy; 2026 ForgedVeloci. All rights reserved.</span>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-white transition-colors">Integritetspolicy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Köpvillkor</Link>
                </div>
            </footer>
        </div>
    );
}
