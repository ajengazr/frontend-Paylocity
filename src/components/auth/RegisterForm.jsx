import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import AuthFormCard from './AuthFormCard';
import api from '../../config/api';
import { useLoading } from "../../contexts/LoadingContext";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: '',
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const { showLoading, hideLoading } = useLoading();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        hideLoading();   // ← tutup loading saat halaman baru dibuka
    }, [hideLoading]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        //Validasi confirmPassword di FE — tidak dikirim ke BE
        if (form.password !== form.confirmPassword) {
            setError('Kata sandi dan konfirmasi tidak cocok.');
            return;
        }

        showLoading();

        try {
            await api.post('/api/users/register', {
                username: form.username,
                companyName: form.companyName,
                email: form.email,
                password: form.password,
            });

            setSuccess('Akun berhasil dibuat! Mengalihkan ke halaman login...');
            hideLoading();
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (err) {
            console.error("Response data:", err.response?.data);
            const message = err.response?.data?.errors  // ← 'errors' bukan 'message'
                ?? 'Tidak dapat terhubung ke server. Coba lagi.';
            setError(message);
            hideLoading();
        } finally {
            hideLoading();
        }
    };

    return (
        <AuthFormCard title="Buat Akun">
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">

                {/* Error message */}
                {error && (
                    <div className="px-3 py-2 rounded-md bg-red-50 border border-red-200 text-[11px] text-red-600 font-medium">
                        {error}
                    </div>
                )}

                {/* Success message */}
                {success && (
                    <div className="px-3 py-2 rounded-md bg-green-50 border border-green-200 text-[11px] text-green-600 font-medium">
                        {success}
                    </div>
                )}

                {/* Nama Lengkap → username */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="username">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            id="username" name="username" type="text" required
                            placeholder="My Little Bolu Ketan"
                            value={form.username} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="email">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            id="email" name="email" type="email" required
                            placeholder="name@company.com"
                            value={form.email} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="password">Kata Sandi</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            id="password" name="password" type={showPassword ? 'text' : 'password'} required
                            placeholder="Min. 6 karakter"
                            value={form.password} onChange={handleChange}
                            className="w-full pl-9 pr-9 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#54606b] hover:text-[#323E48] transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]" htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            id="confirmPassword" name="confirmPassword" type="password" required
                            placeholder="••••••••"
                            value={form.confirmPassword} onChange={handleChange}
                            className={`w-full pl-9 pr-3 py-2 rounded-md border text-xs focus:ring-2 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed
                            ${form.confirmPassword && form.password !== form.confirmPassword
                                    ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-400'
                                    : 'border-[#e4e2de] bg-[#F6F4F0] focus:ring-[#ED5807]/20 focus:border-[#ED5807]'
                                }`}
                        />
                    </div>
                    {/* Inline hint saat password tidak cocok */}
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                        <p className="text-[10px] text-red-500 mt-0.5">Kata sandi tidak cocok</p>
                    )}
                </div>

                {/* Terms */}
                <div className="pt-0.5">
                    <label className="flex items-start gap-1.5 cursor-pointer select-none">
                        <input
                            type="checkbox" name="agreeTerms"
                            checked={form.agreeTerms} onChange={handleChange} required
                            className="w-3.5 h-3.5 rounded border-[#e4e2de] text-[#ED5807] focus:ring-[#ED5807] cursor-pointer shrink-0 mt-0.5"
                        />
                        <span className="text-[11px] text-[#54606b] leading-tight">
                            Saya setuju dengan{' '}
                            <a href="#terms" className="text-[#ED5807] font-semibold hover:underline">Syarat</a>
                            {' '}dan{' '}
                            <a href="#privacy" className="text-[#ED5807] font-semibold hover:underline">Kebijakan Privasi</a>
                        </span>
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-[#ED5807] hover:bg-[#d64f06] text-white font-semibold py-2.5 rounded-md text-xs border-2 border-[#323E48] shadow-[2px_2px_0px_#323E48] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                >
                    Buat Akun
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

        </AuthFormCard>
    );
};

export default RegisterForm;