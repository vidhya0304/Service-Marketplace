import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { marketplaceCategories } from '../data/freelancers.js'

const Register = () => {
  const navigate = useNavigate()
  const { updateUser } = useUser()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
    category: marketplaceCategories[0].id,
    experience: 'new-to-market',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateUser({
      name: formValues.name || 'Member',
      role: formValues.role,
      email: formValues.email,
    })
    navigate(formValues.role === 'seller' ? '/seller' : '/buyer')
  }

  return (
    <section className="auth-screen">
      <div className="auth-panel">
        <h1>Create your Service Marketplace account</h1>
        <p>Pick your role now — you can switch later from settings.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input type="text" name="name" value={formValues.name} onChange={handleChange} placeholder="Alex Rivera" required />
          </label>
          <label>
            Work email
            <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="team@startup.com" required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="••••••••" required />
          </label>
          <label>
            I am signing up as
            <div className="radio-row">
              <label>
                <input type="radio" name="role" value="buyer" checked={formValues.role === 'buyer'} onChange={handleChange} />
                Buyer (hire talent)
              </label>
              <label>
                <input type="radio" name="role" value="seller" checked={formValues.role === 'seller'} onChange={handleChange} />
                Seller (offer services)
              </label>
            </div>
          </label>
          <label>
            Category focus
            <select name="category" value={formValues.category} onChange={handleChange}>
              {marketplaceCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Experience level
            <select name="experience" value={formValues.experience} onChange={handleChange}>
              <option value="new-to-market">New to freelancing</option>
              <option value="scaling">Scaling client pipeline</option>
              <option value="established">Established agency</option>
            </select>
          </label>
          <button type="submit" className="primary-btn">
            Continue
          </button>
        </form>
        <p className="auth-helper">
          Already have an account? <button onClick={() => navigate('/login')}>Log in</button>
        </p>
      </div>
    </section>
  )
}

export default Register
