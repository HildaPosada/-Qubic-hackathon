import React from 'react'
import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-qubic-500 to-qubic-700 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Qubic Smart Contract Studio
            </h1>
            <p className="text-sm text-gray-400">
              AI-Powered IDE for Qubic C++ Smart Contracts
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-400">Network:</span>
              <span className="text-sm font-medium text-green-400">Testnet</span>
            </div>
          </div>

          <button className="btn btn-primary">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Feature Pills */}
      <div className="mt-4 flex items-center space-x-3">
        <div className="badge badge-info">
          ⚡ 15.5M TPS
        </div>
        <div className="badge badge-success">
          💰 Zero Fees
        </div>
        <div className="badge badge-info">
          ✨ AI-Powered
        </div>
        <div className="badge badge-success">
          ⏱️ Instant Finality
        </div>
      </div>
    </header>
  )
}
