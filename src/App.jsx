import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaylocityHomepage from './pages/PaylocityHomepage'
import About from './pages/About'
import Help from './pages/help'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import { LoadingProvider } from './contexts/LoadingContext';
import { ToastProvider } from './contexts/ToastContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <LoadingProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PaylocityHomepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </LoadingProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

export default App
