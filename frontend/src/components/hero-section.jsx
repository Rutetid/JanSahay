import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, FileCheck, Building2, Target, ShieldCheck, MapPin, Languages } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import Navbar from './Navbar'

const menuItems = [
  { name: 'How it Works', nameHi: 'कैसे काम करता है', href: '#how-it-works' },
  { name: 'Why JanSahay', nameHi: 'जनसहाय क्यों', href: '#features' },
]

export default function HeroSection({ language = 'en', setLanguage }) {
  const content = {
    en: {
      badge: "India's AI Scheme Finder",
      heading: "Government Schemes Made for You",
      subheading: "JanSahay uses advanced AI to analyze your profile and instantly match you with government schemes you're eligible for.",
      cta: "Check Your Eligibility",
      login: "Login",
      features: "Features",
      howItWorks: "How It Works", 
      schemes: "Schemes",
      companies: "Trusted by citizens across India",
    },
    hi: {
      badge: "भारत का AI स्कीम फाइंडर",
      heading: "आपके लिए बनी सरकारी योजनाएं",
      subheading: "जनसहाय उन्नत AI का उपयोग करके आपकी प्रोफ़ाइल का विश्लेषण करता है और तुरंत आपको उन सरकारी योजनाओं से मिलाता है।",
      cta: "अपनी पात्रता जांचें",
      login: "लॉगिन",
      features: "विशेषताएं",
      howItWorks: "कैसे काम करता है",
      schemes: "योजनाएं",
      companies: "भारत के नागरिकों द्वारा विश्वसनीय",
    }
  }

  const c = content[language] || content.en

return (
    <div className="min-h-screen bg-[#07110d]">

      <Navbar language={language} setLanguage={setLanguage} menuItems={menuItems} />

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden pt-20 sm:pt-28 lg:pt-24">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
          <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.22),transparent_58%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1fr_430px] lg:px-8 lg:pb-16 lg:pt-20">
            <div className="relative z-10 max-w-3xl text-center lg:text-left">
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2"
              >
                <Sparkles className="size-4 text-emerald-300" />
                <span className="text-sm font-medium text-emerald-100">{c.badge}</span>
              </Motion.div>

              <Motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl"
              >
                {c.heading}
              </Motion.h1>
              
              <Motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-auto my-8 max-w-2xl text-base leading-7 text-emerald-50/70 sm:text-xl lg:mx-0"
              >
                {c.subheading}
              </Motion.p>

              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <Button asChild size="lg" className="h-11 bg-emerald-400! px-5 text-zinc-950! transition-all duration-300 hover:bg-lime-300! hover:text-zinc-950! hover:shadow-[0_10px_30px_-14px_rgba(16,185,129,0.9)]">
                  <Link to="/discover">
                    <span>{c.cta}</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-emerald-50/72 lg:justify-start"
              >
                {[
                  { icon: ShieldCheck, label: language === 'hi' ? 'सुरक्षित और निजी' : 'Secure & Private' },
                  { icon: Languages, label: language === 'hi' ? 'हिंदी + English' : 'English + Hindi' },
                  { icon: MapPin, label: language === 'hi' ? 'भारत भर की योजनाएं' : 'Schemes across India' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 py-2 backdrop-blur-xl">
                      <Icon className="h-4 w-4 text-emerald-300" />
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </Motion.div>
            </div>

            <Motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.55 }}
              className="relative z-10"
            >
              <div className="rounded-lg border border-white/10 bg-white/[0.065] p-4 shadow-[0_28px_110px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-100/45">Eligibility scan</p>
                    <p className="mt-1 text-lg font-semibold text-white">JanSahay AI</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-300/10">
                    <Sparkles className="h-5 w-5 text-emerald-300" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    ['Age', '21 years'],
                    ['State', 'Bihar'],
                    ['Occupation', 'Student'],
                    ['Income', 'Under ₹1L'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 px-4 py-3">
                      <span className="text-sm text-emerald-50/55">{label}</span>
                      <span className="text-sm font-medium text-white">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-50/70">Recommended matches</span>
                    <span className="text-2xl font-semibold text-emerald-200">5</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300" />
                  </div>
                </div>
              </div>
            </Motion.div>
            </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07110d] to-transparent" />

          <div id="schemes" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: "4600+", label: language === 'hi' ? 'योजनाएं' : 'Schemes', icon: FileCheck },
                { value: "50+", label: language === 'hi' ? 'मंत्रालय' : 'Ministries', icon: Building2 },
                { value: "95%", label: language === 'hi' ? 'सटीकता' : 'Accuracy', icon: Target },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                <div key={i} className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] p-8 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-white/[0.08] sm:min-h-40">
                  <Icon className="mb-3 h-8 w-8 text-emerald-300" />
                  <div className="text-4xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-2 text-emerald-50/55">{stat.label}</div>
                </div>
              )})}
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-white/10 bg-black/16 py-12">
          <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-sm font-medium uppercase tracking-[0.18em] text-emerald-50/45">{c.companies}</h2>
            <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-emerald-50/35">
              <span className="text-xl font-semibold">Gov of India</span>
              <span className="text-xl font-semibold">UIDAI</span>
              <span className="text-xl font-semibold">PMO</span>
              <span className="text-xl font-semibold">MyGov</span>
              <span className="text-xl font-semibold">Digital India</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
