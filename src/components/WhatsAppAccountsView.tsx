import React, { useState, useEffect } from 'react';
import { Plus, Smartphone, X, CheckCircle2, Trash2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from 'firebase/auth';
import { query, collection, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export const WhatsAppAccountsView = ({ user, onBypass }: { user: User, onBypass?: () => void }) => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    phoneNumber: '',
    phoneNumberId: '',
    wabaId: '',
    accessToken: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'whatsapp_accounts'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const accs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(accs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'whatsapp_accounts');
    });
    return () => unsubscribe();
  }, [user.uid]);

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'whatsapp_accounts'), {
        ...newAccount,
        uid: user.uid,
        status: 'pending',
        verified: false,
        createdAt: new Date().toISOString()
      });
      setIsAddModalOpen(false);
      setNewAccount({ phoneNumber: '', phoneNumberId: '', wabaId: '', accessToken: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'whatsapp_accounts');
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this WhatsApp account?')) {
      try {
        await deleteDoc(doc(db, 'whatsapp_accounts', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'whatsapp_accounts');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">WhatsApp Accounts</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage multiple WhatsApp Business API numbers</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
        >
          <Plus className="w-5 h-5" />
          Add New Number
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 animate-pulse h-48" />
          ))
        ) : accounts.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-slate-800 p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Onboard your WhatsApp API</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              To start using ChatWizs, you need to connect at least one WhatsApp Business API number. 
              Follow the steps in your Facebook Developer Console to get your credentials.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add New Number
              </button>
              {onBypass && (
                <button 
                  onClick={onBypass}
                  className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  Skip for now (Demo Mode)
                </button>
              )}
            </div>
          </div>
        ) : (
          accounts.map(acc => (
            <div key={acc.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDeleteAccount(acc.id)}
                    className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{acc.phoneNumber}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">ID: {acc.phoneNumberId}</p>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                  acc.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                }`}>
                  {acc.status}
                </span>
                <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  View Settings <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Account Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add WhatsApp Number</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddAccount} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="text" 
                    required 
                    value={newAccount.phoneNumber}
                    onChange={(e) => setNewAccount({ ...newAccount, phoneNumber: e.target.value })}
                    placeholder="+1 234 567 890" 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number ID</label>
                  <input 
                    type="text" 
                    required 
                    value={newAccount.phoneNumberId}
                    onChange={(e) => setNewAccount({ ...newAccount, phoneNumberId: e.target.value })}
                    placeholder="From Facebook Developer Console" 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">WABA ID</label>
                  <input 
                    type="text" 
                    required 
                    value={newAccount.wabaId}
                    onChange={(e) => setNewAccount({ ...newAccount, wabaId: e.target.value })}
                    placeholder="WhatsApp Business Account ID" 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Permanent Access Token</label>
                  <input 
                    type="password" 
                    required 
                    value={newAccount.accessToken}
                    onChange={(e) => setNewAccount({ ...newAccount, accessToken: e.target.value })}
                    placeholder="System User Access Token" 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none mt-6"
                >
                  Connect WhatsApp Account
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
