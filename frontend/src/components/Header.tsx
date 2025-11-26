import React from 'react'
import { Sparkles, Zap, Lock, Code2, Rocket, ArrowRight } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-primary-50 via-white to-accent-50 border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Logo & Navigation */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Qubic Studio</h1>
              <p className="text-xs text-primary-600 font-medium">Smart Contract IDE</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-secondary-50 border border-secondary-200">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-secondary-700">Qubic Testnet</span>
            </div>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium text-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95">
              Connect Wallet
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-3 leading-tight">
              Build & Deploy Smart Contracts with <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">AI Precision</span>
            </h2>
            <p className="text-lg text-surface-600 mb-6 max-w-2xl">
              Write, audit, and deploy Qubic smart contracts in minutes with AI-powered assistance. Zero fees. Instant finality. Maximum performance.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center space-x-2">
                <span>Start Building</span>
                <ArrowRight size={18} />
              </button>
              <button className="px-6 py-3 rounded-lg bg-white border border-primary-200 text-primary-600 font-medium hover:bg-primary-50 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Zap, label: '15.5M TPS', description: 'Lightning Fast' },
            { icon: Lock, label: 'AI Security', description: 'Always Audited' },
            { icon: Code2, label: 'C++ Native', description: 'High Performance' },
            { icon: Rocket, label: 'Zero Fees', description: 'Instant Deploy' },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="group relative p-4 rounded-xl bg-white border border-surface-100 hover:border-primary-200 hover:shadow-md transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="relative flex flex-col">
                  <Icon size={20} className="text-primary-600 mb-2" />
                  <div className="font-semibold text-sm text-surface-900">{feature.label}</div>
                  <div className="text-xs text-surface-500 mt-1">{feature.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </header>
  )
}
