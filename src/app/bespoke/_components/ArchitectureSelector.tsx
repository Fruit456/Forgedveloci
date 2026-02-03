"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ArchitectureSelectorProps {
    onSelect: (arch: string) => void;
    onBack: () => void;
}

const VARIANTS = [
    {
        id: "MONOBLOCK",
        title: "Monoblock",
        desc: "Flygplansaluminium (6061-T6) smidd i ett stycke. Den ultimata balansen mellan ofjädrad vikt och strukturell styvhet.",
        img: "/arch_monoblock.png",
        spec: "MAX LAST: 900KG"
    },
    {
        id: "MULTIPIECE",
        title: "3-Delad",
        desc: "Modulär konstruktion med flytande centrum och titanium-bultar. Oändliga möjligheter för bredd och offset.",
        img: "/arch_multipiece.png",
        spec: "TITANIUM HÅRDVARA"
    },
    {
        id: "CARBON",
        title: "Carbon Hybrid",
        desc: "Kolfiber-bana fixerad vid ett smitt magnesium-centrum. Den lättaste hjulkonstruktionen som är fysiskt möjlig.",
        img: "/arch_carbon.png",
        spec: "VIKT: -40%"
    }
];

export default function ArchitectureSelector({ onSelect, onBack }: ArchitectureSelectorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8 max-w-5xl mx-auto w-full"
        >
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                    <span className="text-[#C8AA6E] font-mono text-xs tracking-[0.4em] uppercase block mb-2">Fas 02 /// Arkitektur</span>
                    <h1 className="font-display text-4xl md:text-5xl text-white uppercase">Välj Konstruktion</h1>
                </div>
                <button onClick={onBack} className="text-white/30 hover:text-white uppercase text-xs tracking-widest transition-colors">
                    ← TILLBAKA
                </button>
            </div>

            <div className="grid gap-6 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {VARIANTS.map((variant, index) => (
                    <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <button
                            onClick={() => onSelect(variant.id)}
                            className="group relative h-72 w-full flex items-center overflow-hidden border border-white/5 hover:border-[#C8AA6E] transition-all duration-500 bg-[#050505] text-left"
                        >
                            {/* Background Image Area */}
                            <div className="absolute inset-0 flex">
                                <div className="w-1/2 relative bg-black overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505] z-10" />
                                    <Image
                                        src={variant.img}
                                        alt={variant.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                                {/* Text Content Area */}
                                <div className="w-1/2 p-8 md:p-12 flex flex-col justify-center items-start z-10 pl-0">
                                    <div className="mb-2 overflow-hidden">
                                        <h3 className="text-3xl md:text-4xl font-display text-white uppercase translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                                            {variant.title}
                                        </h3>
                                        <div className="h-[2px] w-12 bg-[#C8AA6E] mt-2 group-hover:w-full transition-all duration-500" />
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md group-hover:text-gray-300 transition-colors">
                                        {variant.desc}
                                    </p>

                                    <div className="flex items-center justify-between w-full pr-8">
                                        <span className="font-mono text-[10px] text-[#C8AA6E] border border-[#C8AA6E]/30 px-3 py-1 uppercase tracking-wider">
                                            {variant.spec}
                                        </span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 text-white font-mono text-xs uppercase tracking-widest">
                                            VÄLJ ARKITEKTUR →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
