import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Consultation from './pages/Consultation';
import Prescriptions from './pages/Prescriptions';
import Dashboard from './pages/Dashboard';
import PatientDashboard from './pages/PatientDashboard';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('app_user_role') || null);
  const [currentPatient, setCurrentPatient] = useState(() => {
    const saved = localStorage.getItem('app_current_patient');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('app_current_page') || 'home');

  const [registeredPatients, setRegisteredPatients] = useState(() => {
    const saved = localStorage.getItem('app_registered_patients');
    return saved ? JSON.parse(saved) : [
      { email: 'patient@test.com', password: '123', name: 'أحمد رأفت', phone: '01012345678' }
    ];
  });

  const [medicalArticles, setMedicalArticles] = useState(() => {
    const saved = localStorage.getItem('app_medical_articles');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'الاستخدام الآمن للمضادات الحيوية', category: 'أطفال', content: 'يجب إكمال الجرعة كاملة حتى لو شعر الطفل بالتحسن، وذلك لمنع مقاومة البكتيريا للمضادات الجزيئية.', date: '٣ يونيو ٢٠٢٦' },
      { id: 2, title: 'تنظيم قراءات السكر في الصيام', category: 'مزمنة', content: 'ينصح بفحص السكر بانتظام في الفترات المحددة، ومراجعة جرعة الأنسولين أو الحبوب مع الطبيب المعالج.', date: '٢ يونيو ٢٠٢٦' }
    ];
  });

  const [consultations, setConsultations] = useState(() => {
    const saved = localStorage.getItem('app_consultations');
    return saved ? JSON.parse(saved) : [
      { id: 101, patientEmail: 'patient@test.com', name: 'أحمد رأفت', age: 45, issue: 'أشعر بدوار شديد بعد أخذ جرعة دواء الضغط الجديدة (أملوديبين 5 ملغ)', status: 'تم الرد', doctorReply: 'أهلاً بك يا فندم. الدوار عرض جانبي متوقع في أول أسبوع. ينصح بأخذ الجرعة قبل النوم مباشرة.', time: 'منذ ساعتين' }
    ];
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('app_prescriptions');
    return saved ? JSON.parse(saved) : [
      { id: 201, patientEmail: 'patient@test.com', name: 'أحمد رأفت', fileUrl: 'https://via.placeholder.com/600x800.png?text=Prescription+Demo', fileName: 'roshita_demo.png', note: 'مطلوب تجميع البدائل المتوفرة لو سمحت الميزانية محدودة', status: 'معلقة', doctorReply: '', time: 'منذ ٣٠ دقيقة' }
    ];
  });

  // المزامنة مع LocalStorage
  useEffect(() => {
    if (userRole) localStorage.setItem('app_user_role', userRole);
    else localStorage.removeItem('app_user_role');
  }, [userRole]);

  useEffect(() => {
    if (currentPatient) localStorage.setItem('app_current_patient', JSON.stringify(currentPatient));
    else localStorage.removeItem('app_current_patient');
  }, [currentPatient]);

  useEffect(() => { localStorage.setItem('app_current_page', currentPage); }, [currentPage]);
  useEffect(() => { localStorage.setItem('app_registered_patients', JSON.stringify(registeredPatients)); }, [registeredPatients]);
  useEffect(() => { localStorage.setItem('app_medical_articles', JSON.stringify(medicalArticles)); }, [medicalArticles]);
  useEffect(() => { localStorage.setItem('app_consultations', JSON.stringify(consultations)); }, [consultations]);
  useEffect(() => { localStorage.setItem('app_prescriptions', JSON.stringify(prescriptions)); }, [prescriptions]);

  const registerNewPatient = (patient) => setRegisteredPatients([...registeredPatients, patient]);

  const addConsultation = (newIssue) => {
    setConsultations([
      { id: Date.now(), patientEmail: currentPatient.email, name: currentPatient.name, status: 'معلقة', doctorReply: '', time: 'الآن', ...newIssue },
      ...consultations
    ]);
  };

  const addPrescription = (newPresc) => {
    setPrescriptions([
      { id: Date.now(), patientEmail: currentPatient.email, name: currentPatient.name, status: 'معلقة', doctorReply: '', time: 'الآن', ...newPresc },
      ...prescriptions
    ]);
  };

  const replyToConsultation = (id, replyText) => {
    setConsultations(consultations.map(c => c.id === id ? { ...c, status: 'تم الرد', doctorReply: replyText } : c));
  };

  // 🌟 دالة الرد على الروشتة وصرفها الطبية
  const replyToPrescription = (id, replyText) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status: 'تم الصرف والتجهيز', doctorReply: replyText } : p));
  };

  const deleteConsultation = (id) => setConsultations(consultations.filter(c => c.id !== id));
  const deletePrescription = (id) => setPrescriptions(prescriptions.filter(p => p.id !== id));
  const addMedicalArticle = (newArticle) => setMedicalArticles([{ id: Date.now(), date: 'اليوم', ...newArticle }, ...medicalArticles]);
  const deleteMedicalArticle = (id) => setMedicalArticles(medicalArticles.filter(art => art.id !== id));
  const updateMedicalArticle = (id, updatedFields) => setMedicalArticles(medicalArticles.map(art => art.id === id ? { ...art, ...updatedFields } : art));

  const handleLogout = () => {
    setUserRole(null); setCurrentPatient(null); setCurrentPage('home');
    localStorage.clear();
  };

  if (!userRole) {
    return (
      <Login 
        setUserRole={setUserRole} setCurrentPatient={setCurrentPatient} 
        registeredPatients={registeredPatients} registerNewPatient={registerNewPatient} 
      />
    );
  }

  const whatsappLink = "https://wa.me/201094682047";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans" dir="rtl">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} userRole={userRole} setUserRole={handleLogout} currentPatient={currentPatient} />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        {userRole === 'doctor' ? (
          <Dashboard 
            consultations={consultations} prescriptions={prescriptions} 
            replyToConsultation={replyToConsultation} replyToPrescription={replyToPrescription} // تمرير الدالة هنا
            deleteConsultation={deleteConsultation} deletePrescription={deletePrescription} 
            addMedicalArticle={addMedicalArticle} deleteMedicalArticle={deleteMedicalArticle} 
            updateMedicalArticle={updateMedicalArticle} articles={medicalArticles} 
          />
        ) : (
          (() => {
            switch (currentPage) {
              case 'home': return <Home setPage={setCurrentPage} patientName={currentPatient?.name} articles={medicalArticles} />;
              case 'consultation': return <Consultation addConsultation={addConsultation} setPage={setCurrentPage} />;
              case 'prescriptions': return <Prescriptions addPrescription={addPrescription} setPage={setCurrentPage} />;
              case 'patient_dashboard': 
                return (
                  <PatientDashboard 
                    consultations={consultations.filter(c => c.patientEmail === currentPatient.email)} 
                    prescriptions={prescriptions.filter(p => p.patientEmail === currentPatient.email)} 
                    deleteConsultation={deleteConsultation}
                  />
                );
              default: return <Home setPage={setCurrentPage} patientName={currentPatient?.name} articles={medicalArticles} />;
            }
          })()
        )}
      </main>
      <Footer whatsappLink={whatsappLink} setCurrentPage={setCurrentPage} userRole={userRole} />
    </div>
  );
}

export default App;