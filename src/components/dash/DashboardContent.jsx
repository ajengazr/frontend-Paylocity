import StatCard from './StatCard';
import PayrollChart from './PayrollChart';
import EmployeeDistribution from '../employee/EmployeeDistribution';
import OvertimeTable from './OvertimeTable';
import ActivityLog from './ActivityLog';
import PayrollSummary from './PayrollSummary';
import EmployeeCrud from '../employee/EmployeeCrud';
import DepartmentCrud from '../DepartmentCrud';
import PositionCrud from '../PositionCrud';
import AdminCrud from '../AdminCrud';

const DashboardContent = ({
    activeTab,
    config,
    isDarkMode,
    searchQuery,
    role,
    mergedStats,
    mergedDonutData,
    mergedTableData,
    setIsModalOpen
}) => {
    // Render konten berdasarkan tab aktif
    if (activeTab === 'Data Karyawan') {
        return <EmployeeCrud isDarkMode={isDarkMode} />;
    }
    if (activeTab === 'Departemen') {
        return <DepartmentCrud isDarkMode={isDarkMode} />;
    }
    if (activeTab === 'Jabatan') {
        return <PositionCrud isDarkMode={isDarkMode} />;
    }
    if (activeTab === 'Jabatan') {
        return <PositionCrud isDarkMode={isDarkMode} />;
    }
    if (activeTab === 'Kelola Admin') {
        return <AdminCrud isDarkMode={isDarkMode} />;
    }

    // Default: Dashboard Overview
    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Dashboard</h2>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Selamat datang kembali, {config.userName}. Berikut ringkasan untuk Anda.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 lg:px-5 py-2 lg:py-2.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-medium rounded-md shadow-sm flex items-center gap-2 transition-all active:scale-95 text-xs lg:text-sm"
                >
                    <span className="text-lg leading-none">+</span>
                    {config.btnProcessLabel}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                {mergedStats.map((stat, i) => (
                    <StatCard key={i} {...stat} isDarkMode={isDarkMode} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2">
                    <PayrollChart title={config.chartTitle} subtitle={config.chartSubtitle} isDarkMode={isDarkMode} />
                </div>
                <div>
                    <EmployeeDistribution title={config.donutTitle} data={mergedDonutData} isDarkMode={isDarkMode} />
                </div>
            </div>

            {/* Table & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2">
                    <OvertimeTable
                        title={config.tableTitle}
                        columns={config.tableColumns}
                        data={mergedTableData}
                        searchQuery={searchQuery}
                        isDarkMode={isDarkMode}
                        role={role}
                    />
                </div>
                <div>
                    <ActivityLog title={config.activityTitle} data={config.activityData} isDarkMode={isDarkMode} />
                </div>
            </div>

            {/* Payroll Summary */}
            {config.showPayrollSummary && (
                <PayrollSummary data={config.payrollSummary} isDarkMode={isDarkMode} />
            )}
        </div>
    );
};

export default DashboardContent;