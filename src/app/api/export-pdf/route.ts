export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  let browser: any = null;
  try {
    const puppeteerMod = await import("puppeteer");
    const puppeteer = puppeteerMod.default || puppeteerMod;

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // helper: sleep (replacement for page.waitForTimeout)
    const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

    // บังคับ user agent เป็น desktop browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // NOTE: ใช้ viewport กว้าง (desktop) ก่อนให้ layout เป็นแบบ desktop (grid 3-col)
    const desktopWidthPx = 1400;
    const desktopHeightPx = 1200;
    await page.setViewport({ width: desktopWidthPx, height: desktopHeightPx, deviceScaleFactor: 1 });

    // กำหนดฟังก์ชันแปลง mm <-> px (96dpi)
    const mmToPx = (mm: number) => Math.round(mm * 3.779527559); // 1mm = 96/25.4 px
    const a4WidthPx = mmToPx(210);
    const a4HeightPx = mmToPx(297);

    // ไปที่หน้า resume (ใช้ path ที่ถูกต้อง)
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    // รอฟอนต์/สไตล์/JS client-side ปรับ layout ให้เสร็จ
    await sleep(1000);

    // วัดความกว้าง/สูงของเนื้อหา ณ ขนาด desktop (เพื่อยืนยัน layout เป็น desktop)
    const { contentHeightPx, contentWidthPx } = await page.evaluate(() => {
      const el = document.querySelector("#resume-content");
      if (!el) return { contentHeightPx: 0, contentWidthPx: 0 };
      const rect = (el as HTMLElement).getBoundingClientRect();
      const h = Math.ceil((el as HTMLElement).scrollHeight || rect.height);
      const w = Math.ceil(rect.width);
      return { contentHeightPx: h, contentWidthPx: w };
    });

    // ฉีด CSS เฉพาะสำหรับการพิมพ์ (ไม่เปลี่ยน layout ตอน screen)
    await page.addStyleTag({
      content: `
        @page { size: A4; margin: 10mm; }
        @media print {
          html, body { width: 210mm; height: auto; margin: 0; padding: 0; background: transparent; }
          /* container ให้พอดีกับ A4 minus margins (210 - 2*10 = 190mm) */
          #resume-content { min-height: auto !important; max-width: 190mm !important; margin: 0 auto !important; padding: 0 !important; }
          /* เอาเงา/rounded/border ออกสำหรับ print */
          #resume-content .shadow-md, #resume-content .shadow, #resume-content { box-shadow: none !important; border: none !important; border-radius: 0 !important; }
          /* ซ่อนปุ่ม/องค์ประกอบที่ไม่ต้องการใน PDF */
          footer, .no-print, #download-pdf-btn, button { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
          img, svg { max-width: 100% !important; height: auto !important; }
          .min-h-screen { min-height: auto !important; }
          .page-break { page-break-before: always; break-before: page; }
          /* ปรับฟอนต์/spacing สำหรับ print ถ้าจำเป็น */
          body { font-size: 11px; line-height: 1.1; }
          .p-6 { padding: 8px !important; }
          .space-y-8 > * + * { margin-top: 6px !important; }
        }
      `,
    });

    // ให้เพจใช้ media=print ตอน generate PDF
    if (typeof page.emulateMediaType === "function") {
      await page.emulateMediaType("print");
    } else if ((page as any).emulateMedia) {
      await (page as any).emulateMedia({ media: "print" });
    }

    // รอให้ CSS ที่ฉีดมีผล
    await sleep(200);

    // printable height (A4 minus top+bottom margin 10mm each)
    const printableHeightPx = a4HeightPx - mmToPx(10 * 2);
    let pdfScale = 1;

    if (contentHeightPx > printableHeightPx && contentHeightPx > 0) {
      pdfScale = printableHeightPx / contentHeightPx;
      pdfScale = Math.max(0.45, Math.min(1, pdfScale));
      console.log("Adjusting PDF scale:", pdfScale, "contentHeightPx:", contentHeightPx, "printableHeightPx:", printableHeightPx, "contentWidthPx:", contentWidthPx);
    }

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
      preferCSSPageSize: true,
      scale: pdfScale,
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Pattharapol_Lakboon_Resume.pdf",
      },
    });
  } catch (err: any) {
    console.error("export-pdf error:", err);
    return new NextResponse(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    try {
      if (browser) await browser.close();
    } catch {
      // ignore
    }
  }
}