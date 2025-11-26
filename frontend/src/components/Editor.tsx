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
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-surface-50">
      {/* Toolbar */}
      <div className="border-b border-surface-100 px-6 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
            <FileCode size={20} className="text-primary-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-surface-900">contract.cpp</div>
            <div className="text-xs text-surface-500 font-medium">C++ • Smart Contract</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
              hasCompiled
                ? 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-md'
                : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:shadow-lg text-white'
            } disabled:opacity-70`}
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

          <button
            onClick={copyCode}
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 bg-white border border-surface-200 text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-all"
          >
            <Copy size={16} />
            <span>Copy</span>
          </button>

          <button className="px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 bg-white border border-surface-200 text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-all">
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          language="cpp"
          theme="vs"
          value={code || defaultCode}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
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
              verticalSliderSize: 12,
              horizontalSliderSize: 12,
            },
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="border-t border-surface-100 px-6 py-3 text-sm bg-white flex items-center justify-between">
        <div className="flex items-center space-x-8 text-surface-600">
          <span>Lines: <span className="font-semibold text-surface-900">{code.split('\n').length}</span></span>
          <span>Characters: <span className="font-semibold text-surface-900">{code.length}</span></span>
          <span>Language: <span className="font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">C++</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
          <span className="font-medium bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">Qubic SDK Ready</span>
        </div>
      </div>
    </div>
  )
}
