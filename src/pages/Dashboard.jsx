import React, { useState } from 'react';

export default function Dashboard({ 
  consultations, 
  prescriptions, 
  replyToConsultation, 
  replyToPrescription, // استقبال دالة الرد هنا
  deleteConsultation, 
  deletePrescription,
  addMedicalArticle, 
  deleteMedicalArticle, 
  updateMedicalArticle, 
  articles 
}) {
  const [activeTab, setActiveTab] = useState('consults');
  const [replyTexts, setReplyTexts] = useState({});
  const [prescReplyTexts, setPrescReplyTexts] = useState({}); // استيت خاص بردود الروشتات
  
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState('عامة');
  const [artContent, setArtContent] = useState('');

  const [editingArticle, setEditingArticle] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('عامة');
  const [editContent, setEditContent] = useState('');

  const [viewingPrescUrl, setViewingPrescUrl] = useState(null);

  const handleSendReply = (id) => {
    if (!replyTexts[id] || !replyTexts[id].trim()) return;
    replyToConsultation(id, replyTexts[id]);
    alert('تم إرسال وتحديث الرد الطبي بنجاح!');
  };

  // دالة معالجة إرسال صرف الروشتة
  const handleSendPrescReply = (id) => {
    if (!prescReplyTexts[id] || !prescReplyTexts[id].trim()) return;
    replyToPrescription(id, prescReplyTexts[id]);
    alert('تم إرسال الفاتورة وتوجيه الصرف للمريض بنجاح! 🎉');
  };

  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent.trim()) return;
    addMedicalArticle({ title: artTitle, category: artCategory, content: artContent });
    alert('تم النشر بنجاح وظهر المقال فوراً في لوحة التحكم والصفحة الرئيسية للزوار!');
    setArtTitle(''); setArtContent('');
  };

  const openEditModal = (article) => {
    setEditingArticle(article);
    setEditTitle(article.title);
    setEditCategory(article.category);
    setEditContent(article.content);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) return;
    updateMedicalArticle(editingArticle.id, { title: editTitle, category: editCategory, content: editContent });
    alert('تم تحديث وتعديل بيانات المقال الطبي بنجاح!');
    setEditingArticle(null);
  };

  return (
    <div className="space-y-10" dir="rtl">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">لوحة إدارة العيادة الصيدلانية وطبيب المنصة</h1>
          <p className="text-slate-500 text-sm mt-1">مرحباً د./ إسلام عبد النبي. يمكنك التحكم الكامل وإدارة استفسارات ومقالات المنصة.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex border-b border-slate-200 gap-6">
            <button onClick={() => setActiveTab('consults')} className={`pb-3 font-bold text-base cursor-pointer transition-all ${activeTab === 'consults' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>الاستشارات الواردة ({consultations.length})</button>
            <button onClick={() => setActiveTab('prescriptions')} className={`pb-3 font-bold text-base cursor-pointer transition-all ${activeTab === 'prescriptions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>الروشتات المرفوعة ({prescriptions.length})</button>
            <button onClick={() => setActiveTab('manage_articles')} className={`pb-3 font-bold text-base cursor-pointer transition-all ${activeTab === 'manage_articles' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400'}`}>إدارة ومراجعة مقالاتك ({articles.length})</button>
          </div>

          {/* تبويب الاستشارات */}
          <div className={`space-y-4 ${activeTab === 'consults' ? 'block' : 'hidden'}`}>
            {consultations.map(c => (
              <div key={c.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-slate-800 text-lg">{c.name} <span className="text-xs text-slate-400 font-medium">(العمر: {c.age} سنة)</span></h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${c.status === 'تم الرد' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{c.status}</span>
                    <button onClick={() => { if(confirm('هل تريد مسح هذه الاستشارة نهائياً؟')) deleteConsultation(c.id) }} className="bg-red-50 text-red-600 px-2 py-1 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors">🗑️ حذف</button>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700">{c.issue}</div>
                {c.doctorReply && <div className="bg-emerald-50/50 p-3 rounded-lg text-xs text-slate-600 border border-emerald-100"><strong>ردك الحالي:</strong> {c.doctorReply}</div>}
                <div className="space-y-2">
                  <textarea value={replyTexts[c.id] || ''} onChange={(e) => setReplyTexts({ ...replyTexts, [c.id]: e.target.value })} className="w-full border border-slate-200 p-3 rounded-xl text-sm outline-none bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all min-h-[80px]" placeholder="اكتب التشخيص والتوجيه الدوائي البديل هنا..." />
                  <button onClick={() => handleSendReply(c.id)} className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">إرسال أو تحديث الرد الطبي 📤</button>
                </div>
              </div>
            ))}
            {consultations.length === 0 && <p className="text-center text-slate-400 py-6 text-sm">لا توجد استشارات حالياً.</p>}
          </div>

          {/* تبويب الروشتات (مع إضافة فورمة الصرف والرد) */}
          <div className={`space-y-4 ${activeTab === 'prescriptions' ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prescriptions.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-800">{p.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.status === 'تم الصرف والتجهيز' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{p.status}</span>
                        <button onClick={() => { if(confirm('هل تريد مسح هذه الروشتة من السجلات؟')) deletePrescription(p.id) }} className="text-xs text-red-500 hover:underline">حذف 🗑️</button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg"><strong>ملاحظة المريض:</strong> {p.note || 'لا توجد ملاحظات'}</p>
                    {p.doctorReply && <div className="bg-indigo-50 text-indigo-900 p-2 rounded-lg text-xs border border-indigo-100"><strong>توجيه الصرف الحالي:</strong> {p.doctorReply}</div>}
                  </div>

                  <button 
                    onClick={() => {
                      if(p.fileUrl) setViewingPrescUrl(p.fileUrl);
                      else alert('لم يتم رفع ملف صورة حقيقي للروشتة!');
                    }} 
                    className="w-full bg-slate-100 text-slate-700 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                  >
                    👁️ فتح ومعاينة صورة الروشتة
                  </button>

                  {/* فورمة كتابة أسعار الأدوية والبدائل للمريض */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <textarea 
                      value={prescReplyTexts[p.id] || ''} 
                      onChange={(e) => setPrescReplyTexts({ ...prescReplyTexts, [p.id]: e.target.value })} 
                      className="w-full border border-slate-200 p-2 rounded-xl text-xs outline-none focus:border-indigo-500 transition-all min-h-[60px]" 
                      placeholder="اكتب الأدوية المتوفرة، البدائل، والأسعار الإجمالية..." 
                    />
                    <button 
                      onClick={() => handleSendPrescReply(p.id)} 
                      className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
                    >
                      تجهيز الروشتة وإرسال الفاتورة للعميل 📥
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {prescriptions.length === 0 && <p className="text-center text-slate-400 py-6 text-sm">لا توجد روشتات مرفوعة حالياً.</p>}
          </div>

          {/* تبويب مراجعة وتعديل وحذف المقالات */}
          <div className={`space-y-4 ${activeTab === 'manage_articles' ? 'block' : 'hidden'}`}>
            {articles.map(art => (
              <div key={art.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 text-sm">{art.title}</h4>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">{art.category}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{art.content}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto shrink-0">
                  <button onClick={() => openEditModal(art)} className="flex-1 sm:flex-none bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors">✏️ تعديل</button>
                  <button onClick={() => { if(confirm('هل تريد حذف هذا المقال نهائياً من العرض والصفحة الرئيسية؟')) deleteMedicalArticle(art.id) }} className="flex-1 sm:flex-none bg-red-50 text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors">🗑️ حذف</button>
                </div>
              </div>
            ))}
            {articles.length === 0 && <p className="text-center text-slate-400 py-6 text-sm">لم تقم بنشر أي مقالات بعد.</p>}
          </div>
        </div>

        {/* العمود الأيسر */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-800">إضافة إرشادات طبية جديدة</h3>
            <p className="text-xs text-slate-400 mt-0.5">ستضاف فوراً لسكشن التوعية بالصفحة الرئيسية للموقع ولتبويب الإدارة.</p>
          </div>
          <form onSubmit={handleCreateArticle} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">عنوان التوجيه الطبي</label>
              <input type="text" required value={artTitle} onChange={(e) => setArtTitle(e.target.value)} className="w-full border border-slate-200 px-3 py-2 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all" placeholder="مثال: أهمية شرب الماء مع الفوار" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">القسم العلاجي</label>
              <select value={artCategory} onChange={(e) => setArtCategory(e.target.value)} className="w-full border border-slate-200 px-3 py-2 rounded-xl text-sm bg-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all">
                <option value="أطفال">صحة ورعاية الأطفال</option>
                <option value="مزمنة">الأمراض المزمنة</option>
                <option value="كبار سن">رعاية كبار السن</option>
                <option value="عامة">ثقافة دوائية عامة</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">المحتوى الطبي والنصيحة</label>
              <textarea rows="4" required value={artContent} onChange={(e) => setArtContent(e.target.value)} className="w-full border border-slate-200 p-3 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all resize-none" placeholder="اكتب النصائح والجرعات الطبية المقترحة بدقة وبساطة..." />
            </div>
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-md shadow-emerald-500/10">نشر في المنصة فوراً 🚀</button>
          </form>
        </div>
      </div>

      {/* مودال التعديل */}
      {editingArticle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-right">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">تعديل التوجيه الطبي المنشور</h3>
              <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">عنوان المقال</label>
                <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full border border-slate-200 px-3 py-2 rounded-xl text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">القسم العلاجي</label>
                <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-full border border-slate-200 px-3 py-2 rounded-xl text-sm bg-white outline-none">
                  <option value="أطفال">صحة ورعاية الأطفال</option>
                  <option value="مزمنة">الأمراض المزمنة</option>
                  <option value="كبار سن">رعاية كبار السن</option>
                  <option value="عامة">ثقافة دوائية عامة</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">المحتوى الطبي</label>
                <textarea rows="5" required value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full border border-slate-200 p-3 rounded-xl text-sm outline-none resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors">حفظ التعديلات الحالية ✔️</button>
                <button type="button" onClick={() => setEditingArticle(null)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-2 rounded-xl text-sm hover:bg-slate-200 transition-colors">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* مودال معاينة الروشتة المرفوعة */}
      {viewingPrescUrl && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setViewingPrescUrl(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full p-4 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 border-b pb-2">
              <h3 className="font-black text-slate-800 text-sm">معاينة وفحص الروشتة الطبية المرفوعة</h3>
              <button onClick={() => setViewingPrescUrl(null)} className="text-slate-500 hover:text-slate-700 font-bold text-xs bg-slate-100 px-2 py-1 rounded-lg">✕ إغلاق</button>
            </div>
            <div className="flex justify-center items-center bg-slate-100 rounded-2xl p-2 max-h-[70vh] overflow-y-auto">
              <img src={viewingPrescUrl} alt="الروشتة المرفوعة" className="max-w-full h-auto rounded-xl shadow-inner object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}