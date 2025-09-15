

"use client";
import { useState, useEffect } from "react";

function useThemeLogo() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
  const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDark ? '/logo-w.svg' : '/logo.svg';
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'faculty' | 'student'>('faculty');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [logoSrc, setLogoSrc] = useState('/logo.svg');

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      // Check localStorage first, then system preference
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
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
  <div className={`min-h-screen flex flex-col items-center justify-center font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 text-slate-800'}`}> 
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <button
          onClick={handleThemeToggle}
          className={`px-4 py-2 rounded-full shadow-lg border transition-all duration-200 ${theme === 'dark' ? 'bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <div className={`mb-6 flex items-center justify-center w-[200px] h-[60px] rounded-xl shadow-lg ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}> 
        <img src={logoSrc} alt="CoCred Logo" className="w-[160px] h-[48px] object-contain" />
      </div>
      <div className={`w-[540px] rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="w-full flex flex-col gap-4 mb-6">
          <button
            type="button"
            className={`w-full h-[50px] text-lg font-semibold rounded-full transition-all duration-200 ${role === 'faculty' ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' : `${theme === 'dark' ? 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 border-2 border-slate-300 hover:bg-slate-200'}`}`}
            onClick={() => setRole('faculty')}
          >
            Faculty
          </button>
          <div className={`flex items-center justify-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className={`w-20 h-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`} />
            <span>OR</span>
            <span className={`w-20 h-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`} />
          </div>
          <button
            type="button"
            className={`w-full h-[50px] text-lg font-semibold rounded-full transition-all duration-200 ${role === 'student' ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' : `${theme === 'dark' ? 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 border-2 border-slate-300 hover:bg-slate-200'}`}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
        </div>
        <form className="w-full flex flex-col gap-4 mb-2">
          <div className="relative">
            <input
              type="text"
              placeholder={role === 'student' ? 'Student id or email address' : 'Faculty id or email address'}
              className={`w-full h-[50px] px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400' : 'bg-white text-slate-800 border-slate-300 placeholder-slate-500'}`}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full h-[50px] px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400' : 'bg-white text-slate-800 border-slate-300 placeholder-slate-500'}`}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
        </form>
        <div className="w-full flex justify-end mb-6">
          <a href="/forgot" className={`text-sm font-medium hover:underline transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'}`}>Forgotten password?</a>
        </div>
        <button className="w-[497px] h-[70px] bg-blue-600 text-white text-xl font-semibold rounded-full mb-4 transition-all duration-200 hover:bg-blue-700 shadow-lg wave-shine">Log In</button>
        <div className={`w-full flex items-center justify-center gap-2 text-sm font-medium my-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className={`flex-1 h-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`} />
          <span className="px-2">OR</span>
          <span className={`flex-1 h-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`} />
        </div>
        <a href="/signup" className={`w-[500px] h-[70px] border-2 text-xl font-semibold rounded-lg transition-all duration-200 shadow-lg wave-shine flex items-center justify-center ${theme === 'dark' ? 'border-slate-600 text-slate-200 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>Sign Up</a>
      </div>
    </div>
  );
}
