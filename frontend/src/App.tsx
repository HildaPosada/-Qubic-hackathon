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
    <div className="min-h-screen bg-white flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-16 bg-surface-50 border-r border-surface-200 flex flex-col items-center py-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-surface-600 hover:text-primary-600 hover:bg-surface-100'
                }`}
                title={tab.label}
              >
                <Icon size={22} />
                {isActive && (
                  <div className="absolute -right-2 w-1 h-6 bg-primary-600 rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeTab === 'editor' && (
              <Editor code={code} setCode={setCode} setSecurityScore={setSecurityScore} />
            )}
            {activeTab === 'security' && (
              <SecurityPanel code={code} securityScore={securityScore} setSecurityScore={setSecurityScore} />
            )}
            {activeTab === 'deploy' && (
              <DeploymentPanel code={code} />
            )}
            {activeTab === 'stats' && (
              <StatsPanel />
            )}
          </div>

          {/* Right Panel - AI Assistant */}
          <div className="w-96 flex flex-col overflow-hidden border-l border-surface-200">
            <AIAssistant code={code} setCode={setCode} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-surface-200 bg-surface-50 px-6 py-4 text-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="status-dot status-dot-active"></div>
              <span className="font-medium text-surface-700">Connected to Qubic Testnet</span>
            </div>
            <div className="text-surface-600 text-xs space-x-2">
              <span>⚡ 15.5M TPS</span>
              <span>•</span>
              <span>💰 Zero Fees</span>
              <span>•</span>
              <span>✅ Instant Finality</span>
            </div>
          </div>

          <div className="text-surface-500 text-xs">
            Powered by <span className="font-semibold text-primary-600">Qubic</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
