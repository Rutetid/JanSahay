import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Bookmark,
  Calendar,
  IndianRupee,
  MapPin,
  Briefcase,
  Users,
  Home,
  ArrowLeft
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import EditProfileModal from '@/components/EditProfileModal'

const ProfilePage = ({ language, setLanguage }) => {
  const { user } = useAuth()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  // Mock data - will be replaced with real data from backend
  const [savedSchemes, setSavedSchemes] = useState([
    {
      id: 1,
      name: 'Pradhan Mantri Awas Yojana',
      nameHi: 'प्रधानमंत्री आवास योजना',
      category: 'Housing',
      categoryHi: 'आवास',
      benefit: '₹2.5 Lakh subsidy',
      benefitHi: '₹2.5 लाख सब्सिडी',
      deadline: '2026-03-31'
    },
    {
      id: 2,
      name: 'Ayushman Bharat',
      nameHi: 'आयुष्मान भारत',
      category: 'Healthcare',
      categoryHi: 'स्वास्थ्य सेवा',
      benefit: '₹5 Lakh health cover',
      benefitHi: '₹5 लाख स्वास्थ्य कवर',
      deadline: 'No deadline'
    },
    {
      id: 3,
      name: 'PM Kisan Samman Nidhi',
      nameHi: 'पीएम किसान सम्मान निधि',
      category: 'Agriculture',
      categoryHi: 'कृषि',
      benefit: '₹6000/year',
      benefitHi: '₹6000/वर्ष',
      deadline: 'Ongoing'
    }
  ])

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhar Card', nameHi: 'आधार कार्ड', hasDocument: true },
    { id: 2, name: 'PAN Card', nameHi: 'पैन कार्ड', hasDocument: true },
    { id: 3, name: 'Income Certificate', nameHi: 'आय प्रमाण पत्र', hasDocument: false },
    { id: 4, name: 'Caste Certificate', nameHi: 'जाति प्रमाण पत्र', hasDocument: false },
    { id: 5, name: 'Domicile Certificate', nameHi: 'अधिवास प्रमाण पत्र', hasDocument: true },
    { id: 6, name: 'Bank Passbook', nameHi: 'बैंक पासबुक', hasDocument: true },
    { id: 7, name: 'Ration Card', nameHi: 'राशन कार्ड', hasDocument: false },
    { id: 8, name: 'Disability Certificate', nameHi: 'विकलांगता प्रमाण पत्र', hasDocument: false }
  ])

  const [userProfile, setUserProfile] = useState({
    age: 45,
    income: 150000,
    state: 'Maharashtra',
    stateHi: 'महाराष्ट्र',
    occupation: 'Farmer',
    occupationHi: 'किसान',
    familySize: 4,
    hasDisability: false
  })

  const content = {
    en: {
      dashboard: 'Welfare Dashboard',
      welcome: 'Welcome back',
      savedSchemes: 'My Saved Schemes',
      savedSchemesDesc: 'Schemes you are interested in applying for',
      documentStatus: 'Document Status',
      documentStatusDesc: 'Track which documents you have ready',
      eligibilityProfile: 'Eligibility Profile',
      eligibilityProfileDesc: 'Your current profile information',
      noSchemes: 'No saved schemes yet',
      viewDetails: 'View Details',
      removeScheme: 'Remove',
      category: 'Category',
      benefit: 'Benefit',
      deadline: 'Deadline',
      available: 'Available',
      notAvailable: 'Not Available',
      documentsReady: 'documents ready',
      age: 'Age',
      years: 'years',
      income: 'Annual Income',
      state: 'State',
      occupation: 'Occupation',
      familySize: 'Family Size',
      members: 'members',
      disability: 'Person with Disability',
      yes: 'Yes',
      no: 'No',
      editProfile: 'Edit Profile',
      backToHome: 'Back to Home'
    },
    hi: {
      dashboard: 'कल्याण डैशबोर्ड',
      welcome: 'वापसी पर स्वागत है',
      savedSchemes: 'मेरी सहेजी गई योजनाएं',
      savedSchemesDesc: 'जिन योजनाओं के लिए आप आवेदन करने में रुचि रखते हैं',
      documentStatus: 'दस्तावेज़ स्थिति',
      documentStatusDesc: 'ट्रैक करें कि आपके पास कौन से दस्तावेज़ तैयार हैं',
      eligibilityProfile: 'पात्रता प्रोफ़ाइल',
      eligibilityProfileDesc: 'आपकी वर्तमान प्रोफ़ाइल जानकारी',
      noSchemes: 'अभी तक कोई सहेजी गई योजना नहीं',
      viewDetails: 'विवरण देखें',
      removeScheme: 'हटाएं',
      category: 'श्रेणी',
      benefit: 'लाभ',
      deadline: 'अंतिम तिथि',
      available: 'उपलब्ध',
      notAvailable: 'उपलब्ध नहीं',
      documentsReady: 'दस्तावेज़ तैयार',
      age: 'आयु',
      years: 'वर्ष',
      income: 'वार्षिक आय',
      state: 'राज्य',
      occupation: 'व्यवसाय',
      familySize: 'परिवार का आकार',
      members: 'सदस्य',
      disability: 'विकलांग व्यक्ति',
      yes: 'हाँ',
      no: 'नहीं',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      backToHome: 'होम पर वापस जाएं'
    }
  }

  const toggleDocument = (docId) => {
    setDocuments(documents.map(doc => 
      doc.id === docId ? { ...doc, hasDocument: !doc.hasDocument } : doc
    ))
  }

  const removeScheme = (schemeId) => {
    setSavedSchemes(savedSchemes.filter(scheme => scheme.id !== schemeId))
  }

  const readyDocuments = documents.filter(doc => doc.hasDocument).length
  const totalDocuments = documents.length

  if (!user) {
    return (
      <div className="min-h-screen pattern-dots">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Please log in to view your dashboard
            </h2>
            <Link to="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pattern-dots">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gov-blue-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {content[language].backToHome}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {content[language].dashboard}
          </h1>
          <p className="text-gray-600">
            {content[language].welcome}, {user.name}!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Eligibility Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-gov-blue-600" />
                {content[language].eligibilityProfile}
              </CardTitle>
              <CardDescription>
                {content[language].eligibilityProfileDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{content[language].age}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {userProfile.age} {content[language].years}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{content[language].income}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  ₹{(userProfile.income / 1000).toFixed(1)}K
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{content[language].state}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {language === 'en' ? userProfile.state : userProfile.stateHi}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{content[language].occupation}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {language === 'en' ? userProfile.occupation : userProfile.occupationHi}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{content[language].familySize}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {userProfile.familySize} {content[language].members}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{content[language].disability}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {userProfile.hasDisability ? content[language].yes : content[language].no}
                </span>
              </div>

              <Button className="w-full mt-4" onClick={() => setIsEditModalOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                {content[language].editProfile}
              </Button>
            </CardContent>
          </Card>

          {/* Document Status Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gov-blue-600" />
                {content[language].documentStatus}
              </CardTitle>
              <CardDescription>
                {content[language].documentStatusDesc}
              </CardDescription>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {readyDocuments}/{totalDocuments} {content[language].documentsReady}
                  </span>
                  <span className="text-sm font-medium text-gov-blue-600">
                    {Math.round((readyDocuments / totalDocuments) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gov-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(readyDocuments / totalDocuments) * 100}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => toggleDocument(doc.id)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                      doc.hasDocument
                        ? 'border-green-200 bg-green-50 hover:bg-green-100'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {doc.hasDocument ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        doc.hasDocument ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {language === 'en' ? doc.name : doc.nameHi}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.hasDocument ? content[language].available : content[language].notAvailable}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Schemes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-gov-blue-600" />
              {content[language].savedSchemes}
            </CardTitle>
            <CardDescription>
              {content[language].savedSchemesDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {savedSchemes.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{content[language].noSchemes}</p>
                <Link to="/discover" className="mt-4 inline-block">
                  <Button>Discover Schemes</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {language === 'en' ? scheme.name : scheme.nameHi}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                          {language === 'en' ? scheme.category : scheme.categoryHi}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{content[language].benefit}:</span>
                        <span className="font-medium text-gray-900">
                          {language === 'en' ? scheme.benefit : scheme.benefitHi}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{content[language].deadline}:</span>
                        <span className="font-medium text-gray-900">{scheme.deadline}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/scheme/${scheme.id}`} className="flex-1">
                        <Button variant="outline" className="w-full" size="sm">
                          {content[language].viewDetails}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeScheme(scheme.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 border-2"
                      >
                        {content[language].removeScheme}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        language={language}
      />
    </div>
  )
}

export default ProfilePage
