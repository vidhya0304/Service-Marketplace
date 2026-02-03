import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/buyer', label: 'Buyer Board' },
  { to: '/seller', label: 'Seller Board', protected: true },
]

const Navigation = () => {
  const navigate = useNavigate()
  const { user, logout } = useUser()
  const isSeller = user.role === 'seller'

  const handleProtectedClick = (event) => {
    event.preventDefault()
    if (!isSeller) {
      navigate('/login', { state: { reason: 'sellerOnly' } })
    }
  }

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-accent">Service</span> MarketPlace
      </div>
      <nav className="nav-links">
        {navLinks.map((link) => {
          if (link.protected && !isSeller) {
            return (
              <button key={link.to} className="nav-link disabled" onClick={handleProtectedClick} title="Seller access only">
                {link.label}
              </button>
            )
          }
          return (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {link.label}
            </NavLink>
          )
        })}
      </nav>
      <div className="user-meta">
        <div className="user-pill">
          <span className="user-name">{user.name || 'Guest'}</span>
          <span className="user-role">{user.role}</span>
        </div>
        {user.name !== 'Guest' ? (
          <button className="ghost-btn" onClick={logout}>
            Log out
          </button>
        ) : (
          <button className="ghost-btn" onClick={() => navigate('/register')}>
            Join now
          </button>
        )}
      </div>
    </header>
  )
}

export default Navigation
