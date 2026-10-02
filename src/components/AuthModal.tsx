import React, { useState } from 'react';
import { User } from '../types';
import { X, Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signOutFirebase } from '../services/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  currentUser: User;
  firebaseUser: FirebaseUser | null;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  onSignOut: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  currentUser,
  firebaseUser,
  onClose,
  onAuthSuccess,
  onSignOut,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const fbUser = await signInWithGoogle();
      const updatedUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || 'VIP Member',
        email: fbUser.email || '',
        phone: fbUser.phoneNumber || '+91 98201 54321',
        role: fbUser.email === 'admin@exotica.com' ? 'admin' : 'customer',
        licenseNumber: 'VERIFIED-VIP-AUTO',
        avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        membershipTier: 'Black Card VIP',
        totalSpend: 14200,
      };
      onAuthSuccess(updatedUser);
      onClose();
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setErrorMsg(err.message || 'Google sign-in was cancelled or encountered an issue.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setErrorMsg('');
    try {
      const fbUser = await signInWithEmail(email, password);
      const updatedUser: User = {
        id: fbUser.uid,
        name: email.split('@')[0],
        email: fbUser.email || email,
        phone: '+91 98201 54321',
        role: email.includes('admin') ? 'admin' : 'customer',
        licenseNumber: 'MH-01-2024-EXO',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        membershipTier: 'Platinum Elite',
        totalSpend: 4200,
      };
      onAuthSuccess(updatedUser);
      onClose();
    } catch (err: any) {
      console.error('Email sign-in failed:', err);
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    const adminUser: User = {
      id: 'user-admin',
      name: 'Exotica Fleet Director',
      email: 'admin@exotica.com',
      phone: '+971 50 882 1900',
      role: 'admin',
      licenseNumber: 'EXO-EXEC-001',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      joinedDate: '2023-01-10',
      membershipTier: 'Black Card VIP',
      totalSpend: 0,
    };
    onAuthSuccess(adminUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-luxury text-lg font-bold text-white tracking-wider">
              EXOTICA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              · Firebase Auth
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User State if Logged In */}
        {firebaseUser ? (
          <div className="p-4 rounded-xl bg-[#12141A] border border-white/10 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              {firebaseUser.photoURL ? (
                <img src={firebaseUser.photoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-sm font-bold text-[#D4AF37]">
                  {firebaseUser.email ? firebaseUser.email[0].toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <p className="font-bold text-white text-sm">{firebaseUser.displayName || 'Authenticated VIP'}</p>
                <p className="text-neutral-400">{firebaseUser.email}</p>
                <span className="text-[10px] text-emerald-400">Firebase Firestore Active</span>
              </div>
            </div>

            <button
              onClick={() => {
                signOutFirebase();
                onSignOut();
              }}
              className="w-full mt-2 py-2 px-3 flex items-center justify-center gap-1.5 text-xs text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Firebase</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Official Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-neutral-100 text-neutral-900 rounded-lg font-medium text-xs shadow-lg transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isLoading ? 'Connecting to Google...' : 'Continue with Google Account'}</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <span className="relative bg-[#0D0F14] px-3 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                Or With Email
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">VIP Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@exotica-vip.com"
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Security Key / Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-lg transition-colors cursor-pointer mt-2 disabled:opacity-50"
              >
                {isLoading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Account' : 'Register Account'}
              </button>
            </form>

            {/* Quick Demo Switcher */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="text-[#D4AF37] hover:underline"
              >
                Sign In as Fleet Director (Admin)
              </button>
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
                className="text-neutral-400 hover:text-white"
              >
                {mode === 'signin' ? 'Need an account? Register' : 'Existing member? Sign In'}
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-white/5 text-[10px] text-neutral-500 text-center">
          Cloud Firestore Real-Time Replication Enabled
        </div>
      </div>
    </div>
  );
};
