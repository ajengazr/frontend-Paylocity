import { motion } from 'framer-motion';
import { faqData } from '../../data/faqData';
import FAQItem from './FAQItem';

const FaqSection = () => {
    return (
        <section className="py-16 md:py-24 bg-[#fbf9f8]">
            <div className="max-w-3xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b1c1c] tracking-tight">
                        Pertanyaan yang Sering{" "}
                        <span className="bg-linear-to-r from-[#ff6b00] via-[#ec4899] to-[#3b82f6] bg-clip-text text-transparent">
                            Diajukan
                        </span>
                    </h2>
                    <p className="mt-4 text-gray-600 text-base md:text-lg max-w-xl mx-auto">
                        Temukan jawaban cepat seputar fitur, keamanan, dan cara menggunakan Paylocity.
                    </p>
                </motion.div>

                <div className="space-y-3 md:space-y-4">
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;