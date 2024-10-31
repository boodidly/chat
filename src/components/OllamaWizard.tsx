import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useColor } from '../contexts/ColorContext';
import { checkOllamaConnection, getModelInfo } from '../services/ollama';

interface OllamaWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OllamaWizard({ isOpen, onClose }: OllamaWizardProps) {
  const { accentColor } = useColor();
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [modelInfo, setModelInfo] = useState<{ name: string; size: string } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function checkConnection() {
      try {
        const isConnected = await checkOllamaConnection();
        if (isConnected) {
          const info = await getModelInfo();
          setModelInfo(info);
          setStatus('connected');
        } else {
          setStatus('error');
          setError('Could not connect to Ollama service');
        }
      } catch (err) {
        setStatus('error');
        setError('Failed to connect to Ollama');
      }
    }

    if (isOpen) {
      checkConnection();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-xl w-full max-w-md p-6 m-4">
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-6 h-6" style={{ color: accentColor }} />
          <h2 className="text-xl font-semibold text-white">Ollama Connection</h2>
        </div>

        <div className="space-y-4">
          {status === 'checking' && (
            <div className="flex items-center gap-3 text-white">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Checking Ollama connection...</span>
            </div>
          )}

          {status === 'connected' && (
            <>
              <div className="flex items-center gap-3 text-green-500">
                <CheckCircle className="w-5 h-5" />
                <span>Connected to Ollama</span>
              </div>
              {modelInfo && (
                <div className="bg-[#0D0D0D] rounded-lg p-4 text-sm text-white">
                  <p>Model: {modelInfo.name}</p>
                  <p>Size: {modelInfo.size}</p>
                </div>
              )}
            </>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-red-500">
                <XCircle className="w-5 h-5" />
                <span>Connection Error</span>
              </div>
              <div className="bg-[#0D0D0D] rounded-lg p-4 text-sm text-white">
                <p>{error}</p>
                <p className="mt-2 text-[#666666]">Make sure Ollama is running:</p>
                <code className="block mt-2 bg-black p-2 rounded">
                  systemctl --user start ollama
                </code>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-white transition-all"
            style={{ backgroundColor: accentColor }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}