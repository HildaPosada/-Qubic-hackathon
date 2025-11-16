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
    { id: 'editor' as Tab, label: 'Editor', icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { id: 'security' as Tab, label: 'Security', icon: Shield, color: 'from-red-500 to-orange-500' },
    { id: 'deploy' as Tab, label: 'Deploy', icon: Rocket, color: 'from-green-500 to-emerald-500' },
    { id: 'stats' as Tab, label: 'Stats', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111b3c',
            color: '#e2e8f0',
            border: '1px solid rgba(14, 165, 233, 0.2)',
            borderRadius: '12px',
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-20 bg-gradient-to-b from-dark-card to-dark-bg border-r border-qubic-500/20 flex flex-col items-center py-6 space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-br ${tab.color} shadow-glow text-white`
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                title={tab.label}
              >
                {/* Tooltip */}
                <div className="absolute left-16 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-dark-card border border-qubic-500/30 text-gray-100 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-semibold z-50">
                  {tab.label}
                  <div className="absolute right-full w-2 h-2 border-l-0 border-t-2 border-b-2 border-dark-card -translate-y-1/2 top-1/2"></div>
                </div>

                <Icon size={24} />

                {/* Indicator */}
                {isActive && (
                  <div className="absolute -right-3 w-1 h-8 bg-gradient-to-b from-qubic-400 to-qubic-600 rounded-full shadow-glow"></div>
                )}
              </button>
            )
          })}

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Bottom Indicator */}
          <div className="w-10 h-10 rounded-xl bg-dark-bg border border-qubic-500/20 flex items-center justify-center text-qubic-400 text-xs font-bold">
            Q
          </div>
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

          {/* Right Panel - AI Assistant (always visible) */}
          <div className="w-96 flex flex-col overflow-hidden border-l border-qubic-500/20">
            <AIAssistant code={code} setCode={setCode} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-dark-card to-dark-bg border-t border-qubic-500/20 px-8 py-4 text-sm backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="status-indicator status-indicator-success animate-pulse"></div>
              <span className="font-semibold text-gray-300">Connected to Qubic Testnet</span>
            </div>
            <div className="text-gray-500 text-xs">
              <span className="inline-flex items-center space-x-1">
                <span>⚡</span>
                <span>15.5M TPS</span>
              </span>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center space-x-1">
                <span>💰</span>
                <span>Feeless</span>
              </span>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center space-x-1">
                <span>✅</span>
                <span>Instant Finality</span>
              </span>
            </div>
          </div>

          <div className="text-gray-500 text-xs">
            Powered by <span className="font-semibold text-qubic-400">Qubic Blockchain</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
