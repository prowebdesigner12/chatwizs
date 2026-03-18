/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  BarChart3, 
  CheckSquare, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronRight,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  ArrowLeft,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Image as ImageIcon,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  FileSpreadsheet,
  Upload,
  Smile,
  Save,
  BookOpen,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

// --- Types ---
type Page = 'landing' | 'dashboard';
type UserRole = 'admin' | 'manager' | 'user';
type DashboardTab = 'overview' | 'inbox' | 'bulk' | 'ads' | 'templates' | 'settings' | 'users';

// --- Components ---

const Navbar = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              ChatWizs
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors font-medium">Features</a>
            <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors font-medium">Pricing</a>
            <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors font-medium">About</a>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button & Quick Launch */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all"
            >
              Launch
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#features" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600">
                Features <ChevronRight className="w-5 h-5 text-slate-300" />
              </a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600">
                Pricing <ChevronRight className="w-5 h-5 text-slate-300" />
              </a>
              <a href="#about" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600">
                About <ChevronRight className="w-5 h-5 text-slate-300" />
              </a>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => {
                    onNavigate('dashboard');
                    setIsOpen(false);
                  }}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2"
                >
                  Launch Dashboard <Zap className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LandingPage = ({ onStart }: { onStart: () => void }) => (
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
            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              Book a Demo
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

// --- Dashboard Views ---

const DashboardOverview = () => (
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

const InboxView = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alex Johnson', text: "Hey, I have a question about the new pricing plans. Can you help me out?", time: "2026-03-16T10:42:00", isMe: false, reactions: [] as string[] },
    { id: 2, sender: 'Me', text: "Hi Alex! Of course, I'd be happy to help. Which plan are you currently looking at?", time: "2026-03-16T10:45:00", isMe: true, reactions: [] as string[] },
    { id: 3, sender: 'Alex Johnson', text: "I'm looking at the Pro plan. Does it include automated bulk messaging?", time: "2026-03-16T11:05:00", isMe: false, reactions: [] as string[] },
    { id: 4, sender: 'Me', text: "Yes, the Pro plan includes up to 50k automated messages per month.", time: "2026-03-16T11:10:00", isMe: true, reactions: [] as string[] },
    { id: 5, sender: 'Alex Johnson', text: "That sounds perfect. What about the API access?", time: "2026-03-17T09:15:00", isMe: false, reactions: [] as string[] }
  ]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [senderFilter, setSenderFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  const addReaction = (messageId: number, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const newReactions = msg.reactions.includes(emoji) 
          ? msg.reactions.filter(r => r !== emoji)
          : [...msg.reactions, emoji];
        return { ...msg, reactions: newReactions };
      }
      return msg;
    }));
    setShowEmojiPicker(null);
  };

  const filteredMessages = messages.filter(msg => {
    const matchesQuery = msg.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSender = senderFilter === 'All' || (senderFilter === 'Me' ? msg.isMe : !msg.isMe);
    
    const msgDate = new Date(msg.time);
    const matchesStart = !startDate || msgDate >= new Date(startDate);
    const matchesEnd = !endDate || msgDate <= new Date(endDate + 'T23:59:59');

    return matchesQuery && matchesSender && matchesStart && matchesEnd;
  });

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const [selectedChat, setSelectedChat] = useState<any>(null);

  const chats = [
    { id: 1, name: "Alex Johnson", msg: "Hey, I have a question about...", time: "2m", unread: true },
    { id: 2, name: "Sarah Williams", msg: "Thanks for the quick response!", time: "15m", unread: false },
    { id: 3, name: "Mike Ross", msg: "Can we schedule a call for tomorrow?", time: "1h", unread: false },
    { id: 4, name: "Jessica Pearson", msg: "The new update looks amazing.", time: "3h", unread: false },
    { id: 5, name: "Harvey Specter", msg: "I need to discuss the contract.", time: "5h", unread: true },
    { id: 6, name: "Donna Paulsen", msg: "Everything is ready for the launch.", time: "1d", unread: false }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] relative">
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-slate-200 dark:border-slate-700 flex-col absolute inset-0 md:relative z-10 bg-white dark:bg-slate-800`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, i) => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${selectedChat?.id === chat.id ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-indigo-600' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{chat.name}</h4>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {chat.msg}
                </p>
              </div>
              {chat.unread && <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />}
            </div>
          ))}
        </div>
      </div>
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-slate-50/30 dark:bg-slate-900/30`}>
        {selectedChat ? (
          <>
            <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 md:hidden"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{selectedChat.name}</h4>
                    <p className="text-xs text-emerald-500 font-medium">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <button 
                    onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                    className={`p-2 rounded-lg transition-colors ${isSearchExpanded ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'}`}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hidden sm:block"><Bell className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400"><MoreVertical className="w-5 h-5" /></button>
                </div>
              </div>

          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-4 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search messages..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Sender</label>
                      <select 
                        value={senderFilter}
                        onChange={(e) => setSenderFilter(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 dark:text-white"
                      >
                        <option value="All">All Senders</option>
                        <option value="Me">Me</option>
                        <option value="Alex Johnson">Alex Johnson</option>
                      </select>
                    </div>
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">From Date</label>
                      <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 dark:text-white"
                      />
                    </div>
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">To Date</label>
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 dark:text-white"
                      />
                    </div>
                  </div>
                  {(searchQuery || senderFilter !== 'All' || startDate || endDate) && (
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Found <span className="font-bold text-indigo-600 dark:text-indigo-400">{filteredMessages.length}</span> results
                      </p>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSenderFilter('All');
                          setStartDate('');
                          setEndDate('');
                        }}
                        className="text-xs font-bold text-rose-500 hover:text-rose-600 uppercase tracking-widest"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 p-6 space-y-8 overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
              <Search className="w-12 h-12 opacity-20" />
              <p className="text-sm font-medium">No messages match your search</p>
            </div>
          ) : (
            filteredMessages.map((msg, idx) => {
              const prevMsg = filteredMessages[idx - 1];
              const showDate = !prevMsg || formatDate(prevMsg.time) !== formatDate(msg.time);

              return (
                <div key={msg.id} className="space-y-8">
                  {showDate && (
                    <div className="flex justify-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
                        {formatDate(msg.time)}
                      </span>
                    </div>
                  )}
                  <div className={`flex gap-3 max-w-md ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                    {!msg.isMe && <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />}
                    {msg.isMe && <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0" />}
                    
                    <div className="relative group">
                      <div className={`p-4 rounded-2xl shadow-sm border ${
                        msg.isMe 
                        ? 'bg-indigo-600 border-indigo-500 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-none'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <span className={`text-[10px] mt-2 block ${msg.isMe ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'}`}>
                          {formatTime(msg.time)}
                        </span>
                      </div>

                      {/* Reactions Display */}
                      {msg.reactions.length > 0 && (
                        <div className={`absolute -bottom-3 flex gap-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full px-2 py-0.5 shadow-sm z-10 ${msg.isMe ? 'right-0' : 'left-0'}`}>
                          {msg.reactions.map((emoji, idx) => (
                            <span key={idx} className="text-xs">{emoji}</span>
                          ))}
                        </div>
                      )}

                      {/* Emoji Picker Trigger */}
                      <button 
                        onClick={() => setShowEmojiPicker(showEmojiPicker === msg.id ? null : msg.id)}
                        className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm text-slate-400 hover:text-indigo-600 z-20 ${
                          msg.isMe ? '-left-10' : '-right-10'
                        }`}
                      >
                        <Smile className="w-4 h-4" />
                      </button>

                      {/* Emoji Picker Popover */}
                      <AnimatePresence>
                        {showEmojiPicker === msg.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className={`absolute bottom-full mb-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl flex gap-2 z-30 ${
                              msg.isMe ? 'right-0' : 'left-0'
                            }`}
                          >
                            {emojis.map(emoji => (
                              <button 
                                key={emoji}
                                onClick={() => addReaction(msg.id, emoji)}
                                className="hover:scale-125 transition-transform p-1"
                              >
                                {emoji}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400"><Plus className="w-6 h-6" /></button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 border-none bg-slate-50 dark:bg-slate-900 rounded-xl px-4 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
            <button className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </>
    ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
          <MessageSquare className="w-12 h-12 opacity-20" />
          <p className="text-sm font-medium">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  </div>
);
};

const CampaignAnalytics = () => {
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

const BulkMessagingView = ({ 
  isModalOpen, 
  setIsModalOpen, 
  messageContent, 
  setMessageContent, 
  campaignName, 
  setCampaignName 
}: { 
  isModalOpen: boolean; 
  setIsModalOpen: (open: boolean) => void; 
  messageContent: string; 
  setMessageContent: (content: string) => void; 
  campaignName: string; 
  setCampaignName: (name: string) => void; 
}) => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; count: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [campaigns, setCampaigns] = useState([
    { name: "Holiday Special", sent: 12450, open: "84%", click: "12%", status: "Sending", date: "Today" },
    { name: "New Feature Announcement", sent: 8200, open: "92%", click: "24%", status: "Completed", date: "Yesterday" },
    { name: "Re-engagement Campaign", sent: 5400, open: "65%", click: "8%", status: "Paused", date: "2 days ago" },
    { name: "Welcome Series", sent: 1200, open: "98%", click: "45%", status: "Active", date: "3 days ago" },
    { name: "Spring Sale Launch", sent: 0, open: "0%", click: "0%", status: "Scheduled", date: "Mar 20, 10:00 AM" }
  ]);

  const [savedTemplates, setSavedTemplates] = useState([
    { id: 1, name: "Flash Sale Alert", content: "Don't miss out! Our 24-hour flash sale starts now. Use code FLASH20 for an extra 20% off!" },
    { id: 2, name: "Customer Feedback", content: "Hi {{name}}, we'd love to hear your thoughts on your recent purchase. Could you spare 2 minutes for a quick survey?" },
    { id: 3, name: "Event Invitation", content: "You're invited! Join us this Friday for our exclusive networking event. RSVP here: {{link}}" }
  ]);
  const [showTemplatesList, setShowTemplatesList] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock parsing: assume 1500 contacts for any uploaded file
      setUploadedFile({ name: file.name, count: 1500 });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      setUploadedFile({ name: file.name, count: 1500 });
    }
  };

  const handleCreateCampaign = () => {
    // In a real app, we'd validate and save. For demo, just close.
    setIsModalOpen(false);
    setIsScheduled(false);
    setScheduledDate('');
    setScheduledTime('');
    setMessageContent('');
    setCampaignName('');
    setIsPreviewVisible(false);
    setUploadedFile(null);
  };

  const handleSaveTemplate = () => {
    if (!messageContent.trim()) return;
    const name = campaignName || `Template ${savedTemplates.length + 1}`;
    const newTemplate = {
      id: Date.now(),
      name,
      content: messageContent
    };
    setSavedTemplates([newTemplate, ...savedTemplates]);
    alert(`Template "${name}" saved successfully!`);
  };

  const handleLoadTemplate = (content: string) => {
    setMessageContent(content);
    setShowTemplatesList(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bulk Messaging</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Create Campaign
        </button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <CampaignAnalytics />
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <h3 className="font-bold text-slate-900 dark:text-white">Active Campaigns</h3>
            <div className="flex gap-2">
              <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all"><Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" /></button>
              <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all"><Search className="w-4 h-4 text-slate-500 dark:text-slate-400" /></button>
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700 overflow-x-auto">
            <div className="min-w-[600px]">
              {campaigns.map((c, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      c.status === 'Sending' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                      c.status === 'Scheduled' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                      'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {c.status === 'Scheduled' ? <Clock className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {c.status === 'Scheduled' ? `Scheduled for ${c.date}` : `${c.sent.toLocaleString()} recipients`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 text-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Open Rate</p>
                      <p className="font-bold text-slate-900 dark:text-white">{c.open}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Click Rate</p>
                      <p className="font-bold text-slate-900 dark:text-white">{c.click}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    c.status === 'Sending' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 animate-pulse' : 
                    c.status === 'Scheduled' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Campaign Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 dark:text-slate-400">Total Sent (MTD)</span>
                <span className="font-bold text-slate-900 dark:text-white">45,200</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[65%]" />
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">65% of your monthly limit used</p>
            </div>
          </div>
          
          <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none text-white">
            <Zap className="w-8 h-8 mb-4 text-indigo-200" />
            <h3 className="font-bold text-lg mb-2">Automate your outreach</h3>
            <p className="text-indigo-100 text-sm mb-4">Set up triggers to send messages based on customer behavior.</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
              Explore Automations
            </button>
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Form Section */}
              <div className="flex-1 p-6 space-y-6 border-r border-slate-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Create New Campaign</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-slate-400 transition-colors md:hidden"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Campaign Name</label>
                    <input 
                      type="text" 
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g. Summer Sale Launch" 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recipients (Excel/CSV)</label>
                    {!uploadedFile ? (
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept=".xlsx,.csv"
                          className="hidden"
                        />
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-400">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Click or drag to upload</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Supports .xlsx and .csv files</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                            <FileSpreadsheet className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900 dark:text-emerald-100 text-sm">{uploadedFile.name}</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400">{uploadedFile.count.toLocaleString()} contacts found</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setUploadedFile(null)}
                          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 uppercase tracking-widest"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message Content</label>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setShowTemplatesList(!showTemplatesList)}
                          className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" /> {showTemplatesList ? 'Hide Templates' : 'Load Template'}
                        </button>
                        <button 
                          onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                          className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline"
                        >
                          {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
                        </button>
                      </div>
                    </div>

                    {showTemplatesList && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 mb-2"
                      >
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Saved Templates</p>
                        <div className="grid grid-cols-1 gap-2">
                          {savedTemplates.map(template => (
                            <button 
                              key={template.id}
                              onClick={() => handleLoadTemplate(template.content)}
                              className="text-left p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group"
                            >
                              <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">{template.name}</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{template.content}</p>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="relative">
                      <textarea 
                        rows={4}
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="Type your campaign message here..." 
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 resize-none dark:text-white"
                      />
                      <button 
                        onClick={handleSaveTemplate}
                        disabled={!messageContent.trim()}
                        className="absolute bottom-3 right-3 p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Save as reusable template"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${isScheduled ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'}`}>
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Schedule for later</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Pick a date and time to send</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsScheduled(!isScheduled)}
                      className={`w-12 h-6 rounded-full transition-all relative ${isScheduled ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isScheduled ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  {isScheduled && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</label>
                          <input 
                            type="date" 
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time</label>
                          <input 
                            type="time" 
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                          />
                        </div>
                      </div>
                      
                      {scheduledDate && scheduledTime && (
                        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                          <Clock className="w-5 h-5 text-indigo-600" />
                          <p className="text-sm text-indigo-900">
                            This campaign will be sent on <span className="font-bold">{new Date(scheduledDate).toLocaleDateString()}</span> at <span className="font-bold">{scheduledTime}</span>.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="pt-6 flex gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreateCampaign}
                    className="flex-[2] py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
                  >
                    {isScheduled ? 'Schedule Campaign' : 'Send Campaign Now'}
                  </button>
                </div>
              </div>

              {/* Preview Section */}
              <div className={`flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8 flex flex-col items-center justify-center relative ${isPreviewVisible ? 'fixed inset-0 z-[60] md:relative md:z-auto md:flex' : 'hidden md:flex'}`}>
                <button 
                  onClick={() => setIsPreviewVisible(false)}
                  className="absolute top-6 right-6 p-2 bg-white dark:bg-slate-800 rounded-xl text-slate-400 shadow-lg md:hidden"
                >
                  <X className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors hidden md:block"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                  <h4 className="font-bold text-slate-900 dark:text-white">Message Preview</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">How it looks on your customer's phone</p>
                </div>

                {/* Phone Mockup */}
                <div className="w-[280px] h-[560px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Status Bar */}
                  <div className="h-6 flex justify-between items-center px-6 pt-2">
                    <span className="text-[10px] text-white font-bold">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-white/20" />
                      <div className="w-3 h-3 rounded-full bg-white/20" />
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="bg-white/10 backdrop-blur-md p-4 flex items-center gap-3 border-b border-white/5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                      B
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white">Business Name</p>
                      <p className="text-[8px] text-white/60">Online</p>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-900">
                    <div className="flex justify-center">
                      <span className="text-[8px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full uppercase tracking-widest">Today</span>
                    </div>

                    <motion.div 
                      layout
                      className="max-w-[85%] bg-indigo-600 text-white p-3 rounded-2xl rounded-tl-none shadow-lg"
                    >
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">
                        {messageContent || "Your message will appear here..."}
                      </p>
                      <p className="text-[8px] text-white/60 text-right mt-1">9:41 AM</p>
                    </motion.div>
                  </div>

                  {/* Input Bar */}
                  <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2 items-center">
                    <div className="flex-1 h-8 bg-white/10 rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="h-6 flex justify-center items-end pb-2">
                    <div className="w-20 h-1 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdsManagerView = () => (
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

const TemplateApprovalView = ({ 
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
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Preview</button>
                <button className="flex-1 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">Edit</button>
              </div>
              {t.status === 'Approved' && (
                <button 
                  onClick={() => onUseTemplate(t.name, t.content)}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3 h-3" /> Send Bulk Message
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsView = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean; setIsDarkMode: (dark: boolean) => void }) => {
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

const UsersView = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h2>
      <button className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
        <Plus className="w-5 h-5" /> Add User
      </button>
    </div>

    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Last Active</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {[
              { name: "Prashant Bagriya", email: "prashant@chatwizs.com", role: "Admin", status: "Active", lastActive: "Just now" },
              { name: "Sarah Chen", email: "sarah@chatwizs.com", role: "Manager", status: "Active", lastActive: "2h ago" },
              { name: "Alex Rivera", email: "alex@chatwizs.com", role: "User", status: "Inactive", lastActive: "2d ago" },
              { name: "Emma Wilson", email: "emma@chatwizs.com", role: "User", status: "Active", lastActive: "5h ago" }
            ].map((user, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    user.role === 'Admin' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                    user.role === 'Manager' ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{user.lastActive}</td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize for mobile detection
  React.useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(prev => {
        if (prev !== isNowMobile) {
          setIsSidebarOpen(!isNowMobile);
        }
        return isNowMobile;
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to root
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Shared Bulk Messaging State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkMessageContent, setBulkMessageContent] = useState('');
  const [bulkCampaignName, setBulkCampaignName] = useState('');

  const handleUseTemplate = (templateName: string, content: string) => {
    setBulkCampaignName(`Campaign: ${templateName}`);
    setBulkMessageContent(content);
    setActiveTab('bulk');
    setIsBulkModalOpen(true);
  };

  // Define sidebar items based on role
  const sidebarItems = [
    { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview', roles: ['admin', 'manager'] },
    { id: 'inbox', icon: <MessageSquare className="w-5 h-5" />, label: 'Inbox', roles: ['admin', 'manager', 'user'] },
    { id: 'bulk', icon: <Send className="w-5 h-5" />, label: 'Bulk Messaging', roles: ['admin', 'manager'] },
    { id: 'ads', icon: <BarChart3 className="w-5 h-5" />, label: 'Ads Manager', roles: ['admin', 'manager'] },
    { id: 'templates', icon: <CheckSquare className="w-5 h-5" />, label: 'Templates', roles: ['admin', 'manager', 'user'] },
    { id: 'users', icon: <Users className="w-5 h-5" />, label: 'Users', roles: ['admin'] },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings', roles: ['admin'] }
  ].filter(item => item.roles.includes(userRole));

  // Ensure active tab is valid for current role
  React.useEffect(() => {
    if (!sidebarItems.find(item => item.id === activeTab)) {
      setActiveTab(sidebarItems[0]?.id as DashboardTab || 'inbox');
    }
  }, [userRole]);

  if (currentPage === 'landing') {
    return <LandingPage onStart={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors duration-300 relative">
      {/* Sidebar Backdrop for Mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 w-72 md:w-20'} 
        fixed md:relative inset-y-0 left-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col z-50 shadow-2xl md:shadow-none
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
              <Zap className="text-white w-6 h-6" />
            </div>
            {(isSidebarOpen || isMobile) && <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white">ChatWizs</span>}
          </div>
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as DashboardTab);
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {(isSidebarOpen || isMobile) && <span className="font-bold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={() => setCurrentPage('landing')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 transition-all"
          >
            <X className="w-5 h-5" />
            {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-8 z-30 sticky top-0">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden flex items-center gap-2">
              {!isSidebarOpen && (
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="text-white w-4 h-4" />
                </div>
              )}
            </div>
            <h2 className="font-bold text-slate-900 dark:text-white capitalize text-sm md:text-base truncate">{activeTab.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 w-48 xl:w-64 dark:text-white"
              />
            </div>
            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hidden sm:block" />
            
            {/* Role Switcher for Demo */}
            <select 
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="text-[10px] md:text-xs font-bold bg-slate-100 dark:bg-slate-700 border-none rounded-lg px-2 py-1 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">Standard User</option>
            </select>
          </div>
        </header>

        {/* View Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <DashboardOverview />}
              {activeTab === 'inbox' && <InboxView />}
              {activeTab === 'bulk' && (
                <BulkMessagingView 
                  isModalOpen={isBulkModalOpen}
                  setIsModalOpen={setIsBulkModalOpen}
                  messageContent={bulkMessageContent}
                  setMessageContent={setBulkMessageContent}
                  campaignName={bulkCampaignName}
                  setCampaignName={setBulkCampaignName}
                />
              )}
              {activeTab === 'ads' && <AdsManagerView />}
              {activeTab === 'templates' && (
                <TemplateApprovalView onUseTemplate={handleUseTemplate} />
              )}
              {activeTab === 'settings' && (
                <SettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              )}
              {activeTab === 'users' && <UsersView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
