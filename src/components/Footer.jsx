import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 py-10 text-center text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="font-bold text-slate-800 text-base">منصة د./ إسلام عبد النبي للرعاية الصيدلانية الرقمية الكبرى</div>
        <p className="max-w-xl mx-auto text-xs text-slate-400 leading-relaxed">جميع الاستشارات والروشتات يتم مراجعتها وتدقيقها صيدلانياً لضمان سلامة المرضى وتفادي تفاعلات الأدوية الضارة.</p>
        <div className="text-xs text-slate-400 border-t pt-4">© ٢٠٢٦ جميع الحقوق محفوظة لعيادة الدكتور الصيدلي.</div>
      </div>
    </footer>
  );
}