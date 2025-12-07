import React, { useState, useEffect, useRef } from 'react';
import { SocialPost, Platform } from '../types';
import { MOCK_POSTS } from '../constants';
import { Play, Pause, RefreshCw, AlertOctagon, CheckCircle, Search } from 'lucide-react';
import { analyzeContent, isApiKeyAvailable } from '../services/geminiService';

const FeedMonitor: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>(MOCK_POSTS);
  const [isLive, setIsLive] = useState(true);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  
  // Ref to handle intervals
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLive) {
      intervalRef.current = setInterval(() => {
        // Simulate new post arrival by shuffling/modifying a mock post
        const randomBase = MOCK_POSTS[Math.floor(Math.random() * MOCK_POSTS.length)];
        const newPost: SocialPost = {
          ...randomBase,
          id: Date.now().toString(),
          timestamp: new Date(),
          likes: Math.floor(Math.random() * 500),
          riskScore: Math.floor(Math.random() * 30), // Default low risk until analyzed
        };
        setPosts(prev => [newPost, ...prev].slice(0, 50)); // Keep last 50
      }, 3500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive]);

  const handleAnalyze = async (post: SocialPost) => {
    if (!isApiKeyAvailable()) {
      alert("Please configure API_KEY in environment to use AI analysis.");
      return;
    }
    
    setAnalyzingId(post.id);
    const result = await analyzeContent(post.content);
    
    setPosts(prev => prev.map(p => {
      if (p.id === post.id) {
        return {
          ...p,
          sentiment: result.sentiment,
          riskScore: result.riskScore,
          isMisinfo: result.riskScore > 80 // Simple threshold for demo
        };
      }
      return p;
    }));
    setAnalyzingId(null);
  };

  const getPlatformColor = (p: Platform) => {
    switch (p) {
      case Platform.Twitter: return 'text-sky-400';
      case Platform.Facebook: return 'text-blue-600';
      case Platform.TikTok: return 'text-pink-500';
      case Platform.WhatsApp: return 'text-green-500';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div>
          <h2 className="text-xl font-bold text-white">Live Monitor</h2>
          <p className="text-slate-400 text-sm">Real-time stream across 4 platforms</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
          >
            {isLive ? <><Pause size={16} className="mr-2"/> Pause Stream</> : <><Play size={16} className="mr-2"/> Resume Stream</>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`font-bold text-sm ${getPlatformColor(post.platform)}`}>{post.platform}</span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="font-medium text-slate-300 text-sm">{post.author}</span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-slate-500 text-xs">{post.timestamp.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                 <div className={`px-2 py-0.5 rounded text-xs font-bold ${
                   post.riskScore > 70 ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
                 }`}>
                   Risk: {post.riskScore}
                 </div>
              </div>
            </div>
            
            <p className="text-slate-200 mb-3">{post.content}</p>
            
            <div className="flex items-center justify-between border-t border-slate-700/50 pt-3">
              <div className="text-xs text-slate-500 flex space-x-4">
                <span>{post.likes} Likes</span>
                <span>{post.shares} Shares</span>
                <span className="text-slate-400">Region: {post.region}</span>
              </div>
              
              <div className="flex space-x-2">
                 {post.isMisinfo && (
                   <span className="flex items-center text-red-400 text-xs font-bold mr-2">
                     <AlertOctagon size={14} className="mr-1" /> Flagged
                   </span>
                 )}
                 <button 
                   onClick={() => handleAnalyze(post)}
                   disabled={analyzingId === post.id}
                   className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center transition-colors disabled:opacity-50"
                 >
                   {analyzingId === post.id ? (
                     <RefreshCw size={14} className="animate-spin mr-1" />
                   ) : (
                     <Search size={14} className="mr-1" />
                   )}
                   Analyze AI
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedMonitor;