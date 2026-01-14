import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DiscoverPage from './pages/DiscoverPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SchemeDetailsPage from './pages/SchemeDetailsPage'
import { useState } from 'react'

function App() {
  const [language, setLanguage] = useState('en')

  return (
    <Routes>
      <Route path="/" element={<LandingPage language={language} setLanguage={setLanguage} />} />
      <Route path="/discover" element={<DiscoverPage language={language} setLanguage={setLanguage} />} />
      <Route path="/login" element={<LoginPage language={language} />} />
      <Route path="/profile" element={<ProfilePage language={language} setLanguage={setLanguage} />} />
      <Route path="/scheme/:schemeId" element={<SchemeDetailsPage language={language} setLanguage={setLanguage} />} />
    </Routes>
  )
}

export default App
