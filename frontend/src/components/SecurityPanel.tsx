import React, { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, XCircle, Info, Loader2, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

interface SecurityPanelProps {
  code: string
  securityScore: number | null
  setSecurityScore: (score: number) => void
}

export default function SecurityPanel({ code, securityScore, setSecurityScore }: SecurityPanelProps) {
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditResult, setAuditResult] = useState<any>(null)

  const handleAudit = async () => {
    if (!code.trim()) {
      toast.error('No code to audit')
      return
    }

    setIsAuditing(true)

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, contract_name: 'MyContract' })
      })

      const data = await response.json()

      if (data.success) {
        setAuditResult(data)
        setSecurityScore(data.score)
        toast.success(`🎯 Audit complete! Score: ${data.score}/100`)
      } else {
        toast.error('Audit failed')
      }
    } catch (error) {
      toast.error('Error auditing contract')
    } finally {
      setIsAuditing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-600/20 to-red-900/10 border-red-600/30 text-red-300'
      case 'high': return 'from-orange-600/20 to-orange-900/10 border-orange-600/30 text-orange-300'
      case 'medium': return 'from-yellow-600/20 to-yellow-900/10 border-yellow-600/30 text-yellow-300'
      case 'low': return 'from-blue-600/20 to-blue-900/10 border-blue-600/30 text-blue-300'
      case 'info': return 'from-gray-600/20 to-gray-900/10 border-gray-600/30 text-gray-300'
      default: return 'from-gray-600/20 to-gray-900/10 border-gray-600/30 text-gray-300'
    }
  }

  const getSeverityBadge = (severity: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      critical: { label: '🔴 Critical', color: 'text-red-400' },
      high: { label: '🟠 High', color: 'text-orange-400' },
      medium: { label: '🟡 Medium', color: 'text-yellow-400' },
      low: { label: '🔵 Low', color: 'text-blue-400' },
      info: { label: 'ℹ️ Info', color: 'text-gray-400' }
    }
    return badges[severity] || badges.info
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500'
    if (score >= 80) return 'from-yellow-500 to-orange-500'
    if (score >= 70) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-600'
  }

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { status: 'Excellent', emoji: '🟢' }
    if (score >= 80) return { status: 'Good', emoji: '🟡' }
    if (score >= 70) return { status: 'Fair', emoji: '🟠' }
    return { status: 'Needs Work', emoji: '🔴' }
  }

  return (
    <div className="flex flex-col h-full bg-dark-bg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-card to-dark-bg/50 border-b border-qubic-500/20 px-8 py-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-600/20 to-orange-600/10 border border-red-500/30">
              <Shield size={28} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Security Audit</h2>
              <p className="text-sm text-gray-400">AI-powered vulnerability detection & analysis</p>
            </div>
          </div>

          <button
            onClick={handleAudit}
            disabled={isAuditing || !code.trim()}
            className={`btn text-base flex items-center space-x-2 relative overflow-hidden group ${
              isAuditing ? 'btn-secondary' : 'btn-primary'
            }`}
          >
            {isAuditing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Zap size={20} />
                <span>Run Full Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {!auditResult && !isAuditing && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 mb-6 inline-block">
                <Shield size={64} className="text-red-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-100">No Audit Results Yet</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Run a comprehensive security audit to detect vulnerabilities, get recommendations, and ensure your smart contract meets the highest security standards.
              </p>
              <p className="text-sm text-gray-500 italic">
                Our AI analyzes for reentrancy, overflow, access control, and more
              </p>
            </div>
          </div>
        )}

        {auditResult && (
          <>
            {/* Score Card */}
            <div className={`card bg-gradient-to-br ${getScoreColor(auditResult.score)} bg-opacity-10 border border-current border-opacity-30 p-8`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-gray-100">Security Score</h3>
                  <p className="text-sm text-gray-400 mb-4">{auditResult.summary}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-300">Score Progress</span>
                        <span className="text-xs font-bold text-gray-300">{auditResult.score}%</span>
                      </div>
                      <div className="h-2 bg-gray-900/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getScoreColor(auditResult.score)} transition-all duration-1000`}
                          style={{ width: `${auditResult.score}%` }}
                        />
                      </div>
                    </div>

                    {auditResult.passed ? (
                      <div className="flex items-center space-x-2 text-green-400 mt-4 p-3 rounded-lg bg-green-900/20 border border-green-600/30">
                        <CheckCircle size={20} />
                        <span className="font-semibold">Contract passed audit (80+ score)</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-red-400 mt-4 p-3 rounded-lg bg-red-900/20 border border-red-600/30">
                        <AlertTriangle size={20} />
                        <span className="font-semibold">Contract needs improvements (&lt;80 score)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right ml-8">
                  <div className={`text-6xl font-bold bg-gradient-to-br ${getScoreColor(auditResult.score)} bg-clip-text text-transparent mb-2`}>
                    {auditResult.score}
                  </div>
                  <div className="text-sm font-semibold text-gray-400">/ 100</div>
                  <div className={`text-lg font-bold mt-4 ${getScoreStatus(auditResult.score).emoji}`}>
                    {getScoreStatus(auditResult.score).status}
                  </div>
                </div>
              </div>
            </div>

            {/* Issues */}
            {auditResult.issues && auditResult.issues.length > 0 && (
              <div className="card p-6 bg-dark-card border-qubic-500/20">
                <h3 className="text-lg font-bold mb-4 text-gray-100 flex items-center space-x-2">
                  <AlertTriangle size={20} className="text-orange-400" />
                  <span>Issues Found ({auditResult.issues.length})</span>
                </h3>

                <div className="space-y-3">
                  {auditResult.issues.map((issue: any, idx: number) => {
                    const badge = getSeverityBadge(issue.severity)
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border bg-gradient-to-r ${getSeverityColor(issue.severity)} backdrop-blur-sm transition-all hover:shadow-md`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`font-bold text-sm ${badge.color}`}>{badge.label}</span>
                              <span className="text-gray-500">•</span>
                              <span className="text-sm font-semibold text-gray-300">{issue.category}</span>
                            </div>
                            <p className="text-sm text-gray-200 mb-2">{issue.message}</p>
                            {issue.fix && (
                              <div className="mt-2 p-3 bg-gray-900/50 rounded text-xs text-gray-300 border-l-2 border-qubic-500/50">
                                <span className="font-semibold text-qubic-400">💡 Suggested Fix: </span>
                                <span>{issue.fix}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {auditResult.recommendations && auditResult.recommendations.length > 0 && (
              <div className="card p-6 bg-dark-card border-qubic-500/20">
                <h3 className="text-lg font-bold mb-4 text-gray-100 flex items-center space-x-2">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Recommendations ({auditResult.recommendations.length})</span>
                </h3>
                <ul className="space-y-3">
                  {auditResult.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/20 border border-green-600/20">
                      <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-200">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
