import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Editor from './components/Editor'
import AIAssistant from './components/AIAssistant'
import SecurityPanel from './components/SecurityPanel'
import DeploymentPanel from './components/DeploymentPanel'
import StatsPanel from './components/StatsPanel'
import { Code2, Shield, Rocket, BarChart3 } from 'lucide-react'

type Tab = 'editor' | 'security' | 'deploy' | 'stats'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('editor')
  const [code, setCode] = useState('')
  const [securityScore, setSecurityScore] = useState<number | null>(null)

  const tabs = [
    { id: 'editor' as Tab, label: 'Editor', icon: Code2 },
    { id: 'security' as Tab, label: 'Security', icon: Shield },
    { id: 'deploy' as Tab, label: 'Deploy', icon: Rocket },
    { id: 'stats' as Tab, label: 'Stats', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-surface-50 flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-20 bg-white border-r border-surface-100 flex flex-col items-center py-6 space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white shadow-lg scale-100'
                    : 'text-surface-600 hover:text-primary-600 hover:bg-surface-50'
                }`}
                title={tab.label}
              >
                <Icon size={24} />
                {isActive && (
                  <div className="absolute -right-1 w-1.5 h-8 bg-gradient-to-b from-primary-600 to-accent-600 rounded-full shadow-md"></div>
                )}
              </button>
            )
          })}
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-white to-surface-50">
            {activeTab === 'editor' && (
              <div className="flex-1 overflow-hidden animate-fade-in">
                <Editor code={code} setCode={setCode} setSecurityScore={setSecurityScore} />
              </div>
            )}
            {activeTab === 'security' && (
              <div className="flex-1 overflow-hidden animate-fade-in">
                <SecurityPanel code={code} securityScore={securityScore} setSecurityScore={setSecurityScore} />
              </div>
            )}
            {activeTab === 'deploy' && (
              <div className="flex-1 overflow-hidden animate-fade-in">
                <DeploymentPanel code={code} />
              </div>
            )}
            {activeTab === 'stats' && (
              <div className="flex-1 overflow-hidden animate-fade-in">
                <StatsPanel />
              </div>
            )}
          </div>

          {/* Right Panel - AI Assistant */}
          <div className="w-96 flex flex-col overflow-hidden border-l border-surface-100 bg-gradient-to-b from-white to-surface-50">
            <AIAssistant code={code} setCode={setCode} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-surface-100 bg-white px-6 py-4 text-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-surface-700">Connected to Qubic Testnet</span>
            </div>
            <div className="text-surface-600 text-xs space-x-3 flex">
              <span className="flex items-center space-x-1"><span>⚡</span><span>15.5M TPS</span></span>
              <span>•</span>
              <span className="flex items-center space-x-1"><span>💰</span><span>Zero Fees</span></span>
              <span>•</span>
              <span className="flex items-center space-x-1"><span>✅</span><span>Instant Finality</span></span>
            </div>
          </div>

          <div className="text-surface-500 text-xs">
            Powered by <span className="font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Qubic</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
