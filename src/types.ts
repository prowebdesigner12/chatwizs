import { User } from 'firebase/auth';

export type Page = 'landing' | 'dashboard' | 'auth';
export type UserRole = 'admin' | 'manager' | 'user';
export type DashboardTab = 'overview' | 'inbox' | 'bulk' | 'ads' | 'templates' | 'settings' | 'users' | 'accounts';

export interface WhatsAppAccount {
  id: string;
  name: string;
  phoneNumber: string;
  businessId: string;
  accessToken: string;
  status: 'active' | 'inactive';
  uid: string;
  createdAt: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'customer';
  timestamp: any;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  customerName: string;
  customerNumber: string;
  lastMessage: string;
  timestamp: any;
  unreadCount: number;
  status: 'active' | 'archived';
}

export interface Template {
  id: string;
  name: string;
  category: string;
  language: string;
  status: 'approved' | 'pending' | 'rejected';
  body: string;
  createdAt: string;
}
