import React from 'react';

export default function Home({ setPage, patientName, articles }) {
  return (
    <div className="space-y-20">
      {/* 1. قسم الترحيب الـ Hero الفخم */}
      <div className="text-center bg-gradient-to-r from-sky-600 to-sky-800 text-white py-20 px-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            مرحباً بك {patientName && `أ./ ${patientName}`} في منصة الاستشارات الرقمية
          </h1>
          <p className="text-lg md:text-xl text-sky-100 leading-relaxed max-w-2xl mx-auto">
            تواصل مباشر، مراجعة روشتات آمنة، وتوجيه طبي وصيدلاني دقيق مع الدكتور الصيدلي إسلام عبد النبي لتوفير أقصى درجات الأمان الدوائي لعائلتك.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto pt-4">
            <button onClick={() => setPage('consultation')} className="bg-accent hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all text-base cursor-pointer">اطلب استشارة فورية 🩺</button>
            <button onClick={() => setPage('prescriptions')} className="bg-white hover:bg-slate-100 text-brand font-bold px-8 py-4 rounded-2xl shadow-lg transition-all text-base cursor-pointer">اصرف روشتتك الآن 📄</button>
          </div>
        </div>
      </div>

      {/* 2. قسم سكاشن الرعاية التخصصية (جديد وموسع جداً) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">مراكز الرعاية الصحية والتثقيف الدوائي</h2>
          <p className="text-slate-500 mt-2">إرشادات تخصصية مكثفة من أجل وقاية متكاملة لجميع أفراد الأسرة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* كارت كبار السن */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">👴</div>
            <h3 className="text-xl font-bold text-slate-800">رعاية كبار السن</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              مراجعة دورية لظاهرة "التعدد الدوائي" لمنع التفاعلات العكسية، تظبيط مواعيد الجرعات لمرضى الزهايمر، وتقديم النصائح الغذائية المتوافقة مع العلاجات.
            </p>
          </div>
          {/* كارت رعاية الأطفال */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-2xl">👶</div>
            <h3 className="text-xl font-bold text-slate-800">رعاية وصحة الأطفال</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              حساب دقيق لجرعات خافض الحرارة والمضاد الحيوي وفقاً لوزن الطفل وليس عمره، توجيهات للتعامل مع نزلات المعوية، وفحص أمان الفيتامينات والتركيبات.
            </p>
          </div>
          {/* كارت الأمراض المزمنة */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">❤️</div>
            <h3 className="text-xl font-bold text-slate-800">رعاية الأمراض المزمنة</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              بروتوكولات متابعة ضغط الدم، السكري، والقلب. نصائح لتجنب تأثير الأدوية على الكلى والكبد، والتأكد الفوري من تداخلات الأدوية مع الأطعمة اليومية.
            </p>
          </div>
        </div>
      </div>

      {/* 3. قسم المقالات والارشادات الطبية الحية (التي يضيفها الدكتور) */}
      <div className="bg-slate-100 p-10 rounded-3xl space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">توجيهات وإرشادات د./ إسلام المحدثة</h2>
            <p className="text-slate-500 text-sm mt-1">مقالات طبية مضافة حديثاً بواسطة الطبيب لمتابعي المنصة</p>
          </div>
          <span className="bg-brand text-white font-bold px-4 py-2 rounded-xl text-xs">تحديث حي مباشر 🟢</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <div key={art.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
              <div className="flex justify-between items-center">
                <span className="bg-sky-50 text-brand text-xs font-bold px-2.5 py-1 rounded-lg">القسم: {art.category}</span>
                <span className="text-xs text-slate-400">{art.date}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800">{art.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{art.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}