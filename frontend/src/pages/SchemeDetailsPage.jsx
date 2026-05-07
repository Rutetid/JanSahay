import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  IndianRupee, 
  Users, 
  FileText, 
  CheckCircle2,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Info,
  Target,
  ClipboardList,
  Building2,
  MapPin,
  User,
  Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

const SchemeDetailsPage = ({ language, setLanguage }) => {
  const { schemeId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSaved, setIsSaved] = useState(false)
  
  const schemeFromState = location.state?.scheme
  
  useEffect(() => {
    if (!schemeFromState && !['1', '2', '3'].includes(schemeId)) {
      navigate('/discover')
    }
  }, [schemeFromState, schemeId, navigate])

  if (schemeFromState) {
    const content = {
      en: {
        back: 'Back to Results',
        saveScheme: 'Save Scheme',
        saved: 'Saved',
        overview: 'Overview',
        eligibility: 'Eligibility Criteria',
        benefits: 'Benefits',
        documents: 'Required Documents',
        category: 'Category',
        state: 'State',
        relevance: 'Relevance Score',
        description: 'Description'
      },
      hi: {
        back: 'परिणामों पर वापस जाएं',
        saveScheme: 'योजना सहेजें',
        saved: 'सहेजा गया',
        overview: 'अवलोकन',
        eligibility: 'पात्रता मानदंड',
        benefits: 'लाभ',
        documents: 'आवश्यक दस्तावेज़',
        category: 'श्रेणी',
        state: 'राज्य',
        relevance: 'प्रासंगिकता स्कोर',
        description: 'विवरण'
      }
    }

    const handleSaveScheme = () => {
      setIsSaved(!isSaved)
    }

    return (
      <div className="min-h-screen bg-[#07110d] text-white">
        <Navbar language={language} setLanguage={setLanguage} />
        
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(16,185,129,0.06),transparent_28%)]" />
          <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 gap-2 border border-white/10 bg-white/[0.04] px-3 text-emerald-50/75 shadow-none backdrop-blur-xl transition-all hover:border-emerald-400/20 hover:bg-white/[0.06] hover:text-white sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4 text-emerald-400/80" />
            {content[language].back}
          </Button>

          <div className="mb-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-none backdrop-blur-xl sm:mb-6 sm:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/8 px-2 py-1 text-sm font-medium text-emerald-50/80 sm:px-3">
                    {schemeFromState.category || 'General'}
                  </span>
                  {schemeFromState.relevanceScore && (
                    <div className="flex items-center gap-1 text-xs text-emerald-50/45 sm:text-sm">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400/80" />
                      <span>{((1 - schemeFromState.relevanceScore) * 100).toFixed(0)}% Match</span>
                    </div>
                  )}
                </div>
                <h1 className="mb-2 text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                  {schemeFromState.name}
                </h1>
                {schemeFromState.state && (
                  <div className="flex items-center gap-1.5 text-sm text-emerald-50/55 sm:gap-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400/80" />
                    <span>{schemeFromState.state}</span>
                  </div>
                )}
              </div>
              <Button
                onClick={handleSaveScheme}
                variant={isSaved ? 'default' : 'outline'}
                className="ml-2 flex-shrink-0 gap-2 border-white/10 bg-white/[0.04] text-emerald-50 hover:border-emerald-400/20 hover:bg-white/[0.07] hover:text-white"
              >
                {isSaved ? <BookmarkCheck className="h-4 w-4 text-emerald-400/80" /> : <Bookmark className="h-4 w-4 text-emerald-400/80" />}
                {isSaved ? content[language].saved : content[language].saveScheme}
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {schemeFromState.description && (
              <Card className="border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-emerald-400/80" />
                    {content[language].description}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-emerald-50/72">{schemeFromState.description}</p>
                </CardContent>
              </Card>
            )}

            {schemeFromState.eligibility && (
              <Card className="border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-400/80" />
                    {content[language].eligibility}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-emerald-50/72">{schemeFromState.eligibility}</p>
                </CardContent>
              </Card>
            )}

            {schemeFromState.benefits && (
              <Card className="border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400/80" />
                    {content[language].benefits}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-emerald-50/72">{schemeFromState.benefits}</p>
                </CardContent>
              </Card>
            )}

            {schemeFromState.documents && (
              <Card className="border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-400/80" />
                    {content[language].documents}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-emerald-50/72">{schemeFromState.documents}</p>
                </CardContent>
              </Card>
            )}
          </div>
          </div>
        </div>
      </div>
    )
  }

  const schemes = {
    '1': {
      name: 'Pradhan Mantri Awas Yojana',
      nameHi: 'प्रधानमंत्री आवास योजना',
      category: 'Housing',
      categoryHi: 'आवास',
      benefit: '₹2.5 Lakh subsidy',
      benefitHi: '₹2.5 लाख सब्सिडी',
      deadline: 'March 31, 2026',
      deadlineHi: '31 मार्च, 2026',
      description: 'Pradhan Mantri Awas Yojana (PMAY) is a flagship scheme to provide affordable housing to urban poor. The scheme offers financial assistance for construction or purchase of houses.',
      descriptionHi: 'प्रधानमंत्री आवास योजना (PMAY) शहरी गरीबों को किफायती आवास प्रदान करने के लिए एक प्रमुख योजना है। यह योजना घरों के निर्माण या खरीद के लिए वित्तीय सहायता प्रदान करती है।',
      eligibility: [
        'Annual income should be less than ₹18 Lakhs',
        'Applicant should not own a pucca house',
        'Must be a first-time home buyer',
        'Age between 21-55 years'
      ],
      eligibilityHi: [
        'वार्षिक आय ₹18 लाख से कम होनी चाहिए',
        'आवेदक के पास पक्का मकान नहीं होना चाहिए',
        'पहली बार घर खरीदार होना चाहिए',
        'आयु 21-55 वर्ष के बीच होनी चाहिए'
      ],
      benefits: [
        'Interest subsidy up to ₹2.67 Lakhs',
        'Subsidy on home loan interest',
        'Extended loan tenure',
        'Priority for women applicants'
      ],
      benefitsHi: [
        '₹2.67 लाख तक की ब्याज सब्सिडी',
        'गृह ऋण ब्याज पर सब्सिडी',
        'विस्तारित ऋण अवधि',
        'महिला आवेदकों को प्राथमिकता'
      ],
      documents: [
        'Aadhar Card',
        'Income Certificate',
        'Bank Statement (6 months)',
        'Property Documents',
        'Passport Size Photos'
      ],
      documentsHi: [
        'आधार कार्ड',
        'आय प्रमाण पत्र',
        'बैंक स्टेटमेंट (6 महीने)',
        'संपत्ति दस्तावेज़',
        'पासपोर्ट साइज फोटो'
      ],
      applicationProcess: [
        'Visit official PMAY website',
        'Register with Aadhar number',
        'Fill the application form',
        'Upload required documents',
        'Submit and note application number'
      ],
      applicationProcessHi: [
        'आधिकारिक PMAY वेबसाइट पर जाएं',
        'आधार नंबर से पंजीकरण करें',
        'आवेदन पत्र भरें',
        'आवश्यक दस्तावेज अपलोड करें',
        'सबमिट करें और आवेदन संख्या नोट करें'
      ],
      officialWebsite: 'https://pmaymis.gov.in',
      ministry: 'Ministry of Housing and Urban Affairs',
      ministryHi: 'आवास और शहरी कार्य मंत्रालय'
    },
    '2': {
      name: 'Ayushman Bharat',
      nameHi: 'आयुष्मान भारत',
      category: 'Healthcare',
      categoryHi: 'स्वास्थ्य सेवा',
      benefit: '₹5 Lakh health cover',
      benefitHi: '₹5 लाख स्वास्थ्य कवर',
      deadline: 'Ongoing',
      deadlineHi: 'चालू',
      description: 'Ayushman Bharat is the world\'s largest health insurance scheme providing free health coverage up to ₹5 lakhs per family per year.',
      descriptionHi: 'आयुष्मान भारत दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है जो प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ्त स्वास्थ्य कवरेज प्रदान करती है।',
      eligibility: [
        'BPL families',
        'SC/ST households',
        'Families with disabled members',
        'Landless households'
      ],
      eligibilityHi: [
        'BPL परिवार',
        'SC/ST परिवार',
        'विकलांग सदस्यों वाले परिवार',
        'भूमिहीन परिवार'
      ],
      benefits: [
        '₹5 Lakh annual health cover',
        'Covers pre and post hospitalization',
        'Cashless treatment',
        'Covers 1,393 procedures'
      ],
      benefitsHi: [
        '₹5 लाख वार्षिक स्वास्थ्य कवर',
        'अस्पताल में भर्ती से पहले और बाद को कवर करता है',
        'कैशलेस उपचार',
        '1,393 प्रक्रियाओं को कवर करता है'
      ],
      documents: [
        'Aadhar Card',
        'Ration Card',
        'Income Certificate',
        'Caste Certificate (if applicable)'
      ],
      documentsHi: [
        'आधार कार्ड',
        'राशन कार्ड',
        'आय प्रमाण पत्र',
        'जाति प्रमाण पत्र (यदि लागू हो)'
      ],
      applicationProcess: [
        'Visit nearest CSC or Health Centre',
        'Verify eligibility',
        'Provide required documents',
        'Get Ayushman Card',
        'Use at empanelled hospitals'
      ],
      applicationProcessHi: [
        'निकटतम CSC या स्वास्थ्य केंद्र पर जाएं',
        'पात्रता सत्यापित करें',
        'आवश्यक दस्तावेज प्रदान करें',
        'आयुष्मान कार्ड प्राप्त करें',
        'सूचीबद्ध अस्पतालों में उपयोग करें'
      ],
      officialWebsite: 'https://pmjay.gov.in',
      ministry: 'Ministry of Health and Family Welfare',
      ministryHi: 'स्वास्थ्य और परिवार कल्याण मंत्रालय'
    },
    '3': {
      name: 'PM Kisan Samman Nidhi',
      nameHi: 'पीएम किसान सम्मान निधि',
      category: 'Agriculture',
      categoryHi: 'कृषि',
      benefit: '₹6000/year',
      benefitHi: '₹6000/वर्ष',
      deadline: 'Ongoing',
      deadlineHi: 'चालू',
      description: 'PM-KISAN provides income support of ₹6,000 per year to all farmer families across the country in three equal instalments.',
      descriptionHi: 'PM-KISAN देश भर के सभी किसान परिवारों को तीन बराबर किस्तों में प्रति वर्ष ₹6,000 की आय सहायता प्रदान करता है।',
      eligibility: [
        'All landholding farmer families',
        'Valid Aadhar card',
        'Bank account linked to Aadhar',
        'Land ownership documents'
      ],
      eligibilityHi: [
        'सभी भूमिधारक किसान परिवार',
        'वैध आधार कार्ड',
        'आधार से लिंक बैंक खाता',
        'भूमि स्वामित्व दस्तावेज'
      ],
      benefits: [
        '₹6,000 per year in 3 instalments',
        'Direct Benefit Transfer to bank',
        'No application fee',
        'Simple registration process'
      ],
      benefitsHi: [
        '3 किस्तों में प्रति वर्ष ₹6,000',
        'बैंक में सीधे लाभ हस्तांतरण',
        'कोई आवेदन शुल्क नहीं',
        'सरल पंजीकरण प्रक्रिया'
      ],
      documents: [
        'Aadhar Card',
        'Land Ownership Papers',
        'Bank Account Details',
        'Passport Size Photo'
      ],
      documentsHi: [
        'आधार कार्ड',
        'भूमि स्वामित्व पत्र',
        'बैंक खाता विवरण',
        'पासपोर्ट साइज फोटो'
      ],
      applicationProcess: [
        'Visit PM-KISAN portal',
        'Click on Farmer Corner',
        'Select New Farmer Registration',
        'Enter required details',
        'Submit with documents'
      ],
      applicationProcessHi: [
        'PM-KISAN पोर्टल पर जाएं',
        'किसान कॉर्नर पर क्लिक करें',
        'नए किसान पंजीकरण का चयन करें',
        'आवश्यक विवरण दर्ज करें',
        'दस्तावेजों के साथ सबमिट करें'
      ],
      officialWebsite: 'https://pmkisan.gov.in',
      ministry: 'Ministry of Agriculture and Farmers Welfare',
      ministryHi: 'कृषि और किसान कल्याण मंत्रालय'
    }
  }

  const scheme = schemes[schemeId]

  const content = {
    en: {
      backToProfile: 'Back to Profile',
      schemeDetails: 'Scheme Details',
      overview: 'Overview',
      eligibility: 'Eligibility Criteria',
      benefits: 'Key Benefits',
      requiredDocuments: 'Required Documents',
      howToApply: 'How to Apply',
      ministry: 'Ministry',
      deadline: 'Application Deadline',
      applyNow: 'Apply Now',
      visitWebsite: 'Visit Official Website',
      saveScheme: 'Save Scheme',
      removeSave: 'Remove from Saved',
      saved: 'Saved'
    },
    hi: {
      backToProfile: 'प्रोफ़ाइल पर वापस जाएं',
      schemeDetails: 'योजना विवरण',
      overview: 'अवलोकन',
      eligibility: 'पात्रता मानदंड',
      benefits: 'मुख्य लाभ',
      requiredDocuments: 'आवश्यक दस्तावेज़',
      howToApply: 'आवेदन कैसे करें',
      ministry: 'मंत्रालय',
      deadline: 'आवेदन की अंतिम तिथि',
      applyNow: 'अभी आवेदन करें',
      visitWebsite: 'आधिकारिक वेबसाइट पर जाएं',
      saveScheme: 'योजना सहेजें',
      removeSave: 'सहेजे गए से हटाएं',
      saved: 'सहेजा गया'
    }
  }

  if (!scheme) {
    return (
      <div className="min-h-screen bg-[#07110d] text-white">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-8 text-center shadow-none backdrop-blur-xl">
            <h2 className="mb-4 text-2xl font-semibold text-white">Scheme not found</h2>
            <Link to="/profile">
              <Button className="border-white/10 bg-white/[0.04] text-emerald-50 hover:border-emerald-400/20 hover:bg-white/[0.07] hover:text-white">Back to Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07110d] text-white">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(16,185,129,0.06),transparent_28%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-emerald-50/70 transition-all hover:border-emerald-400/20 hover:bg-white/[0.07] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 text-emerald-400/80" />
          {content[language].backToProfile}
        </button>

        <Card className="mb-6 border border-white/10 bg-white/[0.04] p-6 text-white shadow-none backdrop-blur-xl sm:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <span className="mb-3 inline-block rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1 text-sm font-medium text-emerald-50/80">
                {language === 'en' ? scheme.category : scheme.categoryHi}
              </span>
              <h1 className="mb-3 text-3xl font-semibold text-white">
                {language === 'en' ? scheme.name : scheme.nameHi}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-emerald-50/60">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-emerald-400/80" />
                  <span>{language === 'en' ? scheme.benefit : scheme.benefitHi}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-400/80" />
                  <span>{language === 'en' ? scheme.deadline : scheme.deadlineHi}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-emerald-400/80" />
                  <span>{language === 'en' ? scheme.ministry : scheme.ministryHi}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsSaved(!isSaved)}
                className={isSaved ? 'border-emerald-400/20 bg-emerald-400/8 text-emerald-50 hover:bg-emerald-400/12' : 'border-white/10 bg-white/[0.04] text-emerald-50 hover:border-emerald-400/20 hover:bg-white/[0.07]'}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4 text-emerald-400/80" />
                    {content[language].saved}
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4 text-emerald-400/80" />
                    {content[language].saveScheme}
                  </>
                )}
              </Button>
              <Button onClick={() => window.open(scheme.officialWebsite, '_blank')} className="bg-emerald-400 text-[#06100c] hover:bg-emerald-300">
                {content[language].applyNow}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="mb-6 border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-emerald-400/80" />
              {content[language].overview}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-emerald-50/72">
              {language === 'en' ? scheme.description : scheme.descriptionHi}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-400/80" />
              {content[language].eligibility}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(language === 'en' ? scheme.eligibility : scheme.eligibilityHi).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400/80" />
                  <span className="text-emerald-50/72">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-emerald-400/80" />
                {content[language].benefits}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(language === 'en' ? scheme.benefits : scheme.benefitsHi).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400/80" />
                    <span className="text-emerald-50/72">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-400/80" />
                {content[language].requiredDocuments}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(language === 'en' ? scheme.documents : scheme.documentsHi).map((item, index) => (
                  <li key={index} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/10 p-2">
                    <FileText className="h-4 w-4 flex-shrink-0 text-emerald-400/60" />
                    <span className="text-emerald-50/72">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-emerald-400/80" />
              {content[language].howToApply}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {(language === 'en' ? scheme.applicationProcess : scheme.applicationProcessHi).map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/8 font-semibold text-emerald-50/85">
                    {index + 1}
                  </div>
                  <span className="pt-1 text-emerald-50/72">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-none backdrop-blur-xl sm:flex-row">
          <div>
            <h3 className="mb-1 font-semibold text-white">Ready to apply?</h3>
            <p className="text-sm text-emerald-50/55">Visit the official website to start your application</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => window.open(scheme.officialWebsite, '_blank')}
              className="border-white/10 bg-white/[0.04] text-emerald-50 hover:border-emerald-400/20 hover:bg-white/[0.07] hover:text-white"
            >
              {content[language].visitWebsite}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => window.open(scheme.officialWebsite, '_blank')} className="bg-emerald-400 text-[#06100c] hover:bg-emerald-300">
              {content[language].applyNow}
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeDetailsPage
