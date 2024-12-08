"use client";
import { useEffect, useState } from "react";

export default function HomeScrean() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
        // تحقق إذا كان المستخدم يستخدم جهاز iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice =
          /iphone|ipad|ipod/.test(userAgent) && !window.navigator.standalone;
        setIsIos(isIosDevice);

            // تحقق إذا كان التطبيق مثبتًا بالفعل
    setIsStandalone(window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // احفظ الحدث
      console.log(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // عرض نافذة التثبيت
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("تم تثبيت التطبيق بنجاح!");
        } else {
          console.log("المستخدم رفض التثبيت.");
        }
        setDeferredPrompt(null); // إعادة ضبط الحدث
      });
    }
  };

  return (
    <div>
        {isIos && !isStandalone ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white py-4 px-6 rounded text-center">
          <p>
            لإضافة التطبيق إلى الشاشة الرئيسية:
          </p>
          <ol>
            <li>اضغط على زر <strong>المشاركة</strong> (Share).</li>
            <li>اختر <strong>Add to Home Screen</strong>.</li>
          </ol>
        </div>
      ): (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white py-4 px-6 rounded text-center">
      <h1>مرحبًا بك في التطبيق الخاص بنا!</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleInstallClick} disabled={!deferredPrompt}>
        تثبيت التطبيق
        </button>
    </div>
      )}
    </div>
  );
}





export function Home() {
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // تحقق إذا كان المستخدم يستخدم جهاز iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) && !window.navigator.standalone;
    setIsIos(isIosDevice);

    // تحقق إذا كان التطبيق مثبتًا بالفعل
    setIsStandalone(window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  return (
    <div>
      <h1>مرحبًا بك في التطبيق الخاص بنا!</h1>
      {!isIos && !isStandalone && (
        <div style={{ padding: "1em", backgroundColor: "#ffe4c4", border: "1px solid #ffa500" }}>
          <p>
            لإضافة التطبيق إلى الشاشة الرئيسية:
          </p>
          <ol>
            <li>اضغط على زر <strong>المشاركة</strong> (Share).</li>
            <li>اختر <strong>Add to Home Screen</strong>.</li>
          </ol>
        </div>
      )}
    </div>
  );
}

