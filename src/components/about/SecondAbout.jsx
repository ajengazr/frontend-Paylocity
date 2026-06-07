import { motion } from 'framer-motion';
import { staggerContainer } from '../../animations/variants';

const SecondAbout = () => {
    const row1 = [
        { name: 'SWA', src: "https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/632434eec2620f7d72fd1894_swasembada.webp" },
        { name: 'Bisnis.com', src: "https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/63243518a93f6074057e6454_bisniscom.webp" },
        { name: 'The Jakarta Post', src: "https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/6324352c076c9a2c432749a4_thejakartapost.webp" },
        { name: 'CNN Indonesia', src: "https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/63243541b1f2162ab8f141b1_cnn.webp" },
        { name: 'kumparanTech', src: "https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/632435515346e4f66475c1b7_kumparan.png" },
        { name: 'Hukum Online', src: "https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/63243566dcbfdd56fc6ff782_hukumonline.svg" },
        { name: 'Marketeeers', src: 'https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/6324357788eeaad40ad0d862_marketeers.png' },
        { name: 'INFOKOMPUTER', src: 'https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/63243582faa2fac9957f7b3f_infokomputer.webp' },
        { name: 'indotelko.com', src: 'https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/63243594a18e6b8f1c5c13d3_indotelko.webp' },
        { name: 'nextren', src: 'https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/63243793fee7c353c4f2b47a_nextren.png' },
        { name: 'SINDOnews.com', src: 'https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/632438858fb1dcce4f97f047_sindonews.webp' },
        { name: 'DailySocial', src: 'https://cdn.prod.website-files.com/608288e274cb77550e8d4e73/63243a2a8fb1dc973b97fe42_dailysocial.png' }
    ];

    const LogoItem = ({ src, name }) => (
        <div className="flex items-center justify-center p-4">
            <img
                src={src}
                alt={name}
                className="max-h-10 md:max-h-12 w-auto object-contain "
                draggable={false}
            />
        </div>
    );

    return (
        <div className="pt-24 pb-20 bg-linear-to-br from-[#fdefe6] via-white to-[#E9F5FE] min-h-screen">
            <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[auto_1fr] gap-35 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <img
                        src="/logo.png"
                        alt="Paylocity Logo"
                        className="w-full max-w-65 h-full rounded-3xl"
                    />
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-5"
                >
                    <p className="text-xl font-bold text-gray-600 ">
                        Filosopi Nama ...
                    </p>

                    <h1 className="text-xl md:text-3xl font-bold leading-tight tracking-tighter 
                    bg-linear-to-r from-[#ff6b00] via-[#ec4899] to-[#3b82f6] 
                    bg-clip-text text-transparent">
                        <span>
                            PAYLOCITY berasal dari gabungan kata <i>"Pay"</i> dan <i>"Velocity"</i>
                        </span>
                    </h1>
                    <p className="text-gray-600 text-justify">
                        <i>Pay</i> melambangkan proses penggajian yang akurat, transparan, dan tepat waktu. Sedangkan <i>Velocity</i> berarti kecepatan dan percepatan.
                        Kombinasi keduanya mencerminkan komitmen Paylocity untuk membantu perusahaan mengelola payroll dan administrasi SDM secara lebih cepat, efisien, dan modern.
                    </p>

                    <h1 className="text-xl md:text-3xl font-bold leading-tight tracking-tighter 
                    bg-linear-to-r from-[#ff6b00] via-[#ec4899] to-[#3b82f6] 
                    bg-clip-text text-transparent">
                        <span>
                            PAYLOCITY memiliki filosofi "Payroll with Velocity"
                        </span>
                    </h1>
                    <p className=" text-gray-600 text-justify">
                        Paylocity percaya bahwa proses penggajian bukan hanya tentang menghitung gaji, tetapi juga tentang memberikan pengalaman kerja yang lebih baik bagi seluruh karyawan.
                        Dengan menggabungkan teknologi dan efisiensi operasional, Paylocity membantu perusahaan mempercepat proses payroll, mengurangi risiko kesalahan, serta meningkatkan produktivitas tim HR.
                    </p>
                </motion.div>
            </div>


            {/* // section 2 */}
            <div className="max-w-6xl mx-auto px-5 mt-25 grid md:grid-cols-[1fr_auto] gap-12 items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-5"
                >
                    <p className="text-xl font-bold text-gray-600">
                        Paylocity percaya ...
                    </p>
                    <h1 className="text-xl md:text-3xl font-bold leading-tight tracking-tighter bg-linear-to-r from-[#ff6b00] via-[#ec4899] to-[#3b82f6] bg-clip-text text-transparent">
                        Sistem penggajian otomatis adalah kunci menuju proses yang lebih efisien
                    </h1>
                    <p className=" text-gray-600 text-justify">
                        Karena dengan sistem penggajian yang terautomasi, perusahaan dapat membebaskan waktu dan sumber daya manusia
                        yang terdedikasi dari beban kerja repetitif seperti penggajian, dan fokus kepada hal yang lebih strategis.
                    </p>

                    <h1 className="text-xl md:text-3xl font-bold leading-tight tracking-tighter bg-linear-to-r from-[#ff6b00] via-[#ec4899] to-[#3b82f6] bg-clip-text text-transparent">
                        Solusi penggajian Swift, Simple, dan Secure
                    </h1>
                    <p className=" text-gray-600 text-justify">
                        Adalah kunci bagi sebuah platform penggajian terbaik bagi perusahaan Anda. Karena itu,
                        PAYLOCITY selalu berkomitmen untuk memperhatikan keamanan data penggunanya sekaligus memberikan pengalaman proses penggajian yang cepat dan mudah digunakan bagi perusahaan Anda.
                    </p>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-full max-w-70">
                        <div className="overflow-hidden aspect-auto flex items-center justify-center ">
                            <img
                                src="/src/assets/about.png"
                                alt="About"
                                className="w-full h-full object-cover rounded-3xl"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto px-5 mt-25 justify-center items-center">
                <p className="text-xl font-bold text-gray-600 text-center">
                    PAYLOCITY telat diliput oleh berbagai media di Indonesia
                </p>
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-6 gap-6 mt-15 "
                >
                    {row1.map((logo, i) => (
                        <LogoItem key={i} {...logo} />
                    ))}
                </motion.div>

            </div>
        </div >

    );
};

export default SecondAbout;