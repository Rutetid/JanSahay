import { ArrowRight, CheckCircle, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const HeroSection = ({ language }) => {
  const content = {
    en: {
      badge: "Powered by AI",
      heading: "Discover Government Schemes Made for You",
      subheading:
        "JanSahay uses advanced AI to analyze your profile and instantly match you with government schemes you're eligible for. No more confusion, no more missed opportunities.",
      cta: "Check Your Eligibility",
      ctaSecondary: "Learn More",
      free: "100% Free",
      instant: "Instant Results",
      secure: "Secure & Private",
      schemes: "Government Schemes",
      helped: "Ministries",
      accuracy: "Accuracy Rate",
    },
    hi: {
      badge: "AI द्वारा संचालित",
      heading: "आपके लिए बनी सरकारी योजनाएं खोजें",
      subheading:
        "जनसहाय उन्नत AI का उपयोग करके आपकी प्रोफ़ाइल का विश्लेषण करता है और तुरंत आपको उन सरकारी योजनाओं से मिलाता है जिनके लिए आप पात्र हैं।",
      cta: "अपनी पात्रता जांचें",
      ctaSecondary: "और जानें",
      free: "100% मुफ्त",
      instant: "तत्काल परिणाम",
      secure: "सुरक्षित और निजी",
      schemes: "सरकारी योजनाएं",
      helped: "मंत्रालयों में",
      accuracy: "सटीकता दर",
    },
  };

  return (
    <div className=" pt-12 sm:pt-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-8 sm:pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-gov-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <Bot className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">{content[language].badge}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">
            {content[language].heading}
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {content[language].subheading}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/discover">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                {content[language].cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
              {content[language].ctaSecondary}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gov-blue-600" />
              <span>{content[language].free}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gov-blue-600" />
              <span>{content[language].instant}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gov-blue-600" />
              <span>{content[language].secure}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-gov-blue-600 mb-2">4600+</div>
              <div className="text-gray-600">{content[language].schemes}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-gov-blue-600 mb-2">50+</div>
              <div className="text-gray-600">{content[language].helped}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-gov-blue-600 mb-2">95%</div>
              <div className="text-gray-600">{content[language].accuracy}</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
