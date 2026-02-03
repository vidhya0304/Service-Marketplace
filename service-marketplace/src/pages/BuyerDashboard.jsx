import { useMemo, useState } from 'react'
import { marketplaceCategories, freelancerProfiles } from '../data/freelancers.js'
import { useUser } from '../context/UserContext.jsx'

const priceFilters = [
  { value: 'all', label: 'All budgets' },
  { value: 'starter', label: 'Under ₹50,000' },
  { value: 'growth', label: 'Under ₹1,00,000' },
  { value: 'pro', label: 'Above ₹1,00,000' },
]

const BuyerDashboard = () => {
  const { user } = useUser()
  const [category, setCategory] = useState(marketplaceCategories[0].id)
  const [priceFilter, setPriceFilter] = useState('all')
  const [selectedFreelancer, setSelectedFreelancer] = useState(null)
  const [orderPreferences, setOrderPreferences] = useState({
    scope: '',
    deadline: '',
    communication: 'async-updates',
    budgetNotes: '',
  })
  const [orderStatus, setOrderStatus] = useState('')

  const filteredFreelancers = useMemo(() => {
    const matchPrice = (price) => {
      if (priceFilter === 'all') return true
      if (priceFilter === 'starter') return price <= 50000
      if (priceFilter === 'growth') return price <= 100000
      if (priceFilter === 'pro') return price > 100000
      return true
    }
    return freelancerProfiles.filter((profile) => profile.category === category && matchPrice(profile.price))
  }, [category, priceFilter])

  const handleOrderSubmit = (event) => {
    event.preventDefault()
    if (!selectedFreelancer) {
      setOrderStatus('Pick a freelancer first to continue.')
      return
    }
    setOrderStatus(`Order placed with ${selectedFreelancer.name}. They will confirm within a few hours.`)
    setOrderPreferences({
      scope: '',
      deadline: '',
      communication: 'async-updates',
      budgetNotes: '',
    })
  }

  return (
    <div className="buyer-dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Buyer workspace</p>
          <h1>Hello {user.name || 'buyer'}, match your next freelancer.</h1>
          <p>Categories stay role-aware. Sellers cannot view this intelligence layer.</p>
        </div>
        <div className="filters">
          <label>
            Category
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {marketplaceCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Budget filter
            <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
              {priceFilters.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className="category-pills">
        {marketplaceCategories.map((cat) => (
          <button key={cat.id} className={`pill ${category === cat.id ? 'active' : ''}`} onClick={() => setCategory(cat.id)}>
            <span>{cat.label}</span>
            <small>{cat.description}</small>
          </button>
        ))}
      </section>

      <section className="freelancer-grid">
        {filteredFreelancers.map((freelancer) => (
          <article key={freelancer.id} className={`freelancer-card ${selectedFreelancer?.id === freelancer.id ? 'selected' : ''}`}>
            <header>
              <div>
                <h3>{freelancer.name}</h3>
                <p>{freelancer.title}</p>
              </div>
              <span className="badge">₹{freelancer.price.toLocaleString('en-IN')}</span>
            </header>
            <p>{freelancer.description}</p>
            <ul className="meta">
              <li>Rating {freelancer.rating}</li>
              <li>Delivery {freelancer.delivery}</li>
              <li>Success {freelancer.successRate}</li>
            </ul>
            <div className="skills">
              {freelancer.focus.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <button className="secondary-btn" onClick={() => setSelectedFreelancer(freelancer)}>
              {selectedFreelancer?.id === freelancer.id ? 'Selected' : 'Review profile'}
            </button>
          </article>
        ))}
      </section>

      <section className="order-panel">
        <div>
          <h2>Build your order</h2>
          <p>Summaries stay private for buyers; sellers only see approved details.</p>
          {selectedFreelancer ? (
            <div className="selected-summary">
              <strong>{selectedFreelancer.name}</strong>
              <span>{selectedFreelancer.title}</span>
            </div>
          ) : (
            <p className="alert">Select a freelancer card to continue.</p>
          )}
        </div>
        <form onSubmit={handleOrderSubmit}>
          <label>
            Scope highlights
            <textarea name="scope" value={orderPreferences.scope} onChange={(e) => setOrderPreferences((prev) => ({ ...prev, scope: e.target.value }))} placeholder="Share deliverables, required tools, or existing assets." required />
          </label>
          <label>
            Preferred deadline
            <input type="date" name="deadline" value={orderPreferences.deadline} onChange={(e) => setOrderPreferences((prev) => ({ ...prev, deadline: e.target.value }))} required />
          </label>
          <label>
            Communications
            <select name="communication" value={orderPreferences.communication} onChange={(e) => setOrderPreferences((prev) => ({ ...prev, communication: e.target.value }))}>
              <option value="async-updates">Async updates (daily pulse)</option>
              <option value="live-sprint">Live sprint sessions</option>
              <option value="hybrid">Hybrid (async + 1 standup)</option>
            </select>
          </label>
          <label>
            Budget notes
            <input type="text" name="budgetNotes" value={orderPreferences.budgetNotes} onChange={(e) => setOrderPreferences((prev) => ({ ...prev, budgetNotes: e.target.value }))} placeholder="Optional: licensing, variations, add-ons" />
          </label>
          <button type="submit" className="primary-btn">
            Place order
          </button>
          {orderStatus && <p className="status">{orderStatus}</p>}
        </form>
      </section>
    </div>
  )
}

export default BuyerDashboard
