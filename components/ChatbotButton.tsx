"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatbotButton() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    {type: 'bot', content: getWelcomeMessage(pathname)}
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  function getWelcomeMessage(path: string) {
    if (path.includes('/dashboard/academies')) {
      return 'Hi! Need help finding or enrolling in academies? Ask me anything!'
    } else if (path.includes('/dashboard/bookings')) {
      return 'Hello! I can help you manage your bookings or find sessions. What do you need?'
    } else if (path.includes('/dashboard/profile')) {
      return 'Hi there! Need help updating your profile or preferences? Just ask!'
    } else if (path.includes('/dashboard')) {
      return 'Welcome to your dashboard! How can I assist you today?'
    }
    return 'Hi there! How can I help you today?'
  }

  const handleUserMessage = async (userMessage: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          path: pathname
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')
      
      const data = await response.json()
      setMessages(prev => [...prev, {type: 'bot', content: data.message}])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {type: 'bot', content: 'Sorry, I encountered an error. Please try again.'}])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, {type: 'user', content: userMessage}])
    setInput('')
    
    await handleUserMessage(userMessage)
  }

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 w-full sm:w-[350px] md:w-96 max-h-[100dvh] sm:max-h-[600px] flex flex-col sm:flex-none">
          <Card className="border border-emerald-200 rounded-none sm:rounded-2xl overflow-hidden shadow-xl flex flex-col h-full sm:h-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-3 sm:p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1.5 rounded-full">
                  <MessageSquare size={18} className="text-emerald-600" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Sportler Assistant</h3>
              </div>
              <Button 
                size="sm"
                variant="ghost" 
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="bg-gray-50 p-3 sm:p-4 flex-grow overflow-hidden">
              <ScrollArea className="h-[calc(100dvh-120px)] sm:h-[340px] pr-2 -mr-2">
                <div className="space-y-3 sm:space-y-4">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base ${
                          msg.type === 'user' 
                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white' 
                            : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex space-x-1.5 items-center">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>
            
            {/* Input area */}
            <CardFooter className="border-t p-2 sm:p-3 bg-white shrink-0">
              <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center">
                <Input 
                  placeholder="Type your message..." 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 rounded-full border-gray-200 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 text-sm sm:text-base py-1 sm:py-2"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center shadow-md"
                  disabled={isLoading || !input.trim()}
                >
                  <Send size={14} className="text-white sm:size-16" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Button 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={20} className="text-white sm:size-24" />
        </Button>
      )}
    </>
  )
}