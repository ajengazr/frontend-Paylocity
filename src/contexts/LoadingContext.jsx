import { createContext, useContext, useState, useCallback } from 'react';
import LoadingScreen from '../components/LoadingScreen';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProps, setLoadingProps] = useState({
    onCancel: null,
    // Bisa tambah props lain kalau perlu
  });

  // Tampilkan loading
  const showLoading = useCallback((options = {}) => {
    setLoadingProps({
      onCancel: options.onCancel || null,
      // Tambahin props lain di sini kalau perlu
    });
    setIsLoading(true);
  }, []);

  // Sembunyikan loading
  const hideLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingProps({ onCancel: null });
  }, []);

  // Toggle dengan promise (auto hide setelah selesai)
  const withLoading = useCallback(async (asyncFn, options = {}) => {
    showLoading(options);
    try {
      const result = await asyncFn();
      return result;
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, withLoading, isLoading }}>
      {children}

      {/* Loading Screen dirender di sini, di atas semua konten */}
      {isLoading && (
        <div className="fixed inset-0 z-9999">
          <LoadingScreen
            onCancel={loadingProps.onCancel ? () => {
              loadingProps.onCancel();
              hideLoading();
            } : null}
          />
        </div>
      )}
    </LoadingContext.Provider>
  );
}

// Hook untuk consume context
// eslint-disable-next-line react-refresh/only-export-components
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}