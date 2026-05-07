import { Bot, Shield, Users, Sparkles, CheckCircle, FileText } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'

const KeyFeatures = ({ language }) => {
  const content = {
    en: {
      title: 'Why Choose JanSahay?',
      subtitle: 'Built with your needs in mind',
      features: [
        {
          icon: Bot,
          title: 'AI-Powered Matching',
          description: 'Advanced artificial intelligence ensures accurate scheme recommendations based on your unique profile.'
        },
        {
          icon: Shield,
          title: 'Secure & Private',
          description: 'Your personal information is encrypted and never shared. We prioritize your data security.'
        },
        {
          icon: Users,
          title: 'Easy to Use',
          description: 'Simple, intuitive interface designed for everyone. No technical knowledge required.'
        },
        {
          icon: Sparkles,
          title: 'Comprehensive Database',
          description: 'Access to 4600+ central and state government schemes across various categories.'
        },
        {
          icon: CheckCircle,
          title: 'Real-Time Updates',
          description: 'Our database is regularly updated with new schemes and policy changes.'
        },
        {
          icon: FileText,
          title: 'Application Guidance',
          description: 'Step-by-step instructions and direct links to help you apply for schemes easily.'
        }
      ]
    },
    hi: {
      title: 'जनसहाय क्यों चुनें?',
      subtitle: 'आपकी जरूरतों को ध्यान में रखकर बनाया गया',
      features: [
        {
          icon: Bot,
          title: 'AI-संचालित मिलान',
          description: 'उन्नत कृत्रिम बुद्धिमत्ता आपकी अनूठी प्रोफ़ाइल के आधार पर सटीक योजना सिफारिशें सुनिश्चित करती है।'
        },
        {
          icon: Shield,
          title: 'सुरक्षित और निजी',
          description: 'आपकी व्यक्तिगत जानकारी एन्क्रिप्टेड है और कभी साझा नहीं की जाती। हम आपकी डेटा सुरक्षा को प्राथमिकता देते हैं।'
        },
        {
          icon: Users,
          title: 'उपयोग में आसान',
          description: 'सभी के लिए डिज़ाइन किया गया सरल, सहज इंटरफ़ेस। किसी तकनीकी ज्ञान की आवश्यकता नहीं।'
        },
        {
          icon: Sparkles,
          title: 'व्यापक डेटाबेस',
          description: 'विभिन्न श्रेणियों में 4600+ केंद्रीय और राज्य सरकारी योजनाओं तक पहुंच।'
        },
        {
          icon: CheckCircle,
          title: 'रीयल-टाइम अपडेट',
          description: 'हमारा डेटाबेस नियमित रूप से नई योजनाओं और नीति परिवर्तनों के साथ अपडेट किया जाता है।'
        },
        {
          icon: FileText,
          title: 'आवेदन मार्गदर्शन',
          description: 'योजनाओं के लिए आसानी से आवेदन करने में मदद के लिए चरण-दर-चरण निर्देश और प्रत्यक्ष लिंक।'
        }
      ]
    }
  }

  const { title, subtitle, features } = content[language]

  return (
    <section id="features" className="relative scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 grid gap-4 sm:mb-12 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-emerald-300/70">{subtitle}</p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
          </div>
          <p className="text-sm leading-6 text-emerald-50/60">
            {language === 'en'
              ? 'Every part of JanSahay is designed to reduce confusion while keeping the process fast, private, and easy to understand.'
              : 'जनसहाय का हर हिस्सा भ्रम कम करने और प्रक्रिया को तेज, निजी और आसान रखने के लिए बनाया गया है।'}
          </p>
        </div>
        <Motion.div 
          className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Card className="h-full rounded-lg border border-white/10 bg-white/[0.052] text-white shadow-none backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-white/[0.08]">
                  <CardHeader className="p-5 sm:p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-emerald-300/20 bg-emerald-300/10">
                      <Icon className="h-5 w-5 text-emerald-300" />
                    </div>
                    <CardTitle className="text-lg leading-7 text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-sm leading-6 text-emerald-50/62">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Motion.div>
            )
          })}
        </Motion.div>
      </div>
    </section>
  )
}

export default KeyFeatures
