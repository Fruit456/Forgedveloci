"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

// Mock product data (would come from Azure SQL via API)
const mockProducts = [
    {
        id: "1",
        name: "Veloce GT",
        modelCode: "VEL-GT-001",
        diameter: 20,
        width: 10.0,
        finish: "Brushed Bronze",
        priceSek: 18500,
        imageUrl: "/wheels/veloce-gt.png",
    },
    {
        id: "2",
        name: "Apex Carbon",
        modelCode: "APX-CB-001",
        diameter: 21,
        width: 11.0,
        finish: "Satin Black",
        priceSek: 24900,
        imageUrl: "/wheels/apex-carbon.png",
    },
    {
        id: "3",
        name: "Stealth Mono",
        modelCode: "STL-MN-001",
        diameter: 19,
        width: 9.5,
        finish: "Matte Black",
        priceSek: 15900,
        imageUrl: "/wheels/stealth-mono.png",
    },
    {
        id: "4",
        name: "Regale",
        modelCode: "REG-001",
        diameter: 20,
        width: 9.0,
        finish: "Polished Bronze Lip",
        priceSek: 21500,
        imageUrl: "/wheels/regale.png",
    },
];

function CollectionContent() {
    const searchParams = useSearchParams();
    const regNumber = searchParams.get("reg") || "";
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [vehicleData, setVehicleData] = useState<{ make: string; model: string; color: string } | null>(null);

    useEffect(() => {
        // Simulate AI analysis delay
        const timer = setTimeout(() => {
            // Mock vehicle data based on reg number
            setVehicleData({
                make: "BMW",
                model: "M4 Competition",
                color: "San Marino Blue",
            });
            setIsAnalyzing(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [regNumber]);

    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {/* Analyzing Animation */}
                    <motion.div
                        className="w-32 h-32 mx-auto mb-8 border-2 border-[#333] rounded-full relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c9a962] rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </motion.div>

                    <motion.p
                        className="text-[#737373] text-lg mb-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Analyzing vehicle...
                    </motion.p>
                    <p className="text-[#c9a962] text-2xl font-bold tracking-wider">{regNumber}</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 glass">
                <nav className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-tight">
                        <span className="text-[#ededed]">FORGED</span>
                        <span className="text-gradient-bronze">VELOCI</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm text-[#a3a3a3] hover:text-[#ededed] transition-colors"
                    >
                        New Search
                    </Link>
                </nav>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Vehicle Info */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-[#737373] text-sm uppercase tracking-[0.2em] mb-3">Curated For</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#ededed] mb-2">
                        {vehicleData?.make} {vehicleData?.model}
                    </h1>
                    <p className="text-[#c9a962] text-lg">{vehicleData?.color}</p>
                </motion.div>

                {/* Product Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                >
                    {mockProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            className="group bg-[#141414] rounded-2xl overflow-hidden border border-[#242424] hover:border-[#c9a962]/30 transition-all duration-500"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Product Image */}
                            <div className="aspect-square bg-[#111] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Placeholder for wheel image */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-3/4 h-3/4 rounded-full border-4 border-[#333] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                                        <div className="w-1/3 h-1/3 rounded-full bg-[#0a0a0a] border-2 border-[#333]" />
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <p className="text-[#737373] text-xs uppercase tracking-wider mb-1">{product.finish}</p>
                                <h3 className="text-[#ededed] text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-[#525252] text-sm mb-4">
                                    {product.diameter}" × {product.width}"
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="text-[#c9a962] text-lg font-bold">
                                        {product.priceSek.toLocaleString("sv-SE")} SEK
                                    </p>
                                    <motion.button
                                        className="px-4 py-2 text-xs uppercase tracking-wider border border-[#333] rounded-full text-[#a3a3a3] hover:border-[#c9a962] hover:text-[#c9a962] transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="text-center mt-20 pt-12 border-t border-[#1a1a1a]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-[#737373] mb-4">Don&apos;t see what you&apos;re looking for?</p>
                    <Link href="/bespoke">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-[#c9a962] to-[#b8944f] text-[#0a0a0a] font-semibold rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enter Bespoke Studio
                        </motion.button>
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}

export default function CollectionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
            <CollectionContent />
        </Suspense>
    );
}
