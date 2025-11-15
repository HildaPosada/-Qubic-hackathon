import React, { useState } from 'react'
import { Send, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface AIAssistantProps {
  code: string
  setCode: (code: string) => void
}

export default function AIAssistant({ code, setCode }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m your AI assistant powered by Qubic\'s Aigarth AI. I can help you generate smart contracts, explain code, find bugs, and optimize performance. What would you like to build?'
    }
  ])

  const quickPrompts = [
    'Create a voting contract',
    'Build a token contract',
    'Make an NFT contract',
    'Create an escrow contract'
  ]

  const handleGenerate = async (customPrompt?: string) => {
    const userPrompt = customPrompt || prompt
    if (!userPrompt.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: userPrompt }])
    setPrompt('')
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      })

      const data = await response.json()

      if (data.success) {
        setCode(data.code)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `✅ Generated contract!\n\n${data.explanation}\n\n**Suggestions:**\n${data.suggestions.map((s: string) => `• ${s}`).join('\n')}`
        }])
        toast.success('Contract generated successfully!')
      } else {
        toast.error('Failed to generate contract')
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '❌ Sorry, I couldn\'t generate that contract. Please try again.'
        }])
      }
    } catch (error) {
      toast.error('Error generating contract')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ An error occurred. Please try again.'
      }])
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Sparkles size={20} className="text-qubic-400" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Powered by Aigarth AI
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.role === 'user'
                ? 'bg-qubic-900 ml-8'
                : 'bg-gray-700 mr-8'
            } rounded-lg p-3`}
          >
            <div className="text-xs text-gray-400 mb-1">
              {msg.role === 'user' ? 'You' : 'AI Assistant'}
            </div>
            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}

        {isGenerating && (
          <div className="bg-gray-700 rounded-lg p-3 mr-8">
            <div className="flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin text-qubic-400" />
              <span className="text-sm">Generating contract...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 border-t border-gray-700">
        <div className="text-xs text-gray-400 mb-2">Quick actions:</div>
        <div className="grid grid-cols-2 gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleGenerate(p)}
              disabled={isGenerating}
              className="text-xs btn btn-secondary py-1.5 px-2"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Describe your smart contract..."
            className="input flex-1 text-sm"
            disabled={isGenerating}
          />
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !prompt.trim()}
            className="btn btn-primary"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
