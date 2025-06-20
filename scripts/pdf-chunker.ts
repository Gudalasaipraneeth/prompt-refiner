import fs from 'fs';
import pdf from 'pdf-parse';

interface Chunk { text: string; page: number; }

/**
 * Reads a PDF and splits it into ~300-word chunks.
 */
async function chunkPdf(filePath: string): Promise<Chunk[]> {
  const dataBuffer = fs.readFileSync(filePath);
  const { text } = await pdf(dataBuffer);

  const words = text.split(/\s+/);
  const chunks: Chunk[] = [];
  const chunkSize = 300;
  
  for (let i = 0; i < words.length; i += chunkSize) {
    const slice = words.slice(i, i + chunkSize).join(' ');
    // naïvely assign page = Math.floor(i / chunkSize) + 1
    chunks.push({ text: slice, page: Math.floor(i / chunkSize) + 1 });
  }
  return chunks;
}

// CLI entrypoint
if (require.main === module) {
  const [,, pdfPath, outJson] = process.argv;
  if (!pdfPath || !outJson) {
    console.error('Usage: ts-node pdf-chunker.ts <input.pdf> <output.json>');
    process.exit(1);
  }
  chunkPdf(pdfPath)
    .then(chunks => {
      fs.writeFileSync(outJson, JSON.stringify(chunks, null, 2));
      console.log(`Wrote ${chunks.length} chunks to ${outJson}`);
    })
    .catch(console.error);
}
