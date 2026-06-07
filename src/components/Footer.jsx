const Footer = () => {
    return (
        <footer className="bg-[#fdefe6] text-gray-800 py-20">
            <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-4 gap-12">
                <div>
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Paylocity Logo"
                            className="w-24 h-12 object-contain"
                        />
                    </div>
                    <p className="text-sm leading-relaxed mt-4 text-gray-700 text-justify">
                        PAYLOCITY menyediakan solusi manajemen penggajian yang mudah dan terintegrasi untuk pemilik usaha, staff HR, dan karyawan dengan harga terjangkau.
                    </p>
                </div>

                <div>
                    <div className="font-semibold mb-5 text-[#1b1c1c]">PRODUK</div>
                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Fitur Penggajian</div>
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Pajak PPh 21</div>
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Manajemen Absensi</div>
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">AI Insights</div>
                    </div>
                </div>

                <div>
                    <div className="font-semibold mb-5 text-[#1b1c1c]">PERUSAHAAN</div>
                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Tentang Kami</div>
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Karier</div>
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Partnership</div>
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Kontak Kami</div>
                    </div>
                </div>

                <div>
                    <div className="font-semibold mb-5 text-[#1b1c1c]">BANTUAN & LOKASI</div>
                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Pusat Bantuan</div>
                        <div className="hover:text-[#ff6b00] transition-colors cursor-pointer">Keamanan Data</div>
                        <div className="pt-2">
                            The East Tower, Lt 37, Jakarta Selatan<br />
                            12950 - Indonesia
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-orange-200/60 mt-16 pt-8 text-xs text-center text-gray-500">
                © 2024 PAYLOCITY. Semua Hak Dilindungi.
            </div>
        </footer>
    );
};

export default Footer;