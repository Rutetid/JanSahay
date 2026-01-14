import { Link, useParams, useNavigate } from 'react-router-dom'
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
  Building2
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

const SchemeDetailsPage = ({ language, setLanguage }) => {
  const { schemeId } = useParams()
  const navigate = useNavigate()
  const [isSaved, setIsSaved] = useState(true)

  // Mock scheme data - in real app, fetch based on schemeId
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
      <div className="min-h-screen pattern-dots">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scheme not found</h2>
            <Link to="/profile">
              <Button>Back to Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pattern-dots">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gov-blue-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {content[language].backToProfile}
        </button>

        {/* Header */}
        <Card className="p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-3">
                {language === 'en' ? scheme.category : scheme.categoryHi}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {language === 'en' ? scheme.name : scheme.nameHi}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <IndianRupee className="w-4 h-4" />
                  <span>{language === 'en' ? scheme.benefit : scheme.benefitHi}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'en' ? scheme.deadline : scheme.deadlineHi}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{language === 'en' ? scheme.ministry : scheme.ministryHi}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsSaved(!isSaved)}
                className={isSaved ? 'border-blue-600 text-blue-600' : ''}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 mr-2" />
                    {content[language].saved}
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 mr-2" />
                    {content[language].saveScheme}
                  </>
                )}
              </Button>
              <Button onClick={() => window.open(scheme.officialWebsite, '_blank')}>
                {content[language].applyNow}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-gov-blue-600" />
              {content[language].overview}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en' ? scheme.description : scheme.descriptionHi}
            </p>
          </CardContent>
        </Card>

        {/* Eligibility */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-gov-blue-600" />
              {content[language].eligibility}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(language === 'en' ? scheme.eligibility : scheme.eligibilityHi).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-gov-blue-600" />
                {content[language].benefits}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(language === 'en' ? scheme.benefits : scheme.benefitsHi).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gov-blue-600" />
                {content[language].requiredDocuments}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(language === 'en' ? scheme.documents : scheme.documentsHi).map((item, index) => (
                  <li key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How to Apply */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-gov-blue-600" />
              {content[language].howToApply}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {(language === 'en' ? scheme.applicationProcess : scheme.applicationProcessHi).map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gov-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Action Footer */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Ready to apply?</h3>
            <p className="text-sm text-gray-600">Visit the official website to start your application</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => window.open(scheme.officialWebsite, '_blank')}
            >
              {content[language].visitWebsite}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={() => window.open(scheme.officialWebsite, '_blank')}>
              {content[language].applyNow}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeDetailsPage
