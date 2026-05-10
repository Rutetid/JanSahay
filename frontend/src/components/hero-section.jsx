import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, ShieldCheck, MapPin, Languages } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import Navbar from './Navbar'

const menuItems = [
  { name: 'How it Works', nameHi: 'कैसे काम करता है', href: '#how-it-works' },
  { name: 'Why JanSahay', nameHi: 'जनसहाय क्यों', href: '#features' },
]

export default function HeroSection({ language = 'en', setLanguage }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)
    setTilt({ x: deltaY * -3, y: deltaX * -3 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const cardTransform = `perspective(1000px) rotateY(${-8 + tilt.y}deg) rotateX(${3 + tilt.x}deg)`

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

      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.04]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <Navbar language={language} setLanguage={setLanguage} menuItems={menuItems} />

      {/* Hero */}
      <main>
        <section className="relative pt-16 sm:pt-16 lg:pt-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
            <div className="pointer-events-none absolute -top-64 -left-48 h-[900px] w-[900px] bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.10),transparent_65%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative grid min-h-[calc(100vh-80px)] items-center gap-12 lg:grid-cols-[1fr_480px]">

              <div className="relative z-10 pt-8 lg:pt-0">
                <Motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="text-left text-[72px] font-extrabold tracking-[-0.03em] leading-[1.1] text-white"
                >
                  Government Schemes<br />Made for You
                </Motion.h1>

                <Motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}
                  className="mt-5 max-w-[420px] text-left text-[17px] leading-relaxed text-white/50"
                >
                  {c.subheading}
                </Motion.p>

                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.55, ease: 'easeOut' }}
                  className="mt-8 flex"
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
                  transition={{ delay: 0.3, duration: 0.55, ease: 'easeOut' }}
                  className="mt-6 flex flex-wrap gap-3 text-sm text-emerald-50/72"
                >
                  {[
                    { icon: ShieldCheck, label: 'Secure & Private' },
                    { icon: Languages, label: 'English + Hindi' },
                    { icon: MapPin, label: 'Schemes across India' },
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
                transition={{ delay: 0.4, duration: 0.55, ease: 'easeOut' }}
                className="relative z-10 hidden overflow-visible lg:block"
              >
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative origin-center will-change-transform transition-[transform] duration-200 ease-out"
                  style={{
                    transform: cardTransform,
                    boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 0 60px rgba(52,211,153,0.15), 0 0 20px rgba(52,211,153,0.08)',
                    marginRight: '-120px',
                  }}
                >
                  <div className="rounded-lg border border-white/10 bg-white/[0.065] p-4 backdrop-blur-xl">
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
                </div>
              </Motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-40 bg-gradient-to-l from-[#07110d] to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-[#07110d] to-transparent" />

          <div className="bg-[#0a1712]">
            <div id="schemes" className="relative mx-auto max-w-4xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
              <hr className="border-white/[0.06]" />
              <div className="flex items-stretch justify-center py-10">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <span className="text-6xl font-bold text-white">4600+</span>
                  <span className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-emerald-50/40">{language === 'hi' ? 'योजनाएं' : 'Schemes'}</span>
                </div>
                <div className="w-px self-stretch bg-white/[0.06]" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <span className="text-6xl font-bold text-white">50+</span>
                  <span className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-emerald-50/40">{language === 'hi' ? 'मंत्रालय' : 'Ministries'}</span>
                </div>
                <div className="w-px self-stretch bg-white/[0.06]" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <span className="text-6xl font-bold text-white">95%</span>
                  <span className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-emerald-50/40">{language === 'hi' ? 'सटीकता' : 'Accuracy'}</span>
                </div>
              </div>
              <hr className="border-white/[0.06]" />
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
