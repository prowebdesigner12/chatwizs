import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { motion } from 'motion/react';
import { Zap, AlertCircle, RefreshCw, Facebook } from 'lucide-react';
import { signInWithFacebook, loginAnonymously, loginWithEmail, signUpWithEmail } from '../firebase';

export const AuthView = ({ onAuthSuccess }: { onAuthSuccess: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithFacebook();
      onAuthSuccess(user);
    } catch (err: any) {
      setError(err.message || "Failed to login with Facebook");
    } finally {
      setLoading(false);
    }
  };

  const handleBypass = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginAnonymously();
      onAuthSuccess(user);
    } catch (err: any) {
      setError(err.message || "Bypass failed. Please try another method.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const user = await loginWithEmail(formData.email, formData.password);
        onAuthSuccess(user);
      } else {
        const user = await signUpWithEmail(formData.email, formData.password, formData.name);
        onAuthSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 dark:shadow-none">
            <Zap className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {isLogin ? 'Sign in to manage your WhatsApp Business API' : 'Join ChatWizs to scale your conversations'}
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {!isLogin && (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@company.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2"
          >
            {loading && <RefreshCw className="w-5 h-5 animate-spin" />}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-700"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-800 px-2 text-slate-400">Or continue with</span></div>
        </div>

        <button 
          onClick={handleFacebookLogin}
          disabled={loading}
          className="w-full bg-[#1877F2] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#166fe5] transition-all disabled:opacity-50 shadow-lg shadow-blue-100 dark:shadow-none"
        >
          <Facebook className="w-6 h-6" />
          Facebook
        </button>
        
        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-indigo-600 hover:underline block w-full"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
          
          <button 
            onClick={handleBypass}
            disabled={loading}
            className="text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors"
          >
            Skip for now (Demo Bypass)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
