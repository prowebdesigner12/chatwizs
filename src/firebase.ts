import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Auth Providers
export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('whatsapp_business_management');
facebookProvider.addScope('whatsapp_business_messaging');

// Helper for Anonymous Login (Bypass)
export const loginAnonymously = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/admin-restricted-operation' || error.code === 'auth/operation-not-allowed') {
      const msg = "Anonymous authentication is not enabled in your Firebase Console. Please go to Authentication > Sign-in method and enable 'Anonymous'.";
      console.error(msg);
      throw new Error(msg);
    }
    console.error("Anonymous Login Error:", error);
    throw error;
  }
};

// Helper for Email Signup
export const signUpWithEmail = async (email: string, pass: string, name: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(result.user, { displayName: name });
    
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      displayName: name,
      photoURL: null,
      role: 'user',
      createdAt: new Date().toISOString()
    });
    
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed') {
      const msg = "Email/Password authentication is not enabled in your Firebase Console. Please go to Authentication > Sign-in method and enable 'Email/Password'.";
      console.error(msg);
      throw new Error(msg);
    }
    console.error("Signup Error:", error);
    throw error;
  }
};

// Helper for Email Login
export const loginWithEmail = async (email: string, pass: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed') {
      const msg = "Email/Password authentication is not enabled in your Firebase Console. Please go to Authentication > Sign-in method and enable 'Email/Password'.";
      console.error(msg);
      throw new Error(msg);
    }
    console.error("Login Error:", error);
    throw error;
  }
};

// Helper for Facebook Login
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    
    // Create or update user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: new Date().toISOString()
    }, { merge: true });
    
    return user;
  } catch (error) {
    console.error("Facebook Login Error:", error);
    throw error;
  }
};

// Error Handling Spec for Firestore Permissions
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}
testConnection();
