import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleQuestion } from 'lucide-react';
import { faqData } from '../../data/faqData';

const FaqSection = ({ searchQuery }) => {
    const filteredFAQs = useMemo(() => {
        if (!searchQuery.trim()) return faqData;

        const lower = searchQuery.toLowerCase();
        return faqData.filter(item =>
            item.question.toLowerCase().includes(lower) ||
            item.answer.toLowerCase().includes(lower)
        );
    }, [searchQuery]);

    return (
        <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
            {searchQuery && (
                <p className="text-sm text-gray-500 mb-6">
                    Menampilkan {filteredFAQs.length} hasil untuk "{searchQuery}"
                </p>
            )}

            <AnimatePresence mode="popLayout">
                {filteredFAQs.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-16"
                    >
                        <MessageCircleQuestion className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-lg font-medium">Tidak ada hasil yang cocok</p>
                        <p className="text-gray-400 text-sm mt-1">Coba kata kunci lain</p>
                    </motion.div>
                ) : (
                    <div className="space-y-3">
                        {filteredFAQs.map((faq, index) => (
                            <motion.details
                                key={faq.question}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.03 }}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden open:shadow-md transition-shadow"
                            >
                                <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none hover:bg-gray-50/50 transition-colors">
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800 pr-4">
                                        {faq.question}
                                    </h3>
                                    <svg
                                        className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                    {faq.answer}
                                </div>
                            </motion.details>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FaqSection;