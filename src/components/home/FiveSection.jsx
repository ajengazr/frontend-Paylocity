import { motion } from 'framer-motion';

const FiveSection = () => {
    return (
        <section className="py-24 bg-[#fbf9f8]">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-linear-to-br from-[#ff6b00] to-[#e55e00] rounded-[2.5rem] p-12 md:p-16 text-white text-center shadow-[0_20px_60px_rgba(255,107,0,0.25)]"
                >
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-6">
                        Siap Mendigitalisasi Payroll Anda?
                    </h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan perusahaan di Indonesia yang telah beralih ke efisiensi maksimal bersama PAYLOCITY.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-white text-[#ff6b00] font-semibold text-lg px-12 py-5 rounded-2xl hover:shadow-2xl transition-all"
                        >
                            <a href="/register">Coba Gratis Sekarang</a>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FiveSection;