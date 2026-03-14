export default function StreakCard({
  currentStreak,
  totalDays,
  lastStudyDate,
}: {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
}) {
  return (
    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-500/10 hover:border-blue-500/30">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        
        <div className="relative group">
          <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
          <div className="relative bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text text-transparent text-8xl font-black tracking-tight flex items-center justify-center">
            {currentStreak}
            <span className="text-5xl ml-2">🔥</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg uppercase tracking-widest mt-2">Current Streak</p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-6"></div>

        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{totalDays}</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white mb-1 align-bottom truncate w-full px-2" title={lastStudyDate || 'Never'}>
              {lastStudyDate || 'Never'}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Studied</span>
          </div>
        </div>
      </div>
    </div>
  );
}
