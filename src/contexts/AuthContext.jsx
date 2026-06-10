import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cek mount pertama — selesaikan loading
    useState(() => {
        setIsLoading(false);
    });

    const login = (userData) => {
        console.log('login() called with:', userData);

        // Pastikan minimal ada name dan role
        const safeUser = {
            name: userData?.name || userData?.username || 'User',
            email: userData?.email || '',
            role: userData?.role || 'employee',
            token: userData?.token || '',
            ...userData,
        };

        setUser(safeUser);
        setIsLoading(false);
    };

    const logout = () => {
        console.log('masuk logout');
        setUser(null);
        setIsLoading(false);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        role: user?.role || null,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};