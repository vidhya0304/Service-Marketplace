import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'service-marketplace-user'
const defaultUser = {
  name: 'Guest',
  role: 'buyer',
  email: '',
}

const UserContext = createContext({
  user: defaultUser,
  updateUser: () => {},
  logout: () => {},
})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultUser
    } catch {
      return defaultUser
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }, [user])

  const updateUser = (updates) =>
    setUser((prev) => ({
      ...prev,
      ...updates,
    }))

  const logout = () => setUser(defaultUser)

  const value = useMemo(() => ({ user, updateUser, logout }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
