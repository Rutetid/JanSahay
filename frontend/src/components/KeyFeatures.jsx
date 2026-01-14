import { Bot, Shield, Users, Sparkles, CheckCircle, FileText } from 'lucide-react'
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
          description: 'Access to 500+ central and state government schemes across various categories.'
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
          description: 'विभिन्न श्रेणियों में 500+ केंद्रीय और राज्य सरकारी योजनाओं तक पहुंच।'
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
    <section id="features" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <Icon className="w-10 h-10 text-gov-blue-600 mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default KeyFeatures
