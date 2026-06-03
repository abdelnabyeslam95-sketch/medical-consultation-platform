import React, { useState } from 'react';

export default function Login({ setUserRole, setCurrentPatient, registeredPatients, registerNewPatient }) {
  const [mode, setMode] = useState('patient_login'); // patient_login, patient_register, doctor
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'patient_register') {
      if (registeredPatients.some(p => p.email === email)) {
        setError('هذا البريد الإلكتروني مسجل بالفعل!');
        return;
      }
      registerNewPatient({ name, phone, email, password });
      setSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
      setMode('patient_login');
      return;
    }

    if (mode === 'patient_login') {
      const patient = registeredPatients.find(p => p.email === email && p.password === password);
      if (patient) {
        setCurrentPatient(patient);
        setUserRole('patient');
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة!');
      }
    }

    if (mode === 'doctor') {
      if (password === 'eslam123') {
        setUserRole('doctor');
      } else {
        setError('كلمة المرور الخاصة بالطبيب د./ إسلام خاطئة!');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-slate-50 to-emerald-50 px-4 py-12">
      <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-brand mb-3 tracking-tight">المنصة الطبية الشاملة</h2>
          <p className="text-slate-500 font-medium">تحت إشراف وتوجيه د./ إسلام عبد النبي</p>
        </div>

        {/* أزرار التحويل الثلاثية الفخمة */}
        <div className="grid grid-cols-3 bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200">
          <button type="button" onClick={() => { setMode('patient_login'); setError(''); }} className={`py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${mode === 'patient_login' ? 'bg-white text-brand shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>تسجيل دخول مريض</button>
          <button type="button" onClick={() => { setMode('patient_register'); setError(''); }} className={`py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${mode === 'patient_register' ? 'bg-white text-brand shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>إنشاء حساب مريض</button>
          <button type="button" onClick={() => { setMode('doctor'); setError(''); }} className={`py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${mode === 'doctor' ? 'bg-white text-red-600 shadow-md' : 'text-slate-500 hover:text-red-500'}`}>بوابة الدكتور</button>
        </div>

        {error && <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-bold text-center mb-6">{error}</div>}
        {success && <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 p-4 rounded-xl text-sm font-bold text-center mb-6">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'patient_register' && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">الاسم الكامل للمريض</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand text-right bg-slate-50" placeholder="أدخل اسمك ثلاثي" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">رقم الموبايل الشخصي</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand text-left bg-slate-50" placeholder="01xxxxxxxxx" />
              </div>
            </>
          )}

          {(mode === 'patient_login' || mode === 'patient_register') && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand text-left bg-slate-50" placeholder="name@example.com" />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{mode === 'doctor' ? 'كلمة المرور السرية للدكتور' : 'كلمة المرور'}</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand text-left bg-slate-50" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-brand text-white py-4 rounded-xl font-bold text-base hover:bg-brand-dark transition-all shadow-xl shadow-sky-100 cursor-pointer">
            {mode === 'patient_login' ? 'دخول حساب المريض' : mode === 'patient_register' ? 'تأكيد إنشاء الحساب الطبى' : 'فتح لوحة التحكم الخاصة بالعيادة'}
          </button>
        </form>
      </div>
    </div>
  );
}