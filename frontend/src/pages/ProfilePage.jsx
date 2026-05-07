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
  const profileItems = [
    { iconElement: <Calendar className="h-4 w-4 text-emerald-400/80" />, label: content[language].age, value: `${userProfile.age} ${content[language].years}` },
    { iconElement: <IndianRupee className="h-4 w-4 text-emerald-400/80" />, label: content[language].income, value: `₹${(userProfile.income / 1000).toFixed(1)}K` },
    { iconElement: <MapPin className="h-4 w-4 text-emerald-400/80" />, label: content[language].state, value: language === 'en' ? userProfile.state : userProfile.stateHi },
    { iconElement: <Briefcase className="h-4 w-4 text-emerald-400/80" />, label: content[language].occupation, value: language === 'en' ? userProfile.occupation : userProfile.occupationHi },
    { iconElement: <Users className="h-4 w-4 text-emerald-400/80" />, label: content[language].familySize, value: `${userProfile.familySize} ${content[language].members}` },
    { iconElement: <Home className="h-4 w-4 text-emerald-400/80" />, label: content[language].disability, value: userProfile.hasDisability ? content[language].yes : content[language].no },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-[#07110d] text-white">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(16,185,129,0.08),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg rounded-lg border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
            <User className="mx-auto mb-4 h-10 w-10 text-emerald-400/80" />
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Please log in to view your dashboard
            </h2>
            <Link to="/login">
              <Button className="bg-emerald-500/85! text-white! hover:bg-emerald-400/90!">Go to Login</Button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07110d] text-white">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(16,185,129,0.08),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="mb-6 sm:mb-8">
          <Link to="/" className="mb-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-emerald-50/70 transition-all hover:border-emerald-400/20 hover:bg-white/[0.08] hover:text-white">
            <ArrowLeft className="h-4 w-4 text-emerald-400/80" />
            {content[language].backToHome}
          </Link>
          <div className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
          <h1 className="mb-2 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {content[language].dashboard}
          </h1>
          <p className="text-emerald-50/65">
            {content[language].welcome}, {user.name}!
          </p>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
              <div className="rounded-md bg-black/14 p-3">
                <Bookmark className="mb-2 h-4 w-4 text-emerald-400/80" />
                <p className="text-xl font-semibold text-white">{savedSchemes.length}</p>
                <p className="text-[11px] text-emerald-50/50">Saved</p>
              </div>
              <div className="rounded-md bg-black/14 p-3">
                <FileText className="mb-2 h-4 w-4 text-emerald-400/80" />
                <p className="text-xl font-semibold text-white">{readyDocuments}/{totalDocuments}</p>
                <p className="text-[11px] text-emerald-50/50">Docs</p>
              </div>
              <div className="rounded-md bg-black/14 p-3">
                <CheckCircle2 className="mb-2 h-4 w-4 text-emerald-400/80" />
                <p className="text-xl font-semibold text-white">{Math.round((readyDocuments / totalDocuments) * 100)}%</p>
                <p className="text-[11px] text-emerald-50/50">Ready</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="rounded-lg border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="h-5 w-5 text-emerald-400/80" />
                {content[language].eligibilityProfile}
              </CardTitle>
              <CardDescription className="text-emerald-50/55">
                {content[language].eligibilityProfileDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileItems.map(({ iconElement, label, value }) => (
                <div key={label} className="flex items-center justify-between rounded-md border border-white/10 bg-black/14 px-3 py-3">
                  <div className="flex items-center gap-2">
                    {iconElement}
                    <span className="text-sm text-emerald-50/60">{label}</span>
                  </div>
                  <span className="text-right text-sm font-semibold text-white">{value}</span>
                </div>
              ))}

              <Button className="mt-4 h-10 w-full bg-emerald-500/85! text-white! hover:bg-emerald-400/90!" onClick={() => setIsEditModalOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                {content[language].editProfile}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-emerald-400/80" />
                {content[language].documentStatus}
              </CardTitle>
              <CardDescription className="text-emerald-50/55">
                {content[language].documentStatusDesc}
              </CardDescription>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-50/68">
                    {readyDocuments}/{totalDocuments} {content[language].documentsReady}
                  </span>
                  <span className="text-sm font-medium text-emerald-400/80">
                    {Math.round((readyDocuments / totalDocuments) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div 
                    className="h-full rounded-full bg-emerald-400/70 transition-all duration-300"
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
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      doc.hasDocument
                        ? 'border-emerald-400/20 bg-emerald-400/8 hover:bg-emerald-400/10'
                        : 'border-white/10 bg-black/14 hover:border-emerald-400/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    {doc.hasDocument ? (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400/80" />
                    ) : (
                      <XCircle className="h-5 w-5 flex-shrink-0 text-emerald-50/35" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        doc.hasDocument ? 'text-white' : 'text-emerald-50/70'
                      }`}>
                        {language === 'en' ? doc.name : doc.nameHi}
                      </p>
                      <p className="text-xs text-emerald-50/45">
                        {doc.hasDocument ? content[language].available : content[language].notAvailable}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-lg border border-white/10 bg-white/[0.04] text-white shadow-none backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bookmark className="h-5 w-5 text-emerald-400/80" />
              {content[language].savedSchemes}
            </CardTitle>
            <CardDescription className="text-emerald-50/55">
              {content[language].savedSchemesDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {savedSchemes.length === 0 ? (
              <div className="py-12 text-center">
                <Bookmark className="mx-auto mb-4 h-12 w-12 text-emerald-50/30" />
                <p className="text-emerald-50/55">{content[language].noSchemes}</p>
                <Link to="/discover" className="mt-4 inline-block">
                  <Button className="bg-emerald-500/85! text-white! hover:bg-emerald-400/90!">Discover Schemes</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {savedSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="rounded-lg border border-white/10 bg-black/14 p-5 transition-all hover:border-emerald-400/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold leading-6 text-white">
                          {language === 'en' ? scheme.name : scheme.nameHi}
                        </h3>
                        <span className="inline-block rounded-full border border-emerald-400/16 bg-emerald-400/8 px-2.5 py-1 text-xs font-medium text-emerald-50/80">
                          {language === 'en' ? scheme.category : scheme.categoryHi}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <IndianRupee className="h-4 w-4 text-emerald-400/80" />
                        <span className="text-emerald-50/55">{content[language].benefit}:</span>
                        <span className="font-medium text-white">
                          {language === 'en' ? scheme.benefit : scheme.benefitHi}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-emerald-400/80" />
                        <span className="text-emerald-50/55">{content[language].deadline}:</span>
                        <span className="font-medium text-white">{scheme.deadline}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/scheme/${scheme.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-white/10 bg-white/[0.04] text-emerald-50 hover:border-emerald-400/20 hover:bg-white/[0.06] hover:text-white" size="sm">
                          {content[language].viewDetails}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeScheme(scheme.id)}
                        className="border border-red-300/20 bg-red-500/8 text-red-300 hover:bg-red-500/12 hover:text-red-200"
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
      </main>
    </div>
  )
}

export default ProfilePage
