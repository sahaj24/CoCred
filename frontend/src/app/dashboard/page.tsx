"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [logoSrc, setLogoSrc] = useState('/logo.svg');
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      if (savedTheme) {
        setTheme(savedTheme);
        setLogoSrc(savedTheme === 'dark' ? '/logo.svg' : '/logo-w.svg');
      } else {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(mq.matches ? 'dark' : 'light');
        setLogoSrc(mq.matches ? '/logo-w.svg' : '/logo.svg');
      }
      
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light');
          setLogoSrc(e.matches ? '/logo-w.svg' : '/logo.svg');
        }
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setLogoSrc('/logo.svg');
    } else {
      document.documentElement.classList.remove('dark');
      setLogoSrc('/logo-w.svg');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 text-slate-800'}`}>
      {/* Header */}
      <header className={`backdrop-blur-md border-b ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src={logoSrc} alt="CoCred Logo" width={48} height={48} />
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>CoCred Dashboard</h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Welcome back, {user.user_metadata?.name || user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleThemeToggle}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Card */}
        <div className={`rounded-2xl shadow-xl p-8 mb-8 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.user_metadata?.name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                Welcome, {user.user_metadata?.name || 'User'}!
              </h2>
              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Email: {user.email}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Account created: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Activities Card */}
          <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>My Activities</h3>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl">📝</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Total activities logged</p>
          </div>

          {/* Certificates Card */}
          <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Certificates</h3>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xl">🏆</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Verified certificates</p>
          </div>

          {/* Portfolio Card */}
          <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Portfolio</h3>
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-xl">📁</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">Ready</div>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Portfolio status</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
          <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 text-left">
              <div className="text-2xl mb-2">➕</div>
              <div className="font-semibold">Log Activity</div>
              <div className="text-sm opacity-90">Add new co-curricular activity</div>
            </button>
            
            <button className="p-4 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 text-left">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">View Reports</div>
              <div className="text-sm opacity-90">Analytics and insights</div>
            </button>
            
            <button className="p-4 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 text-left">
              <div className="text-2xl mb-2">📁</div>
              <div className="font-semibold">Portfolio</div>
              <div className="text-sm opacity-90">View your portfolio</div>
            </button>
            
            <button className="p-4 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-200 text-left">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold">Settings</div>
              <div className="text-sm opacity-90">Account preferences</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-2xl shadow-xl p-8 mt-8 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
          <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Recent Activity</h3>
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="text-4xl mb-4">📋</div>
            <p className="text-lg font-medium mb-2">No activities yet</p>
            <p className="text-sm">Start by logging your first co-curricular activity!</p>
            <button className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
              Log Your First Activity
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}