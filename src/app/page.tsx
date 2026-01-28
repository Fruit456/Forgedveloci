"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [regNumber, setRegNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  // Simulate video loading for the effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) {
      window.location.href = `/collection?reg=${encodeURIComponent(regNumber)}`;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#000000]">

      {/* 1. CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-[2000ms] ${isVideoLoaded ? 'opacity-60' : 'opacity-0'}`}
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          {/* Placeholder for the premium wheel reveal video */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Grain Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      </div>

      {/* 2. INTRO SEQUENCE & CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">

        {/* A. Brand Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="block font-display text-small uppercase tracking-[0.5em] text-[#888] mb-4">
            The Bespoke Atelier
          </span>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-tight">
            Forged<span className="text-[#d4b896] italic pr-2">Veloci</span>
          </h1>
        </motion.div>

        {/* B. The Interaction (Search) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
          className="w-full max-w-xl"
        >
          <form onSubmit={handleSubmit} className="group relative">
            {/* The "Line" Input Visual */}
            <div className="relative grid place-items-center">
              <input
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="REG NUMBER"
                className="w-full bg-transparent border-b border-white/20 py-4 text-center text-2xl md:text-3xl font-display text-white placeholder-white/20 focus:outline-none focus:border-[#d4b896] transition-all duration-700 uppercase tracking-[0.2em]"
              />

              {/* Subtle Search Button (Appears when typing) */}
              <AnimatePresence>
                {regNumber.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    type="submit"
                    className="absolute right-0 bottom-4 text-[#d4b896] hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-[#666] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              Mata in ditt registreringsnummer
            </p>
          </form>
        </motion.div>

        {/* C. Bottom Navigation / Explore */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-12 left-0 right-0 flex justify-between items-end px-12"
        >
          <div className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#444]">
            Est. 2024 / Stockholm
          </div>

          <div className="mx-auto md:mx-0">
            <Link href="/collection">
              <button className="group flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#888] group-hover:text-[#d4b896] transition-colors duration-500">
                  Utforska Kollektionen
                </span>
                <div className="w-px h-12 bg-white/10 group-hover:h-16 group-hover:bg-[#d4b896] transition-all duration-700" />
              </button>
            </Link>
          </div>

          <div className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#444] text-right">
            Scroll för ljud
          </div>
        </motion.div>

      </div>
    </div>
  );
}
