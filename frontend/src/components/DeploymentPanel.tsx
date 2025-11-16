import React, { useState } from 'react'
import { Rocket, Loader2, CheckCircle, ExternalLink, Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../services/api'

interface DeploymentPanelProps {
  code: string
}

export default function DeploymentPanel({ code }: DeploymentPanelProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployment, setDeployment] = useState<any>(null)
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet')

  const handleDeploy = async () => {
    if (!code.trim()) {
      toast.error('No code to deploy')
      return
    }

    setIsDeploying(true)

    try {
      const data = await api.deploy('temp_' + Date.now(), network)

      if (data.success) {
        setDeployment(data.deployment)
        toast.success(`🚀 Deployed to ${network} successfully!`)
      } else {
        toast.error('Deployment failed')
      }
    } catch (error) {
      toast.error('Error deploying contract')
    } finally {
      setIsDeploying(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Rocket size={24} className="text-qubic-400" />
          <div>
            <h2 className="text-xl font-bold">Deploy Contract</h2>
            <p className="text-sm text-gray-400">Deploy to Qubic blockchain - instant & feeless!</p>
          </div>
        </div>
      </div>

      {/* Network Selection */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold mb-4">Select Network</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setNetwork('testnet')}
            className={`p-4 rounded-lg border-2 transition-all ${
              network === 'testnet'
                ? 'border-qubic-500 bg-qubic-900/20'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="text-left">
              <div className="font-semibold mb-1">Testnet</div>
              <div className="text-sm text-gray-400">For testing and development</div>
              <div className="mt-2 inline-block px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded">
                Recommended
              </div>
            </div>
          </button>

          <button
            onClick={() => setNetwork('mainnet')}
            className={`p-4 rounded-lg border-2 transition-all ${
              network === 'mainnet'
                ? 'border-qubic-500 bg-qubic-900/20'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="text-left">
              <div className="font-semibold mb-1">Mainnet</div>
              <div className="text-sm text-gray-400">Production blockchain</div>
              <div className="mt-2 inline-block px-2 py-1 bg-red-900/20 text-red-400 text-xs rounded">
                Use with caution
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Qubic Advantages */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold mb-4">Qubic Deployment Benefits</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle size={18} className="text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">⚡ Instant Finality</div>
              <div className="text-sm text-gray-400">No waiting for confirmations - your contract is live immediately!</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle size={18} className="text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">💰 Zero Fees</div>
              <div className="text-sm text-gray-400">Deploy for free - no gas costs on Qubic</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle size={18} className="text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">🚀 15.5M TPS</div>
              <div className="text-sm text-gray-400">Lightning-fast transaction processing</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle size={18} className="text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">🏎️ C++ Performance</div>
              <div className="text-sm text-gray-400">Native bare-metal execution speed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deploy Button */}
      <button
        onClick={handleDeploy}
        disabled={isDeploying || !code.trim()}
        className="btn btn-primary w-full py-3 text-lg flex items-center justify-center space-x-2 mb-6"
      >
        {isDeploying ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Deploying to {network}...</span>
          </>
        ) : (
          <>
            <Rocket size={20} />
            <span>Deploy to {network === 'testnet' ? 'Testnet' : 'Mainnet'}</span>
          </>
        )}
      </button>

      {/* Deployment Result */}
      {deployment && (
        <div className="card p-6 border-2 border-green-500/30 bg-green-900/10">
          <div className="flex items-center space-x-2 text-green-500 mb-4">
            <CheckCircle size={24} />
            <h3 className="text-lg font-semibold">Deployment Successful!</h3>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-400 mb-1">Contract Address</div>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-800 px-3 py-2 rounded font-mono text-sm">
                  {deployment.address}
                </code>
                <button
                  onClick={() => copyToClipboard(deployment.address)}
                  className="btn btn-secondary"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Transaction Hash</div>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-800 px-3 py-2 rounded font-mono text-sm truncate">
                  {deployment.transaction_hash}
                </code>
                <button
                  onClick={() => copyToClipboard(deployment.transaction_hash)}
                  className="btn btn-secondary"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Network</div>
                <div className="font-medium capitalize">{deployment.network}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <div className="font-medium text-green-500 capitalize">{deployment.status}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Gas Used</div>
                <div className="font-medium text-green-500">{deployment.gas_used} (Feeless!)</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Deployment Time</div>
                <div className="font-medium">&lt;1 second</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button className="btn btn-secondary w-full flex items-center justify-center space-x-2">
                <ExternalLink size={16} />
                <span>View on Qubic Explorer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
