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
    <footer id="about" className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">JanSahay</span>
            </div>
            <p className="text-sm">
              {content[language].tagline}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">{content[language].quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{content[language].home}</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">{content[language].features}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{content[language].howItWorks}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{content[language].about}</a></li>
            </ul>
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
          <div>
            <h3 className="font-semibold text-white mb-3">{content[language].connect}</h3>
            <p className="text-sm mb-2">{content[language].stayUpdated}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">{content[language].subscribe}</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>{content[language].copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
