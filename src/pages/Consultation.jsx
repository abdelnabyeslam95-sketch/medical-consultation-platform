import React, { useState } from 'react';

export default function Consultation({ addConsultation, setPage }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('ذكر'); // ربط الجنس بالـ State لتمريره للدكتور
  const [issue, setIssue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addConsultation({ age, gender, issue });
    alert('تم إرسال طلب الاستشارة بنجاح، ستظهر للدكتور فوراً!');
    setPage('home'); // توجيه المريض للرئيسية بعد الإرسال
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100" dir="rtl">
      <h2 className="text-2xl font-black text-slate-800 mb-2 text-center">طلب استشارة طبية سريعة</h2>
      <p className="text-xs text-slate-400 text-center mb-6">اكتب تفاصيل حالتك الصحية بدقة وبسرية تامة ليقوم الصيدلي بتقديم التوجيه الدوائي الصحيح.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">العمر</label>
            <input 
              type="number" 
              required 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50/30 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-right" 
              placeholder="مثال: 25"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">الجنس</label>
            <select 
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-right"
            >
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">وصف الحالة أو الأعراض بالتفصيل</label>
          <textarea 
            rows="5" 
            required 
            value={issue} 
            onChange={(e) => setIssue(e.target.value)} 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50/30 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-right resize-none" 
            placeholder="اكتب هنا بوضوح الأعراض الحالية، الأدوية التي تناولتها، وهل تعاني من أمراض مزمنة أو حساسية تجاه أدوية معينة..."
          />
        </div>

        {/* أزرار الإجراءات والتواصل */}
        <div className="space-y-3 pt-2">
          {/* زر الإرسال الأساسي للموقع */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/10 cursor-pointer text-center block"
          >
            إرسال الاستشارة إلى ملف الدكتور 📤
          </button>

          {/* زر تواصل فوري واتساب الحصري */}
          <a 
            href="https://wa.me/201094682047?text=مرحباً دكتور إسلام، أود استشارتك بخصوص حالة طبية طارئة." 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/10 text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>💬</span>
            تواصل سريع عبر واتساب مع د. إسلام
          </a>
        </div>
      </form>
    </div>
  );
}