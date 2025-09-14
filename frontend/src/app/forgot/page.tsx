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
			<div className={`min-h-screen flex flex-col items-center justify-center font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#080E18] text-white' : 'bg-[#AEC2F6] text-[#171717]'}`}> 
				<div className="absolute top-6 right-6 flex items-center gap-2">
					<button
						onClick={handleThemeToggle}
						className="px-4 py-2 rounded-full bg-[#232A36] text-white border border-[#A0AEC0] shadow hover:bg-[#174A8C] transition-colors duration-200"
					>
						{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
					</button>
				</div>
				<div className="mb-10 flex items-center justify-center w-[300px] h-[90px] bg-white rounded-xl shadow" style={{background: theme === 'dark' ? '#232A36' : '#fff'}}>
					<img src={logoSrc} alt="CoCred Logo" className="w-[222px] h-[67px] object-contain" />
				</div>
				<div className={`w-[600px] rounded-2xl shadow-lg flex flex-col items-center justify-center p-12 border ${theme === 'dark' ? 'bg-[#181F2A] border-[#3A4252]' : 'bg-[#C5CDDE] border-[#C5CDDE]'}`}>
					<h2 className={`text-3xl font-bold mb-6 mt-2 text-left w-full leading-tight ${theme === 'dark' ? 'text-[#E2E8F0]' : 'text-black'}`}>What's your email address or username?</h2>
				<p className={`text-base font-medium mb-6 w-full text-left ${theme === 'dark' ? 'text-white' : 'text-black'}`}>We'll help you find your account.<br /><a href="#" className={`underline ${theme === 'dark' ? 'text-[#60A5FA]' : 'text-[#174A8C]'}`}>Can't reset your password?</a></p>
					<form className="w-full flex flex-col gap-6 mb-6">
						<input
							type="text"
							placeholder="Email address or user id"
							className="w-full h-[56px] bg-[#232A36] text-white px-6 rounded-lg border border-[#A0AEC0] focus:outline-none focus:border-[#174A8C] text-lg mb-2"
						/>
						<p className={`text-base mb-2 ${theme === 'dark' ? 'text-[#A0AEC0]' : 'text-black'}`}>Check your mail to reset your password.</p>
						<button type="button" className="w-full h-[56px] bg-[#174A8C] text-white text-lg font-semibold rounded-full transition-colors duration-200 hover:bg-[#3B82F6]">Continue</button>
					</form>
				<div className="w-full flex justify-center mt-20">
						<a href="#" className={`text-base font-medium hover:underline ${theme === 'dark' ? 'text-[#A0AEC0]' : 'text-black'}`}>Use password instead</a>
					</div>
				</div>
			</div>
	);
}
