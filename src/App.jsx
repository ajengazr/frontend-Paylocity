import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaylocityHomepage from './pages/PaylocityHomepage'
import About from './pages/About'
import Help from './pages/help'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
// import HelpPage from './pages/HelpPage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaylocityHomepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/help" element={<HelpPage />} /> */}
        {/* Tambah route lain di sini nanti */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
