"use client";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadPDFButton() {
  const handleDownload = async () => {
    const resume = document.getElementById("resume-content");
    if (!resume) return;

    const canvas = await html2canvas(resume, {
      scale: 2,
      ignoreElements: (el) => {
        const style = getComputedStyle(el);
        return (
          style.color.includes("lab(") || style.backgroundColor.includes("lab(")
        );
      },
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Resize canvas to fit page
    const ratio = Math.min(
      pageWidth / canvas.width,
      pageHeight / canvas.height
    );
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Pattharapol_Lakboon_Resume.pdf");
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
