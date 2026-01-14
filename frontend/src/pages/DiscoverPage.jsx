import { useState } from 'react'
import { ArrowRight, ArrowLeft, Sparkles, User, Calendar, MapPin, Home, Briefcase, DollarSign, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Navbar from '@/components/Navbar'

const DiscoverPage = ({ language, setLanguage }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    state: '',
    residence: '',
    category: '',
    income: '',
    occupation: ''
  })

  const content = {
    en: {
      title: 'Find Your Schemes',
      subtitle: 'Answer a few questions to discover government schemes for you',
      skip: 'Skip',
      back: 'Back',
      next: 'Next',
      submit: 'Find Schemes',
      steps: [
        {
          id: 'gender',
          title: 'What is your gender?',
          icon: User,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          id: 'age',
          title: 'What is your age?',
          icon: Calendar,
          placeholder: 'Enter your age'
        },
        {
          id: 'state',
          title: 'Which state do you live in?',
          icon: MapPin,
          options: [
            { value: 'delhi', label: 'Delhi' },
            { value: 'maharashtra', label: 'Maharashtra' },
            { value: 'karnataka', label: 'Karnataka' },
            { value: 'tamil_nadu', label: 'Tamil Nadu' },
            { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
            { value: 'west_bengal', label: 'West Bengal' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          id: 'residence',
          title: 'Where do you reside?',
          icon: Home,
          options: [
            { value: 'urban', label: 'Urban' },
            { value: 'rural', label: 'Rural' }
          ]
        },
        {
          id: 'category',
          title: 'What is your category?',
          icon: Users,
          options: [
            { value: 'general', label: 'General' },
            { value: 'obc', label: 'OBC' },
            { value: 'sc', label: 'SC' },
            { value: 'st', label: 'ST' },
            { value: 'ews', label: 'EWS' }
          ]
        },
        {
          id: 'income',
          title: 'What is your annual income?',
          icon: DollarSign,
          placeholder: 'Enter annual income (in ₹)'
        },
        {
          id: 'occupation',
          title: 'What is your occupation?',
          icon: Briefcase,
          options: [
            { value: 'govt_service', label: 'Government Service' },
            { value: 'private', label: 'Private Job' },
            { value: 'business', label: 'Business' },
            { value: 'agriculture', label: 'Agriculture' },
            { value: 'student', label: 'Student' },
            { value: 'unemployed', label: 'Unemployed' }
          ]
        }
      ]
    },
    hi: {
      title: 'अपनी योजनाएं खोजें',
      subtitle: 'आपके लिए सरकारी योजनाओं को खोजने के लिए कुछ प्रश्नों के उत्तर दें',
      skip: 'छोड़ें',
      back: 'पीछे',
      next: 'आगे',
      submit: 'योजनाएं खोजें',
      steps: [
        {
          id: 'gender',
          title: 'आपका लिंग क्या है?',
          icon: User,
          options: [
            { value: 'male', label: 'पुरुष' },
            { value: 'female', label: 'महिला' },
            { value: 'other', label: 'अन्य' }
          ]
        },
        {
          id: 'age',
          title: 'आपकी आयु क्या है?',
          icon: Calendar,
          placeholder: 'अपनी आयु दर्ज करें'
        },
        {
          id: 'state',
          title: 'आप किस राज्य में रहते हैं?',
          icon: MapPin,
          options: [
            { value: 'delhi', label: 'दिल्ली' },
            { value: 'maharashtra', label: 'महाराष्ट्र' },
            { value: 'karnataka', label: 'कर्नाटक' },
            { value: 'tamil_nadu', label: 'तमिलनाडु' },
            { value: 'uttar_pradesh', label: 'उत्तर प्रदेश' },
            { value: 'west_bengal', label: 'पश्चिम बंगाल' },
            { value: 'other', label: 'अन्य' }
          ]
        },
        {
          id: 'residence',
          title: 'आप कहाँ रहते हैं?',
          icon: Home,
          options: [
            { value: 'urban', label: 'शहरी' },
            { value: 'rural', label: 'ग्रामीण' }
          ]
        },
        {
          id: 'category',
          title: 'आपकी श्रेणी क्या है?',
          icon: Users,
          options: [
            { value: 'general', label: 'सामान्य' },
            { value: 'obc', label: 'ओबीसी' },
            { value: 'sc', label: 'एससी' },
            { value: 'st', label: 'एसटी' },
            { value: 'ews', label: 'ईडब्ल्यूएस' }
          ]
        },
        {
          id: 'income',
          title: 'आपकी वार्षिक आय क्या है?',
          icon: DollarSign,
          placeholder: 'वार्षिक आय दर्ज करें (₹ में)'
        },
        {
          id: 'occupation',
          title: 'आपका व्यवसाय क्या है?',
          icon: Briefcase,
          options: [
            { value: 'govt_service', label: 'सरकारी सेवा' },
            { value: 'private', label: 'निजी नौकरी' },
            { value: 'business', label: 'व्यवसाय' },
            { value: 'agriculture', label: 'कृषि' },
            { value: 'student', label: 'छात्र' },
            { value: 'unemployed', label: 'बेरोजगार' }
          ]
        }
      ]
    }
  }

  const steps = content[language].steps
  const currentStepData = steps[currentStep]
  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    console.log('Form Data:', formData)
    // TODO: Navigate to results page or trigger scheme search
  }

  const isStepValid = () => {
    const value = formData[currentStepData.id]
    return value && value.trim() !== ''
  }

  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen pattern-dots">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <div className="bg-white border-b border-gray-200">
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-gov-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="pt-10 text-4xl font-semibold text-gray-900 font-poppins mb-2">
            {content[language].title}
          </h1>
          <p className="text-gray-600 text-lg">{content[language].subtitle}</p>
          
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-gov-blue-600'
                    : index < currentStep
                    ? 'w-2 bg-gov-blue-500'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="border border-gray-200 shadow-sm min-h-[350px] flex flex-col">
        <CardContent className="p-8 flex-grow flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gov-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gov-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentStepData.title}
              </h2>
            </div>

            {/* Input Fields */}
            <div className="space-y-3 flex-grow">
              {currentStepData.options ? (
                currentStepData.options.length <= 3 ? (
                  // Radio Group for few options
                  <RadioGroup
                    value={formData[currentStepData.id]}
                    onValueChange={(value) => updateFormData(currentStepData.id, value)}
                  >
                    <div className="grid gap-3">
                      {currentStepData.options.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gov-blue-400 hover:bg-gray-50 transition-all cursor-pointer"
                          onClick={() => updateFormData(currentStepData.id, option.value)}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label
                            htmlFor={option.value}
                            className="flex-1 cursor-pointer font-medium text-gray-700"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  // Select Dropdown for many options
                  <Select
                    value={formData[currentStepData.id]}
                    onValueChange={(value) => updateFormData(currentStepData.id, value)}
                  >
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder={`Select ${currentStepData.id}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentStepData.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
              ) : currentStepData.id === 'age' ? (
                // Age Slider
                <div className="space-y-6">
                  <motion.div 
                    className="relative pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      type="range"
                      min="0"
                      max="115"
                      value={formData.age || 0}
                      onChange={(e) => updateFormData('age', e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${(formData.age || 0) / 115 * 100}%, rgb(229 231 235) ${(formData.age || 0) / 115 * 100}%, rgb(229 231 235) 100%)`
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="inline-flex items-center justify-center px-8 py-4 bg-gov-blue-50 border-2 border-gov-blue-200 rounded-xl">
                      <span className="text-4xl font-bold text-gov-blue-600">
                        {formData.age || 0}
                      </span>
                      <span className="ml-2 text-lg text-gray-600">years</span>
                    </div>
                  </motion.div>
                </div>
              ) : (
                // Text Input
                <div>
                  <Input
                    type={currentStepData.id === 'income' ? 'number' : 'text'}
                    placeholder={currentStepData.placeholder}
                    value={formData[currentStepData.id]}
                    onChange={(e) => updateFormData(currentStepData.id, e.target.value)}
                    className="h-11"
                  />
                </div>
              )}
            </div>
          </CardContent>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-2 px-8 pb-5">
          <div className="flex gap-3">
            {currentStep > 0 && (
                <Button
                variant="outline"
                onClick={handleBack}
                className="gap-2"
                >
                <ArrowLeft className="w-4 h-4" />
                {content[language].back}
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-gray-600"
              >
              {content[language].skip}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="gap-2 min-w-[120px]"
            >
              {currentStep === totalSteps - 1 ? content[language].submit : content[language].next}
              {currentStep < totalSteps - 1 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        </Card>
      </div>
    </div>
  )
}

export default DiscoverPage
