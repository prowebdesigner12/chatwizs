import React, { useState, useEffect } from 'react';
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
  Zap,
  Smartphone,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';

// --- Types ---
import { Page, UserRole, DashboardTab } from './types';

// --- Components ---
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthView } from './components/AuthView';
import { DashboardOverview } from './components/DashboardOverview';
import { InboxView } from './components/InboxView';
import { BulkMessagingView } from './components/BulkMessagingView';
import { AdsManagerView } from './components/AdsManagerView';
import { TemplateApprovalView } from './components/TemplateApprovalView';
import { WhatsAppAccountsView } from './components/WhatsAppAccountsView';
import { SettingsView } from './components/SettingsView';
import { UsersView } from './components/UsersView';

// --- Error Boundary ---
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    (this as any).state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    const { hasError, error } = (this as any).state;
    if (hasError) {
      let errorMessage = "Something went wrong.";
      if (error && error.message) {
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError.error) {
            errorMessage = `Firestore Error: ${parsedError.error} (Op: ${parsedError.operationType})`;
          }
        } catch (e) {
          errorMessage = error.message;
        }
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Application Error</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [hasAccounts, setHasAccounts] = useState<boolean | null>(null);
  const [onboardingBypassed, setOnboardingBypassed] = useState(false);

  const [userRole, setUserRole] = useState<UserRole>('user');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle window resize for mobile detection
  useEffect(() => {
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

  // Handle Auth State
  useEffect(() => {
    let unsubscribeAccounts: (() => void) | undefined;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user profile to get role
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role || 'user');
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }

        // Check for accounts
        const q = query(collection(db, 'whatsapp_accounts'), where('uid', '==', user.uid));
        unsubscribeAccounts = onSnapshot(q, (snapshot) => {
          const count = snapshot.docs.length;
          setHasAccounts(count > 0);
          // If no accounts and not bypassed, force to accounts tab for onboarding
          if (count === 0 && !onboardingBypassed) {
            setActiveTab('accounts');
          }
        }, (error) => {
          console.error("Firestore error in accounts listener:", error);
        });

        if (currentPage === 'auth' || currentPage === 'landing') setCurrentPage('dashboard');
      } else {
        setHasAccounts(null);
        if (currentPage === 'dashboard') setCurrentPage('auth');
        if (unsubscribeAccounts) unsubscribeAccounts();
      }
      setAuthLoading(false);
    });
    return () => {
      unsubscribe();
      if (unsubscribeAccounts) unsubscribeAccounts();
    };
  }, [currentPage, onboardingBypassed]);

  // Apply dark mode class to root
  useEffect(() => {
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
    { id: 'accounts', icon: <Smartphone className="w-5 h-5" />, label: 'Accounts', roles: ['admin', 'manager', 'user'] },
    { id: 'inbox', icon: <MessageSquare className="w-5 h-5" />, label: 'Inbox', roles: ['admin', 'manager', 'user'] },
    { id: 'bulk', icon: <Send className="w-5 h-5" />, label: 'Bulk Messaging', roles: ['admin', 'manager'] },
    { id: 'ads', icon: <BarChart3 className="w-5 h-5" />, label: 'Ads Manager', roles: ['admin', 'manager'] },
    { id: 'templates', icon: <CheckSquare className="w-5 h-5" />, label: 'Templates', roles: ['admin', 'manager', 'user'] },
    { id: 'users', icon: <Users className="w-5 h-5" />, label: 'Users', roles: ['admin'] },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings', roles: ['admin'] }
  ].filter(item => item.roles.includes(userRole));

  // Ensure active tab is valid for current role
  useEffect(() => {
    if (!sidebarItems.find(item => item.id === activeTab)) {
      setActiveTab(sidebarItems[0]?.id as DashboardTab || 'inbox');
    }
  }, [userRole, sidebarItems, activeTab]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage('landing');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (currentPage === 'landing') {
    return <LandingPage onStart={() => setCurrentPage(currentUser ? 'dashboard' : 'auth')} />;
  }

  if (currentPage === 'auth') {
    return <AuthView onAuthSuccess={() => setCurrentPage('dashboard')} />;
  }

  if (!currentUser) {
    return <AuthView onAuthSuccess={() => setCurrentPage('dashboard')} />;
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
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 transition-all"
          >
            <LogOut className="w-5 h-5" />
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
              {activeTab === 'accounts' && currentUser && (
                <WhatsAppAccountsView 
                  user={currentUser} 
                  onBypass={() => {
                    setOnboardingBypassed(true);
                    setActiveTab('overview');
                  }} 
                />
              )}
              {activeTab === 'inbox' && currentUser && <InboxView user={currentUser} />}
              {activeTab === 'bulk' && currentUser && (
                <BulkMessagingView 
                  user={currentUser}
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
              {activeTab === 'settings' && currentUser && (
                <SettingsView user={currentUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              )}
              {activeTab === 'users' && <UsersView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
