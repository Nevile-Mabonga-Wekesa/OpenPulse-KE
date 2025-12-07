import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { AlertTriangle, TrendingUp, Users, MessageSquare } from 'lucide-react';

const dataVolume = [
  { time: '08:00', volume: 1200 },
  { time: '10:00', volume: 2100 },
  { time: '12:00', volume: 1800 },
  { time: '14:00', volume: 4500 },
  { time: '16:00', volume: 3200 },
  { time: '18:00', volume: 5600 },
  { time: '20:00', volume: 4100 },
];

const sentimentData = [
  { name: 'Positive', value: 35, color: '#22c55e' },
  { name: 'Neutral', value: 25, color: '#94a3b8' },
  { name: 'Negative', value: 20, color: '#eab308' },
  { name: 'Volatile', value: 20, color: '#ef4444' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume (24h)', value: '145.2K', change: '+12%', icon: MessageSquare, color: 'text-blue-500' },
          { label: 'Potential Risks', value: '24', change: '+2', icon: AlertTriangle, color: 'text-red-500' },
          { label: 'Active Users', value: '1,204', change: '+5%', icon: Users, color: 'text-green-500' },
          { label: 'Trending Topics', value: '8', change: 'Stable', icon: TrendingUp, color: 'text-purple-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                <Icon className={stat.color} size={20} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">
                <span className="text-green-400">{stat.change}</span> from last hour
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Conversation Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataVolume}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Chart */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Sentiment Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Emerging Narratives</h3>
        <div className="space-y-4">
          {[
            { topic: 'Voting Machine Delays', volume: 'High', sentiment: 'Negative', location: 'Kisumu, Mombasa' },
            { topic: 'Peaceful Queues', volume: 'Medium', sentiment: 'Positive', location: 'Nairobi, Eldoret' },
            { topic: 'Fake Results Leaked', volume: 'Critical', sentiment: 'Volatile', location: 'Online (Twitter)' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <div>
                <p className="font-semibold text-slate-200">{item.topic}</p>
                <p className="text-sm text-slate-500">Detected in: {item.location}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-1 ${
                  item.volume === 'Critical' ? 'bg-red-500/10 text-red-500' : 
                  item.volume === 'High' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {item.volume} Volume
                </span>
                <p className={`text-xs ${
                  item.sentiment === 'Volatile' ? 'text-red-400' : 
                  item.sentiment === 'Negative' ? 'text-yellow-400' : 'text-green-400'
                }`}>{item.sentiment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
