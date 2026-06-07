import { Clock } from "lucide-react";
import { ArrowLeft } from "lucide-react";

const AuthFormCard = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-75 sm:max-w-85">
      
      {/* Tombol Kembali — Mobile Only */}
      <a 
        href="/" 
        className="lg:hidden flex items-center gap-2 text-[#54606b] hover:text-[#ED5807] text-sm font-medium mb-4 transition-colors group w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Kembali ke Beranda
      </a>

      <div className="bg-white p-3 sm:p-5 rounded-xl border-2 sm:border-[3px] border-[#323E48] shadow-[3px_3px_0px_#323E48]">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-6 h-6 text-[#ED5807] shrink-0" strokeWidth={2.5} />
          <span className="text-base sm:text-lg font-bold text-[#323E48]">Paylocity</span>
        </div>

        <div className="mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#323E48] mb-0.5">{title}</h2>
          <p className="text-xs text-[#54606b]">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthFormCard;