import { useState } from 'react'
import { ArrowRight, ArrowLeft, Sparkles, User, Calendar, MapPin, Home, Briefcase, IndianRupee, Users, CheckCircle2, Info, ExternalLink, ShieldCheck, FileText, Search, Landmark, Target } from 'lucide-react'
import { motion as Motion, AnimatePresence } from 'motion/react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Navbar from '@/components/Navbar'
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
          icon: IndianRupee,
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
          icon: IndianRupee,
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
        } catch {
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
        } catch {
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
      
      const response = mockData[validatedData.occupation] || mockData.student
      
      const parsedSchemes = response.results.map(result => ({
        ...parseSchemeText(result.scheme_text),
        relevanceScore: result.relevance_score
      }))
      
      setSchemes(parsedSchemes)
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

  const profileSnapshot = [
    { label: language === 'en' ? 'Age' : 'आयु', value: formData.age ? `${formData.age}` : '--', iconElement: <Calendar className="mb-3 h-4 w-4 text-emerald-300" /> },
    { label: language === 'en' ? 'Location' : 'स्थान', value: formData.state ? formData.state.replaceAll('_', ' ') : '--', iconElement: <MapPin className="mb-3 h-4 w-4 text-emerald-300" /> },
    { label: language === 'en' ? 'Income' : 'आय', value: formData.income ? `₹${formData.income}L` : '--', iconElement: <IndianRupee className="mb-3 h-4 w-4 text-emerald-300" /> },
    { label: language === 'en' ? 'Work' : 'कार्य', value: formData.occupation ? formData.occupation.replaceAll('_', ' ') : '--', iconElement: <Briefcase className="mb-3 h-4 w-4 text-emerald-300" /> },
  ]

  const resultHighlights = [
    { label: language === 'en' ? 'RAG ranked' : 'RAG रैंकिंग', value: schemes.length, iconElement: <Sparkles className="mb-3 h-5 w-5 text-emerald-300" /> },
    { label: language === 'en' ? 'Documents mapped' : 'दस्तावेज मैप', value: schemes.filter((scheme) => scheme.documents).length, iconElement: <FileText className="mb-3 h-5 w-5 text-emerald-300" /> },
    { label: language === 'en' ? 'All India coverage' : 'भारत कवरेज', value: schemes.filter((scheme) => scheme.state === 'All').length, iconElement: <Landmark className="mb-3 h-5 w-5 text-emerald-300" /> },
  ]

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#07110d] text-white">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
          <Motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="h-28 w-28 rounded-full border border-emerald-300/20 bg-white/5 shadow-[0_0_80px_rgba(16,185,129,0.32)] backdrop-blur-xl" />
            <div className="absolute inset-3 rounded-full border-4 border-emerald-200/20 border-t-emerald-400 animate-spin" />
            <Sparkles className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-emerald-300" />
          </Motion.div>
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 mt-8 text-center text-2xl font-semibold text-white sm:text-3xl"
          >
            {language === 'en' ? 'Discovering Schemes...' : 'योजनाएं खोजी जा रही हैं...'}
          </Motion.h2>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 mt-2 max-w-md text-center text-sm text-emerald-50/70 sm:text-base"
          >
            {language === 'en' ? 'Finding the best matches for you' : 'आपके लिए सर्वोत्तम मिलान खोज रहे हैं'}
          </Motion.p>
          <div className="relative z-10 mt-8 grid w-full max-w-xl grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl sm:gap-3">
            {[Search, Target, ShieldCheck].map((StepIcon, index) => (
              <div key={index} className="flex h-20 flex-col items-center justify-center rounded-md bg-black/20 text-emerald-100/80">
                <StepIcon className="mb-2 h-5 w-5 text-emerald-300" />
                <div className="h-1.5 w-14 overflow-hidden rounded-full bg-white/10">
                  <Motion.div
                    className="h-full rounded-full bg-emerald-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.18 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-[#07110d] text-white">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(16,185,129,0.20),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(250,204,21,0.10),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Results Header */}
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end"
          >
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {language === 'en' ? 'Eligibility scan complete' : 'पात्रता जांच पूरी'}
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
                {language === 'en' ? `${schemes.length} strong matches for your profile` : `आपकी प्रोफ़ाइल के लिए ${schemes.length} बेहतर योजनाएं`}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/70 sm:text-base">
                {language === 'en'
                  ? 'Ranked recommendations with eligibility signals, benefits, and document requirements ready for review.'
                  : 'पात्रता, लाभ और जरूरी दस्तावेजों के साथ रैंक की गई सिफारिशें।'}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/[0.05] p-2 backdrop-blur-xl">
              {resultHighlights.map(({ label, value, iconElement }) => (
                <div key={label} className="rounded-md bg-black/20 p-3">
                  {iconElement}
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[11px] leading-4 text-emerald-50/60">{label}</p>
                </div>
              ))}
            </div>
          </Motion.div>

          {/* Schemes Grid */}
          <div className="mb-6 grid gap-4 sm:mb-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {schemes.map((scheme, index) => (
                <Motion.div
                  key={scheme.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="group h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] text-white shadow-none backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/[0.08] hover:shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                    <CardContent className="flex h-full flex-col p-4 sm:p-5">
                      {/* Relevance Badge */}
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-100">
                          {scheme.category || 'General'}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-emerald-50/60">
                          <Sparkles className="w-4 h-4" />
                          <span>{Math.max(1, ((1 - scheme.relevanceScore) * 100)).toFixed(0)}% fit</span>
                        </div>
                      </div>

                      {/* Scheme Name */}
                      <h3 className="mb-2 line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-white">
                        {scheme.name || 'Government Scheme'}
                      </h3>

                      {/* State */}
                      {scheme.state && (
                        <div className="mb-3 flex items-center gap-2 text-xs text-emerald-50/60">
                          <MapPin className="h-4 w-4 text-emerald-300" />
                          <span>{scheme.state}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="mb-4 line-clamp-3 text-sm leading-6 text-emerald-50/68">
                        {scheme.description || 'No description available'}
                      </p>

                      {/* Eligibility */}
                      {scheme.eligibility && (
                        <div className="mb-3 rounded-md border border-white/10 bg-black/18 p-3">
                          <div className="flex items-start gap-2 text-sm">
                            <User className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                            <div>
                              <p className="mb-1 text-xs font-medium text-white">Eligibility</p>
                              <p className="line-clamp-2 text-xs leading-5 text-emerald-50/65">{scheme.eligibility}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Benefits */}
                      {scheme.benefits && (
                        <div className="mb-3">
                          <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                            <p className="line-clamp-2 text-sm leading-5 text-emerald-50/75">{scheme.benefits}</p>
                          </div>
                        </div>
                      )}

                      {/* Documents Required */}
                      {scheme.documents && (
                        <div className="mb-4">
                          <div className="flex items-start gap-2 text-sm">
                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                            <p className="line-clamp-2 text-xs leading-5 text-emerald-50/60">
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
                        <Button variant="outline" size="lg" className="h-10 w-full gap-2 border-white/10 bg-white/5 text-white hover:border-emerald-300/30 hover:bg-emerald-300/10">
                          View Details
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pb-10 text-center"
          >
            <Button onClick={handleStartOver} size="lg" className="h-11 gap-2 bg-emerald-500 px-5 text-zinc-950 hover:bg-emerald-300">
              <ArrowLeft className="w-5 h-5" />
              {language === 'en' ? 'Search Again' : 'फिर से खोजें'}
            </Button>
          </Motion.div>
          </div>
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
    <div className="min-h-screen bg-[#07110d] text-white">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <div className="border-b border-white/5 bg-black/20">
        <div className="h-1 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 shadow-[0_0_18px_rgba(16,185,129,0.45)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(16,185,129,0.20),transparent_28%),radial-gradient(circle_at_92%_4%,rgba(250,204,21,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-8 pt-20 sm:px-6 sm:pt-24 lg:grid-cols-[360px_1fr] lg:px-8 lg:pb-12 lg:pt-28">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-none backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                {language === 'en' ? 'Smart eligibility checker' : 'स्मार्ट पात्रता जांच'}
              </div>
              <h1 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {content[language].title}
              </h1>
              <p className="mt-4 text-sm leading-6 text-emerald-50/70">
                {content[language].subtitle}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs text-emerald-50/60">
                  <span>{language === 'en' ? 'Question' : 'प्रश्न'} {currentStep + 1}/{totalSteps}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-2">
                {profileSnapshot.slice(0, 4).map(({ label, value, iconElement }) => (
                  <div key={label} className="min-h-20 rounded-md border border-white/10 bg-black/18 p-3 sm:min-h-24">
                    {iconElement}
                    <p className="text-[11px] font-medium uppercase text-emerald-50/45">{label}</p>
                    <p className="mt-1 line-clamp-2 text-sm capitalize text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section>
            {/* Step indicators */}
            <div className="mb-4 flex gap-2 sm:mb-5">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = index === currentStep
                const isComplete = index < currentStep

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => index < currentStep && setCurrentStep(index)}
                    className={`flex h-9 min-w-0 flex-1 items-center justify-center rounded-md border transition-all sm:h-11 ${
                      isActive
                        ? 'border-emerald-300/40 bg-emerald-300/12 text-emerald-100 shadow-[0_0_26px_rgba(16,185,129,0.16)]'
                        : isComplete
                        ? 'border-emerald-300/20 bg-emerald-300/8 text-emerald-200'
                        : 'border-white/10 bg-white/[0.04] text-emerald-50/35'
                    }`}
                    aria-label={step.title}
                  >
                    <StepIcon className="h-4 w-4" />
                  </button>
                )
              })}
            </div>

            {/* Question Card */}
            <Card className="min-h-[400px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.065] text-white shadow-none backdrop-blur-xl hover:shadow-none sm:min-h-[520px]">
              <CardContent className="flex min-h-[320px] flex-col p-5 sm:min-h-[430px] sm:p-8">
            <div className="mb-7 flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md border border-emerald-300/20 bg-emerald-300/10">
                <Icon className="h-7 w-7 text-emerald-300" />
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-100/50">
                  {language === 'en' ? 'Tell us about you' : 'अपनी जानकारी दें'}
                </p>
                <h2 className="text-xl font-semibold leading-8 text-white sm:text-2xl">
                {currentStepData.title}
              </h2>
              </div>
            </div>

            {/* Input Fields */}
            <div className="flex-grow space-y-3">
              {currentStepData.options ? (
                currentStepData.options.length <= 3 ? (
                  // Radio Group for few options
                  <RadioGroup
                    value={formData[currentStepData.id]}
                    onValueChange={(value) => updateFormData(currentStepData.id, value)}
                  >
                    <div className="grid gap-3 sm:grid-cols-3">
                      {currentStepData.options.map((option) => (
                        <div
                          key={option.value}
                          className={`group flex min-h-28 cursor-pointer flex-col justify-between rounded-lg border p-4 transition-all ${
                            formData[currentStepData.id] === option.value
                              ? 'border-emerald-300/50 bg-emerald-300/12 shadow-[0_18px_50px_rgba(16,185,129,0.12)]'
                              : 'border-white/10 bg-black/18 hover:border-emerald-300/35 hover:bg-emerald-300/8'
                          }`}
                          onClick={() => updateFormData(currentStepData.id, option.value)}
                        >
                          <RadioGroupItem value={option.value} id={option.value} className="border-white/30 text-emerald-300" />
                          <Label
                            htmlFor={option.value}
                            className="mt-6 cursor-pointer text-base font-semibold text-white group-hover:text-emerald-100"
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
                    <SelectTrigger className="h-13 w-full rounded-lg border-white/10 bg-black/24 px-4 text-white hover:border-emerald-300/25 data-[placeholder]:text-emerald-50/35 [&_svg]:text-emerald-300">
                      <SelectValue placeholder={`Select ${currentStepData.id}`} />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 rounded-lg border-white/10 bg-[#07110d]/96 p-1 text-emerald-50 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                      {currentStepData.options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="rounded-md py-2.5 pl-8 pr-3 text-sm text-emerald-50/78 focus:bg-emerald-300/10 focus:text-white data-[state=checked]:bg-emerald-300/12 data-[state=checked]:text-emerald-100 [&_svg]:text-emerald-300"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
              ) : currentStepData.id === 'age' ? (
                // Age Slider
                <div className="space-y-6">
                  <Motion.div 
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
                      className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-950"
                      style={{
                        background: `linear-gradient(to right, rgb(52 211 153) 0%, rgb(190 242 100) ${(formData.age || 0) / 115 * 100}%, rgba(255,255,255,0.12) ${(formData.age || 0) / 115 * 100}%, rgba(255,255,255,0.12) 100%)`
                      }}
                    />
                  </Motion.div>
                  <Motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="inline-flex items-end justify-center rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-8 py-5">
                      <span className="text-5xl font-semibold leading-none text-emerald-200">
                        {formData.age || 0}
                      </span>
                      <span className="ml-2 text-lg text-emerald-50/60">years</span>
                    </div>
                  </Motion.div>
                </div>
              ) : (
                // Text Input
                <div>
                  <Input
                    type={currentStepData.id === 'income' ? 'number' : 'text'}
                    placeholder={currentStepData.placeholder}
                    value={formData[currentStepData.id]}
                    onChange={(e) => updateFormData(currentStepData.id, e.target.value)}
                    className="h-13 rounded-lg border-white/10 bg-black/24 px-4 text-lg text-white placeholder:text-emerald-50/35"
                  />
                </div>
              )}
              
              {/* Error Message */}
              {errors[currentStepData.id] && (
                <Motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 rounded-md border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200"
                >
                  {errors[currentStepData.id]}
                </Motion.div>
              )}
            </div>
              </CardContent>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3 border-t border-white/10 bg-black/18 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex gap-3">
            {currentStep > 0 && (
                <Button
                variant="outline"
                onClick={handleBack}
                className="h-10 gap-2 border-white/10 bg-white/[0.055] px-3 text-emerald-50 shadow-none backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 hover:border-emerald-300/25 hover:bg-white/[0.09] hover:text-white"
                >
                <ArrowLeft className="h-4 w-4 text-emerald-300 transition-transform duration-300 group-hover/button:-translate-x-0.5" />
                {content[language].back}
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="h-10 text-emerald-50/60 hover:bg-white/10 hover:text-white"
              >
              {content[language].skip}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="h-10 min-w-[140px] gap-2 bg-emerald-400 text-zinc-950 hover:bg-lime-300 hover:shadow-[0_0_22px_rgba(16,185,129,0.28)]"
            >
              {currentStep === totalSteps - 1 ? content[language].submit : content[language].next}
              {currentStep < totalSteps - 1 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

export default DiscoverPage
