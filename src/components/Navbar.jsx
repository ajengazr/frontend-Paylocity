import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ headerOpacity }) => {
    const navigate = useNavigate();
    return (
        <motion.nav
            style={{ opacity: headerOpacity }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
        >
            <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="Paylocity Logo"
                        className="w-25 h-13 object-contain"
                    />
                </div>

                <div className="hidden md:flex items-center gap-10 text-[#1b1c1c]">
                    <a href="/" className="font-medium hover:text-[#ff6b00] transition-colors">
                        Beranda
                    </a>
                    <a href="/about" className="font-medium hover:text-[#ff6b00] transition-colors">
                        Tentang Kami
                    </a>
                    <a href="/help" className="font-medium hover:text-[#ff6b00] transition-colors">
                        Bantuan
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                    onClick={() => navigate('/login')}
                    className="hidden md:block text-sm px-5 py-2.5 border border-[#ff6b00] text-[#ff6b00] rounded-full hover:bg-[#ff6b00]/5 transition-all active:scale-95">
                        Masuk
                    </button>
                    <button 
                    onClick={() => navigate('/register')}
                    className="bg-[#ff6b00] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#e55e00] transition-all active:scale-95 flex items-center gap-2">
                        Daftar <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;