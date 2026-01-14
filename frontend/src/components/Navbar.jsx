import { useState } from 'react'
import { Globe, Menu, X, Sparkles, User, LogOut, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useAuth()

  const content = {
    en: {
      title: 'JanSahay',
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      findSchemes: 'Find Schemes',
      login: 'Login',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout'
    },
    hi: {
      title: 'जनसहाय',
      home: 'होम',
      features: 'विशेषताएँ',
      howItWorks: 'कैसे काम करता है',
      findSchemes: 'योजनाएं खोजें',
      login: 'लॉग इन',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      logout: 'लॉग आउट'
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    setIsOpen(false)
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <div className=" mx-auto px-20 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 group cursor-pointer"
          >
            
            <Sparkles className="w-8 h-8 text-blue-900" />
            <span className="text-2xl font-bold text-blue-900">
              {content[language].title}
            </span>
          </button>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {content[language].features}
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {content[language].howItWorks}
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Globe size={16} className="text-gray-600" />
              <span className="text-sm text-gray-600">{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>
            <Link to="/discover">
              <Button>
                {content[language].findSchemes}
              </Button>
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gov-blue-600 text-white flex items-center justify-center font-semibold">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User size={16} />
                      {content[language].profile}
                    </Link>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Settings size={16} />
                      {content[language].settings}
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      {content[language].logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline">
                  {content[language].login}
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all border border-gray-200"
            >
              <Globe size={20} className="text-gray-900" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gov-blue-600 text-white flex items-center justify-center font-semibold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            )}

            <button 
              onClick={scrollToTop}
              className="block w-full text-left text-gray-700 hover:text-gov-blue-600 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-all"
            >
              {content[language].home}
            </button>
            <a 
              href="#features" 
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-gov-blue-600 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-all"
            >
              {content[language].features}
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-gov-blue-600 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-all"
            >
              {content[language].howItWorks}
            </a>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-gov-blue-600 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-all"
                >
                  <User size={18} />
                  {content[language].profile}
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-gov-blue-600 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-all"
                >
                  <Settings size={18} />
                  {content[language].settings}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 py-3 px-4 rounded-lg font-medium transition-all"
                >
                  <LogOut size={18} />
                  {content[language].logout}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 mt-2 bg-white text-gov-blue-600 border-2 border-gov-blue-600 rounded-lg hover:bg-gov-blue-50 transition-all font-semibold shadow-md"
              >
                {content[language].login}
              </Link>
            )}

            <Link
              to="/discover"
              onClick={() => setIsOpen(false)}
              className="block text-center px-6 py-3 mt-2 bg-gov-blue-600 text-white rounded-lg hover:bg-gov-blue-700 transition-all font-semibold shadow-md"
            >
              {content[language].findSchemes}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
