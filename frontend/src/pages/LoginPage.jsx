import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Loader2, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '../components/ui/card'

const LoginPage = ({ language = 'en' }) => {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [verificationEmail, setVerificationEmail] = useState('')
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Signup form state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const content = {
    en: {
      login: 'Welcome Back',
      loginSubtitle: 'Sign in to access your saved schemes',
      signup: 'Create Account',
      signupSubtitle: 'Join thousands discovering government benefits',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      loginButton: 'Sign In',
      signupButton: 'Create Account',
      orContinueWith: 'Or continue with',
      google: 'Continue with Google',
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
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      loginButton: 'साइन इन करें',
      signupButton: 'खाता बनाएं',
      orContinueWith: 'या इसके साथ जारी रखें',
      google: 'Google के साथ जारी रखें',
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
    setSuccess('')

    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const result = await signup(signupName, signupEmail, signupPassword)
      if (result.success) {
        if (result.requiresVerification) {
          setSuccess(result.message || 'Please check your email to verify your account')
          // Clear form
          setSignupName('')
          setSignupEmail('')
          setSignupPassword('')
        } else {
          navigate('/')
        }
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
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gov-blue-700 relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="w-8 h-8" />
            <span className="text-2xl font-bold">JanSahay</span>
          </Link>

          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {content[language].heroTitle}
            </h1>
            <p className="text-xl text-blue-100 mb-12">
              {content[language].heroSubtitle}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{content[language].feature1}</h3>
                <p className="text-blue-100">{content[language].feature1Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{content[language].feature2}</h3>
                <p className="text-blue-100">{content[language].feature2Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{content[language].feature3}</h3>
                <p className="text-blue-100">{content[language].feature3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 pattern-dots">
        <Card className="w-full max-w-md shadow-md border border-black/80 ">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-gov-blue-600 hover:text-gov-blue-700 mb-6">
              <Sparkles className="w-6 h-6" />
              <span className="text-xl font-bold">JanSahay</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Toggle Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  setIsLogin(true)
                  setError('')
                }}
                className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                  isLogin
                    ? 'bg-white text-gov-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {content[language].loginButton}
              </button>
              <button
                onClick={() => {
                  setIsLogin(false)
                  setError('')
                }}
                className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                  !isLogin
                    ? 'bg-white text-gov-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {content[language].signupButton}
              </button>
            </div>

            {isLogin ? (
              <div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {content[language].login}
                    </h2>
                    <p className="text-gray-600">{content[language].loginSubtitle}</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{content[language].email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10 h-12"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">{content[language].password}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-12"
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
                        className="p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                      </motion.div>
                    )}

                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          {content[language].loginButton}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {content[language].signup}
                    </h2>
                    <p className="text-gray-600">{content[language].signupSubtitle}</p>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">{content[language].fullName}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 h-12"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{content[language].email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10 h-12"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">{content[language].password}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-12"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* <div className="space-y-2">
                      <Label htmlFor="confirm-password">{content[language].confirmPassword}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-12"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div> */}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                      </motion.div>
                    )}

                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          {content[language].signupButton}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
