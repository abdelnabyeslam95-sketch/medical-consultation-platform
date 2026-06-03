import React from 'react';

export default function HeroAndServices() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
            تواصل مستمر 24 ساعة ومقالات طبية موثوقة
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            منصتك الطبية الذكية لإدارة <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">الاستشارات والمتابعة الدورية</span>
          </h1>
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            احفظ استشاراتك، تصفح المقالات العلمية، وارفع روشتتك الطبية للتواصل المباشر مع عيادة الطبيب عبر واتساب.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-900/20 border border-slate-800/60 rounded-3xl p-8 space-y-8 relative overflow-hidden mt-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">خدماتنا الطبية الإضافية المتاحة لكم</h2>
          <p className="text-xs text-slate-400">نوفر باقة شاملة من أدوات الرعاية والمتابعة السريعة بأعلى معايير الدقة.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-900 border border-slate-800/50 p-5 rounded-xl space-y-2 hover:scale-105 transition-transform">
            <div className="text-2xl">⚡</div>
            <h4 className="text-white font-bold text-sm">استشارة عاجلة</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">إرسال مباشر للواتساب وفحص الملفات في دقائق معدودة.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800/50 p-5 rounded-xl space-y-2 hover:scale-105 transition-transform">
            <div className="text-2xl">📂</div>
            <h4 className="text-white font-bold text-sm">سجل طبي دائم</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">بياناتك بالكامل محفوظة في متصفحك الشخصي بأمان وتظل ثابتة.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800/50 p-5 rounded-xl space-y-2 hover:scale-105 transition-transform">
            <div className="text-2xl">📝</div>
            <h4 className="text-white font-bold text-sm">روشتة ذكية</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">إمكانية مشاركة روابط التحاليل والروشتات لتسهيل التشخيص.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800/50 p-5 rounded-xl space-y-2 hover:scale-105 transition-transform">
            <div className="text-2xl">📚</div>
            <h4 className="text-white font-bold text-sm">توعية طبية موثوقة</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">مقالات دورية علمية يتم تحديثها بواسطة الطبيب لرفع الوعي الصحي.</p>
          </div>
        </div>
      </section>
    </>
  );
}