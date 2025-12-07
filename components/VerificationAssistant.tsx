import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { verifyClaim, isApiKeyAvailable } from '../services/geminiService';
import { VerificationResult } from '../types';

const VerificationAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    if (!isApiKeyAvailable()) {
      alert("API Key required. This feature uses Gemini Search Grounding.");
      return;
    }

    setLoading(true);
    setResult(null);

    const data = await verifyClaim(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">Verification Assistant</h2>
        <p className="text-slate-400">Cross-reference claims with verified official sources and real-time data.</p>
      </div>

      <form onSubmit={handleVerify} className="mb-10 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Paste a claim or link to verify (e.g., 'Polling stations in Kisumu are closed due to rain')"
          className="w-full bg-slate-800 border border-slate-700 text-white p-4 pl-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-lg text-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={24} />
        <button
          type="submit"
          disabled={loading || !query}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
          Verify
        </button>
      </form>

      {result && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`p-6 border-b border-slate-700 flex items-center space-x-4 ${
            result.verdict === 'True' ? 'bg-green-500/10' :
            result.verdict === 'False' ? 'bg-red-500/10' :
            'bg-yellow-500/10'
          }`}>
            {result.verdict === 'True' && <CheckCircle className="text-green-500" size={32} />}
            {result.verdict === 'False' && <XCircle className="text-red-500" size={32} />}
            {(result.verdict === 'Misleading' || result.verdict === 'Unverified') && <AlertTriangle className="text-yellow-500" size={32} />}
            
            <div>
              <h3 className="text-xl font-bold text-white">Verdict: {result.verdict}</h3>
              <p className="text-slate-400 text-sm">Confidence Score: {result.confidence}%</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Analysis</h4>
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{result.explanation}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Sources & References</h4>
              {result.sources.length > 0 ? (
                <div className="grid gap-3">
                  {result.sources.map((source, idx) => (
                    <a 
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-700 hover:border-blue-500 transition-colors group"
                    >
                      <span className="text-slate-300 group-hover:text-blue-400 truncate pr-4">{source.title}</span>
                      <ExternalLink size={16} className="text-slate-600 group-hover:text-blue-500 shrink-0" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No direct web sources found. Verification based on internal model knowledge.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationAssistant;
