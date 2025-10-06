// pages/resume.tsx
export default function ResumePage() {
  return (
    <section className="py-10 px-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Download Resume</h2>
      <a
        href="/updated-resume.pdf"
        download
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Download PDF
      </a>
    </section>
  );
}
