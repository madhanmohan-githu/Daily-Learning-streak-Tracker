"use client";

import { useEffect, useState } from 'react';
import HistoryList from '@/components/HistoryList';

export default function HistoryPage() {
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        const json = await res.json();
        setDates(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Study History
        </h1>
      </div>

      {loading ? (
        <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <HistoryList dates={dates} />
        </div>
      )}
    </div>
  );
}
