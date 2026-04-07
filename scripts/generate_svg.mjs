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
        <style>
          @font-face {
            font-family: 'SysMono';
            src: local('ui-monospace'), local('SFMono-Regular'), local('Menlo'), local('Consolas'), local('monospace');
          }
        </style>
      </head>
      <body>
        <script type="module">
          import { prepareWithSegments, layoutWithLines } from 'https://esm.sh/@chenglou/pretext@1.0.6';
          
          window.generate = async () => {
            await document.fonts.ready;

            const text1 = "NLPer · RLer · Open Source Enthusiast";
            const text2 = "Building AGI... Maybe?";
            const text3 = "Keep Learning | Keep Coding | Keep Writing";
            
            const font = '700 20px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';
            
            const p1 = prepareWithSegments(text1, font);
            const p2 = prepareWithSegments(text2, font);
            const p3 = prepareWithSegments(text3, font);
            
            const l1 = layoutWithLines(p1, 800, 30);
            const l2 = layoutWithLines(p2, 800, 30);
            const l3 = layoutWithLines(p3, 800, 30);

            let svg = \`<svg width="820" height="220" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style>
                  .window { fill: #0d1117; stroke: #30363d; stroke-width: 1px; rx: 8px; }
                  .dot-red { fill: #ff5f56; }
                  .dot-yellow { fill: #ffbd2e; }
                  .dot-green { fill: #28c840; }
                  .text {
                    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
                    font-weight: 700;
                    font-size: 20px;
                  }
                  .line1 { fill: #58a6ff; opacity: 0; animation: fadeUp 0.8s ease-out 0.2s forwards; }
                  .line2 { fill: #bc8cff; opacity: 0; animation: fadeUp 0.8s ease-out 0.6s forwards; }
                  .line3 { fill: #ff7b72; opacity: 0; animation: fadeUp 0.8s ease-out 1.0s forwards; }
                  .cursor { fill: #c9d1d9; opacity: 0; animation: blink 1s step-end 1.5s infinite; }
                  
                  @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); filter: drop-shadow(0 0 4px currentColor); }
                  }
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                </style>
              </defs>
              <rect x="10" y="10" width="800" height="200" class="window" />
              <circle cx="35" cy="30" r="6" class="dot-red" />
              <circle cx="55" cy="30" r="6" class="dot-yellow" />
              <circle cx="75" cy="30" r="6" class="dot-green" />
              <g transform="translate(0, 80)">
            \`;
            
            const drawLines = (lines, startY, className) => {
              for (let i = 0; i < lines.length; i++) {
                const y = startY + i * 40;
                const x = (820 - lines[i].width) / 2;
                svg += \`<text x="\${x}" y="\${y}" class="text \${className}">\${lines[i].text}</text>\\n\`;
              }
            };

            drawLines(l1.lines, 0, 'line1');
            drawLines(l2.lines, 40, 'line2');
            drawLines(l3.lines, 80, 'line3');

            // Hardcode cursor position for the fallback display
            svg += \`<rect x="680" y="62" width="12" height="22" class="cursor" />\`;

            svg += \`</g></svg>\`;
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
  console.log('Hero SVG generated successfully!');
  await browser.close();
})();
