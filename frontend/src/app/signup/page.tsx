
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
  const [theme, setTheme] = useState<'light' | 'dark'>(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const logoSrc = theme === 'dark' ? '/logo.svg' : '/logo-w.svg';

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
      <div className="mb-6 flex items-center justify-center w-[200px] h-[60px] bg-white rounded-xl shadow" style={{background: theme === 'dark' ? '#232A36' : '#fff'}}>
        <img src={logoSrc} alt="CoCred Logo" className="w-[160px] h-[48px] object-contain" />
      </div>
      <div className="w-[420px] bg-[#181F2A] dark:bg-[#181F2A] rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border border-[#3A4252] dark:border-[#3A4252]">
        <div className="w-full flex flex-col items-center mb-5">
          <div className="flex gap-3 w-full justify-center">
            <button
              type="button"
              className={`w-[160px] h-[42px] text-base font-semibold rounded-full transition-colors duration-200 border-2 ${role === 'student' ? 'bg-[#174A8C] text-white border-[#60A5FA]' : 'bg-[#181F2A] text-[#A0AEC0] border-[#174A8C]'}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`w-[160px] h-[42px] text-base font-semibold rounded-full transition-colors duration-200 border-2 ${role === 'faculty' ? 'bg-[#174A8C] text-white border-[#60A5FA]' : 'bg-[#181F2A] text-[#A0AEC0] border-[#174A8C]'}`}
              onClick={() => setRole('faculty')}
            >
              Faculty
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold text-[#E2E8F0] mb-4 mt-2 text-center">Provide the details below</h2>
        <form className="w-full flex flex-col gap-3 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={role === 'student' ? 'Student Email or Phone' : 'Faculty Email or Phone'}
              className="w-full h-[48px] bg-[#232A36] text-white px-4 rounded-lg border border-[#A0AEC0] focus:outline-none focus:border-[#174A8C] text-sm"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[48px] bg-[#232A36] text-white px-4 rounded-lg border border-[#A0AEC0] focus:outline-none focus:border-[#174A8C] text-sm"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
          <div className="w-full flex justify-end">
            <a href="#" className="text-[#A0AEC0] text-sm font-medium hover:underline">Forgotten Email</a>
          </div>
          <button type="button" className="w-full h-[48px] bg-[#174A8C] text-white text-base font-semibold rounded-full transition-colors duration-200 hover:bg-[#3B82F6] mb-2">Verify</button>
        </form>
        <h2 className="text-2xl font-bold text-[#E2E8F0] mb-2 mt-3 text-center">Create a password</h2>
        <p className="text-[#A0AEC0] text-sm mb-4 text-center">For security, your password must be 6 character or more.</p>
        <form className="w-full flex flex-col gap-3 mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[48px] bg-[#232A36] text-white px-4 rounded-lg border border-[#A0AEC0] focus:outline-none focus:border-[#174A8C] text-sm"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
          <div className="relative">
            <input
              type={showRewritePassword ? "text" : "password"}
              placeholder="Rewrite Password"
              className="w-full h-[48px] bg-[#232A36] text-white px-4 rounded-lg border border-[#A0AEC0] focus:outline-none focus:border-[#174A8C] text-sm"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowRewritePassword((prev) => !prev)}
            >
              <img src="/Eye.svg" alt="Show/Hide" width={20} height={20} />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 accent-[#174A8C]" />
            <label htmlFor="remember" className="text-[#A0AEC0] text-sm">Remember password</label>
          </div>
          <button type="button" className="w-full h-[48px] bg-[#174A8C] text-white text-base font-semibold rounded-full transition-colors duration-200 hover:bg-[#3B82F6]">Create Account</button>
        </form>
      </div>
      <div className="mt-4">
        <a href="/login" className="text-[#60A5FA] text-sm font-medium hover:underline">Already have an account? Log in here</a>
      </div>
    </div>
  );
}