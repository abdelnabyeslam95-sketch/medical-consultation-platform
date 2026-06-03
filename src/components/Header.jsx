import React from 'react';

export default function Header({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-slate-950 font-black text-xl">UNI</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            نظام الرعاية الطبية الفوري
          </span>
        </div>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50">
              <div className="text-right">
                <p className="text-xs text-slate-400 font-medium">{user.role === 'doctor' ? 'دكتور' : 'المريض'}</p>
                <p className="text-sm font-bold text-emerald-400">{user.name}</p>
              </div>
              <button onClick={onLogout} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20 transition-colors">
                خروج
              </button>
            </div>
          ) : (
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700">زائر</span>
          )}
        </nav>
      </div>
    </header>
  );
}