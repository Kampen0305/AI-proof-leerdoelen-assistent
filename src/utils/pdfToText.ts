import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js';

export async function pdfToText(file: File): Promise<string> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('PDF is groter dan 10 MB.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => ('str' in item ? item.str : '')).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}
