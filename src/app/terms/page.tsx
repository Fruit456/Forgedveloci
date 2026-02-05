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
                                Dessa köpvillkor gäller för alla beställningar som görs hos SpadesVeloci, enskild firma. Genom att lägga en beställning godkänner du dessa villkor i sin helhet. Varumärket ForgedVeloci används för marknadsföring och produkter tillverkade av SpadesVeloci.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">2. Produkter & Beställning</h2>
                            <p className="text-white/60 leading-relaxed">
                                Alla våra produkter är skräddarsydda och tillverkas specifikt efter kundens specifikationer. Varje beställning är unik och kan inte återanvändas eller säljas vidare till annan kund. Efter att du skickat in din reservation kontaktar vi dig för att bekräfta specifikationer och pris. Beställningen är bindande först efter att kunden godkänt offerten skriftligen och betalat depositionsavgiften.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">3. Betalningsvillkor</h2>
                            <p className="text-white/60 leading-relaxed mb-4">Betalning sker enligt följande:</p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside">
                                <li><strong>35% deposition</strong> vid orderbekräftelse – denna avgift är ej återbetalningsbar</li>
                                <li><strong>65% slutbetalning</strong> innan leverans/upphämtning</li>
                            </ul>
                            <p className="text-white/60 leading-relaxed mt-4">
                                Vi accepterar banköverföring. Alla priser är inklusive moms om inget annat anges. Leverans sker först efter att fullständig betalning har mottagits och verifierats.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">4. Produktion & Leveranstid</h2>
                            <p className="text-white/60 leading-relaxed">
                                Produktionstiden för skräddarsydda hjul är normalt 6-12 veckor från orderbekräftelse, men kan variera beroende på komplexitet, materialtillgång och produktionskapacitet. <strong>Angivna leveranstider är uppskattningar och utgör inte bindande åtaganden.</strong> SpadesVeloci förbehåller sig rätten att justera leveranstider vid oförutsedda omständigheter såsom, men inte begränsat till: maskinproblem, leverantörsförseningar, materialbrist, force majeure eller andra omständigheter utanför vår kontroll.
                            </p>
                            <p className="text-white/60 leading-relaxed mt-4">
                                Kunden kommer att informeras om eventuella förseningar. Försenad leverans berättigar inte till prisavdrag, skadestånd eller hävning av köpet, såvida inte förseningen överstiger 90 dagar från ursprungligt uppskattat leveransdatum.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">5. Ångerrätt & Avbeställning</h2>
                            <p className="text-white/60 leading-relaxed">
                                <strong>Då alla produkter är skräddarsydda och tillverkas specifikt för varje kund enligt Distansavtalslagen 2 kap. 11 § punkt 3, gäller inte den lagstadgade ångerrätten.</strong> Detta innebär att du som kund inte har rätt att ångra köpet efter att beställningen har bekräftats.
                            </p>
                            <p className="text-white/60 leading-relaxed mt-4">
                                Avbeställning efter påbörjad produktion är ej möjlig. Vid avbeställning innan produktionsstart återbetalas ej depositionen om 35%, då denna täcker administrativa kostnader, design och reserverad produktionstid.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">6. Äganderättsförbehåll</h2>
                            <p className="text-white/60 leading-relaxed">
                                Produkten förblir SpadesVelocis egendom tills full betalning har erlagts. Kunden har inte rätt att avhämta, använda eller förfoga över produkten innan fullständig betalning har mottagits.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">7. Garanti</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vi ger 2 års garanti mot tillverkningsfel under normala användningsförhållanden. Garantin täcker <strong>inte</strong>:
                            </p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside mt-4">
                                <li>Normalt slitage</li>
                                <li>Skador orsakade av felaktig montering eller hantering</li>
                                <li>Skador från olyckor, stötar mot trottoarkanter eller liknande</li>
                                <li>Skador från felaktigt lufttryck eller överbelastning</li>
                                <li>Skador från korrosiva ämnen, salt eller aggressiva rengöringsmedel</li>
                                <li>Modifieringar gjorda av tredje part</li>
                                <li>Användning i racing eller tävlingssammanhang</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">8. Reklamation</h2>
                            <p className="text-white/60 leading-relaxed">
                                Vid fel på produkten ska reklamation göras skriftligen inom skälig tid efter att felet upptäckts, dock senast inom 2 månader. Reklamationen ska innehålla detaljerad beskrivning av felet samt fotografisk dokumentation. Kontakta oss på{" "}
                                <a href="mailto:info@forgedveloci.com" className="text-[#C8AA6E] hover:underline">info@forgedveloci.com</a>.
                            </p>
                            <p className="text-white/60 leading-relaxed mt-4">
                                SpadesVeloci avgör efter inspektion om reklamationen godkänns. Vid godkänd reklamation åtar vi oss att reparera eller ersätta den defekta produkten. Kunden ansvarar för fraktkostnader vid insändning för inspektion. Om reklamationen godkänns ersätts fraktkostnaden.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">9. Ansvarsbegränsning</h2>
                            <p className="text-white/60 leading-relaxed">
                                <strong>SpadesVeloci ansvarar inte för:</strong>
                            </p>
                            <ul className="text-white/60 space-y-2 list-disc list-inside mt-4">
                                <li>Indirekta skador, följdskador eller förlorad vinst</li>
                                <li>Skador som uppstår vid felaktig användning eller montering</li>
                                <li>Förseningar orsakade av omständigheter utanför vår kontroll</li>
                                <li>Skador på fordon vid montering utförd av tredje part</li>
                                <li>Utebliven användning av fordon under produktions- eller reparationstid</li>
                            </ul>
                            <p className="text-white/60 leading-relaxed mt-4">
                                Vårt totala ansvar är under alla omständigheter begränsat till det belopp kunden betalat för produkten. Skadeståndsanspråk ska framställas skriftligen inom 30 dagar från det att skadan upptäcktes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">10. Force Majeure</h2>
                            <p className="text-white/60 leading-relaxed">
                                SpadesVeloci är befriad från påföljd för underlåtenhet att fullgöra förpliktelse om underlåtenheten har sin grund i omständighet utanför SpadesVelocis kontroll. Som befriande omständighet räknas bland annat: krig, myndighetsåtgärd, pandemi, naturkatastrof, brand, översvämning, strejk, lockout, leverantörsförseningar, maskinskador, strömavbrott eller annan liknande omständighet.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">11. Ändringar av villkor</h2>
                            <p className="text-white/60 leading-relaxed">
                                SpadesVeloci förbehåller sig rätten att när som helst ändra dessa villkor. Ändringar gäller inte för redan bekräftade beställningar.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display uppercase mb-4 text-[#C8AA6E]">12. Tvister & Tillämplig Lag</h2>
                            <p className="text-white/60 leading-relaxed">
                                Eventuella tvister ska i första hand lösas genom dialog med oss. Om överenskommelse ej kan nås, avgörs tvisten enligt svensk lag i svensk allmän domstol med Stockholms tingsrätt som första instans.
                            </p>
                        </section>

                        <section className="bg-white/5 p-8 border border-white/10 mt-12">
                            <p className="text-white/60 text-sm leading-relaxed">
                                <strong className="text-white">Genom att lägga en beställning hos SpadesVeloci bekräftar du att du har läst, förstått och accepterat dessa köpvillkor i sin helhet.</strong>
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
