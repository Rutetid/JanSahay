import { useState } from 'react'
import { Globe, Menu, X, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

const Navbar = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false)

  const content = {
    en: {
      title: 'JanSahay',
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      findSchemes: 'Find Schemes'
    },
    hi: {
      title: 'जनसहाय',
      home: 'होम',
      features: 'विशेषताएँ',
      howItWorks: 'कैसे काम करता है',
      findSchemes: 'योजनाएं खोजें'
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-8 h-8 text-gov-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-gov-blue-600 to-purple-600 bg-clip-text text-transparent">
              {content[language].title}
            </span>
          </button>

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
            <Button>
              {content[language].findSchemes}
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all border border-gray-200"
            >
              <Globe size={20} className="text-gov-blue-600" />
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
            <a
              href="#find-schemes"
              onClick={() => setIsOpen(false)}
              className="block text-center px-6 py-3 mt-2 bg-gradient-to-r from-gov-green-500 to-gov-green-600 text-white rounded-lg hover:from-gov-green-600 hover:to-gov-green-700 transition-all font-semibold shadow-md"
            >
              {content[language].findSchemes}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
