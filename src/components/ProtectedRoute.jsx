import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // TUNGGU! Kalau masih loading, tampilkan spinner/null
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff]">
                <div className="w-8 h-8 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Baru cek autentikasi setelah loading selesai
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;