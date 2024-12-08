"use client";
import { useEffect, useState } from "react";

export default function HomeScrean() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
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
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white py-4 px-6 rounded text-center">
      <h1>مرحبًا بك في التطبيق الخاص بنا!</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleInstallClick} disabled={!deferredPrompt}>
        تثبيت التطبيق
        </button>
    </div>
  );
}
