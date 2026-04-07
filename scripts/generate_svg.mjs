import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet">
      </head>
      <body>
        <script type="module">
          import { prepareWithSegments, layoutWithLines } from 'https://esm.sh/@chenglou/pretext@1.0.6';
          
          window.generate = async () => {
            await document.fonts.ready;

            const text1 = "NLPer · RLer · Open Source Enthusiast";
            const text2 = "Building AGI... Maybe?";
            const text3 = "Keep Learning | Keep Coding | Keep Writing";
            
            const font = '700 28px "Fira Code"';
            
            const p1 = prepareWithSegments(text1, font);
            const p2 = prepareWithSegments(text2, font);
            const p3 = prepareWithSegments(text3, font);
            
            const l1 = layoutWithLines(p1, 820, 36);
            const l2 = layoutWithLines(p2, 820, 36);
            const l3 = layoutWithLines(p3, 820, 36);

            let svg = \`<svg width="820" height="200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style>
                  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap');
                  .text {
                    font-family: 'Fira Code', monospace;
                    font-weight: 700;
                    font-size: 28px;
                    text-anchor: middle;
                    transition: all 0.3s ease;
                    cursor: crosshair;
                  }
                  .text:hover {
                    font-size: 32px;
                    filter: drop-shadow(0 0 8px currentColor);
                  }
                  .line1 { animation: fadeUp 1.2s ease-out forwards; opacity: 0; fill: #38bdf8; }
                  .line1:hover { fill: #7dd3fc; transform: translateY(-5px); }
                  
                  .line2 { animation: fadeUp 1.2s ease-out 0.6s forwards; opacity: 0; fill: #f472b6; }
                  .line2:hover { fill: #f9a8d4; transform: translateY(-5px); }
                  
                  .line3 { animation: fadeUp 1.2s ease-out 1.2s forwards; opacity: 0; fill: #a78bfa; }
                  .line3:hover { fill: #c4b5fd; transform: translateY(-5px); }
                  
                  @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                </style>
              </defs>
              <rect width="820" height="200" fill="transparent" />
              <!-- Invisible rects for better hover hitboxes -->
              <rect x="0" y="30" width="820" height="40" fill="transparent" class="hitbox" />
              <rect x="0" y="80" width="820" height="40" fill="transparent" class="hitbox" />
              <rect x="0" y="130" width="820" height="40" fill="transparent" class="hitbox" />
            \`;
            
            // For text-anchor: middle, x should be 50% (410)
            const drawLines = (lines, startY, className) => {
              for (let i = 0; i < lines.length; i++) {
                const y = startY + i * 40;
                svg += \`<text x="410" y="\${y}" class="text \${className}">\${lines[i].text}</text>\\n\`;
              }
            };

            drawLines(l1.lines, 60, 'line1');
            drawLines(l2.lines, 110, 'line2');
            drawLines(l3.lines, 160, 'line3');

            svg += \`</svg>\`;
            return svg;
          };
          window.moduleLoaded = true;
        </script>
      </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.waitForFunction('window.moduleLoaded === true');
  const svg = await page.evaluate(() => window.generate());
  
  fs.writeFileSync(path.join(process.cwd(), 'hero.svg'), svg);
  console.log('SVG generated successfully!');
  await browser.close();
})();
