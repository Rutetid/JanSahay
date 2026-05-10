import { useState } from 'react'
import { Globe, Menu, X, Sparkles, User, LogOut, Settings, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = ({ language, setLanguage, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useAuth()

  const content = {
    en: {
      home: 'Home',
      findSchemes: 'Find Schemes',
      login: 'Login',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout'
    },
    hi: {
      home: 'होम',
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
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/[0.045] backdrop-blur-xl">
      <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
          <div className="flex w-full justify-between lg:w-auto">
            <Link to="/" aria-label="home" onClick={scrollToTop} className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/20 bg-emerald-300/10">
                <Sparkles className="size-5 text-emerald-300" />
              </div>
              <span className="text-xl font-bold text-white">JanSahay</span>
            </Link>

            {user ? (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-200/25 bg-emerald-300/12 text-sm font-semibold text-emerald-200">
                  {getInitials(user.name)}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className={`m-auto size-6 text-white duration-200 ${isOpen ? 'rotate-180 scale-0 opacity-0' : ''}`} />
                <X className={`absolute inset-0 m-auto size-6 text-white ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'} duration-200`} />
              </button>
            )}
          </div>

          <div className={`${isOpen ? 'block' : 'hidden'} mb-6 w-full flex-wrap items-center justify-end space-y-6 rounded-lg border border-white/10 bg-[#07110d]/92 p-5 shadow-xl backdrop-blur-xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:!bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none`}>
            {menuItems && menuItems.length > 0 && (
              <div className="hidden lg:pr-4 lg:block">
                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} onClick={() => setIsOpen(false)} className="block text-zinc-400 duration-150 hover:text-white">
                        <span>{language === 'hi' ? item.nameHi : item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l border-white/10 lg:pl-6">
              <button
                onClick={toggleLanguage}
                className="flex h-9 items-center gap-2 rounded-lg border border-white/12 bg-white/[0.055] px-3 text-emerald-50 shadow-none backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/25 hover:bg-white/[0.09] hover:text-white"
              >
                <Globe size={16} className="text-emerald-300" />
                <span className="text-sm">{language === 'en' ? 'हिंदी' : 'EN'}</span>
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="hidden lg:flex h-9 items-center gap-2 rounded-lg border border-white/12 bg-white/[0.055] px-2.5 text-emerald-50 shadow-none backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/25 hover:bg-white/[0.09] hover:text-white"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200/25 bg-emerald-300/12 text-xs font-semibold text-emerald-200">
                      {getInitials(user.name)}
                    </div>
                    <span className="max-w-28 truncate text-sm font-medium">{user.name}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-white/10 bg-[#07110d]/95 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                      <div className="mb-1 rounded-md border border-white/10 bg-white/[0.045] px-3 py-2">
                        <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                        {user.email && <p className="mt-0.5 truncate text-xs text-emerald-50/45">{user.email}</p>}
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-emerald-50/78 transition-colors hover:bg-white/[0.07] hover:text-white"
                      >
                        <User className="h-4 w-4 text-emerald-300" />
                        {content[language].profile}
                      </Link>
                      <button
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-emerald-50/78 transition-colors hover:bg-white/[0.07] hover:text-white"
                      >
                        <Settings className="h-4 w-4 text-emerald-300" />
                        {content[language].settings}
                      </button>
                      <div className="my-1 h-px bg-white/10" />
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-red-500/12 hover:text-red-200"
                      >
                        <LogOut className="h-4 w-4" />
                        {content[language].logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button asChild size="sm" className="h-10 sm:h-9 border border-white/12 bg-white/[0.055]! px-4 sm:px-3 text-emerald-50! shadow-none backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/25 hover:bg-white/[0.09]! hover:text-white!">
                    <Link to="/login">
                      <span>{content[language].login}</span>
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="h-10 sm:h-9 border border-emerald-200/30 bg-emerald-300! px-4 sm:px-3 text-[#06100c]! shadow-[0_10px_30px_-18px_rgba(16,185,129,0.9)] transition-all duration-300 hover:border-lime-200/50 hover:bg-lime-300! hover:text-[#06100c]! hover:shadow-[0_12px_34px_-16px_rgba(190,242,100,0.95)]">
                    <Link to="/discover">
                      <span>{content[language].findSchemes}</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {user && isDropdownOpen && (
        <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-[#07110d]/96 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:hidden">
          <div className="px-4 py-4 space-y-2">
            <div className="mb-2 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-200/25 bg-emerald-300/12 font-semibold text-emerald-200">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                {user.email && <p className="text-sm text-emerald-50/45">{user.email}</p>}
              </div>
            </div>
            <Link
              to="/profile"
              onClick={() => setIsDropdownOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left font-medium text-emerald-50/78 transition-all hover:bg-white/[0.07] hover:text-white"
            >
              <User size={18} className="text-emerald-300" />
              {content[language].profile}
            </Link>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left font-medium text-emerald-50/78 transition-all hover:bg-white/[0.07] hover:text-white"
            >
              <Settings size={18} className="text-emerald-300" />
              {content[language].settings}
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left font-medium text-red-300 transition-all hover:bg-red-500/12 hover:text-red-200"
            >
              <LogOut size={18} />
              {content[language].logout}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
