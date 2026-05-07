import { Sparkles } from 'lucide-react'
import { Button } from './ui/button'

const Footer = ({ language }) => {
  const content = {
    en: {
      tagline: 'Empowering citizens to access their rightful benefits through AI technology.',
      quickLinks: 'Quick Links',
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      about: 'About Us',
      support: 'Support',
      helpCenter: 'Help Center',
      faqs: 'FAQs',
      contact: 'Contact Us',
      privacy: 'Privacy Policy',
      connect: 'Connect',
      stayUpdated: 'Stay updated with new schemes',
      subscribe: 'Subscribe',
      copyright: '© 2026 JanSahay. All rights reserved. Making government schemes accessible for all.'
    },
    hi: {
      tagline: 'AI प्रौद्योगिकी के माध्यम से नागरिकों को उनके अधिकारों तक पहुंचने के लिए सशक्त बनाना।',
      quickLinks: 'त्वरित लिंक',
      home: 'होम',
      features: 'विशेषताएँ',
      howItWorks: 'कैसे काम करता है',
      about: 'हमारे बारे में',
      support: 'समर्थन',
      helpCenter: 'सहायता केंद्र',
      faqs: 'सामान्य प्रश्न',
      contact: 'संपर्क करें',
      privacy: 'गोपनीयता नीति',
      connect: 'जुड़ें',
      stayUpdated: 'नई योजनाओं के साथ अपडेट रहें',
      subscribe: 'सदस्यता लें',
      copyright: '© 2026 जनसहाय। सर्वाधिकार सुरक्षित। सभी के लिए सरकारी योजनाओं को सुलभ बनाना।'
    }
  }

  return (
    <footer id="about" className="text-zinc-400 py-10 sm:py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          <div className="sm:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span className="text-xl font-bold text-white">JanSahay</span>
            </div>
            <p className="text-sm text-zinc-500">
              {content[language].tagline}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">{content[language].support}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{content[language].helpCenter}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{content[language].faqs}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{content[language].contact}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{content[language].privacy}</a></li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-white mb-3">{content[language].connect}</h3>
            <p className="text-sm mb-2 text-zinc-500">{content[language].stayUpdated}</p>
            <div className="flex gap-2">
              <Button  size="sm" className="border-white/20 text-white hover:bg-white/10 bg-transparent">{content[language].subscribe}</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-sm text-zinc-500">
          <p>{content[language].copyright}</p>
          <p className="mt-2">
            Made with ❤️ by{' '}
            <a href="https://github.com/Rutetid" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Abhishek
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
