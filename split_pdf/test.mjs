import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs/promises';
const pdfPath = 'hko.pdf'; // Replace with your PDF file path

async function loadPdf() {
  const pdfBytes = await fs.readFile(pdfPath);
  return pdfBytes;
}

async function readPdf() {
  const pdfBytes = await loadPdf();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  // Now you can work with the pdfDoc object
  const numPages = pdfDoc.getPageCount();
  // console.log(`Number of pages: ${numPages}`);

  for (let i = 0; i < 48 + 1; i++) {
    // Create a new PDF document
    const newPdfDoc = await PDFDocument.create();

    // Copy the current page from the original document
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);

    // Add the copied page to the new document
    newPdfDoc.addPage(copiedPage);

    // Save the new document
    const singlePagePdfByteArray = await newPdfDoc.save();

    await fs.writeFile(
      `single_page_${String(i - 1).padStart(2, '0')}.pdf`,
      singlePagePdfByteArray,
    );
  }
}

readPdf();
