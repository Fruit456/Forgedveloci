"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/collection", label: "Kollektion" },
        { href: "/bespoke", label: "Bespoke" },
        { href: "/about", label: "Om Oss" },
        { href: "/contact", label: "Kontakt" },
    ];

    return (
        <motion.header
            className={`header ${isScrolled ? "header-scrolled" : ""}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
            <div className="header-inner">
                {/* Logo */}
                <Link href="/" className="header-logo">
                    <div className="relative h-12 w-48 md:h-14 md:w-56 transition-all duration-300">
                        <Image
                            src="/LOGOvit.png"
                            alt="ForgedVeloci"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="header-nav">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="header-nav-link">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="header-cta">
                    <Link href="/collection" className="header-cta-button">
                        Hitta Fälgar
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="header-mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    className="header-mobile-menu"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="header-mobile-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.div>
            )}
        </motion.header>
    );
}
