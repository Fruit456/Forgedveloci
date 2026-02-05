"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";

export default function PrivacyPolicyPage() {
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
                        <h1 className="text-4xl md:text-6xl font-display uppercase mb-8">Integritetspolicy</h1>
                        <p className="text-white/40 text-sm mb-16">Senast uppdaterad: Februari 2026</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-invert prose-lg max-w-none space-y-12"
                    >
                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">1. Inledning</h2>
                            <p className="text-white/60 leading-relaxed">
                                ForgedVeloci AB ("vi", "oss", "vår") värnar om din personliga integritet. Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter när du besöker vår webbplats eller använder våra tjänster.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">2. Vilka uppgifter vi samlar in</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Vi kan samla in följande typer av personuppgifter:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li>Kontaktinformation (namn, e-postadress, telefonnummer)</li>
                                <li>Fordonsinformation (för skräddarsydda beställningar)</li>
                                <li>Kommunikationshistorik med vår kundtjänst</li>
                                <li>Teknisk data som IP-adress och webbläsarinformation</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">3. Hur vi använder dina uppgifter</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Dina personuppgifter används för att:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li>Hantera din beställning och leverera produkter</li>
                                <li>Kommunicera med dig angående din beställning</li>
                                <li>Förbättra våra produkter och tjänster</li>
                                <li>Uppfylla lagstadgade krav</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">4. Delning av uppgifter</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vi säljer aldrig dina personuppgifter till tredje part. Uppgifter kan delas med betrodda samarbetspartners endast när det krävs för att leverera våra tjänster, till exempel för frakt och betalningshantering.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">5. Lagring och säkerhet</h2>
                            <p className="text-white/60 leading-relaxed">
                                Dina uppgifter lagras på säkra servrar inom EU. Vi använder branschstandard-kryptering och säkerhetsåtgärder för att skydda din information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">6. Dina rättigheter</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Enligt GDPR har du rätt att:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li>Få tillgång till dina personuppgifter</li>
                                <li>Begära rättelse av felaktiga uppgifter</li>
                                <li>Begära radering av dina uppgifter</li>
                                <li>Invända mot viss behandling av dina uppgifter</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">7. Kontakt</h2>
                            <p className="text-white/60 leading-relaxed">
                                För frågor om denna integritetspolicy eller för att utöva dina rättigheter, vänligen kontakta oss på{" "}
                                <a href="mailto:info@forgedveloci.com" className="text-[#C8AA6E] hover:underline">info@forgedveloci.com</a>.
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
