import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const CampaignAnalytics = () => {
  const data = [
    { name: 'Mon', open: 4000, click: 2400, conv: 2400 },
    { name: 'Tue', open: 3000, click: 1398, conv: 2210 },
    { name: 'Wed', open: 2000, click: 9800, conv: 2290 },
    { name: 'Thu', open: 2780, click: 3908, conv: 2000 },
    { name: 'Fri', open: 1890, click: 4800, conv: 2181 },
    { name: 'Sat', open: 2390, click: 3800, conv: 2500 },
    { name: 'Sun', open: 3490, click: 4300, conv: 2100 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Rate', value: '78.4%', trend: '+2.4%', color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Click Rate', value: '12.2%', trend: '+0.8%', color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Conversion', value: '4.5%', trend: '+1.2%', color: 'text-violet-600 dark:text-violet-400' },
          { label: 'Unsubscribe', value: '0.2%', trend: '-0.1%', color: 'text-rose-600 dark:text-rose-400' },
        ].map((stat, i) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h4 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h4>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                stat.trend.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
              }`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">Performance Over Time</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-600" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Opens</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Clicks</span>
            </div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClick" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                }}
              />
              <Area type="monotone" dataKey="open" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorOpen)" />
              <Area type="monotone" dataKey="click" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorClick)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
