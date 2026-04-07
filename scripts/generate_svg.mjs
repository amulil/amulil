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
      <body>
        <script type="module">
          import { prepareWithSegments, layoutWithLines } from 'https://esm.sh/@chenglou/pretext@1.0.6';
          
          window.generate = async () => {
            await document.fonts.ready;

            const font = '700 18px ui-monospace, SFMono-Regular, "Cascadia Code", Menlo, Consolas, monospace';

            // We break down the profile into syntax-highlighted code tokens.
            const codeLines = [
              [
                { text: "const ", color: "#ff7b72" },
                { text: "amu ", color: "#79c0ff" },
                { text: "= ", color: "#c9d1d9" },
                { text: "{", color: "#ffd700" }
              ],
              [
                { text: "  roles", color: "#79c0ff" },
                { text: ": ", color: "#c9d1d9" },
                { text: "[", color: "#da70d6" },
                { text: '"NLPer"', color: "#a5d6ff" },
                { text: ", ", color: "#c9d1d9" },
                { text: '"RLer"', color: "#a5d6ff" },
                { text: ", ", color: "#c9d1d9" },
                { text: '"Open Source Enthusiast"', color: "#a5d6ff" },
                { text: "]", color: "#da70d6" },
                { text: ",", color: "#c9d1d9" }
              ],
              [
                { text: "  mission", color: "#79c0ff" },
                { text: ": ", color: "#c9d1d9" },
                { text: '"Building AGI... Maybe?"', color: "#a5d6ff" },
                { text: ",", color: "#c9d1d9" }
              ],
              [
                { text: "  motto", color: "#79c0ff" },
                { text: ": ", color: "#c9d1d9" },
                { text: '"Keep Learning | Keep Coding | Keep Writing"', color: "#a5d6ff" }
              ],
              [
                { text: "};", color: "#ffd700" }
              ],
              [
                { text: "", color: "transparent" } // Empty line
              ],
              [
                { text: "amu", color: "#79c0ff" },
                { text: ".", color: "#c9d1d9" },
                { text: "execute", color: "#d2a8ff" },
                { text: "();", color: "#c9d1d9" }
              ]
            ];

            let svg = \`<svg width="820" height="360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#050505" />
                  <stop offset="100%" stop-color="#0f111a" />
                </linearGradient>
                
                <!-- Glowing Ambient Orbs -->
                <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(88, 166, 255, 0.15)" />
                  <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
                </radialGradient>
                <radialGradient id="glowPurple" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(210, 168, 255, 0.12)" />
                  <stop offset="100%" stop-color="rgba(210, 168, 255, 0)" />
                </radialGradient>

                <style>
                  .window { fill: url(#bgGrad); stroke: #30363d; stroke-width: 1px; rx: 12px; }
                  .dot-red { fill: #ff5f56; }
                  .dot-yellow { fill: #ffbd2e; }
                  .dot-green { fill: #28c840; }
                  
                  .code-text {
                    font-family: ui-monospace, SFMono-Regular, "Cascadia Code", Menlo, Consolas, monospace;
                    font-weight: 700;
                    font-size: 16px;
                    white-space: pre;
                  }
                  
                  /* Staggered Slide In Animation */
                  .line-anim {
                    opacity: 0;
                    animation: slideRight 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                  }
                  .delay-0 { animation-delay: 0.2s; }
                  .delay-1 { animation-delay: 0.4s; }
                  .delay-2 { animation-delay: 0.6s; }
                  .delay-3 { animation-delay: 0.8s; }
                  .delay-4 { animation-delay: 1.0s; }
                  .delay-5 { animation-delay: 1.2s; }
                  .delay-6 { animation-delay: 1.4s; }

                  .cursor {
                    fill: #58a6ff;
                    opacity: 0;
                    animation: blink 1s step-end infinite;
                    animation-delay: 2.0s; /* Start blinking after typing */
                  }

                  @keyframes slideRight {
                    from { opacity: 0; transform: translateX(-15px); }
                    to { opacity: 1; transform: translateX(0); }
                  }

                  @keyframes blink {
                    0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #58a6ff); }
                    50% { opacity: 0; }
                  }

                  /* Background panning grid */
                  .grid-group { animation: panGrid 20s linear infinite; }
                  @keyframes panGrid {
                    from { transform: translateY(0); }
                    to { transform: translateY(40px); }
                  }
                </style>
                
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
                  <path d="M 0 40 L 40 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
                </pattern>
              </defs>

              <!-- Deep Space Background & Grid -->
              <rect width="820" height="360" class="window" />
              
              <svg width="820" height="360" viewBox="0 0 820 360">
                <g class="grid-group">
                  <rect x="0" y="-40" width="820" height="440" fill="url(#grid)" />
                </g>
              </svg>

              <!-- Floating Ambient Orbs -->
              <circle cx="150" cy="150" r="250" fill="url(#glowCyan)">
                <animate attributeName="cx" values="150; 250; 150" dur="15s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="200" r="300" fill="url(#glowPurple)">
                <animate attributeName="cy" values="200; 100; 200" dur="20s" repeatCount="indefinite" />
              </circle>

              <!-- Mac Window Header -->
              <circle cx="30" cy="26" r="6" class="dot-red" />
              <circle cx="50" cy="26" r="6" class="dot-yellow" />
              <circle cx="70" cy="26" r="6" class="dot-green" />
              <text x="410" y="32" fill="#8b949e" font-family="ui-monospace, monospace" font-size="14px" text-anchor="middle" font-weight="600">amu@macbook: ~/agi-workspace</text>
              <line x1="0" y1="52" x2="820" y2="52" stroke="#30363d" stroke-width="1" />

              <!-- Syntax Highlighted Code (Measured by pretext) -->
              <g transform="translate(0, 90)">
            \`;
            
            let currentY = 0;
            let lastX = 40;
            let lastY = 0;

            codeLines.forEach((line, lineIndex) => {
              let currentX = 40; // padding left
              let lineSvg = \`<g class="line-anim delay-\${lineIndex}">\`;

              // Render line number
              lineSvg += \`<text x="25" y="\${currentY}" fill="#484f58" font-family="ui-monospace, monospace" font-size="14px" text-anchor="end">\${lineIndex + 1}</text>\`;

              line.forEach(segment => {
                // IMPORTANT: we tell pretext to preserve all spaces (pre-wrap) so we can stitch tokens perfectly
                const p = prepareWithSegments(segment.text, font, { whiteSpace: 'pre-wrap' });
                const layout = layoutWithLines(p, 1000, 30);
                
                // Fallback width estimation if pretext fails for any reason
                const width = layout.lines[0]?.width || (segment.text.length * 9.6);

                lineSvg += \`<text x="\${currentX}" y="\${currentY}" fill="\${segment.color}" class="code-text">\${segment.text}</text>\`;
                currentX += width;
              });

              lineSvg += \`</g>\`;
              svg += lineSvg;
              
              if (line.length > 0 && line[0].text !== "") {
                lastX = currentX;
                lastY = currentY;
              }
              currentY += 32;
            });

            // The Blinking Cursor
            svg += \`<rect x="\${lastX + 5}" y="\${lastY - 15}" width="10" height="20" class="cursor delay-6" />\`;

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
