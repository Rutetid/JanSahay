import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const CTASection = ({ language }) => {
  const content = {
    en: {
      title: 'Ready to Discover Your Benefits?',
      subtitle: 'Join thousands of Indians who have found government schemes they didn\'t know existed.',
      cta: 'Start Your Journey'
    },
    hi: {
      title: 'अपने लाभों को खोजने के लिए तैयार हैं?',
      subtitle: 'हजारों भारतीयों में शामिल हों जिन्होंने ऐसी सरकारी योजनाएं पाई हैं जिनके बारे में उन्हें पता नहीं था।',
      cta: 'अपनी यात्रा शुरू करें'
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Card className="bg-gradient-to-r from-gov-blue-600 to-purple-600 border-none">
        <CardContent className="pt-12 pb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            {content[language].cta}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

export default CTASection
