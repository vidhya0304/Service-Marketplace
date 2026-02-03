import { Link, useNavigate } from 'react-router-dom'
import { marketplaceCategories, freelancerProfiles } from '../data/freelancers.js'
import { useUser } from '../context/UserContext.jsx'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const featured = freelancerProfiles.slice(0, 3)

  return (
    <div className="home-screen">
      <section className="hero">
        <div className="hero-content">
          <h1>Service On Demand . <strong>No Bidding</strong></h1>
          <p className="subtitle">
            Build, brand, and launch with curated experts. Buyers explore live dashboards, sellers manage approvals,
            and every milestone stays transparent.
          </p>
          <div className="cta-group">
            <button className="primary-btn" onClick={() => navigate('/register')}>
              Create free account
            </button>
            <button className="secondary-btn" onClick={() => navigate('/buyer')}>
              Preview buyer board
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <strong>2,400+</strong>
              <span>briefs matched</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>average seller score</span>
            </div>
            <div>
              <strong>72 hrs</strong>
              <span>from brief to kickoff</span>
            </div>
          </div>
        </div>
      </section>

      <section className="workflow" id="brief">
        <h2>Transparent flow for buyers & sellers</h2>
        <div className="workflow-grid">
          <article>
            <h3>Buyer workspace</h3>
            <p>Browse curated categories, filter by price, and review freelancer proof-points before placing orders.</p>
            <Link to="/buyer">Open buyer dashboard →</Link>
          </article>
          <article>
            <h3>Seller control</h3>
            <p>Approve or deny projects, post daily updates, and deliver assets directly from the dashboard.</p>
            <Link to="/seller" className={user.role === 'seller' ? '' : 'soft-disabled'}>
              Seller portal →
            </Link>
            {user.role !== 'seller' && <small>Buyer accounts need seller access to enter.</small>}
          </article>
          <article>
            <h3>Collaborative timeline</h3>
            <p>Milestones, updates, and deployment steps live side-by-side, so nothing slips past go-live.</p>
            <Link to="/login">Track an active project →</Link>
          </article>
        </div>
      </section>

      <section className="categories-preview">
        <div className="section-heading">
          <h2>Top buyer categories</h2>
          <p>Selecting a tile in the buyer dashboard filters freelancers instantly.</p>
        </div>
        <div className="category-grid">
          {marketplaceCategories.map((category) => (
            <article key={category.id}>
              <h3>{category.label}</h3>
              <p>{category.description}</p>
              <button onClick={() => navigate('/buyer')} className="ghost-btn">
                Explore {category.label}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="featured-sellers" id="trust">
        <div className="overlay">
          <h2>Curated freelancers ready to deploy</h2>
          <div className="seller-grid">
            {featured.map((freelancer) => (
              <article key={freelancer.id}>
                <header>
                  <strong>{freelancer.name}</strong>
                  <span>{freelancer.title}</span>
                </header>
                <p>{freelancer.description}</p>
                <ul>
                  <li>Category: {freelancer.category}</li>
                  <li>Avg price: ₹{freelancer.price.toLocaleString('en-IN')}</li>
                  <li>Rating: {freelancer.rating} · Success {freelancer.successRate}</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-panel" id="contact">
        <div>
          <h2>Ready to ship your next launch?</h2>
          <p>Register, pick your role, and we’ll route you to the right dashboard.</p>
        </div>
        <div className="cta-group">
          <button className="primary-btn" onClick={() => navigate('/register')}>
            Register as buyer
          </button>
          <button className="secondary-btn" onClick={() => navigate('/register')}>
            Become a seller
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
