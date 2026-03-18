import React, { useState } from 'react';
import { Zap, X, Menu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';
import { loginAnonymously } from '../firebase';

export const Navbar = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
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
              onClick={async () => {
                try {
                  await loginAnonymously();
                } catch (e) {
                  onNavigate('dashboard');
                }
              }}
              className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
            >
              Bypass
            </button>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
