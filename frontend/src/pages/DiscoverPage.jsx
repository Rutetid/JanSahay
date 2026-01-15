import { useState } from 'react'
import { ArrowRight, ArrowLeft, Sparkles, User, Calendar, MapPin, Home, Briefcase, DollarSign, Users, Loader2, CheckCircle2, Info, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Navbar from '@/components/Navbar'
import { schemeAPI } from '@/lib/api'
import { Link } from 'react-router-dom'

const formSchema = z.object({
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender',
  }),
  age: z.string()
    .min(1, 'Age is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 115, {
      message: 'Age must be between 0 and 115',
    }),
  state: z.string().min(1, 'Please select your state'),
  residence: z.enum(['urban', 'rural'], {
    required_error: 'Please select your residence type',
  }),
  category: z.enum(['general', 'obc', 'sc', 'st', 'ews'], {
    required_error: 'Please select your category',
  }),
  income: z.string()
    .min(1, 'Income is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Income must be a valid positive number',
    }),
  occupation: z.enum(['govt_service', 'private', 'business', 'agriculture', 'student', 'unemployed'], {
    required_error: 'Please select your occupation',
  }),
})

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
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [schemes, setSchemes] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
            { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
            { value: 'arunachal_pradesh', label: 'Arunachal Pradesh' },
            { value: 'assam', label: 'Assam' },
            { value: 'bihar', label: 'Bihar' },
            { value: 'chhattisgarh', label: 'Chhattisgarh' },
            { value: 'goa', label: 'Goa' },
            { value: 'gujarat', label: 'Gujarat' },
            { value: 'haryana', label: 'Haryana' },
            { value: 'himachal_pradesh', label: 'Himachal Pradesh' },
            { value: 'jharkhand', label: 'Jharkhand' },
            { value: 'karnataka', label: 'Karnataka' },
            { value: 'kerala', label: 'Kerala' },
            { value: 'madhya_pradesh', label: 'Madhya Pradesh' },
            { value: 'maharashtra', label: 'Maharashtra' },
            { value: 'manipur', label: 'Manipur' },
            { value: 'meghalaya', label: 'Meghalaya' },
            { value: 'mizoram', label: 'Mizoram' },
            { value: 'nagaland', label: 'Nagaland' },
            { value: 'odisha', label: 'Odisha' },
            { value: 'punjab', label: 'Punjab' },
            { value: 'rajasthan', label: 'Rajasthan' },
            { value: 'sikkim', label: 'Sikkim' },
            { value: 'tamil_nadu', label: 'Tamil Nadu' },
            { value: 'telangana', label: 'Telangana' },
            { value: 'tripura', label: 'Tripura' },
            { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
            { value: 'uttarakhand', label: 'Uttarakhand' },
            { value: 'west_bengal', label: 'West Bengal' },
            { value: 'andaman_nicobar', label: 'Andaman and Nicobar Islands' },
            { value: 'chandigarh', label: 'Chandigarh' },
            { value: 'dadra_nagar_haveli_daman_diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
            { value: 'delhi', label: 'Delhi' },
            { value: 'jammu_kashmir', label: 'Jammu and Kashmir' },
            { value: 'ladakh', label: 'Ladakh' },
            { value: 'lakshadweep', label: 'Lakshadweep' },
            { value: 'puducherry', label: 'Puducherry' }
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
          title: 'What is your annual income? (in Lakhs)',
          icon: DollarSign,
          placeholder: 'Enter annual income (in ₹ Lakhs)'
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
            { value: 'andhra_pradesh', label: 'आंध्र प्रदेश' },
            { value: 'arunachal_pradesh', label: 'अरुणाचल प्रदेश' },
            { value: 'assam', label: 'असम' },
            { value: 'bihar', label: 'बिहार' },
            { value: 'chhattisgarh', label: 'छत्तीसगढ़' },
            { value: 'goa', label: 'गोवा' },
            { value: 'gujarat', label: 'गुजरात' },
            { value: 'haryana', label: 'हरियाणा' },
            { value: 'himachal_pradesh', label: 'हिमाचल प्रदेश' },
            { value: 'jharkhand', label: 'झारखंड' },
            { value: 'karnataka', label: 'कर्नाटक' },
            { value: 'kerala', label: 'केरल' },
            { value: 'madhya_pradesh', label: 'मध्य प्रदेश' },
            { value: 'maharashtra', label: 'महाराष्ट्र' },
            { value: 'manipur', label: 'मणिपुर' },
            { value: 'meghalaya', label: 'मेघालय' },
            { value: 'mizoram', label: 'मिजोरम' },
            { value: 'nagaland', label: 'नागालैंड' },
            { value: 'odisha', label: 'ओडिशा' },
            { value: 'punjab', label: 'पंजाब' },
            { value: 'rajasthan', label: 'राजस्थान' },
            { value: 'sikkim', label: 'सिक्किम' },
            { value: 'tamil_nadu', label: 'तमिलनाडु' },
            { value: 'telangana', label: 'तेलंगाना' },
            { value: 'tripura', label: 'त्रिपुरा' },
            { value: 'uttar_pradesh', label: 'उत्तर प्रदेश' },
            { value: 'uttarakhand', label: 'उत्तराखंड' },
            { value: 'west_bengal', label: 'पश्चिम बंगाल' },
            { value: 'andaman_nicobar', label: 'अंडमान और निकोबार द्वीप समूह' },
            { value: 'chandigarh', label: 'चंडीगढ़' },
            { value: 'dadra_nagar_haveli_daman_diu', label: 'दादरा और नगर हवेली और दमन और दीव' },
            { value: 'delhi', label: 'दिल्ली' },
            { value: 'jammu_kashmir', label: 'जम्मू और कश्मीर' },
            { value: 'ladakh', label: 'लद्दाख' },
            { value: 'lakshadweep', label: 'लक्षद्वीप' },
            { value: 'puducherry', label: 'पुडुचेरी' }
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
          title: 'आपकी वार्षिक आय क्या है? (लाख में)',
          icon: DollarSign,
          placeholder: 'वार्षिक आय दर्ज करें (लाख ₹ में)'
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
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateCurrentStep = () => {
    const currentField = currentStepData.id
    try {
      // Validate only the current field
      const fieldSchema = formSchema.shape[currentField]
      fieldSchema.parse(formData[currentField])
      setErrors(prev => ({ ...prev, [currentField]: undefined }))
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [currentField]: error.errors[0].message }))
      }
      return false
    }
  }

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return
    }
    
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
    // Clear error when skipping
    const currentField = currentStepData.id
    setErrors(prev => ({ ...prev, [currentField]: undefined }))
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const parseSchemeText = (schemeText) => {
    const lines = schemeText.split('\n').filter(line => line.trim())
    const scheme = {}
    
    lines.forEach(line => {
      if (line.includes('Scheme_ID:')) {
        scheme.id = line.split('Scheme_ID:')[1].trim()
      } else if (line.includes('Scheme_Name:')) {
        scheme.name = line.split('Scheme_Name:')[1].trim()
      } else if (line.includes('Category:')) {
        scheme.category = line.split('Category:')[1].trim()
      } else if (line.includes('Eligibility:')) {
        const eligibilityRaw = line.split('Eligibility:')[1].trim()
        // Parse Python dict format to readable text
        try {
          // Replace Python-style dict with JSON
          const jsonStr = eligibilityRaw
            .replace(/'/g, '"')
            .replace(/True/g, 'true')
            .replace(/False/g, 'false')
          const eligibilityObj = JSON.parse(jsonStr)
          
          // Convert to readable format
          const parts = []
          if (eligibilityObj.min_age) parts.push(`Age ${eligibilityObj.min_age}+`)
          if (eligibilityObj.max_age) parts.push(`up to ${eligibilityObj.max_age} years`)
          if (eligibilityObj.gender && eligibilityObj.gender !== 'Any') parts.push(eligibilityObj.gender)
          if (eligibilityObj.occupation) parts.push(eligibilityObj.occupation)
          if (eligibilityObj.max_income) parts.push(`Income under ₹${(eligibilityObj.max_income / 100000).toFixed(1)}L`)
          if (eligibilityObj.category_allowed) {
            parts.push(`Categories: ${eligibilityObj.category_allowed.join(', ')}`)
          }
          if (eligibilityObj.land_required) parts.push('Land ownership required')
          
          scheme.eligibility = parts.join(' • ')
        } catch (e) {
          // If parsing fails, use raw text
          scheme.eligibility = eligibilityRaw
        }
      } else if (line.includes('Benefits:')) {
        scheme.benefits = line.split('Benefits:')[1].trim()
      } else if (line.includes('Documents:')) {
        const docsRaw = line.split('Documents:')[1].trim()
        // Parse array format
        try {
          const jsonStr = docsRaw.replace(/'/g, '"')
          const docsArray = JSON.parse(jsonStr)
          scheme.documents = docsArray.join(', ')
        } catch (e) {
          scheme.documents = docsRaw
        }
      } else if (line.includes('State:')) {
        scheme.state = line.split('State:')[1].trim()
      } else if (line.includes('Description:')) {
        scheme.description = line.split('Description:')[1].trim()
      }
    })
    
    return scheme
  }

  const handleSubmit = async () => {
    try {
      const validatedData = formSchema.parse(formData)
      console.log('Validated Form Data:', validatedData)
      
      setLoading(true)
      setShowResults(false)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock data selection based on occupation
      const mockData = {
        student: {
          "query": "Find government schemes for 21 year old student obc male in bihar with income under 100000",
          "total_schemes": 5,
          "results": [
            {
              "index": 1,
              "scheme_text": "\n    Scheme_ID: DDUGKY15\n    Scheme_Name: Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)\n    Category: Skill Development\n    Eligibility: {'min_age': 15, 'max_age': 35, 'category_allowed': ['SC', 'ST', 'OBC', 'BPL']}\n    Benefits: Skill training and placement for rural youth\n    Documents: ['Aadhaar Card', 'Rural Residence Proof']\n    State: All\n    Description: This scheme provides skill training and job placement for rural youth.\n    ",
              "relevance_score": 0.8173279166221619
            },
            {
              "index": 2,
              "scheme_text": "\n    Scheme_ID: MGNREGA06\n    Scheme_Name: Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)\n    Category: Employment\n    Eligibility: {'min_age': 18, 'gender': 'Any'}\n    Benefits: Guaranteed 100 days of wage employment in rural areas\n    Documents: ['Aadhaar Card', 'Job Card', 'Bank Account Details']\n    State: All\n    Description: This scheme provides guaranteed employment to rural households for livelihood support.\n    ",
              "relevance_score": 0.8407395482063293
            },
            {
              "index": 3,
              "scheme_text": "\n    Scheme_ID: PMKISAN03\n    Scheme_Name: Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)\n    Category: Agriculture\n    Eligibility: {'min_age': 18, 'occupation': 'Farmer', 'land_required': True}\n    Benefits: ₹6000 per year financial support to farmers\n    Documents: ['Aadhaar Card', 'Land Ownership Documents', 'Bank Account Details']\n    State: All\n    Description: The government gives farmers ₹6000 every year to help with farming expenses.\n    ",
              "relevance_score": 0.9491934776306152
            },
            {
              "index": 4,
              "scheme_text": "\n    Scheme_ID: PMAY01\n    Scheme_Name: Pradhan Mantri Awas Yojana (PMAY)\n    Category: Housing\n    Eligibility: {'min_age': 18, 'max_income': 300000, 'gender': 'Any', 'category_allowed': ['SC', 'ST', 'OBC', 'General']}\n    Benefits: Financial assistance for building or buying a pucca house\n    Documents: ['Aadhaar Card', 'Income Certificate', 'Bank Account Details']\n    State: All\n    Description: The government helps eligible citizens to build or buy a house by giving financial support.\n    ",
              "relevance_score": 0.9518991112709045
            },
            {
              "index": 5,
              "scheme_text": "\n    Scheme_ID: PMKVY12\n    Scheme_Name: Pradhan Mantri Kaushal Vikas Yojana (PMKVY)\n    Category: Skill Development\n    Eligibility: {'min_age': 15, 'max_age': 45}\n    Benefits: Free skill training and certification\n    Documents: ['Aadhaar Card', 'Education Certificate']\n    State: All\n    Description: This scheme helps youth learn new skills and improve job opportunities.\n    ",
              "relevance_score": 0.9574979543685913
            }
          ]
        },
        agriculture: {
          "query": "Find government schemes for 35 year old agriculture sc male in bihar with income under 150000",
          "total_schemes": 4,
          "results": [
            {
              "index": 1,
              "scheme_text": "\n    Scheme_ID: PMKISAN03\n    Scheme_Name: Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)\n    Category: Agriculture\n    Eligibility: {'min_age': 18, 'occupation': 'Farmer', 'land_required': True}\n    Benefits: ₹6000 per year financial support to farmers\n    Documents: ['Aadhaar Card', 'Land Ownership Documents', 'Bank Account Details']\n    State: All\n    Description: The government gives farmers ₹6000 every year to help with farming expenses.\n    ",
              "relevance_score": 0.8087407350540161
            },
            {
              "index": 2,
              "scheme_text": "\n    Scheme_ID: MGNREGA06\n    Scheme_Name: Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)\n    Category: Employment\n    Eligibility: {'min_age': 18, 'gender': 'Any'}\n    Benefits: Guaranteed 100 days of wage employment in rural areas\n    Documents: ['Aadhaar Card', 'Job Card', 'Bank Account Details']\n    State: All\n    Description: This scheme provides guaranteed employment to rural households for livelihood support.\n    ",
              "relevance_score": 0.8354548811912537
            },
            {
              "index": 3,
              "scheme_text": "\n    Scheme_ID: DDUGKY15\n    Scheme_Name: Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)\n    Category: Skill Development\n    Eligibility: {'min_age': 15, 'max_age': 35, 'category_allowed': ['SC', 'ST', 'OBC', 'BPL']}\n    Benefits: Skill training and placement for rural youth\n    Documents: ['Aadhaar Card', 'Rural Residence Proof']\n    State: All\n    Description: This scheme provides skill training and job placement for rural youth.\n    ",
              "relevance_score": 0.8598265647888184
            },
            {
              "index": 4,
              "scheme_text": "\n    Scheme_ID: PMAY01\n    Scheme_Name: Pradhan Mantri Awas Yojana (PMAY)\n    Category: Housing\n    Eligibility: {'min_age': 18, 'max_income': 300000, 'gender': 'Any', 'category_allowed': ['SC', 'ST', 'OBC', 'General']}\n    Benefits: Financial assistance for building or buying a pucca house\n    Documents: ['Aadhaar Card', 'Income Certificate', 'Bank Account Details']\n    State: All\n    Description: The government helps eligible citizens to build or buy a house by giving financial support.\n    ",
              "relevance_score": 0.9989012479782104
            }
          ]
        }
      }
      
      // Select mock data based on occupation, default to student
      const response = mockData[validatedData.occupation] || mockData.student
      
      // Parse schemes from RAG response
      const parsedSchemes = response.results.map(result => ({
        ...parseSchemeText(result.scheme_text),
        relevanceScore: result.relevance_score
      }))
      
      setSchemes(parsedSchemes)
      setSearchQuery(response.query)
      setShowResults(true)
      setLoading(false)
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
        console.error('Validation errors:', newErrors)
      } else {
        console.error('API Error:', error)
        setErrors({ submit: 'Failed to fetch schemes. Please try again.' })
      }
      setLoading(false)
    }
  }

  const handleStartOver = () => {
    setShowResults(false)
    setSchemes([])
    setCurrentStep(0)
    setFormData({
      gender: '',
      age: '',
      state: '',
      residence: '',
      category: '',
      income: '',
      occupation: ''
    })
  }

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen pattern-dots">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 border-4 border-gov-blue-200 border-t-gov-blue-600 rounded-full animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-gov-blue-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-2xl font-semibold text-gray-900"
          >
            {language === 'en' ? 'Discovering Schemes...' : 'योजनाएं खोजी जा रही हैं...'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-gray-600"
          >
            {language === 'en' ? 'Finding the best matches for you' : 'आपके लिए सर्वोत्तम मिलान खोज रहे हैं'}
          </motion.p>
        </div>
      </div>
    )
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen pattern-dots">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {language === 'en' ? `Found ${schemes.length} Schemes For You!` : `आपके लिए ${schemes.length} योजनाएं मिलीं!`}
            </h1>
            {/* <p className="text-gray-600 max-w-2xl mx-auto">
              {searchQuery}
            </p> */}
          </motion.div>

          {/* Schemes Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <AnimatePresence>
              {schemes.map((scheme, index) => (
                <motion.div
                  key={scheme.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-[500px] flex flex-col hover:shadow-lg transition-shadow border-l-4 border-l-gov-blue-500">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Relevance Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gov-blue-100 text-gov-blue-800">
                          {scheme.category || 'General'}
                        </span>
                        {/* <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Sparkles className="w-4 h-4" />
                          <span>{((1 - scheme.relevanceScore) * 100).toFixed(0)}% Match</span>
                        </div> */}
                      </div>

                      {/* Scheme Name */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {scheme.name || 'Government Scheme'}
                      </h3>

                      {/* State */}
                      {scheme.state && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{scheme.state}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {scheme.description || 'No description available'}
                      </p>

                      {/* Eligibility */}
                      {scheme.eligibility && (
                        <div className="mb-4">
                          <div className="flex items-start gap-2 text-sm">
                            <User className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-gray-700 mb-1">Eligibility:</p>
                              <p className="text-gray-600 text-xs line-clamp-2">{scheme.eligibility}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Benefits */}
                      {scheme.benefits && (
                        <div className="mb-4">
                          <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <p className="text-gray-700 line-clamp-2">{scheme.benefits}</p>
                          </div>
                        </div>
                      )}

                      {/* Documents Required */}
                      {scheme.documents && (
                        <div className="mb-4">
                          <div className="flex items-start gap-2 text-sm">
                            <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                            <p className="text-gray-600 text-xs line-clamp-2">
                              <span className="font-medium">Docs:</span> {scheme.documents}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Spacer to push button to bottom */}
                      <div className="grow"></div>

                      {/* View Details Button */}
                      <Link 
                        to={`/scheme/${scheme.id}`} 
                        state={{ scheme }} 
                        className="mt-auto"
                      >
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          View Details
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Button onClick={handleStartOver} size="lg" className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              {language === 'en' ? 'Search Again' : 'फिर से खोजें'}
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  const isStepValid = () => {
    const currentField = currentStepData.id
    const value = formData[currentField]
    
    // Check if field has a value
    if (!value || value.toString().trim() === '') {
      return false
    }
    
    // If there's an error for this field, it's not valid
    if (errors[currentField]) {
      return false
    }
    
    return true
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
          <p className="text-gray-600 text-lg font-medium">{content[language].subtitle}</p>
          
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mt-8">
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
        <Card className="shadow-sm min-h-[350px] flex flex-col mt-8 shadow-md">
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
              
              {/* Error Message */}
              {errors[currentStepData.id] && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-red-600 font-medium"
                >
                  {errors[currentStepData.id]}
                </motion.div>
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
