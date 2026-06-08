import DashboardLayout from '../components/dash/DashboardLayout';

// Ganti role="admin" atau role="employee" sesuai user yang login
const DashboardPage = () => {
    return <DashboardLayout role="admin" />;
};

export default DashboardPage;