import { Bot, X } from 'lucide-react'
import { useState } from 'react'

const AIAssistant = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false)

  const content = {
    en: {
      title: 'AI Assistant',
      placeholder: 'Ask me anything about schemes...',
      greeting: 'Hello! I can help you find the right government schemes. What would you like to know?'
    },
    hi: {
      title: 'AI सहायक',
      placeholder: 'योजनाओं के बारे में मुझसे कुछ भी पूछें...',
      greeting: 'नमस्ते! मैं आपको सही सरकारी योजनाएं खोजने में मदद कर सकता हूं। आप क्या जानना चाहेंगे?'
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gov-blue-600 hover:bg-gov-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50 flex items-center justify-center group"
      >
        {isOpen ? (
          <X size={28} className="group-hover:rotate-90 transition-transform" />
        ) : (
          <Bot size={28} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="bg-gov-blue-600 p-4 text-white">
            <h3 className="font-bold text-lg">{content[language].title}</h3>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <p className="text-gray-700">{content[language].greeting}</p>
            </div>
          </div>

          <div className="p-4 border-t bg-white">
            <input
              type="text"
              placeholder={content[language].placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue-500"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistant
