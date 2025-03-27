"use client";

import { useEffect, useState } from "react";

function NetworkStatusToast() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="animate-fadeIn fixed left-1/2 top-4 z-[9999] -translate-x-1/2 transform rounded-lg bg-red-500 px-4 py-2 text-sm text-white shadow-lg">
      Mất kết nối mạng. Vui lòng kiểm tra lại!
    </div>
  );
}

export default NetworkStatusToast;
