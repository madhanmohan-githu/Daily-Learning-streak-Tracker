"use client";

import { useEffect, useState } from 'react';
import StreakCard from '@/components/StreakCard';
import StudyButton from '@/components/StudyButton';

interface StreakData {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
}

export default function DashboardPage() {
  const [data, setData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/streak');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 mt-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
          Welcome back!
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Consistency is key. Keep your learning streak alive.
        </p>
      </div>

      {loading ? (
        <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl"></div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <StreakCard
            currentStreak={data?.currentStreak || 0}
            totalDays={data?.totalDays || 0}
            lastStudyDate={data?.lastStudyDate || null}
          />
          <StudyButton onSuccess={fetchStats} />
        </div>
      )}
    </div>
  );
}
