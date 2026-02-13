import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const resumeHtml = path.join(distDir, 'resume', 'index.html');
const outputPdf = path.join(distDir, 'resume.pdf');

if (!fs.existsSync(resumeHtml)) {
  console.error('resume HTML not found at', resumeHtml);
  process.exit(1);
}

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const filePath = path.join(distDir, decodeURIComponent(req.url === '/' ? '/index.html' : req.url));
      const ext = path.extname(filePath);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

const printCSS = `
  :root {
    --bg: #ffffff !important;
    --bg-sidebar: #ffffff !important;
    --bg-card: #ffffff !important;
    --bg-card-hover: #ffffff !important;
    --text: #1a1a1a !important;
    --text-muted: #444444 !important;
    --text-dim: #777777 !important;
    --accent: #2a7abf !important;
    --accent-glow: transparent !important;
    --border: #e0e0e0 !important;
  }

  body { font-size: 13.5px !important; line-height: 1.55 !important; }

  .sidebar, .main-footer, .resume-download-wrapper { display: none !important; }
  .resume-contact { margin-top: 0.5rem !important; font-size: 0.8rem !important; line-height: 1.6 !important; }
  .resume-contact a { color: #2a7abf !important; }
  .resume-contact .sep { color: #999 !important; }
  .main { margin-left: 0 !important; }
  .content { padding: 0 !important; max-width: 100% !important; }

  /* Tighter spacing */
  .page-header { padding: 0 0 1.5rem !important; }
  .page-title { font-size: 1.6rem !important; margin-bottom: 0.3rem !important; }
  .page-description { font-size: 0.88rem !important; margin-bottom: 0 !important; }
  .resume-section { margin-bottom: 1.5rem !important; }
  .resume-section h2 { font-size: 1.1rem !important; margin-bottom: 0.6rem !important; padding-bottom: 0.3rem !important; }
  .resume-entry { margin-bottom: 1.2rem !important; }
  .resume-entry h3 { font-size: 0.9rem !important; margin-bottom: 0.15rem !important; }
  .resume-entry .meta { font-size: 0.75rem !important; margin-bottom: 0.35rem !important; }
  .resume-entry li { font-size: 0.83rem !important; margin-bottom: 0.15rem !important; }
  .resume-entry ul { padding-left: 1rem !important; }
  .resume-entry.compact { margin-bottom: 1.2rem !important; }
  .resume-earlier-label { margin-bottom: 0.5rem !important; margin-top: 0.3rem !important; }

  /* Open all collapsed entries */
  details > summary { display: none !important; }
  details > ul { display: block !important; }

  /* Timeline adjustments for print */
  .resume-timeline { border-left-color: #e0e0e0; padding-left: 1.2rem !important; }
  .resume-timeline .resume-entry::before { background: #999; border-color: #fff; }
  .resume-timeline .resume-entry.current::before { background: #2a7abf; }
  .resume-entry.current {
    background: transparent !important;
    border-left-color: #2a7abf !important;
    padding: 0.8rem !important;
  }

  /* Page title and links */
  .page-title { color: #1a1a1a !important; }
  .resume-section h2 { color: #2a7abf !important; border-bottom-color: #e0e0e0 !important; }

  /* Animations off */
  .fade-in, .reveal { opacity: 1 !important; transform: none !important; animation: none !important; }

  a { color: #2a7abf !important; text-decoration: none !important; }

  /* Page break: keep entries together, allow sections to split */
  .resume-timeline .resume-entry { break-inside: avoid; }
  .resume-section h2 { break-after: avoid; }
  .resume-entry h3 { break-after: avoid; }
  .resume-entry .meta { break-after: avoid; }
  .resume-earlier-label { break-after: avoid; }
  .resume-section:last-of-type { break-inside: avoid; }
`;

async function generatePDF() {
  console.log('Generating resume PDF...');

  const { server, port } = await startServer();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`http://127.0.0.1:${port}/resume/index.html`, { waitUntil: 'networkidle0' });

  // Wait for Google Fonts to load
  await page.evaluateHandle('document.fonts.ready');

  // Inject print overrides
  await page.addStyleTag({ content: printCSS });

  // Force all <details> elements open
  await page.evaluate(() => {
    document.querySelectorAll('details').forEach(d => d.setAttribute('open', ''));
  });

  // For compact entries, inject h3 + meta so they render like regular entries
  await page.evaluate(() => {
    document.querySelectorAll('.resume-entry.compact details').forEach(d => {
      const role = d.querySelector('.summary-role');
      const meta = d.querySelector('.summary-meta');
      if (role) {
        const h3 = document.createElement('h3');
        h3.textContent = role.textContent;
        d.parentElement.insertBefore(h3, d);
        if (meta) {
          const metaDiv = document.createElement('div');
          metaDiv.className = 'meta';
          metaDiv.textContent = meta.textContent;
          d.parentElement.insertBefore(metaDiv, d);
        }
      }
    });
  });

  await page.pdf({
    path: outputPdf,
    format: 'A4',
    margin: { top: '1.2cm', right: '1.4cm', bottom: '1.2cm', left: '1.4cm' },
    printBackground: true,
  });

  await browser.close();
  server.close();
  console.log(`Resume PDF saved to ${outputPdf}`);
}

generatePDF().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
