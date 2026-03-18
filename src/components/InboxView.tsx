import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  ArrowLeft,
  MessageSquare,
  User
} from 'lucide-react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../firebase';
import { Chat, Message } from '../types';
import { User as FirebaseUser } from 'firebase/auth';

interface InboxViewProps {
  user: FirebaseUser;
}

export const InboxView: React.FC<InboxViewProps> = ({ user }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch chats
  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chat[];
      setChats(chatList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  // Fetch messages for selected chat
  useEffect(() => {
    if (!selectedChat) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'chats', selectedChat.id, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgList);
    });

    return () => unsubscribe();
  }, [selectedChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      // Add message to subcollection
      await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), {
        text: messageText,
        senderId: user.uid,
        senderName: user.displayName || user.email || 'User',
        timestamp: serverTimestamp(),
      });

      // Update chat metadata
      await updateDoc(doc(db, 'chats', selectedChat.id), {
        lastMessage: messageText,
        lastMessageTime: serverTimestamp(),
        unreadCount: 0 // Reset unread count for the sender
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredChats = chats.filter(chat => 
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white dark:bg-slate-800">
      {/* Sidebar */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-slate-200 dark:border-slate-700`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading chats...</div>
          ) : filteredChats.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">No chats found.</div>
          ) : filteredChats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${selectedChat?.id === chat.id ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-indigo-600' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {chat.name?.charAt(0) || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{chat.name || 'Unknown'}</h4>
                  <span className="text-[10px] text-slate-400">{formatTime(chat.lastMessageTime)}</span>
                </div>
                <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {chat.lastMessage || 'No messages yet'}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="min-w-[1.25rem] h-5 bg-indigo-600 rounded-full flex items-center justify-center px-1.5 mt-2">
                  <span className="text-[10px] font-bold text-white">{chat.unreadCount}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-slate-50/30 dark:bg-slate-900/30`}>
        {selectedChat ? (
          <>
            <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 md:hidden"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {selectedChat.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{selectedChat.name || 'Unknown'}</h4>
                    <p className="text-xs text-emerald-500 font-medium">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400"><MoreVertical className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto flex flex-col">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2">
                  <MessageSquare className="w-12 h-12 opacity-20" />
                  <p className="text-sm font-medium">No messages in this chat yet</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 max-w-[80%] ${msg.senderId === user.uid ? 'ml-auto flex-row-reverse' : ''}`}>
                    <div className="flex flex-col gap-1">
                      <div className={`p-4 rounded-2xl shadow-sm border ${
                        msg.senderId === user.uid 
                        ? 'bg-indigo-600 border-indigo-500 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-none'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <span className={`text-[10px] ${msg.senderId === user.uid ? 'text-right text-indigo-400' : 'text-slate-400'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <MessageSquare className="w-10 h-10 opacity-20" />
            </div>
            <p className="text-sm font-medium">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};
