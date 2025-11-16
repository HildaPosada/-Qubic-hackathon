import React, { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, XCircle, Info, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../services/api'

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
      const data = await api.audit(code, 'MyContract')

      if (data.success) {
        setAuditResult(data)
        setSecurityScore(data.score)
        toast.success(`Audit complete! Score: ${data.score}/100`)
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
      case 'critical': return 'text-red-500 bg-red-900/20'
      case 'high': return 'text-orange-500 bg-orange-900/20'
      case 'medium': return 'text-yellow-500 bg-yellow-900/20'
      case 'low': return 'text-blue-500 bg-blue-900/20'
      case 'info': return 'text-gray-500 bg-gray-800'
      default: return 'text-gray-500'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <XCircle size={18} />
      case 'medium':
        return <AlertTriangle size={18} />
      case 'low':
      case 'info':
        return <Info size={18} />
      default:
        return <Info size={18} />
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield size={24} className="text-qubic-400" />
          <div>
            <h2 className="text-xl font-bold">Security Audit</h2>
            <p className="text-sm text-gray-400">AI-powered vulnerability detection</p>
          </div>
        </div>

        <button
          onClick={handleAudit}
          disabled={isAuditing || !code.trim()}
          className="btn btn-primary flex items-center space-x-2"
        >
          {isAuditing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Auditing...</span>
            </>
          ) : (
            <>
              <Shield size={18} />
              <span>Run Audit</span>
            </>
          )}
        </button>
      </div>

      {!auditResult && !isAuditing && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <Shield size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No audit results yet</h3>
            <p className="text-gray-400 mb-4">
              Run a security audit to detect vulnerabilities and get recommendations
            </p>
            <p className="text-sm text-gray-500">
              Our AI analyzes your contract for reentrancy, overflow, access control issues, and more
            </p>
          </div>
        </div>
      )}

      {auditResult && (
        <div className="space-y-6">
          {/* Score Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Security Score</h3>
                <p className="text-sm text-gray-400">{auditResult.summary}</p>
              </div>
              <div className="text-center">
                <div className={`text-5xl font-bold ${
                  auditResult.score >= 90 ? 'text-green-500' :
                  auditResult.score >= 80 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {auditResult.score}
                </div>
                <div className="text-sm text-gray-400 mt-1">/ 100</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    auditResult.score >= 90 ? 'bg-green-500' :
                    auditResult.score >= 80 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${auditResult.score}%` }}
                />
              </div>
            </div>

            <div className="mt-4">
              {auditResult.passed ? (
                <div className="flex items-center space-x-2 text-green-500">
                  <CheckCircle size={18} />
                  <span className="font-medium">Contract passed audit (80+ score)</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-500">
                  <XCircle size={18} />
                  <span className="font-medium">Contract failed audit (&lt;80 score)</span>
                </div>
              )}
            </div>
          </div>

          {/* Issues */}
          {auditResult.issues && auditResult.issues.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Issues Found ({auditResult.issues.length})
              </h3>
              <div className="space-y-3">
                {auditResult.issues.map((issue: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={getSeverityColor(issue.severity)}>
                        {getSeverityIcon(issue.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium capitalize">{issue.severity}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-400">{issue.category}</span>
                        </div>
                        <p className="text-sm mb-2">{issue.message}</p>
                        {issue.fix && (
                          <div className="mt-2 p-2 bg-gray-800/50 rounded text-xs">
                            <span className="text-gray-400">Fix: </span>
                            <span>{issue.fix}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {auditResult.recommendations && auditResult.recommendations.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {auditResult.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
