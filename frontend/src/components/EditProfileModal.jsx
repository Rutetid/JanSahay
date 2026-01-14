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
    
    // Simulate API call
    setTimeout(() => {
      setUserProfile(formData)
      setLoading(false)
      onClose()
    }, 1000)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{content[language].title}</DialogTitle>
          <DialogDescription>{content[language].description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">
                <Calendar className="inline w-4 h-4 mr-2 text-gray-500" />
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
                required
              />
            </div>

            {/* Annual Income */}
            <div className="space-y-2">
              <Label htmlFor="income">
                <IndianRupee className="inline w-4 h-4 mr-2 text-gray-500" />
                {content[language].income}
              </Label>
              <Input
                id="income"
                type="number"
                min="0"
                placeholder={content[language].incomePlaceholder}
                value={formData.income}
                onChange={(e) => handleChange('income', parseInt(e.target.value))}
                required
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">
                <MapPin className="inline w-4 h-4 mr-2 text-gray-500" />
                {content[language].state}
              </Label>
              <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={content[language].statePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {language === 'en' ? state.label : state.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation">
                <Briefcase className="inline w-4 h-4 mr-2 text-gray-500" />
                {content[language].occupation}
              </Label>
              <Select value={formData.occupation} onValueChange={(value) => handleChange('occupation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={content[language].occupationPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {occupations.map((occ) => (
                    <SelectItem key={occ.value} value={occ.value}>
                      {language === 'en' ? occ.label : occ.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Family Size */}
            <div className="space-y-2">
              <Label htmlFor="familySize">
                <Users className="inline w-4 h-4 mr-2 text-gray-500" />
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
                required
              />
            </div>

            {/* Disability */}
            <div className="space-y-2">
              <Label htmlFor="disability">
                <Home className="inline w-4 h-4 mr-2 text-gray-500" />
                {content[language].disability}
              </Label>
              <Select 
                value={formData.hasDisability ? 'yes' : 'no'} 
                onValueChange={(value) => handleChange('hasDisability', value === 'yes')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">{content[language].no}</SelectItem>
                  <SelectItem value="yes">{content[language].yes}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              {content[language].cancel}
            </Button>
            <Button type="submit" disabled={loading}>
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
