import { Bot, X, Send } from 'lucide-react'
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
        className="fixed bottom-6 right-6 w-16 h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50 flex items-center justify-center group"
      >
        {isOpen ? (
          <X size={28} className="group-hover:rotate-90 transition-transform" />
        ) : (
          <Bot size={28} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-zinc-900 rounded-2xl shadow-2xl z-50 overflow-hidden border border-white/10">
          <div className="bg-emerald-600 p-4 text-white">
            <h3 className="font-bold text-lg">{content[language].title}</h3>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto bg-zinc-950">
            <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
              <p className="text-zinc-300">{content[language].greeting}</p>
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-zinc-900">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={content[language].placeholder}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder:text-zinc-500"
              />
              <button className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg">
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistant