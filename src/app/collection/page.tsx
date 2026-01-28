"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

// Mock product data
const mockProducts = [
    {
        id: "1",
        name: "Veloce GT",
        modelCode: "VEL-GT-001",
        diameter: 20,
        width: 10.0,
        finish: "Borstad Brons",
        priceSek: 18500,
    },
    {
        id: "2",
        name: "Apex Carbon",
        modelCode: "APX-CB-001",
        diameter: 21,
        width: 11.0,
        finish: "Satin Svart",
        priceSek: 24900,
    },
    {
        id: "3",
        name: "Stealth Mono",
        modelCode: "STL-MN-001",
        diameter: 19,
        width: 9.5,
        finish: "Matt Svart",
        priceSek: 15900,
    },
    {
        id: "4",
        name: "Regale",
        modelCode: "REG-001",
        diameter: 20,
        width: 9.0,
        finish: "Polerad Brons",
        priceSek: 21500,
    },
];

function CollectionContent() {
    const searchParams = useSearchParams();
    const regNumber = searchParams.get("reg") || "";
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [vehicleData, setVehicleData] = useState<{ make: string; model: string; color: string } | null>(null);
    const [analysisStage, setAnalysisStage] = useState(0);

    useEffect(() => {
        const stages = [
            "Hämtar fordonsdata...",
            "Analyserar dimensioner...",
            "Matchar kompatibla fälgar...",
            "Kurerar rekommendationer..."
        ];

        let currentStage = 0;
        const stageInterval = setInterval(() => {
            if (currentStage < stages.length - 1) {
                currentStage++;
                setAnalysisStage(currentStage);
            }
        }, 700);

        const timer = setTimeout(() => {
            setVehicleData({
                make: "BMW",
                model: "M4 Competition",
                color: "San Marino Blå",
            });
            setIsAnalyzing(false);
        }, 3200);

        return () => {
            clearTimeout(timer);
            clearInterval(stageInterval);
        };
    }, [regNumber]);

    const analysisStages = [
        "Hämtar fordonsdata...",
        "Analyserar dimensioner...",
        "Matchar kompatibla fälgar...",
        "Kurerar rekommendationer..."
    ];

    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6">
                <motion.div
                    className="text-center max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {/* Premium Loading Animation */}
                    <div className="relative w-40 h-40 mx-auto mb-12">
                        {/* Outer ring */}
                        <motion.div
                            className="absolute inset-0 border border-[#1a1a1a] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Middle ring */}
                        <motion.div
                            className="absolute inset-4 border border-[#d4b896]/20 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Inner ring with glow */}
                        <motion.div
                            className="absolute inset-8 border-2 border-[#d4b896]/40 rounded-full"
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Center dot */}
                        <div className="absolute inset-[60px] bg-[#d4b896] rounded-full glow-gold" />
                    </div>

                    {/* Stage Text */}
                    <motion.p
                        key={analysisStage}
                        className="text-[#606060] text-sm uppercase tracking-[0.2em] mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {analysisStages[analysisStage]}
                    </motion.p>

                    {/* Registration Number */}
                    <p className="font-display text-3xl text-gradient-gold tracking-wider">{regNumber}</p>
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
                        href="/"
                        className="text-[12px] uppercase tracking-[0.15em] text-[#606060] hover:text-[#d4b896] transition-colors duration-500"
                    >
                        Ny Sökning
                    </Link>
                </nav>
            </header>

            <main className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
                {/* Vehicle Info */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[11px] uppercase tracking-[0.4em] text-[#505050] mb-4">Kurerat För</p>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-3">
                        {vehicleData?.make} {vehicleData?.model}
                    </h1>
                    <p className="text-[#d4b896] text-lg font-light">{vehicleData?.color}</p>

                    {/* Decorative line */}
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4b896]/30 to-transparent mx-auto mt-8" />
                </motion.div>

                {/* Product Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: { staggerChildren: 0.12 }
                        }
                    }}
                >
                    {mockProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="luxury-card group overflow-hidden"
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                        >
                            {/* Product Image Area */}
                            <div className="aspect-square relative overflow-hidden bg-[#080808]">
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#d4b896]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Wheel placeholder */}
                                <div className="absolute inset-8 flex items-center justify-center">
                                    <div className="wheel-preview w-full h-full rounded-full flex items-center justify-center">
                                        {/* Spokes simulation */}
                                        <div className="relative w-full h-full">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#1a1a1a] to-transparent origin-left"
                                                    style={{ transform: `rotate(${i * 72}deg)` }}
                                                />
                                            ))}
                                            {/* Center cap */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-full bg-[#0a0a0a] border border-[#252525]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Number badge */}
                                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.15em] text-[#404040]">
                                    0{index + 1}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 relative z-10">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4b896]/60 mb-2">{product.finish}</p>
                                <h3 className="font-display text-xl text-white mb-1">{product.name}</h3>
                                <p className="text-[#404040] text-xs mb-6">
                                    {product.diameter}" × {product.width}"
                                </p>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#404040] mb-1">Per Fälg</p>
                                        <p className="font-display text-xl text-gradient-gold">
                                            {product.priceSek.toLocaleString("sv-SE")} <span className="text-sm">SEK</span>
                                        </p>
                                    </div>
                                    <motion.button
                                        className="px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] border border-[#252525] text-[#707070] hover:border-[#d4b896] hover:text-[#d4b896] transition-all duration-500"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Visa
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="text-center mt-24 pt-16 border-t border-[#151515]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-[#505050] text-sm mb-6">Hittar du inte det du söker?</p>
                    <Link href="/bespoke">
                        <motion.button
                            className="btn-premium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Besök Ateljén
                        </motion.button>
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}

export default function CollectionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <CollectionContent />
        </Suspense>
    );
}
