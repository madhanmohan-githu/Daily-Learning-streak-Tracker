export default function HistoryList({ dates }: { dates: string[] }) {
  if (dates.length === 0) {
    return (
      <div className="text-center py-12 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 border-dashed">
        <p className="text-gray-500 dark:text-gray-400">No study sessions recorded yet. Start today!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">Past Study Sessions</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Your complete history of learning days.</p>
      </div>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
        {dates.map((date, index) => (
          <li key={index} className="px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-300">{date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
