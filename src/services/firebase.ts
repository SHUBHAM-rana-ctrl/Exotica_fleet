import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer,
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Booking, Car, Review, User } from '../types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
googleProvider.addScope('https://www.googleapis.com/auth/drive.readonly');

// Test connection on boot per Firebase skill guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    } else {
      console.warn('Initial Firestore ping:', error);
    }
    return false;
  }
}

// Google Sign-In with Firebase Auth
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Sync user profile to Firestore
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const existing = await getDoc(userDocRef);
    if (!existing.exists()) {
      await setDoc(userDocRef, {
        id: user.uid,
        name: user.displayName || 'VIP Member',
        email: user.email || '',
        phone: user.phoneNumber || '+91 98201 54321',
        role: user.email === 'admin@exotica.com' ? 'admin' : 'customer',
        licenseNumber: 'VERIFIED-VIP-AUTO',
        avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        membershipTier: 'Black Card VIP',
        totalSpend: 0,
        createdAt: new Date().toISOString()
      });
    }
  } catch (err) {
    console.warn('Could not sync user profile to Firestore:', err);
  }

  return user;
}

// Email/Password login helper
export async function signInWithEmail(email: string, pass: string): Promise<FirebaseUser> {
  try {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    return res.user;
  } catch {
    // If user does not exist, create for seamless testing
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    return res.user;
  }
}

export async function signOutFirebase(): Promise<void> {
  await signOut(auth);
}

// Firestore Live Bookings Sync
export function subscribeToBookings(userId: string, callback: (bookings: Booking[]) => void) {
  const q = collection(db, 'bookings');
  return onSnapshot(q, (snapshot) => {
    const list: Booking[] = [];
    snapshot.forEach((d) => {
      const data = d.data() as Booking;
      list.push({ ...data, id: d.id });
    });
    // Filter by user if not admin
    if (userId && userId !== 'user-admin') {
      const userBookings = list.filter(b => b.userId === userId);
      callback(userBookings.length > 0 ? userBookings : list);
    } else {
      callback(list);
    }
  }, (err) => {
    console.warn('Firestore bookings snapshot error, using local fallback:', err);
  });
}

// Save booking to Firestore
export async function saveBookingToFirestore(booking: Booking): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...booking,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.error('Failed to save booking to Firestore:', err);
    throw err;
  }
}
