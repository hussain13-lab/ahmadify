import React, { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '../lib/firebase';
import { LogIn, LogOut, ShieldCheck } from 'lucide-react';

export const FirebaseAuthButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Firebase Auth error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs text-slate-400 animate-pulse">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
        <span>Firebase...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-xs">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 rounded-full" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
            {user.email ? user.email[0].toUpperCase() : 'U'}
          </div>
        )}
        <span className="hidden md:inline text-slate-200 font-medium truncate max-w-[100px]">
          {user.displayName || user.email}
        </span>
        <button
          onClick={handleLogout}
          className="text-slate-400 hover:text-rose-400 transition-colors p-0.5"
          title="Sign out of Firebase"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
      title="Sign in with Google via Firebase Auth"
    >
      <LogIn className="w-3.5 h-3.5 text-amber-400" />
      <span className="hidden md:inline">Firebase Login</span>
    </button>
  );
};
