"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Header from "./components/Header";
import HeroVideo from "./components/HeroVideo";
import ProductSection from "./components/ProductSection";
import TrustSection from "./components/TrustSection";

export default function Home() {
  const [regNumber, setRegNumber] = useState("");
  const [contentRevealed, setContentRevealed] = useState(false);
  const containerRef = useRef(null);

  const handleVideoEnd = useCallback(() => {
    setContentRevealed(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) {
      window.location.href = `/collection?reg=${encodeURIComponent(regNumber)}`;
    }
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <main className="relative bg-[#050505]">
        {/* HERO: THE MONOLITH */}
        <section className="relative h-screen w-full overflow-hidden" ref={containerRef}>
          <HeroVideo
            videoSrc="/Luxury_Automotive_Commercial_Generated.mp4"
            posterSrc="/hero-poster.png"
            onVideoEnd={handleVideoEnd}
          >
            {/* Brutalist Overlay Content */}
            <div className="hero-content-brutalist flex flex-col justify-between">

              {/* TOP: FORGED */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Apple ease
                className="relative z-10"
              >
                <h1 className="text-mega leading-none text-white opacity-90 drop-shadow-2xl">
                  FORGED
                </h1>
              </motion.div>

              {/* CENTER: INTERACTION LAYER */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <motion.div
                  className="pointer-events-auto"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {/* Magnetic CTA */}
                  <Link href="/bespoke" className="group relative flex items-center justify-center w-48 h-48 rounded-full border border-white/10 backdrop-blur-md bg-white/5 hover:bg-[#C8AA6E] transition-all duration-500 hover:scale-110">
                    <span className="sr-only">Configure</span>
                    <div className="text-xs font-bold uppercase tracking-[0.3em] flex flex-col items-center gap-2 group-hover:text-black transition-colors">
                      <span>Start</span>
                      <span>Config</span>
                      <svg className="w-4 h-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* BOTTOM: VELOCI + Search */}
              <div className="relative z-10 flex items-end justify-end">
                <div className="flex flex-col items-end w-full">

                  {/* Quick Search floating above text */}
                  <motion.div
                    className="mb-8 mr-2 md:mr-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-black/40 backdrop-blur-sm p-2 pr-6 border border-white/10">
                      <input
                        type="text"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                        placeholder="REG NR"
                        className="bg-transparent border-none text-xl font-display uppercase tracking-widest text-[#C8AA6E] w-32 text-center placeholder:text-white/20 focus:ring-0"
                      />
                      <button type="submit" className="text-xs uppercase tracking-widest text-white/60 hover:text-white">
                        Sök Bil
                      </button>
                    </form>
                  </motion.div>

                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h1 className="text-mega leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-[#C8AA6E] to-[#8f794a] opacity-90">
                      VELOCI
                    </h1>
                  </motion.div>
                </div>
              </div>

            </div>
          </HeroVideo>
        </section>

        {/* TRUST SECTION - REDESIGNED */}
        <TrustSection />

        {/* PRODUCT SPOTLIGHT */}
        <ProductSection />

        <footer className="bg-[#050505] py-20 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-[10vw] font-display text-[#111] leading-none select-none">FORGEDVELOCI</h2>
          </div>
        </footer>
      </main>
    </>
  );
}
