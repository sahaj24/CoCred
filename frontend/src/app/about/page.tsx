"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-[#AEC2F6] text-[#181F2A] px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-[#181F2A] rounded-2xl shadow-lg p-8 border border-[#C5CDDE]">
  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#174A8C] dark:text-[#AEC2F6] text-center">About CoCred</h1>
  <h3 className="text-lg font-bold mb-2">Problem Statement Title</h3>
  <p className="mb-2">Centralised Digital Platform for Comprehensive student activity record in HEIs</p>
  <h3 className="text-lg font-bold mb-2">Theme</h3>
  <p className="mb-6">Smart Education</p>
  <h2 className="text-xl font-semibold mb-2 text-center">Proposed Solution</h2>
  <p className="mb-6 text-center">An all-in-one platform to log, track, and certify student's co-curricular work with QR-verifiable proofs and a clean, shareable portfolio.</p>
  <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>A clean web + mobile app where students log activities in seconds.</li>
          <li>Faculty approve with one tap for quick validation.</li>
          <li>The system generates a signed PDF with a QR code for easy and fast verification.</li>
          <li>The student’s portfolio is automatically updated with every approved activity.</li>
          <li>Supports offline submissions for areas with weak or no internet connectivity.</li>
          <li>Ensures fraud prevention through QR-based verification.</li>
          <li>Can link profiles to unique IDs for consistent and reliable identity management.</li>
        </ul>
        <h3 className="text-lg font-bold mb-2">How It Addresses the Problem</h3>
        <p className="mb-6">It replaces scattered emails, paper files, and spreadsheets with one easy system to log and approve co-curricular activities. This makes sharing and verifying achievements quick and hassle-free for jobs and scholarships.</p>
        <h3 className="text-lg font-bold mb-2">Innovation and Uniqueness</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Offline-first submission for patchy connectivity</li>
          <li>QR-based verification to prevent fraud</li>
          <li>Modular design that can link profiles to APAAR ID for consistent identity</li>
          <li>Optional DigiLocker publishing</li>
          <li>Tailored for J&K now, ready to scale nationwide later</li>
        </ul>
        <h3 className="text-lg font-bold mb-2">Problem Statement Title</h3>
        <p className="mb-2">Centralised Digital Platform for Comprehensive student activity record in HEIs</p>
        <h3 className="text-lg font-bold mb-2">Theme</h3>
        <p>Smart Education</p>
      </div>
    </div>
  );
}
