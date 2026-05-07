import { useState } from 'react'
import { X, Calendar, IndianRupee, MapPin, Briefcase, Users, Home, Save, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const EditProfileModal = ({ isOpen, onClose, userProfile, setUserProfile, language }) => {
  const [formData, setFormData] = useState(userProfile)
  const [loading, setLoading] = useState(false)

  const content = {
    en: {
      title: 'Edit Eligibility Profile',
      description: 'Update your information to get more accurate scheme recommendations',
      age: 'Age',
      agePlaceholder: 'Enter your age',
      income: 'Annual Income',
      incomePlaceholder: 'Enter annual income',
      state: 'State',
      statePlaceholder: 'Select your state',
      occupation: 'Occupation',
      occupationPlaceholder: 'Select occupation',
      familySize: 'Family Size',
      familySizePlaceholder: 'Number of family members',
      disability: 'Person with Disability',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      save: 'Save Changes',
      saving: 'Saving...'
    },
    hi: {
      title: 'पात्रता प्रोफ़ाइल संपादित करें',
      description: 'अधिक सटीक योजना सिफारिशें प्राप्त करने के लिए अपनी जानकारी अपडेट करें',
      age: 'आयु',
      agePlaceholder: 'अपनी उम्र दर्ज करें',
      income: 'वार्षिक आय',
      incomePlaceholder: 'वार्षिक आय दर्ज करें',
      state: 'राज्य',
      statePlaceholder: 'अपना राज्य चुनें',
      occupation: 'व्यवसाय',
      occupationPlaceholder: 'व्यवसाय चुनें',
      familySize: 'परिवार का आकार',
      familySizePlaceholder: 'परिवार के सदस्यों की संख्या',
      disability: 'विकलांग व्यक्ति',
      yes: 'हाँ',
      no: 'नहीं',
      cancel: 'रद्द करें',
      save: 'परिवर्तन सहेजें',
      saving: 'सहेजा जा रहा है...'
    }
  }

  const states = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh', labelHi: 'आंध्र प्रदेश' },
    { value: 'Maharashtra', label: 'Maharashtra', labelHi: 'महाराष्ट्र' },
    { value: 'Karnataka', label: 'Karnataka', labelHi: 'कर्नाटक' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu', labelHi: 'तमिल नाडु' },
    { value: 'Gujarat', label: 'Gujarat', labelHi: 'गुजरात' },
    { value: 'Rajasthan', label: 'Rajasthan', labelHi: 'राजस्थान' },
    { value: 'West Bengal', label: 'West Bengal', labelHi: 'पश्चिम बंगाल' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh', labelHi: 'उत्तर प्रदेश' }
  ]

  const occupations = [
    { value: 'Farmer', label: 'Farmer', labelHi: 'किसान' },
    { value: 'Self Employed', label: 'Self Employed', labelHi: 'स्वरोजगार' },
    { value: 'Government Employee', label: 'Government Employee', labelHi: 'सरकारी कर्मचारी' },
    { value: 'Private Employee', label: 'Private Employee', labelHi: 'निजी कर्मचारी' },
    { value: 'Student', label: 'Student', labelHi: 'छात्र' },
    { value: 'Retired', label: 'Retired', labelHi: 'सेवानिवृत्त' },
    { value: 'Unemployed', label: 'Unemployed', labelHi: 'बेरोजगार' },
    { value: 'Other', label: 'Other', labelHi: 'अन्य' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setUserProfile(formData)
      setLoading(false)
      onClose()
    }, 1000)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const inputClassName = "h-11 rounded-lg border-white/10 bg-black/24 text-white placeholder:text-emerald-50/35"
  const labelClassName = "text-emerald-50/75"
  const selectTriggerClassName = "h-11 rounded-lg border-white/10 bg-black/24 text-white hover:border-emerald-400/20 data-[placeholder]:text-emerald-50/35 [&_svg]:text-emerald-400/80"
  const selectContentClassName = "rounded-lg border-white/10 bg-[#07110d]/96 p-1 text-emerald-50 shadow-none backdrop-blur-xl"
  const selectItemClassName = "rounded-md py-2.5 pl-8 pr-3 text-sm text-emerald-50/78 focus:bg-emerald-400/8 focus:text-white data-[state=checked]:bg-emerald-400/8 data-[state=checked]:text-emerald-50/80 [&_svg]:text-emerald-400/80"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#07110d]/96 text-white shadow-none backdrop-blur-xl sm:max-w-2xl [&>button]:text-emerald-50/70 [&>button]:hover:text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">{content[language].title}</DialogTitle>
          <DialogDescription className="text-emerald-50/58">{content[language].description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className={labelClassName}>
                <Calendar className="inline w-4 h-4 mr-2 text-emerald-400/80" />
                {content[language].age}
              </Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                placeholder={content[language].agePlaceholder}
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                className={inputClassName}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income" className={labelClassName}>
                <IndianRupee className="inline w-4 h-4 mr-2 text-emerald-400/80" />
                {content[language].income}
              </Label>
              <Input
                id="income"
                type="number"
                min="0"
                placeholder={content[language].incomePlaceholder}
                value={formData.income}
                onChange={(e) => handleChange('income', parseInt(e.target.value))}
                className={inputClassName}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className={labelClassName}>
                <MapPin className="inline w-4 h-4 mr-2 text-emerald-400/80" />
                {content[language].state}
              </Label>
              <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
                <SelectTrigger className={selectTriggerClassName}>
                  <SelectValue placeholder={content[language].statePlaceholder} />
                </SelectTrigger>
                <SelectContent className={selectContentClassName}>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value} className={selectItemClassName}>
                      {language === 'en' ? state.label : state.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation" className={labelClassName}>
                <Briefcase className="inline w-4 h-4 mr-2 text-emerald-400/80" />
                {content[language].occupation}
              </Label>
              <Select value={formData.occupation} onValueChange={(value) => handleChange('occupation', value)}>
                <SelectTrigger className={selectTriggerClassName}>
                  <SelectValue placeholder={content[language].occupationPlaceholder} />
                </SelectTrigger>
                <SelectContent className={selectContentClassName}>
                  {occupations.map((occ) => (
                    <SelectItem key={occ.value} value={occ.value} className={selectItemClassName}>
                      {language === 'en' ? occ.label : occ.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="familySize" className={labelClassName}>
                <Users className="inline w-4 h-4 mr-2 text-emerald-400/80" />
                {content[language].familySize}
              </Label>
              <Input
                id="familySize"
                type="number"
                min="1"
                max="20"
                placeholder={content[language].familySizePlaceholder}
                value={formData.familySize}
                onChange={(e) => handleChange('familySize', parseInt(e.target.value))}
                className={inputClassName}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disability" className={labelClassName}>
                <Home className="inline w-4 h-4 mr-2 text-emerald-400/80" />
                {content[language].disability}
              </Label>
              <Select 
                value={formData.hasDisability ? 'yes' : 'no'} 
                onValueChange={(value) => handleChange('hasDisability', value === 'yes')}
              >
                <SelectTrigger className={selectTriggerClassName}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClassName}>
                  <SelectItem value="no" className={selectItemClassName}>{content[language].no}</SelectItem>
                  <SelectItem value="yes" className={selectItemClassName}>{content[language].yes}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="border-white/10 bg-white/[0.04] text-emerald-50 hover:border-emerald-400/20 hover:bg-white/[0.06] hover:text-white"
            >
              {content[language].cancel}
            </Button>
            <Button type="submit" disabled={loading} className="bg-emerald-500/85! text-white! hover:bg-emerald-400/90!">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {content[language].saving}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {content[language].save}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
