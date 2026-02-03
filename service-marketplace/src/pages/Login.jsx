import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { updateUser } = useUser()
  const [formValues, setFormValues] = useState({
    email: '',
    role: 'buyer',
  })

  const reason = location.state?.reason

  const handleSubmit = (event) => {
    event.preventDefault()
    updateUser({
      name: formValues.email.split('@')[0] || 'Member',
      role: formValues.role,
      email: formValues.email,
    })
    navigate(formValues.role === 'seller' ? '/seller' : '/buyer')
  }

  return (
    <section className="auth-screen login">
      <div className="auth-panel">
        <h1>Welcome back</h1>
        {reason === 'sellerOnly' && <p className="alert">Seller dashboard is limited to seller accounts. Switch your role below.</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Work email
            <input type="email" name="email" value={formValues.email} onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))} placeholder="you@company.com" required />
          </label>
          <label>
            Log in as
            <select name="role" value={formValues.role} onChange={(e) => setFormValues((prev) => ({ ...prev, role: e.target.value }))}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </label>
          <button type="submit" className="primary-btn">
            Enter workspace
          </button>
        </form>
        <p className="auth-helper">
          Need an account? <button onClick={() => navigate('/register')}>Register</button>
        </p>
      </div>
    </section>
  )
}

export default Login
