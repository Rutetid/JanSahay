import HeroSection from '../components/hero-section'
import HowItWorks from '../components/HowItWorks'
import KeyFeatures from '../components/KeyFeatures'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import AIAssistant from '../components/AIAssistant'

const LandingPage = ({ language, setLanguage }) => {
  return (
    <div className="min-h-screen bg-[#07110d] text-white">
      <HeroSection language={language} setLanguage={setLanguage} />
      <HowItWorks language={language} />
      <KeyFeatures language={language} />
      <CTASection language={language} />
      <Footer language={language} />
      {/* <AIAssistant language={language} /> */}
    </div>
  )
}

export default LandingPage
