import React, { useState } from 'react';

export default function Prescriptions({ addPrescription, setPage }) {
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // تخزين الملف الحقيقي لتوليد الرابط

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file); // حفظ ملف الصورة المرفوع
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) { 
      alert('برجاء اختيار أو رفع ملف الروشتة أولاً'); 
      return; 
    }

    // 🌟 السحر هنا: توليد رابط محلي مؤقت للصورة المرفوعة فوراً لتفتح عند الدكتور بجودة كاملة
    const generatedUrl = URL.createObjectURL(selectedFile);

    addPrescription({ 
      fileName: fileName, 
      fileUrl: generatedUrl, // تمرير الرابط الحقيقي للمعاينة الفورية
      note: note 
    });

    alert('تم رفع روشتتك بنجاح، سيقوم د. إسلام بمراجعتها وتجهيز البدائل الموفرة فوراً!');
    setPage('home');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100" dir="rtl">
      <h2 className="text-2xl font-black text-slate-800 mb-2 text-center">رفع الروشتة الطبية الحديثة</h2>
      <p className="text-xs text-slate-400 text-center mb-6">ارفع صورة واضحة للروشتة ليقوم الصيدلي بفحصها وتوفير البدائل الدوائية المتاحة.</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* منطقة رفع الملف الذكية */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative bg-slate-50/50 hover:border-indigo-500 hover:bg-slate-50 transition-all group">
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            onChange={handleFileChange} 
          />
          <div className="text-slate-600 space-y-2">
            <div className="text-3xl group-hover:scale-110 transition-transform">📸</div>
            <p className="text-sm font-bold text-slate-700">اضغط هنا أو قم بسحب صورة الروشتة داخل المربع</p>
            <p className="text-[11px] text-slate-400">نقبل صيغ الصور (JPG, PNG) والملفات الطبية</p>
          </div>
        </div>

        {/* عرض اسم الملف المختار */}
        {fileName && (
          <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl text-xs font-bold border border-emerald-100 flex items-center justify-between animate-fadeIn">
            <span>📎 تم اختيار ملف: {fileName}</span>
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[10px]">جاهز للرفع</span>
          </div>
        )}

        {/* الملاحظات الإضافية */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">ملاحظات إضافية وتعديلات تود إبلاغ الدكتور بها</label>
          <textarea 
            rows="4" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-right resize-none" 
            placeholder="مثال: أرجو كتابة البدائل الموفرة لضعف الميزانية، أو توضيح جرعات الفيتامينات المكتوبة..."
          />
        </div>

        {/* أزرار الإجراءات */}
        <div className="space-y-3">
          {/* زر الإرسال الفخم */}
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/10 cursor-pointer text-center block"
          >
            تأكيد وإرسال الروشتة للمراجعة الطبية 🚀
          </button>

          {/* زر تواصل مباشر واتساب المضاف */}
          <a 
            href="https://wa.me/201234567890?text=مرحباً دكتور إسلام، أود الاستفسار بخصوص الروشتة الطبية." 
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