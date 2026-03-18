import React, { useState, useRef, useEffect } from 'react';
import { Plus, Filter, Search, Clock, Send, X, Zap, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { CampaignAnalytics } from './CampaignAnalytics';

export const BulkMessagingView = ({ 
  user,
  isModalOpen, 
  setIsModalOpen, 
  messageContent, 
  setMessageContent, 
  campaignName, 
  setCampaignName 
}: { 
  user: User;
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
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);
  const [showTemplatesList, setShowTemplatesList] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'campaigns'), where('uid', '==', user.uid), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const camps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCampaigns(camps);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'campaigns');
    });
    return () => unsubscribe();
  }, [user.uid]);

  useEffect(() => {
    const q = query(collection(db, 'templates'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const temps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedTemplates(temps);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'templates');
    });
    return () => unsubscribe();
  }, [user.uid]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const handleCreateCampaign = async () => {
    try {
      await addDoc(collection(db, 'campaigns'), {
        uid: user.uid,
        name: campaignName || 'Untitled Campaign',
        sentCount: 0,
        openRate: '0%',
        clickRate: '0%',
        status: isScheduled ? 'Scheduled' : 'Active',
        scheduledDate: isScheduled ? `${scheduledDate}T${scheduledTime}` : null,
        messageContent,
        createdAt: new Date().toISOString()
      });
      
      setIsModalOpen(false);
      setIsScheduled(false);
      setScheduledDate('');
      setScheduledTime('');
      setMessageContent('');
      setCampaignName('');
      setIsPreviewVisible(false);
      setUploadedFile(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'campaigns');
    }
  };

  const handleSaveTemplate = async () => {
    if (!messageContent.trim()) return;
    const name = campaignName || `Template ${savedTemplates.length + 1}`;
    try {
      await addDoc(collection(db, 'templates'), {
        uid: user.uid,
        name,
        content: messageContent,
        status: 'Approved',
        category: 'Marketing',
        createdAt: new Date().toISOString()
      });
      alert(`Template "${name}" saved successfully!`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'templates');
    }
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
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                          isDragging ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden" 
                          accept=".xlsx,.csv"
                        />
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-1">Excel or CSV files only</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{uploadedFile.name}</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400">{uploadedFile.count} contacts found</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setUploadedFile(null)}
                          className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-800 rounded-lg text-emerald-600 dark:text-emerald-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message Content</label>
                      <div className="relative">
                        <button 
                          onClick={() => setShowTemplatesList(!showTemplatesList)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" /> Use Template
                        </button>
                        
                        <AnimatePresence>
                          {showTemplatesList && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden"
                            >
                              <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Templates</p>
                              </div>
                              <div className="max-h-48 overflow-y-auto">
                                {savedTemplates.map(t => (
                                  <button 
                                    key={t.id}
                                    onClick={() => handleLoadTemplate(t.content)}
                                    className="w-full p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-50 dark:border-slate-700 last:border-0"
                                  >
                                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">{t.name}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{t.content}</p>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea 
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="Type your message here... Use {{name}} for personalization." 
                        className="w-full h-32 px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white resize-none"
                      />
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <button 
                          onClick={handleSaveTemplate}
                          title="Save as template"
                          className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <input 
                      type="checkbox" 
                      id="schedule" 
                      checked={isScheduled}
                      onChange={(e) => setIsScheduled(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="schedule" className="text-sm font-medium text-slate-700 dark:text-slate-300">Schedule for later</label>
                  </div>

                  {isScheduled && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</label>
                        <input 
                          type="date" 
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time</label>
                        <input 
                          type="time" 
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Preview Section */}
              <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-900 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white">Live Preview</h4>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors hidden md:block"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-[240px] aspect-[9/16] bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-300 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-300 dark:bg-slate-700 rounded-b-xl z-10" />
                    <div className="h-full bg-[#E5DDD5] dark:bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col">
                      <div className="bg-[#075E54] dark:bg-slate-800 p-3 pt-6 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-300" />
                        <div className="flex-1">
                          <div className="w-16 h-2 bg-white/30 rounded-full mb-1" />
                          <div className="w-10 h-1.5 bg-white/20 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                        <div className="bg-white dark:bg-slate-800 p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                          <p className="text-[10px] text-slate-800 dark:text-slate-200 leading-tight">
                            {messageContent || "Your message will appear here..."}
                          </p>
                          <p className="text-[8px] text-slate-400 text-right mt-1">10:42 AM</p>
                        </div>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 flex gap-1">
                        <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-900 rounded-full" />
                        <div className="w-6 h-6 bg-[#128C7E] rounded-full flex items-center justify-center">
                          <Send className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center">Preview on WhatsApp</p>
                </div>

                <div className="mt-8 space-y-3">
                  <button 
                    onClick={handleCreateCampaign}
                    disabled={!campaignName || !messageContent || !uploadedFile}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:shadow-none"
                  >
                    {isScheduled ? 'Schedule Campaign' : 'Send Campaign Now'}
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Estimated reach: <span className="font-bold text-slate-600 dark:text-slate-300">{uploadedFile?.count || 0} contacts</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
