import React from 'react';

export default function PatientDashboard({ consultations, prescriptions, deleteConsultation }) {
  return (
    <div className="space-y-10" dir="rtl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">ملفك الطبي الموحد ولوحة المتابعة</h1>
        <p className="text-sm text-slate-500">تابع حالة استشاراتك وصرف الروشتات الفورية من د. إسلام عبد النبي.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* سكشن استفسارات المريض */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2">💬 استشاراتك الطبية الحالية</h2>
          {consultations.map(c => (
            <div key={c.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{c.time}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.status === 'تم الرد' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{c.status}</span>
                  <button onClick={() => { if(confirm('هل تود حذف هذه الاستشارة نهائياً؟')) deleteConsultation(c.id) }} className="text-xs text-red-500 font-bold hover:underline">حذف 🗑️</button>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-xl">{c.issue}</p>
              {c.doctorReply && (
                <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl text-xs space-y-1 text-slate-800">
                  <strong className="text-blue-700 block">🩺 توجيه ورد د. إسلام عبد النبي:</strong>
                  <p>{c.doctorReply}</p>
                </div>
              )}
            </div>
          ))}
          {consultations.length === 0 && <p className="text-slate-400 text-xs text-center py-4">لم تقم بإرسال أي استشارات طبية حتى الآن.</p>}
        </div>

        {/* سكشن الروشتات والفواتير المرسلة */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2">📋 الروشتات المرفوعة وتجهيز الأدوية</h2>
          {prescriptions.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{p.time}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.status === 'تم الصرف والتجهيز' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{p.status}</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p><strong>📄 اسم الروشتة المرفوعة:</strong> {p.fileName}</p>
                <p><strong>📝 ملاحظتك للدكتور:</strong> {p.note || 'لا توجد ملاحظات إضافية'}</p>
              </div>

              {/* 🌟 مكان ظهور تفاصيل صرف الأدوية وأسعار الصيدلية الحالية */}
              {p.doctorReply ? (
                <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-xs space-y-1 text-slate-800">
                  <strong className="text-emerald-700 block">💊 تفاصيل تجهيز وصرف الأدوية والأسعار:</strong>
                  <p className="whitespace-pre-line">{p.doctorReply}</p>
                </div>
              ) : (
                <div className="bg-slate-50 text-slate-400 p-3 rounded-xl text-center text-[11px]">
                  ⏳ الروشتة قيد الفحص والمراجعة من قبل الصيدلي لإعداد الأسعار والبدائل المناسبة.
                </div>
              )}
            </div>
          ))}
          {prescriptions.length === 0 && <p className="text-slate-400 text-xs text-center py-4">لا توجد روشتات مرفوعة في سجلاتك حالياً.</p>}
        </div>
      </div>
    </div>
  );
}