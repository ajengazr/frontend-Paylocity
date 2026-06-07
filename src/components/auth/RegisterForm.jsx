import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Building2 } from 'lucide-react';
import AuthFormCard from './AuthFormCard';

const RegisterForm = () => {
    const [form, setForm] = useState({
        fullName: '',
        company: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <AuthFormCard title="Buat Akun" subtitle="Mulai uji coba gratis 14 hari">
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">

                {/* Nama Lengkap */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="fullName">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input id="fullName" name="fullName" type="text" required placeholder="My Little Bolu Ketan"
                            value={form.fullName} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Nama Perusahaan */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="company">Nama Perusahaan</label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input id="company" name="company" type="text" required placeholder="PT Paylocity"
                            value={form.company} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="email">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input id="email" name="email" type="email" required placeholder="name@company.com"
                            value={form.email} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="password">Kata Sandi</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input id="password" name="password" type={showPassword ? 'text' : 'password'} required placeholder="Min. 8 characters"
                            value={form.password} onChange={handleChange}
                            className="w-full pl-9 pr-9 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#54606b] hover:text-[#323E48] transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input id="confirmPassword" name="confirmPassword" type="password" required placeholder="••••••••"
                            value={form.confirmPassword} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Terms */}
                <div className="pt-0.5">
                    <label className="flex items-start gap-1.5 cursor-pointer select-none">
                        <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required
                            className="w-3.5 h-3.5 rounded border-[#e4e2de] text-[#ED5807] focus:ring-[#ED5807] cursor-pointer shrink-0 mt-0.5"
                        />
                        <span className="text-[11px] text-[#54606b] leading-tight">
                            Saya setuju dengan <a href="#terms" className="text-[#ED5807] font-semibold hover:underline">Syarat</a> dan <a href="#privacy" className="text-[#ED5807] font-semibold hover:underline">Kebijakan Privasi</a>
                        </span>
                    </label>
                </div>

                {/* Submit */}
                <button type="submit" className="w-full bg-[#ED5807] hover:bg-[#d64f06] text-white font-semibold py-2.5 rounded-md text-xs border-2 border-[#323E48] shadow-[2px_2px_0px_#323E48] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                    Buat Akun
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            <p className="mt-4 text-center text-[11px] text-[#54606b]">
                Sudah Punya Akun?{' '}
                <a href="/login" className="text-[#ED5807] font-bold hover:underline underline-offset-4">Masuk</a>
            </p>
        </AuthFormCard>
    );
};

export default RegisterForm;