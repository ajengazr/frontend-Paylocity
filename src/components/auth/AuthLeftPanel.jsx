// import { Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

const AuthLeftPanel = () => {
    return (
        <section className="hidden lg:flex lg:w-1/2 bg-[#ED5807] relative flex-col justify-center items-center p-6 overflow-hidden">

            {/* Tombol Kembali */}
            {/* <Link
                to="/"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/90 
                hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2.5 
                rounded-full text-sm font-medium transition-all border border-white/20 hover:border-white/40 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Kembali ke Beranda
            </Link> */}

            {/* Decorative */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">
                <div className="mb-6 xl:mb-8 transition-transform duration-500 hover:-translate-y-1">
                    <div className="w-40 h-40 xl:w-56 xl:h-56 bg-white rounded-[30%_70%_70%_30%/30%_30%_70%_70%] 
                    overflow-hidden border-4 border-[#323E48] shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
                        <img
                            alt="Welcome"
                            className="w-full h-full object-cover"
                            src="/src/assets/about.png"
                            loading="lazy"
                        />
                    </div>
                </div>

                <h1 className="text-2xl xl:text-4xl font-bold text-white mb-3 leading-tight">
                    Selamat datang di{' '} <br/>
                    <span className="underline decoration-white/30 decoration-4 underline-offset-8">
                        masa depan HR
                    </span>
                </h1>
                <p className="text-sm xl:text-base text-white/80 max-w-sm">
                    Kelola tenaga kerja Anda dengan lebih efisien, cepat, dan modern bersama Paylocity.
                </p>
            </div>
        </section>
    );
};

export default AuthLeftPanel;