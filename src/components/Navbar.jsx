import React, { useState } from 'react';

export default function Navbar({ currentPage, setPage, userRole, setUserRole, currentPatient }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-slate-100 sticky top-0 z-50 py-2">
      <div className="max-w-7xl mx-auto encoding px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-brand tracking-tight">د./ إسلام عبد النبي</span>
            <span className={`text-white text-xs px-3 py-1.5 rounded-full font-extrabold shadow-sm ${userRole === 'doctor' ? 'bg-red-500' : 'bg-accent'}`}>
              {userRole === 'doctor' ? 'لوحة الإشراف الطبي' : 'الصيدلية الرقمية'}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            {userRole === 'patient' && (
              <>
                <button onClick={() => setPage('home')} className={`text-base font-bold pb-1 cursor-pointer transition-colors ${currentPage === 'home' ? 'text-brand border-b-2 border-brand' : 'text-slate-500 hover:text-brand'}`}>الرئيسية العيادة</button>
                <button onClick={() => setPage('consultation')} className={`text-base font-bold pb-1 cursor-pointer transition-colors ${currentPage === 'consultation' ? 'text-brand border-b-2 border-brand' : 'text-slate-500 hover:text-brand'}`}>طلب استشارة 🩺</button>
                <button onClick={() => setPage('prescriptions')} className={`text-base font-bold pb-1 cursor-pointer transition-colors ${currentPage === 'prescriptions' ? 'text-brand border-b-2 border-brand' : 'text-slate-500 hover:text-brand'}`}>رفع روشتة 📄</button>
                <button onClick={() => setPage('patient_dashboard')} className={`text-base font-bold pb-1 cursor-pointer transition-colors ${currentPage === 'patient_dashboard' ? 'text-accent border-b-2 border-accent' : 'text-slate-500 hover:text-accent'}`}>حسابي الطبي وضبط ردودي ({currentPatient?.name}) 👤</button>
              </>
            )}
            <button onClick={() => { setUserRole(null); setPage('home'); }} className="text-xs bg-red-50 text-red-600 font-extrabold px-4 py-2 rounded-xl hover:bg-red-100 transition-colors cursor-pointer">تسجيل الخروج 🚪</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-brand cursor-pointer focus:outline-none"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">{isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg></button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-6 space-y-2 border-t shadow-inner">
          {userRole === 'patient' && (
            <>
              <button onClick={() => { setPage('home'); setIsOpen(false); }} className="block w-full text-right px-4 py-2.5 rounded-xl text-slate-700 font-bold">الرئيسية</button>
              <button onClick={() => { setPage('consultation'); setIsOpen(false); }} className="block w-full text-right px-4 py-2.5 rounded-xl text-slate-700 font-bold">طلب استشارة</button>
              <button onClick={() => { setPage('prescriptions'); setIsOpen(false); }} className="block w-full text-right px-4 py-2.5 rounded-xl text-slate-700 font-bold">رفع روشتة</button>
              <button onClick={() => { setPage('patient_dashboard'); setIsOpen(false); }} className="block w-full text-right px-4 py-2.5 bg-emerald-50 text-accent rounded-xl font-bold">حسابي الطبي 👤</button>
            </>
          )}
          <button onClick={() => { setUserRole(null); setIsOpen(false); }} className="block w-full text-center bg-red-50 text-red-600 font-black py-3 rounded-xl text-sm mt-4">تسجيل الخروج 🚪</button>
        </div>
      )}
    </nav>
  );
}