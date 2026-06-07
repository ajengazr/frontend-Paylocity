import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '../../animations/variants';

const HeroSection = () => {
    const words = [
        "Bekerja Keras",
        "Cerdas",
        "Efisien",
        "Cepat",
        "Akurat",
        "Otomatis",
        "Terintegrasi"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <section className="pt-24 pb-20 bg-linear-to-br from-[#fbf9f8] via-white to-[#E9F5FE] min-h-screen flex items-center">
            <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-sm border">
                        <span className="text-emerald-600">●</span>
                        Aplikasi Payroll Tercepat di Indonesia
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1b1c1c] tracking-tighter">
                        Proses Payroll & HR yang{' '}
                        <span
                            className="relative inline-block overflow-hidden h-[1.25em] align-bottom text-[#ff6b00]"
                            style={{ perspective: '600px' }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: 50, opacity: 0, rotateX: -30 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: -50, opacity: 0, rotateX: 30 }}
                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                    className="inline-block whitespace-nowrap"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>{' '}
                        <p>Seperti Anda.</p>

                    </h1>

                    <p className="text-xl text-gray-600 max-w-lg">
                        Tingkatkan efisiensi operasional Anda dengan sistem manajemen SDM yang cerdas, otomatis, dan terintegrasi penuh untuk masa depan bisnis Anda.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#ff6b00] hover:bg-[#e55e00] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 group transition-all shadow-xl shadow-[#ff6b00]/20"
                            >
                                Hubungi Kami
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </a>

                        <a href="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="border-2 border-[#ff6b00] text-[#ff6b00] px-8 py-4 rounded-2xl font-semibold hover:bg-[#ff6b00]/5 transition-all"
                            >
                                Pelajari Lebih Lanjut
                            </motion.button>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-full max-w-105">
                        <div className="bg-white rounded-3xl overflow-hidden aspect-square flex items-center justify-center ">

                            <img
                                src="https://plus.unsplash.com/premium_photo-1779747617945-e9a831cfad95?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Paylocity Logo"
                                className="w-full h-full object-cover rounded-3xl"
                            />
                        </div>

                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -bottom-4 right-8 bg-white rounded-2xl px-6 py-3 shadow-xl flex items-center gap-3"
                        >
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="font-semibold text-sm">Hanya 1 Menit*</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;