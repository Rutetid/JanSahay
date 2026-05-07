import { FileText, Bot, Sparkles } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'

const HowItWorks = ({ language }) => {
  const content = {
    en: {
      title: 'How It Works',
      subtitle: 'Three simple steps to find your benefits',
      steps: [
        {
          icon: FileText,
          title: '1. Share Your Details',
          description: 'Fill out a simple form with your basic information like age, income, occupation, and location.',
        },
        {
          icon: Bot,
          title: '2. AI Analysis',
          description: 'Our AI instantly analyzes your profile against hundreds of government schemes and their eligibility criteria.',
        },
        {
          icon: Sparkles,
          title: '3. Get Your Results',
          description: 'Receive a personalized list of schemes you qualify for, complete with application links and guidance.',
        }
      ]
    },
    hi: {
      title: 'यह कैसे काम करता है',
      subtitle: 'अपने लाभों को खोजने के लिए तीन सरल चरण',
      steps: [
        {
          icon: FileText,
          title: '1. अपना विवरण साझा करें',
          description: 'अपनी बुनियादी जानकारी जैसे उम्र, आय, व्यवसाय और स्थान के साथ एक सरल फॉर्म भरें।',
        },
        {
          icon: Bot,
          title: '2. AI विश्लेषण',
          description: 'हमारा AI तुरंत सैकड़ों सरकारी योजनाओं और उनकी पात्रता मानदंडों के खिलाफ आपकी प्रोफ़ाइल का विश्लेषण करता है।',
        },
        {
          icon: Sparkles,
          title: '3. अपने परिणाम प्राप्त करें',
          description: 'आवेदन लिंक और मार्गदर्शन के साथ पूर्ण, आप जिन योजनाओं के लिए योग्य हैं, उनकी व्यक्तिगत सूची प्राप्त करें।',
        }
      ]
    }
  }

  const { title, subtitle, steps } = content[language]

  return (
    <section id="how-it-works" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mb-8 max-w-2xl sm:mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
          <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
          {subtitle}
        </div>
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      <Motion.div 
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Card className="h-full rounded-lg border border-white/10 bg-white/[0.055] text-white shadow-none backdrop-blur-xl transition-all hover:border-emerald-300/35 hover:bg-white/[0.08]">
                <CardHeader className="p-5 sm:p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-emerald-300/20 bg-emerald-300/10">
                    <Icon className="h-6 w-6 text-emerald-300" />
                  </div>
                  <CardTitle className="text-xl leading-7 text-white">{step.title}</CardTitle>
                  <CardDescription className="text-sm leading-6 text-emerald-50/62">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Motion.div>
          )
        })}
      </Motion.div>
    </section>
  )
}

export default HowItWorks
