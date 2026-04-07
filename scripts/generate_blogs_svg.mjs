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

            const blogs = [
              { title: "深度强化学习（DRL）算法 2 —— PPO 之 GRPO 篇", date: "2024-03" },
              { title: "AI Infra 01 - Paged Attention：大语言模型推理的内存优化利器", date: "2024-02" },
              { title: "使用 vLLM Production Stack 快速在单卡上部署多个 Embedding 模型实例", date: "2024-01" },
              { title: "cleanvllm: 从 0 到 1 构建一个 vLLM", date: "2023-12" }
            ];
            
            const font = '400 16px "Fira Code"';
            
            let svg = \`<svg width="820" height="240" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style>
                  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');
                  .bg { fill: transparent; }
                  .container { transform: translateY(20px); }
                  
                  .blog-group { cursor: pointer; }
                  .blog-bg { 
                    fill: #1e293b; 
                    rx: 8; 
                    transition: all 0.3s ease; 
                    opacity: 0.7;
                  }
                  .blog-text {
                    font-family: 'Fira Code', monospace;
                    font-size: 16px;
                    fill: #94a3b8;
                    transition: all 0.3s ease;
                  }
                  .blog-date {
                    font-family: 'Fira Code', monospace;
                    font-size: 14px;
                    fill: #64748b;
                    text-anchor: end;
                    transition: all 0.3s ease;
                  }
                  
                  /* Hover Effects */
                  .blog-group:hover .blog-bg {
                    fill: #3b82f6;
                    opacity: 0.2;
                    transform: scale(1.02) translateX(-8px);
                  }
                  .blog-group:hover .blog-text {
                    fill: #60a5fa;
                    font-weight: 700;
                    transform: translateX(10px);
                  }
                  .blog-group:hover .blog-date {
                    fill: #93c5fd;
                    transform: translateX(-10px);
                  }
                  
                  /* Staggered Entrance Animation */
                  .blog-group { animation: slideIn 0.5s ease-out forwards; opacity: 0; }
                  .delay-0 { animation-delay: 0.1s; }
                  .delay-1 { animation-delay: 0.2s; }
                  .delay-2 { animation-delay: 0.3s; }
                  .delay-3 { animation-delay: 0.4s; }
                  
                  @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                  }
                </style>
              </defs>
              <rect width="820" height="240" class="bg" />
              <g class="container">
            \`;
            
            blogs.forEach((blog, i) => {
              const y = i * 50;
              
              // We use pretext to handle potential text overflow/truncation elegantly
              const p = prepareWithSegments("🚀 " + blog.title, font);
              // Max width 650 to leave room for date
              const layout = layoutWithLines(p, 650, 24);
              const displayTitle = layout.lines[0].text + (layout.lines.length > 1 ? "..." : "");

              svg += \`
                <g class="blog-group delay-\${i}">
                  <rect x="20" y="\${y}" width="780" height="40" class="blog-bg" />
                  <text x="40" y="\${y + 26}" class="blog-text">\${displayTitle}</text>
                  <text x="780" y="\${y + 25}" class="blog-date">\${blog.date}</text>
                </g>
              \`;
            });

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
  
  fs.writeFileSync(path.join(process.cwd(), 'blogs.svg'), svg);
  console.log('Blogs SVG generated successfully!');
  await browser.close();
})();
