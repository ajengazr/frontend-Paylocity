import { useState } from 'react';
import { ROLE_CONFIG } from '../../data/dashboardConfig';
import { iconMap } from './iconMap';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
// import StatCard from './StatCard';
// import PayrollChart from './PayrollChart';
// import EmployeeDistribution from './EmployeeDistribution';
// import OvertimeTable from './OvertimeTable';
// import ActivityLog from './ActivityLog';
// import PayrollSummary from './PayrollSummary';
// import ProcessPayrollModal from './ProcessPayrollModal';

const DashboardLayout = ({ role = 'admin' }) => {
    const config = ROLE_CONFIG[role];
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    // const handleConfirm = () => {
    //     alert(role === 'admin' ? 'Proses payroll berhasil diinisiasi!' : 'Pengajuan lembur berhasil dikirim!');
    //     setIsModalOpen(false);
    // };

    return (
        <div className={`min-h-screen font-sans flex transition-colors duration-300 ${isDarkMode ? 'bg-[#151c27] text-[#ebf1ff]' : 'bg-[#f9f9ff] text-[#151c27]'
            }`}>
            <Sidebar
                menu={config.menu}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isDarkMode={isDarkMode}
            />

            <main className="flex-1 pl-64 min-h-screen flex flex-col">
                <TopHeader
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    userName={config.userName}
                    userRole={config.userRole}
                    userAvatar={config.userAvatar}
                />

                <div className="p-8 space-y-8 max-w-[1440px] mx-auto w-full flex-grow">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Selamat datang kembali, {config.userName}. Berikut ringkasan untuk Anda.
                            </p>
                        </div>
                        <button
                            // onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-medium rounded-md shadow-sm flex items-center gap-2 transition-all active:scale-95 text-sm"
                        >
                            <iconMap.Plus className="w-4 h-4" />
                            {config.btnProcessLabel}
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* {config.stats.map((stat, i) => (
                            <StatCard key={i} {...stat} isDarkMode={isDarkMode} />
                        ))} */}
                    </div>

                    {/* Charts */}
                    {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <PayrollChart title={config.chartTitle} subtitle={config.chartSubtitle} isDarkMode={isDarkMode} />
                        </div>
                        <div>
                            <EmployeeDistribution title={config.donutTitle} data={config.donutData} isDarkMode={isDarkMode} />
                        </div>
                    </div> */}

                    {/* Table & Activity */}
                    {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <OvertimeTable
                                title={config.tableTitle}
                                columns={config.tableColumns}
                                data={config.tableData}
                                searchQuery={searchQuery}
                                isDarkMode={isDarkMode}
                                role={role}
                            />
                        </div>
                        <div>
                            <ActivityLog title={config.activityTitle} data={config.activityData} isDarkMode={isDarkMode} />
                        </div>
                    </div> */}

                    {/* Payroll Summary */}
                    {/* {config.showPayrollSummary && (
                        <PayrollSummary data={config.payrollSummary} isDarkMode={isDarkMode} />
                    )} */}
                </div>
            </main>

            {/* <ProcessPayrollModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                title={config.modalTitle}
                desc={config.modalDesc}
                btnConfirm={config.modalBtnConfirm}
                btnCancel={config.modalBtnCancel}
                isDarkMode={isDarkMode}
            /> */}
        </div>
    );
};

export default DashboardLayout;