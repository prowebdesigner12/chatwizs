import React from 'react';
import { Plus, BarChart3, MessageSquare, Zap, Image as ImageIcon, MoreVertical } from 'lucide-react';

export const AdsManagerView = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ads Manager</h2>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
          Connect Account
        </button>
        <button className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
          <Plus className="w-5 h-5" /> New Ad Campaign
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { label: "Total Spend", value: "$4,250.00", icon: <BarChart3 className="w-5 h-5" /> },
        { label: "Conversations", value: "1,240", icon: <MessageSquare className="w-5 h-5" /> },
        { label: "Cost per Conv.", value: "$3.42", icon: <Zap className="w-5 h-5" /> }
      ].map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-lg">{stat.icon}</div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
        </div>
      ))}
    </div>

    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Campaign Name</th>
            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Reach</th>
            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Spend</th>
            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Results</th>
            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {[
            { name: "Lead Gen - Q1", status: "Active", reach: "125k", spend: "$1,200", results: "450 chats" },
            { name: "Retargeting - Visitors", status: "Active", reach: "45k", spend: "$850", results: "280 chats" },
            { name: "Brand Awareness", status: "Paused", reach: "250k", spend: "$2,200", results: "120 chats" }
          ].map((ad, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{ad.name}</span>
                </div>
              </td>
              <td className="p-4">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${ad.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                  {ad.status}
                </span>
              </td>
              <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{ad.reach}</td>
              <td className="p-4 text-sm text-slate-900 dark:text-white font-bold">{ad.spend}</td>
              <td className="p-4 text-sm text-indigo-600 dark:text-indigo-400 font-bold">{ad.results}</td>
              <td className="p-4">
                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"><MoreVertical className="w-4 h-4 text-slate-400" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
);
