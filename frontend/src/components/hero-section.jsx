import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, ArrowRight, Sparkles, FileCheck, Building2, Target, User, LogOut, Settings, ShieldCheck, MapPin, Languages } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import { useAuth } from '@/contexts/AuthContext'

const menuItems = [
  // { name: 'Tech Stack', nameHi: 'टेक स्टैक', href: '#tech-stack' },
  { name: 'How it Works', nameHi: 'कैसे काम करता है', href: '#how-it-works' },
  { name: 'Why JanSahay', nameHi: 'जनसहाय क्यों', href: '#features' },
]

export default function HeroSection({ language = 'en' }) {
  const [menuState, setMenuState] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useAuth()

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

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

      {/* Navbar */}
      <header>
        <nav
          data-state={menuState && 'active'}
          className="fixed z-50 w-full border-b border-white/10 bg-white/[0.045] backdrop-blur-xl"
        >
          <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link to="/" aria-label="home" className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/20 bg-emerald-300/10">
                    <Sparkles className="size-5 text-emerald-300" />
                  </div>
                  <span className="text-xl font-bold text-white">JanSahay</span>
                </Link>

                {user ? (
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-200/25 bg-emerald-300/12 text-sm font-semibold text-emerald-200">
                      {getInitials(user.name)}
                    </div>
                  </button>
                ) : (
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className={`m-auto size-6 text-white duration-200 ${menuState ? 'rotate-180 scale-0 opacity-0' : ''}`} />
                  <X className={`absolute inset-0 m-auto size-6 text-white ${menuState ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'} duration-200`} />
                </button>
                )}
              </div>

              <div className={`${menuState ? 'block' : 'hidden'} mb-6 w-full flex-wrap items-center justify-end space-y-6 rounded-lg border border-white/10 bg-[#07110d]/92 p-5 shadow-xl backdrop-blur-xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:!bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none`}>
                <div className="hidden lg:pr-4 lg:block">
                  <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <a href={item.href} onClick={() => setMenuState(false)} className="block text-zinc-400 duration-150 hover:text-white">
                          <span>{language === 'hi' ? item.nameHi : item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l border-white/10 lg:pl-6">
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex h-9 items-center gap-2 rounded-lg border border-white/12 bg-white/[0.055] px-2.5 text-emerald-50 shadow-none backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/25 hover:bg-white/[0.09] hover:text-white"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200/25 bg-emerald-300/12 text-xs font-semibold text-emerald-200">
                          {getInitials(user.name)}
                        </div>
                        <span className="max-w-28 truncate text-sm font-medium">{user.name}</span>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-white/10 bg-[#07110d]/95 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                          <div className="mb-1 rounded-md border border-white/10 bg-white/[0.045] px-3 py-2">
                            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                            {user.email && <p className="mt-0.5 truncate text-xs text-emerald-50/45">{user.email}</p>}
                          </div>
                          <Link
                            to="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-emerald-50/78 transition-colors hover:bg-white/[0.07] hover:text-white"
                          >
                            <User className="h-4 w-4 text-emerald-300" />
                            <span>{language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}</span>
                          </Link>
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-emerald-50/78 transition-colors hover:bg-white/[0.07] hover:text-white"
                          >
                            <Settings className="h-4 w-4 text-emerald-300" />
                            <span>{language === 'hi' ? 'सेटिंग्स' : 'Settings'}</span>
                          </button>
                          <div className="my-1 h-px bg-white/10" />
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-red-500/12 hover:text-red-200"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>{language === 'hi' ? 'लॉग आउट' : 'Logout'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Button asChild size="sm" className="h-10 sm:h-9 border border-white/12 bg-white/[0.055]! px-4 sm:px-3 text-emerald-50! shadow-none backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/25 hover:bg-white/[0.09]! hover:text-white!">
                        <Link to="/login">
                          <span>{c.login}</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="h-10 sm:h-9 border border-emerald-200/30 bg-emerald-300! px-4 sm:px-3 text-[#06100c]! shadow-[0_10px_30px_-18px_rgba(16,185,129,0.9)] transition-all duration-300 hover:border-lime-200/50 hover:bg-lime-300! hover:text-[#06100c]! hover:shadow-[0_12px_34px_-16px_rgba(190,242,100,0.95)]">
                        <Link to="/discover">
                          <span>{c.cta}</span>
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {user && isDropdownOpen && (
        <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-[#07110d]/96 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:hidden">
          <div className="px-4 py-4 space-y-2">
            <div className="mb-2 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-200/25 bg-emerald-300/12 font-semibold text-emerald-200">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                {user.email && <p className="text-sm text-emerald-50/45">{user.email}</p>}
              </div>
            </div>
            <Link
              to="/profile"
              onClick={() => setIsDropdownOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left font-medium text-emerald-50/78 transition-all hover:bg-white/[0.07] hover:text-white"
            >
              <User size={18} className="text-emerald-300" />
              <span>{language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}</span>
            </Link>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left font-medium text-emerald-50/78 transition-all hover:bg-white/[0.07] hover:text-white"
            >
              <Settings size={18} className="text-emerald-300" />
              <span>{language === 'hi' ? 'सेटिंग्स' : 'Settings'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left font-medium text-red-300 transition-all hover:bg-red-500/12 hover:text-red-200"
            >
              <LogOut size={18} />
              <span>{language === 'hi' ? 'लॉग आउट' : 'Logout'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden pt-20 sm:pt-28 lg:pt-24">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
          <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.22),transparent_58%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1fr_430px] lg:px-8 lg:pb-16 lg:pt-20">
            <div className="relative z-10 max-w-3xl text-center lg:text-left">
              {/* Badge */}
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

          {/* Gradient fade at bottom */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07110d] to-transparent" />

          {/* Stats cards */}
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

        {/* Companies */}
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
