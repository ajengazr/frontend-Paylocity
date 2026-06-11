import { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import AuthFormCard from './AuthFormCard';
import adminApi from '../../config/adminApi';
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from '../../contexts/ToastContext';

const RegisterForm = ({
    isModal = false,
    onClose,
    onSuccess,
}) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { showLoading, hideLoading } = useLoading();
    const { addToast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        hideLoading();
    }, [hideLoading]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            setError('Kata sandi dan konfirmasi tidak cocok.');
            return;
        }

        showLoading();

        try {
            await adminApi.create({
                username: form.username,
                email: form.email,
                password: form.password,
                role: 'HR_ADMIN', // ← HARDCODE: selalu HR_ADMIN
            }); 

            setSuccess('Admin berhasil ditambahkan!');
            addToast('Admin berhasil ditambahkan!', 'success');

            setTimeout(() => {
                onSuccess?.();
            }, 800);

        } catch (err) {
            const message = err.response?.data?.errors ?? 'Gagal menambahkan admin.';
            setError(message);
            addToast(message, 'error');
        } finally {
            hideLoading();
        }
    };

    const cardContent = (
        <AuthFormCard title="Tambah Admin" subtitle="Buat akun admin untuk mengakses sistem">
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">

                {error && (
                    <div className="px-3 py-2 rounded-md bg-red-50 border border-red-200 text-[11px] text-red-600 font-medium">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="px-3 py-2 rounded-md bg-green-50 border border-green-200 text-[11px] text-green-600 font-medium">
                        {success}
                    </div>
                )}

                {/* Username */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            name="username" type="text" required
                            placeholder="Masukkan username"
                            value={form.username} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs text-[#323E48] focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            name="email" type="email" required
                            placeholder="admin@company.com"
                            value={form.email} onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs text-[#323E48] focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]">Kata Sandi</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            name="password" type={showPassword ? 'text' : 'password'} required
                            placeholder="Min. 6 karakter"
                            value={form.password} onChange={handleChange}
                            className="w-full pl-9 pr-9 py-2 rounded-md border border-[#e4e2de] bg-[#F6F4F0] text-xs text-[#323E48] focus:ring-2 focus:ring-[#ED5807]/20 focus:border-[#ED5807] outline-none transition-all"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#54606b] hover:text-[#323E48] transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-[#54606b]">Konfirmasi Kata Sandi</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54606b] pointer-events-none" />
                        <input
                            name="confirmPassword" type="password" required
                            placeholder="••••••••"
                            value={form.confirmPassword} onChange={handleChange}
                            className={`w-full pl-9 pr-3 py-2 rounded-md border text-xs text-[#323E48] focus:ring-2 outline-none transition-all
                            ${form.confirmPassword && form.password !== form.confirmPassword
                                    ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-400'
                                    : 'border-[#e4e2de] bg-[#F6F4F0] focus:ring-[#ED5807]/20 focus:border-[#ED5807]'
                                }`}
                        />
                    </div>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                        <p className="text-[10px] text-red-500 mt-0.5">Kata sandi tidak cocok</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-[#ED5807] hover:bg-[#d64f06] text-white font-semibold py-2.5 rounded-md text-xs border-2 border-[#323E48] shadow-[2px_2px_0px_#323E48] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 group mt-1"
                >
                    Buat Akun
                </button>
            </form>
        </AuthFormCard>
    );

    // Kalau modal: bungkus dengan backdrop + tombol X
    if (isModal) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="relative w-full max-w-85">
                    <button
                        onClick={onClose}
                        className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white border-2 border-[#323E48] shadow-[2px_2px_0px_#323E48] flex items-center justify-center text-[#323E48] hover:text-[#ED5807] transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {cardContent}
                </div>
            </div>
        );
    }

    return cardContent;
};

export default RegisterForm;