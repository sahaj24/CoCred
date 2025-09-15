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


export default function ForgotPage() {
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
				<div className={`mb-10 flex items-center justify-center w-[300px] h-[90px] rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
					<img src={logoSrc} alt="CoCred Logo" className="w-[222px] h-[67px] object-contain" />
				</div>
				<div className={`w-[600px] rounded-2xl shadow-xl flex flex-col items-center justify-center p-12 border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
					<h2 className={`text-3xl font-bold mb-6 mt-2 text-left w-full leading-tight ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>What&apos;s your email address or username?</h2>
				<p className={`text-base font-medium mb-6 w-full text-left ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>We&apos;ll help you find your account.<br /><a href="#" className={`underline hover:no-underline transition-colors ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>Can&apos;t reset your password?</a></p>
					<form className="w-full flex flex-col gap-6 mb-6">
						<input
							type="text"
							placeholder="Email address or user id"
							className={`w-full h-[56px] px-6 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mb-2 transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400' : 'bg-white text-slate-800 border-slate-300 placeholder-slate-500'}`}
						/>
						<p className={`text-base mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Check your mail to reset your password.</p>
						<button type="button" className="w-full h-[56px] bg-blue-600 text-white text-lg font-semibold rounded-full transition-all duration-200 hover:bg-blue-700 shadow-lg wave-shine">Continue</button>
					</form>
				<div className="w-full flex justify-center mt-20">
						<a href="#" className={`text-base font-medium hover:underline transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-700'}`}>Use password instead</a>
					</div>
				</div>
			</div>
	);
}
