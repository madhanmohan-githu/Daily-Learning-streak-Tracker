"use client";

import { useState } from 'react';

export default function StudyButton({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleStudy = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch('/api/study', { method: 'POST' });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMsg(data.message);
        onSuccess(); // Trigger parent refresh
      } else {
        setErrorMsg(data.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <button
        onClick={handleStudy}
        disabled={loading}
        className="group relative inline-flex h-16 w-full sm:w-80 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:w-full hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/50 disabled:bg-gray-400 disabled:pointer-events-none"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </span>
        <span className="absolute flex items-center justify-center transition-all duration-300 group-hover:-translate-y-12">
          {loading ? "Recording..." : "I Studied Today"}
        </span>
      </button>

      <div className="h-10 mt-4 flex items-center justify-center w-full">
        {errorMsg && (
          <div className="text-red-500 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="text-green-600 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
            {successMsg}
          </div>
        )}
      </div>
    </div>
  );
}
