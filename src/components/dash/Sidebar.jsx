import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext'; // ← sesuaikan path
import { iconMap } from './iconMap';
import { Menu, X, AlertTriangle } from 'lucide-react';
import { Shield } from 'lucide-react';

const Sidebar = ({ menu, activeTab, setActiveTab, isDarkMode, role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false); // ← modal konfirmasi
    const { logout } = useAuth();
    const { showLoading, hideLoading } = useLoading(); // ← loading context
    const navigate = useNavigate();

    const handleNav = (name) => {
        setActiveTab(name);
        setIsOpen(false);
    };

    const handleAdmin = () => {
        setActiveTab('Kelola Admin');
        setIsOpen(false);
    }

    // Buka modal konfirmasi
    const handleLogoutClick = () => {
        setIsLogoutConfirmOpen(true);
    };

    // Tutup modal (batal)
    const cancelLogout = () => {
        setIsLogoutConfirmOpen(false);
    };

    // Konfirmasi logout → loading → logout
    const confirmLogout = async () => {
        setIsLogoutConfirmOpen(false);
        showLoading(); // tampilkan LoadingScreen

        // Delay 2.5 detik biar "keras" halaman loadingnya
        await new Promise(resolve => setTimeout(resolve, 2500));

        logout();        // reset auth state
        hideLoading();   // sembunyikan loading screen
        navigate('/login', { replace: true });
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden fixed top-4 left-4 z-60 p-2 rounded-lg border shadow-sm transition-all ${isDarkMode ? 'bg-[#1a2332] border-[#2d3748] text-white' : 'bg-white border-gray-200 text-[#151c27]'
                    }`}
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay Mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 z-55 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-56 flex flex-col justify-between border-r transition-all duration-300 ${isDarkMode ? 'bg-[#1a2332] border-[#2d3748]' : 'bg-white border-[#e5e7eb]'
                    } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } w-65 lg:w-64`}
            >
                <div>
                    <div className="p-5 lg:p-6">
                        <img src="/logo.png" alt="Paylocity Logo" className="w-16 h-auto mb-2 lg:w-20" />
                        <p className={`text-[10px] lg:text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            HRIS Payroll
                        </p>
                    </div>

                    <nav className="px-3 lg:px-4 space-y-0.5">
                        {menu.map((item) => {
                            const Icon = iconMap[item.icon];
                            const isActive = activeTab === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNav(item.name)}
                                    className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm font-medium rounded-lg transition-all ${isActive
                                        ? 'bg-[#ff6b00]/10 text-[#ff6b00]'
                                        : isDarkMode
                                            ? 'text-gray-300 hover:bg-[#2a3547]'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
                                    <span className="truncate">{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className={`p-3 lg:p-4 border-t transition-colors duration-300 ${isDarkMode ? 'border-[#2d3748]' : 'border-gray-200'
                    }`}>
                    
                        {/* ← TOMBOL KELOLA ADMIN: hanya SUPER_ADMIN */}
                        {role === 'SUPER_ADMIN' && (
                            <button 
                            onClick={handleAdmin}
                            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm font-medium rounded-lg transition-all ${isDarkMode ? 'text-gray-300 hover:bg-[#2a3547]' : 'text-gray-600 hover:bg-gray-100'
                                }`}>
                                <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                                Kelola Admin
                            </button>
                        )}

                        <button
                            onClick={handleLogoutClick}
                            className="w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm font-medium rounded-lg text-red-500 hover:bg-red-500/10 transition-all mt-1"
                        >
                            <iconMap.LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                            Keluar
                        </button>
                    </div>
            </aside>

            {/* Modal Konfirmasi Logout */}
            {isLogoutConfirmOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className={`w-full max-w-sm rounded-2xl border shadow-xl p-6 ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-[#151c27]'}`}>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-7 h-7 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Yakin Mau Keluar?</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Kamu akan diarahkan ke halaman login.
                                </p>
                            </div>
                            <div className="flex w-full gap-3 pt-2">
                                <button
                                    onClick={cancelLogout}
                                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${isDarkMode ? 'border-[#334155] text-gray-300 hover:bg-[#2a3547]' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-all flex items-center justify-center gap-2"
                                >
                                    Ya, Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;