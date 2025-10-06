"use client";

import Header from "./Header";
import Contact from "./Contact";
import Skills from "./Skills";
import Experience from "./Experience";
import DownloadPDFButton from "./DownloadPDFButton";

export default function Resume() {
  return (
    <div id="resume-content" className="min-h-screen bg-gray-50 text-gray-800 flex justify-center py-10">
      <div className="bg-white shadow-md w-full max-w-5xl border border-gray-200 flex flex-col">
        {/* Header */}
        <Header />

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-grow">
          {/* Left */}
          <div className="bg-gray-50 border-r border-gray-200 p-6 space-y-8">
            <Contact />
            <Skills />
          </div>

          {/* Right */}
          <div className="md:col-span-2 p-6">
            <Experience />
          </div>
        </div>

        {/* Footer – now pinned to bottom */}

        <footer className="mt-10 bg-green-50 border-t border-green-200 py-6 px-4 text-center">
          <DownloadPDFButton />
          <p className="text-sm text-green-800 mt-4">
            Thanks for checking out my profile. You can download my resume right above 💚
          </p>
          <div className="bg-green-900 h-2 w-full mt-6 rounded"></div>
        </footer>
      </div>
    </div>
  );
}
