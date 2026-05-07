import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const CTASection = ({ language }) => {
  const content = {
    en: {
      title: 'Ready to Discover Your Benefits?',
      subtitle: "Join thousands of Indians who have found government schemes they didn't know existed.",
      cta: 'Start Your Journey'
    },
    hi: {
      title: 'अपने लाभों को खोजने के लिए तैयार हैं?',
      subtitle: 'हजारों भारतीयों में शामिल हों जिन्होंने ऐसी सरकारी योजनाएं पाई हैं जिनके बारे में उन्हें पता नहीं था।',
      cta: 'अपनी यात्रा शुरू करें'
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="overflow-hidden rounded-lg border border-emerald-300/20 bg-emerald-300/10 text-white shadow-[0_28px_110px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <CardContent className="relative p-6 text-center sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25" />
            <div className="relative">
            <h2 className="mb-3 text-2xl font-semibold text-white sm:mb-4 sm:text-3xl md:text-5xl">
              {content[language].title}
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-7 text-emerald-50/72 sm:mb-8 sm:text-xl">
              {content[language].subtitle}
            </p>
<Link to="/discover">
              <Button size="lg" className="h-11 bg-emerald-400 px-6 text-base text-zinc-950 transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] sm:px-8 sm:text-lg">
                {content[language].cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            </div>
          </CardContent>
        </Card>
      </Motion.div>
    </section>
  )
}

export default CTASection
