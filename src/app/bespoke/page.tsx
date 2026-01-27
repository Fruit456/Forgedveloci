"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function BespokePage() {
    const [formData, setFormData] = useState({
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        desiredSize: "",
        desiredFinish: "",
        notes: "",
        email: "",
        disclaimerAccepted: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.disclaimerAccepted) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
                <motion.div
                    className="text-center max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <motion.div
                        className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#c9a962]/10 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                    >
                        <svg className="w-10 h-10 text-[#c9a962]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                    <h1 className="text-3xl font-bold text-[#ededed] mb-4">Request Submitted</h1>
                    <p className="text-[#a3a3a3] mb-8">
                        Our engineering team will review your bespoke request and contact you within 48 hours with a quote.
                    </p>
                    <Link href="/">
                        <motion.button
                            className="px-8 py-4 border border-[#333] text-[#ededed] rounded-full hover:border-[#c9a962] transition-colors"
                            whileHover={{ scale: 1.05 }}
                        >
                            Return Home
                        </motion.button>
                    </Link>
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
                        href="/collection"
                        className="text-sm text-[#a3a3a3] hover:text-[#ededed] transition-colors"
                    >
                        View Collection
                    </Link>
                </nav>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-[#c9a962] text-sm uppercase tracking-[0.3em] mb-4">Bespoke Studio</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#ededed] mb-4">
                            Create Your Vision
                        </h1>
                        <p className="text-[#a3a3a3] text-lg">
                            Commission a unique set of forged wheels, tailored to your exact specifications.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Vehicle Section */}
                        <div className="space-y-4">
                            <h2 className="text-[#ededed] text-lg font-semibold border-b border-[#1a1a1a] pb-2">
                                Vehicle Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#737373] text-sm mb-2">Make</label>
                                    <input
                                        type="text"
                                        name="vehicleMake"
                                        value={formData.vehicleMake}
                                        onChange={handleChange}
                                        placeholder="e.g., BMW"
                                        required
                                        className="w-full px-4 py-3 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#737373] text-sm mb-2">Model</label>
                                    <input
                                        type="text"
                                        name="vehicleModel"
                                        value={formData.vehicleModel}
                                        onChange={handleChange}
                                        placeholder="e.g., M4 Competition"
                                        required
                                        className="w-full px-4 py-3 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#737373] text-sm mb-2">Year</label>
                                <input
                                    type="text"
                                    name="vehicleYear"
                                    value={formData.vehicleYear}
                                    onChange={handleChange}
                                    placeholder="e.g., 2024"
                                    className="w-full px-4 py-3 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Wheel Specifications */}
                        <div className="space-y-4">
                            <h2 className="text-[#ededed] text-lg font-semibold border-b border-[#1a1a1a] pb-2">
                                Wheel Specifications
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#737373] text-sm mb-2">Desired Size</label>
                                    <select
                                        name="desiredSize"
                                        value={formData.desiredSize}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg"
                                    >
                                        <option value="">Select size</option>
                                        <option value="18">18 inch</option>
                                        <option value="19">19 inch</option>
                                        <option value="20">20 inch</option>
                                        <option value="21">21 inch</option>
                                        <option value="22">22 inch</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#737373] text-sm mb-2">Finish Preference</label>
                                    <input
                                        type="text"
                                        name="desiredFinish"
                                        value={formData.desiredFinish}
                                        onChange={handleChange}
                                        placeholder="e.g., Brushed Bronze"
                                        className="w-full px-4 py-3 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#737373] text-sm mb-2">Additional Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Describe your vision, inspiration, or specific requirements..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg resize-none"
                                />
                            </div>
                        </div>

                        {/* Upload Zone (placeholder) */}
                        <div className="space-y-4">
                            <h2 className="text-[#ededed] text-lg font-semibold border-b border-[#1a1a1a] pb-2">
                                Reference Image
                            </h2>

                            <motion.div
                                className="border-2 border-dashed border-[#333] rounded-xl p-8 text-center cursor-pointer hover:border-[#c9a962]/50 transition-colors"
                                whileHover={{ scale: 1.01 }}
                            >
                                <svg className="w-12 h-12 mx-auto text-[#525252] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-[#737373] mb-1">Drop an inspiration image here</p>
                                <p className="text-[#525252] text-sm">or click to browse</p>
                            </motion.div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-4">
                            <h2 className="text-[#ededed] text-lg font-semibold border-b border-[#1a1a1a] pb-2">
                                Contact
                            </h2>

                            <div>
                                <label className="block text-[#737373] text-sm mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-4 py-3 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6">
                            <label className="flex items-start gap-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="disclaimerAccepted"
                                    checked={formData.disclaimerAccepted}
                                    onChange={handleChange}
                                    className="mt-1 w-5 h-5 rounded border-[#333] bg-[#0a0a0a] text-[#c9a962] focus:ring-[#c9a962] focus:ring-offset-0"
                                />
                                <span className="text-[#a3a3a3] text-sm leading-relaxed">
                                    <strong className="text-[#ededed]">Important:</strong> I understand that Forgedveloci creates unique interpretations based on my inspiration.
                                    The final product will be an original Forgedveloci design, not a replica of any referenced wheels.
                                </span>
                            </label>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={!formData.disclaimerAccepted || isSubmitting}
                            className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${formData.disclaimerAccepted
                                    ? "bg-gradient-to-r from-[#c9a962] to-[#b8944f] text-[#0a0a0a] cursor-pointer"
                                    : "bg-[#242424] text-[#525252] cursor-not-allowed"
                                }`}
                            whileHover={formData.disclaimerAccepted ? { scale: 1.02 } : {}}
                            whileTap={formData.disclaimerAccepted ? { scale: 0.98 } : {}}
                        >
                            {isSubmitting ? (
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Submitting...
                                </motion.span>
                            ) : (
                                "Request Engineering Quote"
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </main>
        </div>
    );
}
