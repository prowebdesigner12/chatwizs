import React from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight, MessageSquare, Send, BarChart3, CheckSquare, Shield } from 'lucide-react';
import { Navbar } from './Navbar';
import { loginAnonymously } from '../firebase';

export const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <Navbar onNavigate={(page) => page === 'dashboard' && onStart()} />
    
    {/* Hero Section */}
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
            The Future of Business Messaging
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Scale your conversations <br />
            <span className="text-indigo-600">without the chaos.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            ChatWizs helps businesses manage thousands of conversations, automate bulk messaging, and optimize ads—all from one powerful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-200 dark:shadow-none"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={async () => {
                try {
                  await loginAnonymously();
                } catch (e) {
                  onStart();
                }
              }}
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              Quick Bypass (Demo)
            </button>
          </div>
        </motion.div>

        {/* Hero Image / Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent z-10" />
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden max-w-5xl mx-auto">
            <img 
              src="https://picsum.photos/seed/dashboard/1200/800" 
              alt="Dashboard Preview" 
              className="w-full h-auto opacity-90"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features Grid */}
    <section id="features" className="py-24 bg-white dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to grow</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Powerful tools designed for teams that want to move fast and stay organized.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <MessageSquare className="w-6 h-6" />, title: "Unified Inbox", desc: "Manage all your customer chats from different channels in one place." },
            { icon: <Send className="w-6 h-6" />, title: "Bulk Messaging", desc: "Reach thousands of customers instantly with personalized campaigns." },
            { icon: <BarChart3 className="w-6 h-6" />, title: "Ads Manager", desc: "Create and track high-converting messaging ads with ease." },
            { icon: <CheckSquare className="w-6 h-6" />, title: "Template Approval", desc: "Streamline your message templates with built-in approval workflows." },
            { icon: <Zap className="w-6 h-6" />, title: "Smart Automation", desc: "Automate repetitive tasks and focus on building relationships." },
            { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security", desc: "Your data is protected with bank-grade encryption and compliance." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-all group">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-slate-900 text-slate-400 py-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-indigo-400 w-6 h-6" />
            <span className="text-2xl font-bold text-white">ChatWizs</span>
          </div>
          <p className="max-w-sm mb-8">
            Empowering businesses to communicate better, faster, and smarter. Join 10,000+ companies growing with ChatWizs.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-800 text-sm text-center">
        © 2026 ChatWizs Inc. All rights reserved.
      </div>
    </footer>
  </div>
);
