import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Lock, User, Loader2, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'

const LoginPage = ({ language = 'en' }) => {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const content = {
    en: {
      login: 'Welcome Back',
      loginSubtitle: 'Sign in to access your saved schemes',
      signup: 'Create Account',
      signupSubtitle: 'Join thousands discovering government benefits',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      loginButton: 'Sign In',
      signupButton: 'Create Account',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      signupLink: 'Sign up',
      loginLink: 'Sign in',
      heroTitle: 'Discover Government Schemes Made Easy',
      heroSubtitle: 'Access personalized recommendations for government benefits tailored to your needs',
      feature1: 'Smart Matching',
      feature1Desc: 'AI-powered scheme recommendations',
      feature2: 'Secure & Private',
      feature2Desc: 'Your data is encrypted and protected',
      feature3: 'Always Updated',
      feature3Desc: 'Latest schemes and benefits',
      backToHome: 'Back to Home'
    },
    hi: {
      login: 'वापसी पर स्वागत है',
      loginSubtitle: 'अपनी सहेजी गई योजनाओं तक पहुंचने के लिए साइन इन करें',
      signup: 'खाता बनाएं',
      signupSubtitle: 'हजारों लोगों में शामिल हों जो सरकारी लाभ खोज रहे हैं',
      fullName: 'पूरा नाम',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      loginButton: 'साइन इन करें',
      signupButton: 'खाता बनाएं',
      noAccount: 'खाता नहीं है?',
      hasAccount: 'पहले से खाता है?',
      signupLink: 'साइन अप करें',
      loginLink: 'साइन इन करें',
      heroTitle: 'सरकारी योजनाएं आसान बनाईं',
      heroSubtitle: 'आपकी आवश्यकताओं के अनुरूप सरकारी लाभों के लिए व्यक्तिगत सिफारिशें प्राप्त करें',
      feature1: 'स्मार्ट मैचिंग',
      feature1Desc: 'AI-संचालित योजना सिफारिशें',
      feature2: 'सुरक्षित और निजी',
      feature2Desc: 'आपका डेटा एन्क्रिप्टेड और सुरक्षित है',
      feature3: 'हमेशा अपडेट',
      feature3Desc: 'नवीनतम योजनाएं और लाभ',
      backToHome: 'होम पर वापस जाएं'
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await login(loginEmail, loginPassword)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const result = await signup(signupName, signupEmail, signupPassword)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || 'Signup failed')
      }
    } catch (err) {
      setError('An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07110d] text-white flex">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(16,185,129,0.20),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(250,204,21,0.10),transparent_28%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35 pointer-events-none" />

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center px-12 pb-12 pt-8">
        <div className="relative z-10 max-w-lg">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors mb-10">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold">JanSahay</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-100 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              {language === 'en' ? 'Smart eligibility platform' : 'स्मार्ट पात्रता प्लेटफॉर्म'}
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-white mb-5">
              {content[language].heroTitle}
            </h1>
            <p className="text-base leading-7 text-emerald-50/70 mb-10">
              {content[language].heroSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            {[
              { icon: Zap, color: 'text-amber-300', title: content[language].feature1, desc: content[language].feature1Desc },
              { icon: Shield, color: 'text-emerald-300', title: content[language].feature2, desc: content[language].feature2Desc },
              { icon: Sparkles, color: 'text-sky-300', title: content[language].feature3, desc: content[language].feature3Desc }
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg border border-white/10 bg-white/[0.055] backdrop-blur-xl flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm text-emerald-50/60">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 pt-8 sm:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200">
              <Sparkles className="w-7 h-7" />
              <span className="text-2xl font-bold">JanSahay</span>
            </Link>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.055] backdrop-blur-xl p-6 sm:p-8 shadow-none">
            <div className="flex gap-2 mb-7 bg-white/10 p-1 rounded-lg">
              <button
                onClick={() => { setIsLogin(false); setError('') }}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                  !isLogin
                    ? 'bg-emerald-400 text-zinc-950 shadow-sm'
                    : 'text-emerald-50/60 hover:text-white'
                }`}
              >
                {content[language].signupButton}
              </button>
              <button
                onClick={() => { setIsLogin(true); setError('') }}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isLogin
                    ? 'bg-emerald-400 text-zinc-950 shadow-sm'
                    : 'text-emerald-50/60 hover:text-white'
                }`}
              >
                {content[language].loginButton}
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {isLogin ? content[language].login : content[language].signup}
              </h2>
              <p className="text-sm text-emerald-50/60">
                {isLogin ? content[language].loginSubtitle : content[language].signupSubtitle}
              </p>
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm text-emerald-50/80" htmlFor="login-email">{content[language].email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-emerald-300/50" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-12 bg-black/24 border-white/10 text-white placeholder:text-emerald-50/30 rounded-lg"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-emerald-50/80" htmlFor="login-password">{content[language].password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-emerald-300/50" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 bg-black/24 border-white/10 text-white placeholder:text-emerald-50/30 rounded-lg"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2.5"
                  >
                    <p className="text-sm font-medium text-red-200">{error}</p>
                  </motion.div>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 gap-2 bg-emerald-400 text-zinc-950 hover:bg-lime-300 hover:shadow-[0_0_22px_rgba(16,185,129,0.28)] text-base font-medium"
                >
                  {loading ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Loading...</>
                  ) : (
                    <>{content[language].loginButton} <ArrowRight className="w-5 h-5" /></>
                  )}
                </Button>
                <p className="text-center text-sm text-emerald-50/50">
                  {content[language].noAccount}{' '}
                  <button type="button" onClick={() => setIsLogin(false)} className="text-emerald-300 hover:text-emerald-200 font-medium">
                    {content[language].signupLink}
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm text-emerald-50/80" htmlFor="signup-name">{content[language].fullName}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-emerald-300/50" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-12 bg-black/24 border-white/10 text-white placeholder:text-emerald-50/30 rounded-lg"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-emerald-50/80" htmlFor="signup-email">{content[language].email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-emerald-300/50" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-12 bg-black/24 border-white/10 text-white placeholder:text-emerald-50/30 rounded-lg"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-emerald-50/80" htmlFor="signup-password">{content[language].password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-emerald-300/50" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 bg-black/24 border-white/10 text-white placeholder:text-emerald-50/30 rounded-lg"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2.5"
                  >
                    <p className="text-sm font-medium text-red-200">{error}</p>
                  </motion.div>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 gap-2 bg-emerald-400 text-zinc-950 hover:bg-lime-300 hover:shadow-[0_0_22px_rgba(16,185,129,0.28)] text-base font-medium"
                >
                  {loading ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Loading...</>
                  ) : (
                    <>{content[language].signupButton} <ArrowRight className="w-5 h-5" /></>
                  )}
                </Button>
                <p className="text-center text-sm text-emerald-50/50">
                  {content[language].hasAccount}{' '}
                  <button type="button" onClick={() => setIsLogin(true)} className="text-emerald-300 hover:text-emerald-200 font-medium">
                    {content[language].loginLink}
                  </button>
                </p>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-emerald-50/35">
            <Link to="/" className="hover:text-emerald-300 transition-colors">
              {content[language].backToHome}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
