import { FileText, Bot, Sparkles } from 'lucide-react'
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
          color: 'blue'
        },
        {
          icon: Bot,
          title: '2. AI Analysis',
          description: 'Our AI instantly analyzes your profile against hundreds of government schemes and their eligibility criteria.',
          color: 'blue'
        },
        {
          icon: Sparkles,
          title: '3. Get Your Results',
          description: 'Receive a personalized list of schemes you qualify for, complete with application links and guidance.',
          color: 'blue'
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
          color: 'blue'
        },
        {
          icon: Bot,
          title: '2. AI विश्लेषण',
          description: 'हमारा AI तुरंत सैकड़ों सरकारी योजनाओं और उनकी पात्रता मानदंडों के खिलाफ आपकी प्रोफ़ाइल का विश्लेषण करता है।',
          color: 'blue'
        },
        {
          icon: Sparkles,
          title: '3. अपने परिणाम प्राप्त करें',
          description: 'आवेदन लिंक और मार्गदर्शन के साथ पूर्ण, आप जिन योजनाओं के लिए योग्य हैं, उनकी व्यक्तिगत सूची प्राप्त करें।',
          color: 'blue'
        }
      ]
    }
  }

  const { title, subtitle, steps } = content[language]

  const colorClasses = {
    blue: 'border-blue-100 hover:border-blue-300 bg-blue-100',
    purple: 'border-purple-100 hover:border-purple-300 bg-purple-100',
    green: 'border-green-100 hover:border-green-300 bg-green-100'
  }

  const iconColorClasses = {
    blue: 'text-gov-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600'
  }

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card key={index} className={`border-2 ${colorClasses[step.color]} transition-colors`}>
              <CardHeader>
                <div className={`w-12 h-12 ${colorClasses[step.color]} rounded-full flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${iconColorClasses[step.color]}`} />
                </div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorks
