"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [regNumber, setRegNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) {
      // Navigate to collection with reg number
      window.location.href = `/collection?reg=${encodeURIComponent(regNumber)}`;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Video Background */}
      <div className="video-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video-poster.jpg"
        >
          {/* Replace with actual video URL from Azure Blob Storage */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Ambient Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/90" />

      {/* Subtle Bronze Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(201, 169, 98, 0.03) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-[#ededed]">FORGED</span>
            <span className="text-gradient-bronze">VELOCI</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm text-[#a3a3a3]">
            <Link href="/collection" className="hover:text-[#ededed] transition-colors duration-300">
              Collection
            </Link>
            <Link href="/bespoke" className="hover:text-[#ededed] transition-colors duration-300">
              Bespoke Studio
            </Link>
            <Link href="/about" className="hover:text-[#ededed] transition-colors duration-300">
              Craftsmanship
            </Link>
          </div>

          <motion.button
            className="hidden md:block px-6 py-2 text-sm border border-[#333] rounded-full text-[#ededed] hover:border-[#c9a962] hover:text-[#c9a962] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact
          </motion.button>
        </nav>
      </motion.header>

      {/* Main Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Tagline */}
        <motion.p
          className="text-[#737373] text-sm uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Forged for Velocity
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-8 leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-[#ededed]">Find Your</span>
          <br />
          <span className="text-gradient-bronze">Perfect Wheels</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[#a3a3a3] text-lg md:text-xl text-center max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Enter your registration number and let our AI curate the perfect forged wheels for your vehicle.
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className={`relative group ${isFocused ? 'glow-bronze' : ''} transition-all duration-500 rounded-full`}>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter Registration Number"
              className="w-full px-8 py-5 text-lg md:text-xl bg-[#141414]/80 backdrop-blur-xl border border-[#333] rounded-full text-[#ededed] placeholder-[#525252] focus:border-[#c9a962] transition-all duration-300 pr-36"
              style={{ letterSpacing: "0.1em" }}
            />
            <motion.button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-[#c9a962] to-[#b8944f] text-[#0a0a0a] font-semibold rounded-full text-sm tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </div>
        </motion.form>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link href="/bespoke">
            <motion.span
              className="inline-flex items-center gap-2 text-[#737373] hover:text-[#c9a962] transition-colors duration-300 cursor-pointer group"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm tracking-wide">Enter Bespoke Studio</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.span>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-[#333] rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-[#c9a962] rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />
    </div>
  );
}
