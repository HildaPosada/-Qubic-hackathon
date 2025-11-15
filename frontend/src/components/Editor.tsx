import React, { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Play, Save, FileCode } from 'lucide-react'
import toast from 'react-hot-toast'

interface EditorProps {
  code: string
  setCode: (code: string) => void
  setSecurityScore: (score: number | null) => void
}

export default function Editor({ code, setCode, setSecurityScore }: EditorProps) {
  const [isCompiling, setIsCompiling] = useState(false)

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
        toast.success('✅ Compilation successful!')
      } else {
        toast.error('❌ Compilation failed')
      }
    } catch (error) {
      toast.error('Error compiling contract')
    } finally {
      setIsCompiling(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileCode size={20} className="text-gray-400" />
          <span className="text-sm font-medium">contract.cpp</span>
          <span className="text-xs text-gray-500">C++</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="btn btn-secondary text-sm flex items-center space-x-2"
          >
            <Play size={16} />
            <span>{isCompiling ? 'Compiling...' : 'Compile'}</span>
          </button>

          <button className="btn btn-secondary text-sm flex items-center space-x-2">
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <MonacoEditor
          height="100%"
          language="cpp"
          theme="vs-dark"
          value={code || defaultCode}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80],
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 text-xs text-gray-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>Lines: {code.split('\n').length}</span>
            <span>Characters: {code.length}</span>
            <span>Language: C++</span>
          </div>
          <div>
            <span className="text-qubic-400">Qubic SDK Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}
