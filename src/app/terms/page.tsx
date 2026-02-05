"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C8AA6E] selection:text-black">
            <Header />

            <main className="pt-32 pb-20 px-8">
                <div className="max-w-4xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#C8AA6E] text-xs uppercase tracking-[0.4em] block mb-4">Juridisk Information</span>
                        <h1 className="text-4xl md:text-6xl font-display uppercase mb-8">Köpvillkor</h1>
                        <p className="text-white/40 text-sm mb-16">Senast uppdaterad: Februari 2026</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-invert prose-lg max-w-none space-y-12"
                    >
                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">1. Allmänt</h2>
                            <p className="text-white/60 leading-relaxed">
                                Dessa köpvillkor gäller för alla beställningar som görs hos ForgedVeloci AB (org.nr: XXX XXX-XXXX). Genom att lägga en beställning godkänner du dessa villkor.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">2. Beställning & Bekräftelse</h2>
                            <p className="text-white/60 leading-relaxed">
                                Varje beställning är unik och skräddarsydd. Efter att du skickat in din reservation kontaktar vi dig inom 24 timmar för att bekräfta specifikationer och pris. Beställningen är bindande först efter att du har godkänt offerten och betalat depositionsavgiften.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">3. Betalningsvillkor</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Betalning sker enligt följande:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li>50% deposition vid orderbekräftelse</li>
                                <li>50% innan leverans</li>
                            </ul>
                            <p className="text-white/60 leading-relaxed mt-4">
                                Vi accepterar banköverföring och kortbetalning. Alla priser är inklusive moms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">4. Produktion & Leveranstid</h2>
                            <p className="text-white/60 leading-relaxed">
                                Produktionstiden för skräddarsydda hjul är normalt 6-8 veckor från orderbekräftelse. Leverans sker med försäkrad frakt. Du kommer att meddelas när dina hjul är redo för leverans.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">5. Ångerrätt & Avbeställning</h2>
                            <p className="text-white/60 leading-relaxed">
                                Då alla produkter är skräddarsydda och tillverkas specifikt för varje kund, gäller inte den lagstadgade ångerrätten. Avbeställning efter påbörjad produktion är ej möjlig och depositionen återbetalas ej.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">6. Garanti</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vi ger 2 års garanti mot tillverkningsfel. Garantin täcker inte normalt slitage, skador orsakade av felaktig hantering, olyckor eller modifieringar gjorda av tredje part.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">7. Reklamation</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vid fel på produkten ska reklamation göras inom skälig tid efter att felet upptäckts. Kontakta oss på{" "}
                                <a href="mailto:info@forgedveloci.com" className="text-[#C8AA6E] hover:underline">info@forgedveloci.com</a>{" "}
                                med beskrivning och bilder av felet.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">8. Ansvarsbegränsning</h2>
                            <p className="text-white/60 leading-relaxed">
                                ForgedVeloci ansvarar inte för indirekta skador, följdskador eller förlorad vinst. Vårt totala ansvar är begränsat till det betalade beloppet för produkten.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">9. Tvister</h2>
                            <p className="text-white/60 leading-relaxed">
                                Eventuella tvister ska i första hand lösas genom dialog med oss. Om överenskommelse ej kan nås, avgörs tvisten enligt svensk lag i svensk domstol.
                            </p>
                        </section>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 pt-12 border-t border-white/10"
                    >
                        <Link href="/" className="text-white/40 hover:text-white text-sm uppercase tracking-widest transition-colors">
                            ← Tillbaka till startsidan
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
