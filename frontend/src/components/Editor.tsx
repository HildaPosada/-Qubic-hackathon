import React, { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Play, Save, FileCode, Lightbulb, Copy, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface EditorProps {
  code: string
  setCode: (code: string) => void
  setSecurityScore: (score: number | null) => void
}

export default function Editor({ code, setCode, setSecurityScore }: EditorProps) {
  const [isCompiling, setIsCompiling] = useState(false)
  const [hasCompiled, setHasCompiled] = useState(false)

  const defaultCode = `// Qubic Smart Contract
// Leverages 15.5M TPS and feeless transactions

#include <qubic.h>

struct QubicContract {
    uint64_t value;

    PUBLIC void setValue(uint64_t newValue) {
        require(newValue > 0, "Value must be positive");
        value = newValue;
    }

    PUBLIC uint64_t getValue() const {
        return value;
    }
};`

  const handleCompile = async () => {
    setIsCompiling(true)
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      const data = await response.json()

      if (data.success) {
        setHasCompiled(true)
        toast.success('✅ Compilation successful!')
        setTimeout(() => setHasCompiled(false), 3000)
      } else {
        toast.error('❌ Compilation failed')
      }
    } catch (error) {
      toast.error('Error compiling contract')
    } finally {
      setIsCompiling(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code || defaultCode)
    toast.success('Code copied to clipboard!')
  }

  return (
    <div className="flex flex-col h-full bg-dark-bg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-dark-card to-dark-bg/50 border-b border-qubic-500/20 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-qubic-600/20 border border-qubic-500/30">
            <FileCode size={20} className="text-qubic-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-200">contract.cpp</div>
            <div className="text-xs text-gray-500">C++ • Qubic Smart Contract</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Compile Button */}
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className={`btn ${hasCompiled ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'} text-sm flex items-center space-x-2 transition-all`}
          >
            {hasCompiled ? (
              <>
                <CheckCircle size={16} />
                <span>Compiled</span>
              </>
            ) : isCompiling ? (
              <>
                <Play size={16} className="animate-spin" />
                <span>Compiling...</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Compile</span>
              </>
            )}
          </button>

          {/* Copy Button */}
          <button
            onClick={copyCode}
            className="btn btn-secondary text-sm flex items-center space-x-2"
            title="Copy code"
          >
            <Copy size={16} />
            <span>Copy</span>
          </button>

          {/* Save Button */}
          <button className="btn btn-secondary text-sm flex items-center space-x-2">
            <Save size={16} />
            <span>Save</span>
          </button>

          {/* AI Suggestion Button */}
          <button className="btn btn-ghost text-sm flex items-center space-x-2 ml-2">
            <Lightbulb size={16} />
            <span>Optimize</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden bg-dark-bg">
        <MonacoEditor
          height="100%"
          language="cpp"
          theme="vs-dark"
          value={code || defaultCode}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: true, side: 'right' },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80, 120],
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            formatOnPaste: true,
            formatOnType: true,
            roundedSelection: true,
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: true,
              verticalSliderSize: 12,
              horizontalSliderSize: 12,
            },
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-dark-card to-dark-bg/50 border-t border-qubic-500/20 px-6 py-3 text-sm backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center space-x-6 text-gray-400">
          <span className="flex items-center space-x-2 hover:text-gray-300 cursor-help">
            <span className="text-xs font-medium">Lines:</span>
            <span className="font-semibold text-gray-300">{code.split('\n').length}</span>
          </span>
          <span className="flex items-center space-x-2 hover:text-gray-300 cursor-help">
            <span className="text-xs font-medium">Characters:</span>
            <span className="font-semibold text-gray-300">{code.length}</span>
          </span>
          <span className="flex items-center space-x-2 hover:text-gray-300 cursor-help">
            <span className="text-xs font-medium">Language:</span>
            <span className="font-semibold text-qubic-400">C++</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="status-indicator status-indicator-success animate-pulse"></div>
          <span className="text-xs font-medium text-qubic-400">Qubic SDK Ready</span>
        </div>
      </div>
    </div>
  )
}
