"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import Header from "../components/Header";

const PROCESS_STEPS = [
    {
        id: 1,
        title: "Råmaterialet",
        subtitle: "6061-T6 Aerospace Aluminum",
        description: "Varje fälg börjar som ett massivt block av flygplansaluminium. Vi använder uteslutande 6061-T6 för dess överlägsna styrka-till-vikt-förhållande. Ingen gjutning, inga kompromisser. Bara rent, smitt aluminium.",
        image: "/raw_block.png"
    },
    {
        id: 2,
        title: "Formgivningen",
        subtitle: "Precision Milling",
        description: "Våra 5-axliga CNC-maskiner skulpterar fram designen med mikrometerprecision — allt överflödigt tas bort och styrkan maximeras där det räknas. En process som tar timmar, men resultatet varar för evigt.",
        image: "/cnc_milling.png"
    },
    {
        id: 3,
        title: "Handlaget",
        subtitle: "Artisan Finishing",
        description: "Maskiner kan skapa formen, men bara en mänsklig hand kan skapa själen. Varje fälg borstas, poleras och synas för hand av våra mästare. Det är här skillnaden mellan en produkt och ett hantverk avgörs.",
        image: "/hand_finishing.png"
    }
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-[#C8AA6E] selection:text-black overflow-x-hidden">

            <Header />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Video/Image Placeholder */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050505]" />
                    {/* Ideally a background video here later */}
                </div>

                <div className="relative z-10 text-center max-w-5xl px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[#C8AA6E] text-xs md:text-sm uppercase tracking-[0.4em] block mb-6 font-bold"
                    >
                        Vår Berättelse
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-8xl lg:text-9xl font-display uppercase leading-[0.9] mb-8"
                    >
                        Smidd för <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">Evigheten</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Vi bygger inte bara fälgar. Vi skapar länken mellan din maskin och vägen.
                        En kompromisslös fusion av teknik, konst och brutal styrka.
                    </motion.p>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 px-6 bg-[#080808]">
                <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-display uppercase mb-8"
                        >
                            Inga <span className="text-[#C8AA6E]">Genvägar</span>.
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-white/60 text-lg leading-relaxed"
                        >
                            <p>
                                I en värld av massproduktion har hantverket gått förlorat. Vi startade ForgedVeloci för att ta tillbaka det.
                                Vi tror på att varje detalj räknas. Från den första skissen till den sista bulten.
                            </p>
                            <p>
                                Vår filosofi är enkel: Om det kan göras bättre, gör vi det bättre. Oavsett kostnad, oavsett tid.
                                För när du pressar din bil till gränsen, ska du inte behöva tvivla på dina hjul.
                            </p>
                        </motion.div>
                    </div>
                    <div className="relative aspect-square md:aspect-[4/3] overflow-hidden border border-white/5">
                        <Image
                            src="/workshop_hero.png"
                            alt="ForgedVeloci Workshop"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C8AA6E]/10 to-transparent" />
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-32 px-6">
                <div className="max-w-[1800px] mx-auto mb-24 text-center">
                    <span className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] block mb-4">Processen</span>
                    <h2 className="text-4xl md:text-6xl font-display uppercase">Från Block till Bana</h2>
                </div>

                <div className="space-y-32 max-w-[1600px] mx-auto">
                    {PROCESS_STEPS.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image */}
                            <div className="w-full md:w-3/5 aspect-[16/9] relative overflow-hidden group border border-white/5">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Text */}
                            <div className="w-full md:w-2/5 flex flex-col justify-center">
                                <span className="text-white/20 font-display text-8xl -ml-2 mb-4 block">0{step.id}</span>
                                <h3 className="text-3xl md:text-5xl font-display uppercase mb-2">{step.title}</h3>
                                <span className="text-[#C8AA6E] text-sm uppercase tracking-widest mb-6 block">{step.subtitle}</span>
                                <p className="text-white/50 text-lg leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 px-6 text-center bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-display uppercase mb-8">Redo att skapa historia?</h2>
                    <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto">
                        Din vision. Vårt hantverk. Tillsammans skapar vi något unikt.
                    </p>
                    <Link href="/bespoke">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#C8AA6E] text-black font-bold uppercase tracking-[0.2em] px-16 py-6 text-lg hover:bg-white transition-colors"
                        >
                            Starta Ateljén
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Footer Simple */}
            <footer className="py-12 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-xs uppercase tracking-widest">
                <span>&copy; 2026 ForgedVeloci. All rights reserved.</span>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <a href="https://www.instagram.com/forgedveloci" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                </div>
            </footer>
        </div>
    );
}
