import React from 'react';
import { Users, Hash, Shield, MessageCircle } from 'lucide-react';

const CollaborationHub: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
      {/* Channels Sidebar */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h3 className="font-bold text-white flex items-center">
            <Users size={18} className="mr-2 text-blue-400" />
            Teams
          </h3>
        </div>
        <div className="p-2 space-y-1 flex-1 overflow-y-auto">
          {['General Ops', 'Fact Checkers', 'Legal Team', 'Field Monitors', 'Tech Support'].map((team, i) => (
            <button key={i} className={`w-full text-left px-3 py-2 rounded flex items-center ${i === 1 ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}>
              <Hash size={16} className="mr-2 opacity-50" />
              {team}
              {i === 1 && <span className="ml-auto bg-blue-600 text-xs px-1.5 py-0.5 rounded-full text-white">3</span>}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-700 bg-slate-900/50">
          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Active Incidents</p>
          <div className="space-y-2">
            <div className="flex items-center text-xs text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
              #INC-402: Kisumu Voting
            </div>
            <div className="flex items-center text-xs text-orange-400">
               <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
               #INC-403: Bot Network B
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-3 bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
        <div className="h-16 border-b border-slate-700 flex items-center px-6 justify-between bg-slate-800">
          <div>
             <h3 className="font-bold text-white">#fact-checkers</h3>
             <p className="text-xs text-slate-400">Coordinating verification of viral claims</p>
          </div>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-800 flex items-center justify-center text-xs text-white">U{i}</div>
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs text-slate-400">+5</div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-900/30">
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white shrink-0">JD</div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-white">Jane Doe</span>
                <span className="text-xs text-slate-500">10:42 AM</span>
              </div>
              <p className="text-slate-300 mt-1">Can someone verify the video circulating about the polling station in Nakuru? The shadows look inconsistent with the time of day.</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">AI</div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-white">OpenPulse Bot</span>
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded ml-2">System</span>
                <span className="text-xs text-slate-500">10:43 AM</span>
              </div>
              <div className="mt-2 bg-slate-800 border border-slate-700 rounded p-3 text-sm">
                <div className="flex items-center text-yellow-400 font-bold mb-1">
                  <Shield size={16} className="mr-1" /> Potential Misinformation Flagged
                </div>
                <p className="text-slate-300">Analysis of video metadata suggests 85% probability of manipulation. Origin tracked to known bot cluster.</p>
                <div className="mt-2 flex space-x-2">
                   <button className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded">View Analysis</button>
                   <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">Add to Report</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-white shrink-0">MK</div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-white">Mark K.</span>
                <span className="text-xs text-slate-500">10:45 AM</span>
              </div>
              <p className="text-slate-300 mt-1">On it. Cross-referencing with our field team in Nakuru now. Will update in 5 mins.</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800">
           <div className="relative">
             <input 
               type="text" 
               placeholder="Type a message..." 
               className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 pr-12"
             />
             <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400">
               <MessageCircle size={20} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationHub;
