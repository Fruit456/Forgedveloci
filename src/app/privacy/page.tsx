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
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">1. Personuppgiftsansvarig</h2>
                            <p className="text-white/60 leading-relaxed">
                                SpadesVeloci, enskild firma ("vi", "oss", "vår") är personuppgiftsansvarig för behandlingen av dina personuppgifter. Varumärket ForgedVeloci används för marknadsföring och produkter. Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter i enlighet med EU:s dataskyddsförordning (GDPR).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">2. Vilka uppgifter vi samlar in</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Vi samlar in följande personuppgifter:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li><strong>Kontaktinformation:</strong> Namn, e-postadress, telefonnummer, adress</li>
                                <li><strong>Fordonsinformation:</strong> Registreringsnummer, fordonsmodell, mått för skräddarsydda beställningar</li>
                                <li><strong>Betalningsinformation:</strong> Fakturauppgifter (vi lagrar ej kortuppgifter)</li>
                                <li><strong>Kommunikation:</strong> E-postkorrespondens och noteringar från kundkontakt</li>
                                <li><strong>Teknisk data:</strong> IP-adress, webbläsartyp, besöksstatistik via cookies</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">3. Rättslig grund för behandling</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Vi behandlar dina personuppgifter baserat på:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li><strong>Avtal:</strong> För att fullgöra vårt avtal med dig vid beställning</li>
                                <li><strong>Rättslig förpliktelse:</strong> För att uppfylla bokförings- och skattelagstiftning</li>
                                <li><strong>Berättigat intresse:</strong> För att förbättra våra tjänster och kommunicera med dig</li>
                                <li><strong>Samtycke:</strong> För marknadsföring (om du har godkänt det)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">4. Hur vi använder dina uppgifter</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Dina personuppgifter används för att:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li>Hantera din beställning och tillverka produkter enligt specifikation</li>
                                <li>Kommunicera med dig angående din beställning och leverans</li>
                                <li>Skicka fakturor och hantera betalningar</li>
                                <li>Uppfylla garantiåtaganden och hantera reklamationer</li>
                                <li>Uppfylla lagstadgade krav (bokföring i 7 år)</li>
                                <li>Förbättra våra produkter och tjänster</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">5. Delning av uppgifter</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vi säljer aldrig dina personuppgifter till tredje part. Uppgifter kan delas med:
                            </p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside mt-4">
                                <li>Fraktbolag för leverans</li>
                                <li>Bokförings- och redovisningstjänster</li>
                                <li>IT-leverantörer som hanterar vår webbplats och e-post</li>
                                <li>Myndigheter när lagen kräver det</li>
                            </ul>
                            <p className="text-white/60 leading-relaxed mt-4">
                                Alla tredjeparter som behandlar personuppgifter för vår räkning är bundna av personuppgiftsbiträdesavtal.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">6. Lagring och gallring</h2>
                            <p className="text-white/60 leading-relaxed">
                                Dina uppgifter lagras på säkra servrar inom EU. Vi sparar dina uppgifter så länge det krävs för att uppfylla ändamålet med behandlingen:
                            </p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside mt-4">
                                <li><strong>Kunduppgifter:</strong> Under pågående kundrelation + 2 år</li>
                                <li><strong>Bokföringsmaterial:</strong> 7 år enligt bokföringslagen</li>
                                <li><strong>Garantiärenden:</strong> Under garantitiden + 1 år</li>
                                <li><strong>Marknadsföring:</strong> Tills du avregistrerar dig</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">7. Säkerhet</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förlust eller förstörelse. Detta inkluderar kryptering, åtkomstkontroller och regelbundna säkerhetsgranskningar.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">8. Dina rättigheter</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Enligt GDPR har du rätt att:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li><strong>Få tillgång:</strong> Begära en kopia av dina personuppgifter</li>
                                <li><strong>Rättelse:</strong> Begära att felaktiga uppgifter korrigeras</li>
                                <li><strong>Radering:</strong> Begära att dina uppgifter raderas (med vissa undantag)</li>
                                <li><strong>Begränsning:</strong> Begära att behandlingen begränsas</li>
                                <li><strong>Dataportabilitet:</strong> Få ut dina uppgifter i maskinläsbart format</li>
                                <li><strong>Invändning:</strong> Invända mot behandling baserad på berättigat intresse</li>
                                <li><strong>Återkalla samtycke:</strong> När som helst återkalla givet samtycke</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">9. Cookies</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vår webbplats använder cookies för att förbättra din upplevelse och samla in anonym statistik. Du kan hantera cookies genom din webbläsares inställningar. Nödvändiga cookies krävs för att webbplatsen ska fungera.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">10. Kontakt & Klagomål</h2>
                            <p className="text-white/60 leading-relaxed">
                                För frågor om denna integritetspolicy eller för att utöva dina rättigheter, kontakta oss på{" "}
                                <a href="mailto:info@forgedveloci.com" className="text-[#C8AA6E] hover:underline">info@forgedveloci.com</a>.
                            </p>
                            <p className="text-white/60 leading-relaxed mt-4">
                                Om du anser att vi behandlar dina personuppgifter felaktigt har du rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY), <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-[#C8AA6E] hover:underline">www.imy.se</a>.
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
