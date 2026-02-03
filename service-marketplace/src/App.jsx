import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import BuyerDashboard from './pages/BuyerDashboard.jsx'
import SellerDashboard from './pages/SellerDashboard.jsx'

const AppLayout = () => (
  <>
    <Navigation />
    <main className="page-shell">
      <Outlet />
    </main>
    <Footer />
  </>
)

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path="/seller" element={<SellerDashboard />} />
      <Route path="*" element={<Home />} />
    </Route>
  </Routes>
)

export default App
