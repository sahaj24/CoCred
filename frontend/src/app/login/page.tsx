

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
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mq.matches ? 'dark' : 'light');
      setLogoSrc(mq.matches ? '/logo-w.svg' : '/logo.svg');
      const handler = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? 'dark' : 'light');
        setLogoSrc(e.matches ? '/logo-w.svg' : '/logo.svg');
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
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
  <div className={`min-h-screen flex flex-col items-center justify-center font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#080E18] text-white' : 'bg-white text-[#171717]'}`}> 
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <button
          onClick={handleThemeToggle}
          className="px-4 py-2 rounded-full bg-[#232A36] text-white border border-[#A0AEC0] shadow hover:bg-[#174A8C] transition-colors duration-200"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className={`mb-6 flex items-center justify-center w-[200px] h-[60px] rounded-xl shadow ${theme === 'dark' ? 'bg-[#232A36]' : 'bg-white'}`}> 
        <img src={logoSrc} alt="CoCred Logo" className="w-[160px] h-[48px] object-contain" />
      </div>
      <div className="w-[420px] bg-[#181F2A] dark:bg-[#181F2A] rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border border-[#3A4252] dark:border-[#3A4252]">
        <div className="w-full flex flex-col gap-3 mb-5">
          <button
            type="button"
            className={`w-full h-[50px] text-lg font-semibold rounded-full transition-colors duration-200 ${role === 'faculty' ? 'bg-[#174A8C] text-white border-3 border-[#60A5FA]' : 'bg-[#181F2A] text-[#A0AEC0] border-2 border-[#174A8C]'} dark:${role === 'faculty' ? 'bg-[#174A8C] text-white border-3 border-[#60A5FA]' : 'bg-[#181F2A] text-[#A0AEC0] border-2 border-[#174A8C]'}`}
            onClick={() => setRole('faculty')}
          >
            Faculty
          </button>
          <div className="flex items-center justify-center gap-2 text-[#A0AEC0] text-sm font-medium">
            <span className="w-20 h-px bg-[#3A4252]" />
            <span>OR</span>
            <span className="w-20 h-px bg-[#3A4252]" />
          </div>
          <button
            type="button"
            className={`w-full h-[50px] text-lg font-semibold rounded-full transition-colors duration-200 ${role === 'student' ? 'bg-[#174A8C] text-white border-3 border-[#60A5FA]' : 'bg-[#181F2A] text-[#A0AEC0] border-2 border-[#174A8C]'} dark:${role === 'student' ? 'bg-[#174A8C] text-white border-3 border-[#60A5FA]' : 'bg-[#181F2A] text-[#A0AEC0] border-2 border-[#174A8C]'}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
        </div>
        <form className="w-full flex flex-col gap-3 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={role === 'student' ? 'Student id or email address' : 'Faculty id or email address'}
              className="w-full h-[50px] bg-[#232A36] dark:bg-[#232A36] text-white px-4 rounded-lg border border-[#A0AEC0] focus:outline-none focus:border-[#174A8C] text-sm"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[50px] bg-[#232A36] dark:bg-[#232A36] text-white px-4 rounded-lg border border-[#A0AEC0] focus:outline-none focus:border-[#174A8C] text-sm"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
        </form>
        <div className="w-full flex justify-end mb-4">
          <a href="/forgot" className="text-[#A0AEC0] text-sm font-medium hover:underline">Forgotten password?</a>
        </div>
        <button className="w-full h-[50px] bg-[#174A8C] text-white text-lg font-semibold rounded-full mb-3 transition-colors duration-200 hover:bg-[#3B82F6] wave-shine">Log In</button>
        <div className="w-full flex items-center justify-center gap-2 text-[#A0AEC0] text-sm font-medium my-3">
          <span className="flex-1 h-px bg-[#3A4252]" />
          <span className="px-2">OR</span>
          <span className="flex-1 h-px bg-[#3A4252]" />
        </div>
        <a href="/signup" className="w-full h-[50px] border border-[#A0AEC0] text-white text-lg font-semibold rounded-lg bg-transparent transition-colors duration-200 hover:bg-[#3B82F6] hover:text-white wave-shine flex items-center justify-center">Sign Up</a>
      </div>
    </div>
  );
}
