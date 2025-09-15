"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroPage() {
  const { user, signOut, loading } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [logoSrc, setLogoSrc] = useState('/logo.svg');
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

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
    setTheme((prev: 'light' | 'dark') => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-300 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-[#0a0a0a] via-[#181F2A] to-[#080E18] text-white' : 'bg-gradient-to-b from-[#eaf0fb] via-[#AEC2F6] to-[#C5CDDE] text-[#171717]'}`}> 
      {/* Navbar - blended with background */}
      <nav className="w-full flex items-center justify-between px-8 md:px-20 py-4 fixed top-0 left-0 z-40 bg-transparent backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Image src={logoSrc} alt="Logo" width={80} height={80} />
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[#174A8C] dark:text-[#174A8C] font-medium hover:underline flex items-center">Home</a>
          <a href="/about" className="text-[#174A8C] dark:text-[#174A8C] font-medium hover:underline flex items-center">About</a>
          {user ? (
            <div className="flex items-center gap-4">
              <a href="/dashboard" className="text-[#174A8C] dark:text-[#174A8C] font-medium hover:underline flex items-center">Dashboard</a>
              <span className="text-[#174A8C] font-medium">Welcome, {user.user_metadata?.name || user.email}</span>
              <button 
                onClick={signOut}
                className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors duration-200 flex items-center"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <a href="/signup" className="ml-4 px-6 py-2 rounded-full bg-[#174A8C] text-white font-semibold shadow hover:bg-[#2563eb] transition-colors duration-200 flex items-center">Signup</a>
          )}
        </div>
      </nav>
      <div className="pt-32"> {/* Add more top padding to create space between navbar and main content */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Showcase Your Achievements. Certify Your Journey.</h1>
          <p className="text-lg md:text-xl text-[#174A8C] font-medium max-w-xl">A smart, centralised platform for students to log, track, and share co-curricular work—QR-verified, portfolio-ready, and built for the future.</p>
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-3 rounded-full bg-[#174A8C] text-white font-semibold shadow hover:bg-[#2563eb] transition-colors duration-200">Let&apos;s Talk</button>
            <button className="px-6 py-3 rounded-full bg-white text-[#174A8C] font-semibold shadow border border-[#174A8C] hover:bg-[#eaf0fb] transition-colors duration-200">Exit Project</button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          {/* QR Scan Illustration */}
          <div className="w-[320px] h-[420px] rounded-3xl shadow-lg flex items-center justify-center bg-white dark:bg-[#232A36]">
            <Image src="/qrscan.jpg" alt="QR Scan" width={320} height={420} className="w-full h-full object-contain rounded-3xl" />
          </div>
          {/* Example floating tags */}
          <div className="absolute top-8 left-0 bg-white text-[#174A8C] px-4 py-2 rounded-full shadow font-semibold">QR-Verification</div>
          <div className="absolute top-24 right-0 bg-white text-[#174A8C] px-4 py-2 rounded-full shadow font-semibold">Digital Certification</div>
          <div className="absolute bottom-8 left-8 bg-white text-[#174A8C] px-4 py-2 rounded-full shadow font-semibold">Smart Portfolio</div>
        </div>
      </section>
      </div>
      <button
        onClick={handleThemeToggle}
        className="fixed bottom-8 right-8 px-5 py-3 rounded-full bg-[#232A36] text-white border border-[#A0AEC0] shadow hover:bg-[#174A8C] transition-colors duration-200 z-50"
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}