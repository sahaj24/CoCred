
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
export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRewritePassword, setShowRewritePassword] = useState(false);
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [logoSrc, setLogoSrc] = useState('/logo.svg');

  useEffect(() => {
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
      <div className={`mb-8 flex items-center justify-center w-[250px] h-[80px] rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <img src={logoSrc} alt="CoCred Logo" className="w-[222px] h-[67px] object-contain" />
      </div>
      <div className={`w-[540px] rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="w-full flex flex-col items-center mb-6">
          <div className="flex gap-4 w-full justify-center">
            <button
              type="button"
              className={`w-[200px] h-[48px] text-lg font-semibold rounded-full transition-all duration-200 border-2 ${role === 'student' ? 'bg-blue-600 text-white border-blue-600 shadow-lg hover:bg-blue-700' : `${theme === 'dark' ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'}`}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`w-[200px] h-[48px] text-lg font-semibold rounded-full transition-all duration-200 border-2 ${role === 'faculty' ? 'bg-blue-600 text-white border-blue-600 shadow-lg hover:bg-blue-700' : `${theme === 'dark' ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'}`}`}
              onClick={() => setRole('faculty')}
            >
              Faculty
            </button>
          </div>
        </div>
        <h2 className={`text-2xl font-bold mb-6 mt-2 text-center ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Provide the details below</h2>
        <form className="w-full flex flex-col gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={role === 'student' ? 'Student Email or Phone' : 'Faculty Email or Phone'}
              className={`w-full h-[56px] px-6 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-base transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400' : 'bg-white text-slate-800 border-slate-300 placeholder-slate-500'}`}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full h-[48px] px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400' : 'bg-white text-slate-800 border-slate-300 placeholder-slate-500'}`}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
          <div className="w-full flex justify-end">
            <a href="#" className={`text-sm font-medium hover:underline transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'}`}>Forgotten Email</a>
          </div>
          <button type="button" className="w-full h-[48px] bg-blue-600 text-white text-base font-semibold rounded-full transition-all duration-200 hover:bg-blue-700 mb-2 shadow-lg wave-shine">Verify</button>
        </form>
        <h2 className={`text-3xl font-bold mb-2 mt-4 text-center ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Create a password</h2>
        <p className={`text-base mb-6 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>For security, your password must be 6 character or more.</p>
        <form className="w-full flex flex-col gap-4 mb-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full h-[48px] px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400' : 'bg-white text-slate-800 border-slate-300 placeholder-slate-500'}`}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
          <div className="relative">
            <input
              type={showRewritePassword ? "text" : "password"}
              placeholder="Rewrite Password"
              className={`w-full h-[48px] px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400' : 'bg-white text-slate-800 border-slate-300 placeholder-slate-500'}`}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => setShowRewritePassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-5 h-5 accent-blue-600" />
            <label htmlFor="remember" className={`text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Remember password</label>
          </div>
          <button type="button" className="w-full h-[48px] bg-blue-600 text-white text-base font-semibold rounded-full transition-all duration-200 hover:bg-blue-700 shadow-lg wave-shine">Create Account</button>
        </form>
      </div>
      <div className="mt-6">
        <a href="/login" className="text-blue-600 text-base font-medium hover:underline hover:text-blue-700 transition-colors">Already have an account? Log in here</a>
      </div>
    </div>
  );
}