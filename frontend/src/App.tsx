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
    { id: 'editor' as Tab, label: 'Code Editor', icon: Code2 },
    { id: 'security' as Tab, label: 'Security Audit', icon: Shield },
    { id: 'deploy' as Tab, label: 'Deploy', icon: Rocket },
    { id: 'stats' as Tab, label: 'Stats', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Toaster position="top-right" />

      <Header />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                  activeTab === tab.id
                    ? 'bg-qubic-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                title={tab.label}
              >
                <Icon size={24} />
              </button>
            )
          })}
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex">
          {/* Left Panel - Main Content */}
          <div className="flex-1 flex flex-col">
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
          <div className="w-96 border-l border-gray-700">
            <AIAssistant code={code} setCode={setCode} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-3 text-sm text-gray-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Connected to Qubic Testnet</span>
            </span>
            <span>15.5M TPS • Feeless • Instant Finality</span>
          </div>
          <div>
            Powered by Qubic Blockchain
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
