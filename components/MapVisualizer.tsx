import React, { useMemo } from 'react';
import { REGIONS_COORDINATES } from '../constants';
import { Region } from '../types';

// Mock data generator for heatmap
const generateHeatmapData = () => {
  return Object.keys(REGIONS_COORDINATES).map(key => {
    const region = key as Region;
    return {
      region,
      coords: REGIONS_COORDINATES[region],
      intensity: Math.random() * 100, // 0-100
      count: Math.floor(Math.random() * 5000)
    };
  });
};

const MapVisualizer: React.FC = () => {
  const data = useMemo(() => generateHeatmapData(), []);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-6 relative overflow-hidden flex flex-col">
        <div className="absolute top-4 left-6 z-10">
          <h2 className="text-xl font-bold text-white">Geo-Conversation Heatmap</h2>
          <p className="text-slate-400 text-sm">Real-time volume intensity by region</p>
        </div>

        <div className="flex-1 relative mt-8 flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800">
          {/* Abstract Map Representation */}
          <div className="relative w-full max-w-md aspect-[3/4]">
            {/* Outline Placeholder for Kenya (Stylized) */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl opacity-30">
               <path d="M20,50 Q40,20 60,10 T90,40 T80,80 T40,90 T10,60 Z" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
            </svg>

            {/* Heatmap Points */}
            {data.map((item) => (
              <div
                key={item.region}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                style={{ left: `${item.coords.x}%`, top: `${item.coords.y}%` }}
              >
                <div className="relative">
                  <div 
                    className={`rounded-full ${
                      item.intensity > 80 ? 'bg-red-500' : 
                      item.intensity > 50 ? 'bg-orange-500' : 'bg-blue-500'
                    } blur-md absolute inset-0 opacity-40 animate-pulse`} 
                    style={{ width: `${item.intensity * 0.8}px`, height: `${item.intensity * 0.8}px`, transform: 'translate(-25%, -25%)' }}
                  />
                  <div 
                    className={`w-4 h-4 rounded-full border-2 border-slate-900 ${
                       item.intensity > 80 ? 'bg-red-500' : 
                       item.intensity > 50 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}
                  />
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 p-2 rounded shadow-xl z-20 pointer-events-none w-32 text-center">
                  <p className="font-bold text-white text-sm">{item.region}</p>
                  <p className="text-xs text-slate-400">{item.count} conversations</p>
                  <p className={`text-xs font-bold ${
                    item.intensity > 80 ? 'text-red-400' : 'text-blue-400'
                  }`}>{item.intensity > 80 ? 'High Activity' : 'Normal'}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 right-4 bg-slate-900/80 p-3 rounded-lg border border-slate-700 backdrop-blur text-xs text-slate-300">
            <div className="flex items-center mb-1"><div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div> Critical Surge</div>
            <div className="flex items-center mb-1"><div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div> High Volume</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div> Normal</div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Regional Insights</h3>
        <div className="space-y-4">
          {data.sort((a,b) => b.intensity - a.intensity).slice(0, 5).map((item, idx) => (
             <div key={idx} className="border-b border-slate-700/50 last:border-0 pb-3 last:pb-0">
               <div className="flex justify-between items-center mb-1">
                 <span className="font-medium text-slate-200">{item.region}</span>
                 <span className="text-xs text-slate-500">{item.count} posts/hr</span>
               </div>
               <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                 <div 
                   className={`h-full rounded-full ${
                     item.intensity > 80 ? 'bg-red-500' : 
                     item.intensity > 50 ? 'bg-orange-500' : 'bg-blue-500'
                   }`} 
                   style={{ width: `${item.intensity}%` }}
                 />
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapVisualizer;
