import { useState } from 'react';
import { ROLE_CONFIG } from '../../data/dashboardConfig';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import DashboardContent from './DashboardContent';
import ProcessPayrollModal from './ProcessPayrollModal';
import useDashboardData from '../../hooks/useDashboardData';

const DashboardLayout = ({ role }) => {
    const config = ROLE_CONFIG[role];
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: dynamicData, loading, error } = useDashboardData(role);

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] text-[#151c27] p-4">
                <div className="text-center">
                    <p className="text-lg font-semibold text-red-500">Role "{role}" tidak dikenali</p>
                    <p className="text-sm text-gray-500 mt-2">Silakan hubungi administrator</p>
                </div>
            </div>
        );
    }


    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const mergedStats = config.stats.map((stat) => {
        if (!dynamicData) return stat;
        if (stat.label === 'Total Karyawan' && dynamicData.stats?.totalKaryawan) {
            return { ...stat, value: dynamicData.stats.totalKaryawan };
        }
        if (stat.label === 'Total Departemen' && dynamicData.stats?.totalDepartemen) {
            return { ...stat, value: dynamicData.stats.totalDepartemen };
        }
        return stat;
    });

    const mergedDonutData = dynamicData?.donutData?.length > 0
        ? dynamicData.donutData
        : config.donutData;

    const mergedTableData = dynamicData?.tableData?.length > 0
        ? dynamicData.tableData
        : config.tableData;

    const handleConfirm = () => {
        alert(config.isAdmin ? 'Proses payroll berhasil diinisiasi!' : 'Pengajuan lembur berhasil dikirim!');
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff]">
                <div className="w-8 h-8 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#151c27] text-[#ebf1ff]' : 'bg-[#f9f9ff] text-[#151c27]'
            }`}>
            <Sidebar
                menu={config.menu}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isDarkMode={isDarkMode}
                role={role}
            />

            {/* Main: padding kiri hanya di desktop, padding atas untuk mobile toggle */}
            <main className="min-h-screen flex flex-col lg:pl-64 pt-14 lg:pt-0">
                <TopHeader
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    userName={config.userName}
                    userRole={config.userRole}
                    userAvatar={config.userAvatar}
                />

                <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-360 mx-auto w-full grow">
                    {error && (
                        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                            {error} — Menampilkan data default
                        </div>
                    )}

                    <DashboardContent
                        activeTab={activeTab}
                        config={config}
                        isDarkMode={isDarkMode}
                        searchQuery={searchQuery}
                        role={role}
                        mergedStats={mergedStats}
                        mergedDonutData={mergedDonutData}
                        mergedTableData={mergedTableData}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </main>

            <ProcessPayrollModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                title={config.modalTitle}
                desc={config.modalDesc}
                btnConfirm={config.modalBtnConfirm}
                btnCancel={config.modalBtnCancel}
                isDarkMode={isDarkMode}
            />
        </div>
    );
};

export default DashboardLayout;