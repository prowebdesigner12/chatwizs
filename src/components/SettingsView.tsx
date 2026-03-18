import React, { useState } from 'react';
import { Zap, Bell, MessageSquare, CheckSquare, BarChart3, Shield, Sun, Moon, Users } from 'lucide-react';
import { User } from 'firebase/auth';

export const SettingsView = ({ 
  user, 
  isDarkMode, 
  setIsDarkMode 
}: { 
  user: User; 
  isDarkMode: boolean; 
  setIsDarkMode: (dark: boolean) => void 
}) => {
  const [preferences, setPreferences] = useState({
    newMessage: true,
    templateStatus: true,
    campaignPerformance: false,
    securityAlerts: true,
    marketingEmails: false
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and notification settings.</p>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            Appearance
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Customize how ChatWizs looks for you.</p>
        </div>
        <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">Switch between light and dark themes.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            Notification Preferences
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose what updates you want to receive.</p>
        </div>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {[
            { id: 'newMessage', label: 'New Message Alerts', desc: 'Get notified when a customer sends you a new message.', icon: <MessageSquare className="w-5 h-5" /> },
            { id: 'templateStatus', label: 'Template Approval Updates', desc: 'Receive alerts when your message templates are approved or rejected.', icon: <CheckSquare className="w-5 h-5" /> },
            { id: 'campaignPerformance', label: 'Campaign Performance Reports', desc: 'Weekly summaries of your bulk messaging and ad campaign results.', icon: <BarChart3 className="w-5 h-5" /> },
            { id: 'securityAlerts', label: 'Security Alerts', desc: 'Important notifications about your account security and login activity.', icon: <Shield className="w-5 h-5" /> }
          ].map((item) => (
            <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">{item.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => togglePreference(item.id as keyof typeof preferences)}
                className={`w-12 h-6 rounded-full transition-all relative ${preferences[item.id as keyof typeof preferences] ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences[item.id as keyof typeof preferences] ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
          <button className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Cancel</button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">
            Save Preferences
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Account Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
            <input type="text" defaultValue="Prashant Bagriya" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
            <input type="email" defaultValue="prashant@chatwizs.com" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
