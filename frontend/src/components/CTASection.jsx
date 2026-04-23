import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="bg-blue-900 border-none">
          <CardContent className="p-6 sm:p-10 lg:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              {content[language].title}
            </h2>
            <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {content[language].subtitle}
            </p>
            <Link to="/discover">
              <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 text-gray-900">
                {content[language].cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

export default CTASection
