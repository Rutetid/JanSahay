import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import HowItWorks from '../components/HowItWorks'
import KeyFeatures from '../components/KeyFeatures'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import AIAssistant from '../components/AIAssistant'

const LandingPage = ({ language, setLanguage }) => {
  return (
    <div className="min-h-screen bg-white pattern-dots">
      <Navbar language={language} setLanguage={setLanguage} />
      <HeroSection language={language} />
      <HowItWorks language={language} />
      <KeyFeatures language={language} />
      <CTASection language={language} />
      <Footer language={language} />
      <AIAssistant language={language} />
    </div>
  )
}

export default LandingPage
