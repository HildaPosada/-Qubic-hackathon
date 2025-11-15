import React, { useEffect, useState } from 'react'
import { BarChart3, TrendingUp, Zap, DollarSign } from 'lucide-react'

export default function StatsPanel() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data.stats))
  }, [])

  if (!stats) {
    return <div className="flex items-center justify-center h-full">Loading stats...</div>
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 size={24} className="text-qubic-400" />
        <div>
          <h2 className="text-xl font-bold">Platform Statistics</h2>
          <p className="text-sm text-gray-400">Impact metrics and performance data</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <div className="text-3xl font-bold text-qubic-400 mb-2">{stats.total_contracts}</div>
          <div className="text-sm text-gray-400">Total Contracts Created</div>
        </div>

        <div className="card p-4">
          <div className="text-3xl font-bold text-green-400 mb-2">{stats.deployed_contracts}</div>
          <div className="text-sm text-gray-400">Deployed Contracts</div>
        </div>

        <div className="card p-4">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.average_security_score}</div>
          <div className="text-sm text-gray-400">Average Security Score</div>
        </div>

        <div className="card p-4">
          <div className="text-3xl font-bold text-purple-400 mb-2">{stats.total_deployments}</div>
          <div className="text-sm text-gray-400">Total Deployments</div>
        </div>
      </div>

      {/* Platform Benefits */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <TrendingUp size={20} className="text-green-500" />
          <span>Platform Benefits</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">Total Audit Savings</div>
              <div className="text-sm text-gray-400">vs. traditional $75K/audit</div>
            </div>
            <div className="text-2xl font-bold text-green-500">
              {stats.platform_benefits.total_audit_savings}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">Deployment Fees Saved</div>
              <div className="text-sm text-gray-400">Thanks to Qubic's feeless transactions</div>
            </div>
            <div className="text-2xl font-bold text-green-500">
              {stats.platform_benefits.deployment_fees_saved}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">Development Speed</div>
              <div className="text-sm text-gray-400">AI-assisted vs manual coding</div>
            </div>
            <div className="text-2xl font-bold text-qubic-400">
              {stats.platform_benefits.average_dev_time_reduction}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">Developers Onboarded</div>
              <div className="text-sm text-gray-400">Total users on the platform</div>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {stats.platform_benefits.developers_onboarded.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Qubic Advantages */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <Zap size={20} className="text-qubic-400" />
          <span>Qubic Blockchain Advantages</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Transaction Speed</div>
            <div className="text-2xl font-bold text-qubic-400">{stats.qubic_advantages.tps}</div>
            <div className="text-xs text-gray-500 mt-1">Transactions per second</div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Transaction Fees</div>
            <div className="text-2xl font-bold text-green-500">{stats.qubic_advantages.fees}</div>
            <div className="text-xs text-gray-500 mt-1">No gas costs</div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Finality</div>
            <div className="text-2xl font-bold text-yellow-500">{stats.qubic_advantages.finality}</div>
            <div className="text-xs text-gray-500 mt-1">No waiting</div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Language</div>
            <div className="text-2xl font-bold text-purple-500">{stats.qubic_advantages.language}</div>
            <div className="text-xs text-gray-500 mt-1">Bare-metal performance</div>
          </div>
        </div>
      </div>

      {/* Economic Impact */}
      <div className="card p-6 mt-6 bg-gradient-to-br from-qubic-900/20 to-purple-900/20 border-qubic-500/30">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <DollarSign size={20} className="text-green-500" />
          <span>Total Economic Impact</span>
        </h3>
        <div className="text-center py-4">
          <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-qubic-400 bg-clip-text text-transparent mb-2">
            ${parseInt(stats.platform_benefits.total_audit_savings.replace(/[^0-9]/g, '')).toLocaleString()}+
          </div>
          <div className="text-gray-400">Saved by developers using this platform</div>
        </div>
      </div>
    </div>
  )
}
