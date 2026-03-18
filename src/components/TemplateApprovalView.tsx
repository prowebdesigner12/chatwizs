import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const TemplateApprovalView = ({ 
  onUseTemplate 
}: { 
  onUseTemplate: (name: string, content: string) => void 
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const templates = [
    { name: "Welcome Message", status: "Approved", category: "Utility", lastUpdated: "2h ago", content: "Hello! Welcome to our service. We're glad to have you here." },
    { name: "Order Confirmation", status: "Pending", category: "Transactional", lastUpdated: "5h ago", content: "Your order #12345 has been confirmed and will be shipped soon." },
    { name: "Promotional Offer", status: "Rejected", category: "Marketing", lastUpdated: "1d ago", content: "Get 50% off on all items! Use code SAVE50 at checkout." },
    { name: "Appointment Reminder", status: "Approved", category: "Utility", lastUpdated: "2d ago", content: "Reminder: You have an appointment tomorrow at 10:00 AM." },
    { name: "Feedback Request", status: "Pending", category: "Marketing", lastUpdated: "3d ago", content: "How was your experience? Please let us know by clicking here." }
  ];

  const categories = ['All', 'Marketing', 'Transactional', 'Utility'];
  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Template Approval</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage and categorize your message templates</p>
        </div>
        <button className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
          <Plus className="w-5 h-5" /> New Template
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-full overflow-x-auto sm:w-fit no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === cat 
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((t, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${
                t.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 
                t.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' : 
                'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
              }`}>
                {t.status === 'Approved' ? <CheckCircle2 className="w-6 h-6" /> : 
                 t.status === 'Pending' ? <Clock className="w-6 h-6" /> : 
                 <AlertCircle className="w-6 h-6" />}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.category}</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Last updated {t.lastUpdated}</p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onUseTemplate(t.name, t.content)}
                className="w-full py-2 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
              >
                Use in Campaign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
