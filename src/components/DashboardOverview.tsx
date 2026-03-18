import React from 'react';
import { MessageSquare, Send, BarChart3, CheckSquare } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const DashboardOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Messages", value: "128.4k", change: "+12%", icon: <MessageSquare className="w-5 h-5" /> },
        { label: "Active Campaigns", value: "24", change: "+4", icon: <Send className="w-5 h-5" /> },
        { label: "Ad Spend", value: "$12,450", change: "-2%", icon: <BarChart3 className="w-5 h-5" /> },
        { label: "Pending Templates", value: "8", change: "Action required", icon: <CheckSquare className="w-5 h-5" /> }
      ].map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">{stat.icon}</div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
              {stat.change}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">Messaging Activity</h3>
          <select className="text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white rounded-lg px-2 py-1">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Mon', value: 40 },
              { name: 'Tue', value: 70 },
              { name: 'Wed', value: 45 },
              { name: 'Thu', value: 90 },
              { name: 'Fri', value: 65 },
              { name: 'Sat', value: 80 },
              { name: 'Sun', value: 55 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Recent Campaigns</h3>
        <div className="space-y-4">
          {[
            { name: "Summer Sale", status: "Active", reach: "45k" },
            { name: "Product Launch", status: "Scheduled", reach: "12k" },
            { name: "Feedback Loop", status: "Completed", reach: "8.2k" }
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <div>
                <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                <p className="text-xs text-slate-500">{c.reach} recipients</p>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${c.status === 'Active' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
          View All Campaigns
        </button>
      </div>
    </div>
  </div>
);
