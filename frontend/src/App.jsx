import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SubmitReport from './pages/SubmitReport'
import OfficerPanel from './pages/OfficerPanel'
import Stats from './pages/Stats'
import ReportDetail from './pages/ReportDetail'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit-report" element={<SubmitReport />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
          <Route
            path="/officer-panel"
            element={
              <PrivateRoute>
                <OfficerPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App 