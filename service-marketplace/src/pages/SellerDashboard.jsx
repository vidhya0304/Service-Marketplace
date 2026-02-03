import { useState } from 'react'
import { sellerProjects, timelineUpdates } from '../data/freelancers.js'
import { useUser } from '../context/UserContext.jsx'

const statusFlow = ['Pending', 'Approved', 'In Progress', 'Ready for Review', 'Delivered']

const SellerDashboard = () => {
  const { user } = useUser()
  const [projects, setProjects] = useState(sellerProjects)
  const [updates, setUpdates] = useState(timelineUpdates)
  const [newUpdate, setNewUpdate] = useState('')
  const [checklist, setChecklist] = useState([
    { id: 'handoff', label: 'Upload assets to shared drive', done: false },
    { id: 'qa', label: 'QA on staging environment', done: false },
    { id: 'deploy', label: 'Schedule deployment window with buyer', done: false },
  ])

  if (user.role !== 'seller') {
    return (
      <section className="restricted">
        <h1>Seller dashboard is restricted</h1>
        <p>Switch your role from login or register as a seller to continue.</p>
      </section>
    )
  }

  const setStatus = (id, status) => {
    setProjects((prev) => prev.map((project) => (project.id === id ? { ...project, status } : project)))
  }

  const advanceStatus = (currentStatus) => {
    const currentIndex = statusFlow.indexOf(currentStatus)
    return statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)]
  }

  const handleAdvance = (id, currentStatus) => {
    setStatus(id, advanceStatus(currentStatus))
  }

  const handleAddUpdate = (event) => {
    event.preventDefault()
    if (!newUpdate.trim()) return
    setUpdates((prev) => [...prev, { day: `Update ${prev.length + 1}`, update: newUpdate }])
    setNewUpdate('')
  }

  const toggleChecklist = (id) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))
  }

  return (
    <div className="seller-dashboard">
      <header className="dashboard-header seller">
        <div>
          <p className="eyebrow">Seller workflow</p>
          <h1>Stay on top of approvals, updates, and deployment.</h1>
        </div>
        <div className="seller-summary">
          <div>
            <strong>{projects.filter((p) => p.status === 'Pending').length}</strong>
            <span>pending approvals</span>
          </div>
          <div>
            <strong>{projects.filter((p) => p.status === 'In Progress').length}</strong>
            <span>active builds</span>
          </div>
          <div>
            <strong>{projects.filter((p) => p.status === 'Delivered').length}</strong>
            <span>delivered</span>
          </div>
        </div>
      </header>

      <section className="projects-grid">
        {projects.map((project) => (
          <article key={project.id}>
            <header>
              <div>
                <p className="eyebrow">{project.client}</p>
                <h2>{project.title}</h2>
              </div>
              <span className={`status-chip status-${project.status.replace(/\s/g, '').toLowerCase()}`}>{project.status}</span>
            </header>
            <p>{project.brief}</p>
            <ul>
              <li>Budget {project.budget}</li>
              <li>Due {project.due}</li>
              <li>Deliverables: {project.deliverables.join(', ')}</li>
            </ul>
            <div className="seller-actions">
              <button
                className="secondary-btn"
                disabled={['Delivered', 'Declined'].includes(project.status)}
                onClick={() => handleAdvance(project.id, project.status)}
              >
                {['Delivered', 'Declined'].includes(project.status) ? 'Complete' : `Move to ${advanceStatus(project.status)}`}
              </button>
              <button className="ghost-btn" onClick={() => setStatus(project.id, 'Declined')}>
                Decline
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="updates-grid">
        <div className="timeline">
          <h3>Daily project updates</h3>
          <ul>
            {updates.map((update, index) => (
              <li key={`${update.day}-${index}`}>
                <strong>{update.day}</strong>
                <p>{update.update}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddUpdate} className="update-form">
            <input type="text" value={newUpdate} onChange={(event) => setNewUpdate(event.target.value)} placeholder="Add progress note" />
            <button type="submit" className="primary-btn">
              Post update
            </button>
          </form>
        </div>

        <div className="checklist">
          <h3>Deployment checklist</h3>
          <ul>
            {checklist.map((item) => (
              <li key={item.id}>
                <label>
                  <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(item.id)} />
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default SellerDashboard
