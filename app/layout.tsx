import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daily Learning Streak Tracker',
  description: 'Track your daily learning habits and build consistency.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100 antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 w-full relative">
            <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none -z-10" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none -z-10 rounded-full" />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
