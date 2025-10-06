"use client";

import Header from "./Header";
import Contact from "./Contact";
import Skills from "./Skills";
import Experience from "./Experience";

export default function Resume() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex justify-center py-10">
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
        <div className="bg-green-900 h-5 w-full mt-auto"></div>
      </div>
    </div>
  );
}
