"use client";
import { Button } from "@/components/ui/button";

export default function DownloadPDFButton() {
  const handleDownload = async () => {
    try {
      const res = await fetch("/api/export-pdf", { method: "GET" });
      if (!res.ok) {
        const err = await res.text().catch(() => res.statusText);
        console.error("export-pdf failed:", err);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Pattharapol_Lakboon_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("download error:", e);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-green-900 hover:bg-green-700 text-white"
    >
      Download PDF
    </Button>
  );
}
