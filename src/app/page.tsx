"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [regNumber, setRegNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) {
      window.location.href = `/collection?reg=${encodeURIComponent(regNumber)}`;
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Video Background */}
      <div className="video-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Top light beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-[#d4b896]/5 via-transparent to-transparent blur-3xl" />
        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse, rgba(212, 184, 150, 0.03) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="absolute inset-0 glass"
          style={{ opacity: headerOpacity }}
        />
        <nav className="relative max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-display text-2xl tracking-wide text-white">Forged</span>
              <span className="font-display text-2xl tracking-wide text-gradient-gold">Veloci</span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/collection" className="link-underline text-[13px] uppercase tracking-[0.2em] text-[#808080] hover:text-white transition-colors duration-500">
              Kollektion
            </Link>
            <Link href="/bespoke" className="link-underline text-[13px] uppercase tracking-[0.2em] text-[#808080] hover:text-white transition-colors duration-500">
              Ateljé
            </Link>
            <Link href="/craftsmanship" className="link-underline text-[13px] uppercase tracking-[0.2em] text-[#808080] hover:text-white transition-colors duration-500">
              Hantverk
            </Link>
          </div>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="hidden md:block text-[12px] uppercase tracking-[0.15em] px-6 py-3 border border-[#333] text-[#a0a0a0] hover:border-[#d4b896] hover:text-[#d4b896] transition-all duration-500"
            >
              Kontakt
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      {/* Main Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Tagline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.4em] text-[#606060] border-b border-[#303030] pb-2">
            Smidda för Perfektion
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-center mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-2">
            Hitta Dina
          </span>
          <span className="block font-display text-5xl md:text-7xl lg:text-8xl text-gradient-gold leading-[1.1] italic">
            Perfekta Fälgar
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[#707070] text-base md:text-lg text-center max-w-xl mb-14 leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Ange ditt registreringsnummer och låt oss kurera de perfekta smidda fälgarna för ditt fordon.
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className={`relative ${isFocused ? 'glow-gold-subtle' : ''} transition-all duration-700`}>
            {/* Decorative corners */}
            <div className="absolute -top-px -left-px w-8 h-8 border-t border-l border-[#d4b896]/30" />
            <div className="absolute -top-px -right-px w-8 h-8 border-t border-r border-[#d4b896]/30" />
            <div className="absolute -bottom-px -left-px w-8 h-8 border-b border-l border-[#d4b896]/30" />
            <div className="absolute -bottom-px -right-px w-8 h-8 border-b border-r border-[#d4b896]/30" />

            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="ABC 123"
              className="input-luxury w-full px-8 py-6 text-xl md:text-2xl"
            />
          </div>

          <motion.button
            type="submit"
            className="btn-premium w-full mt-6"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Sök Fälgar
          </motion.button>
        </motion.form>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <Link href="/bespoke">
            <motion.span
              className="inline-flex items-center gap-3 text-[#505050] hover:text-[#d4b896] transition-all duration-500 cursor-pointer group"
            >
              <span className="w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
              <span className="text-[12px] uppercase tracking-[0.2em]">Skapa din egen design</span>
              <span className="w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#404040]">Scrolla</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#404040] to-transparent" />
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section Peek */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <div className="text-center p-8">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4b896]/50 to-transparent mx-auto mb-8" />
              <h3 className="font-display text-xl text-white mb-4">Smitt Aluminium</h3>
              <p className="text-[#606060] text-sm leading-relaxed">
                Varje fälg smides från 6061-T6 aluminium i en process som tar över 12 timmar per hjul.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4b896]/50 to-transparent mx-auto mb-8" />
              <h3 className="font-display text-xl text-white mb-4">Svensk Precision</h3>
              <p className="text-[#606060] text-sm leading-relaxed">
                Tillverkade i Sverige med samma precision som våra kunder förväntar sig av sina bilar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4b896]/50 to-transparent mx-auto mb-8" />
              <h3 className="font-display text-xl text-white mb-4">Livstidsgaranti</h3>
              <p className="text-[#606060] text-sm leading-relaxed">
                Vi står bakom varje fälg vi skapar med en omfattande livstidsgaranti.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-[5] pointer-events-none" />
    </div>
  );
}
