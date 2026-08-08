const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const publicImgDir = path.join(process.cwd(), 'public/images');
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

// Text wrapping helper for crisp SVG rendering without overflow
function wrapSvgText(text, x, y, maxChars, fontSize, fill, fontWeight = '400', lineSpacing = 18, textAnchor = 'start') {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

  return `<text x="${x}" y="${y}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}" text-anchor="${textAnchor}">` +
    lines.map((line, idx) => `<tspan x="${x}" ${idx > 0 ? `dy="${lineSpacing}"` : ''}>${line}</tspan>`).join('') +
    `</text>`;
}

// Common styles & defs for Light Colorful Premium Glassy Theme
const electronicsDefs = `
  <defs>
    <!-- Light Colorful Background Gradient -->
    <linearGradient id="elecBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="40%" stop-color="#f0f4fd" />
      <stop offset="70%" stop-color="#edf2ff" />
      <stop offset="100%" stop-color="#f5f3ff" />
    </linearGradient>

    <!-- Colorful Brand Gradients -->
    <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#0d9488" />
    </linearGradient>

    <linearGradient id="violetRoseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#e11d48" />
    </linearGradient>

    <linearGradient id="amberGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>

    <!-- Glass Card Gradient -->
    <linearGradient id="glassCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#f8fafc" stop-opacity="0.8" />
    </linearGradient>

    <linearGradient id="glassInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.08" />
      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0.06" />
    </linearGradient>

    <!-- Soft Diffuse Shadows -->
    <filter id="glassShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>

    <filter id="colorfulGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;display=swap');
    * { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    .font-serif { font-family: 'Cinzel', Georgia, serif; }
  </style>
`;

function getElectronicsHeader(activeTab = 'STORE') {
  const tabs = ['STORE', 'CATALOG', 'FLAGSHIP X1', 'AUDIO &amp; SOUND', 'SMART HOME', 'CART (3)', 'SUPPORT'];
  let xOffset = 390;
  let navItems = '';

  tabs.forEach(tab => {
    const isAct = tab.includes(activeTab);
    if (isAct) {
      navItems += `
        <rect x="${xOffset - 8}" y="18" width="${tab.length * 8 + 24}" height="28" rx="8" fill="url(#cyanBlueGrad)" fill-opacity="0.12" stroke="#0284c7" stroke-opacity="0.4" />
        <text x="${xOffset}" y="36" fill="#0284c7" font-size="11" font-weight="800" letter-spacing="0.5">${tab}</text>
      `;
    } else {
      navItems += `
        <text x="${xOffset}" y="36" fill="#475569" font-size="11" font-weight="600" letter-spacing="0.5">${tab}</text>
      `;
    }
    xOffset += tab.length * 8 + 32;
  });

  return `
    <!-- Top Header Bar -->
    <rect x="0" y="0" width="1600" height="64" fill="#ffffff" fill-opacity="0.85" />
    <line x1="0" y1="64" x2="1600" y2="64" stroke="rgba(226, 232, 240, 0.8)" stroke-width="1"/>

    <!-- Brand Logo -->
    <g transform="translate(40, 15)">
      <rect x="0" y="0" width="34" height="34" rx="8" fill="url(#cyanBlueGrad)" />
      <text x="12" y="24" class="font-serif" font-size="20" font-weight="900" fill="#ffffff">J</text>
      <text x="44" y="18" class="font-serif" font-size="15" font-weight="900" fill="#0f172a" letter-spacing="1">JERMANN</text>
      <text x="44" y="29" font-size="8" font-weight="800" fill="#0284c7" letter-spacing="1.2">ELECTRONICS • DIGITAL COMMERCE</text>
    </g>

    ${navItems}

    <!-- Search & Cart Action Buttons -->
    <g transform="translate(1420, 15)">
      <rect x="0" y="0" width="140" height="34" rx="8" fill="url(#cyanBlueGrad)" />
      <text x="22" y="21" font-size="11" font-weight="800" fill="#ffffff" letter-spacing="0.5">SHOP NOW →</text>
    </g>
  `;
}

// 1. JERMANN ELECTRONICS HOME (jermann-electronics-home.svg)
function buildHomeSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${electronicsDefs}
    <rect width="1600" height="900" fill="url(#elecBgGrad)" />

    <!-- Vibrant Light Ambient Mesh Glows -->
    <g opacity="0.6">
      <circle cx="250" cy="180" r="320" fill="#38bdf8" opacity="0.2" filter="url(#colorfulGlow)"/>
      <circle cx="1350" cy="220" r="380" fill="#a7f3d0" opacity="0.25" filter="url(#colorfulGlow)"/>
      <circle cx="800" cy="650" r="450" fill="#c084fc" opacity="0.18" filter="url(#colorfulGlow)"/>
      <circle cx="1400" cy="750" r="300" fill="#fde047" opacity="0.2" filter="url(#colorfulGlow)"/>
    </g>

    ${getElectronicsHeader('STORE')}

    <!-- Hero Banner Display -->
    <g transform="translate(80, 95)">
      <!-- Main Glass Box -->
      <rect width="1440" height="330" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255, 255, 255, 0.95)" stroke-width="2" filter="url(#glassShadow)"/>
      <rect width="1440" height="330" rx="24" fill="url(#glassInnerGrad)"/>

      <g transform="translate(60, 48)">
        <rect width="170" height="26" rx="8" fill="#0284c7" fill-opacity="0.1" stroke="#0284c7" stroke-opacity="0.3"/>
        <text x="14" y="17" font-size="10" font-weight="900" fill="#0284c7" letter-spacing="1">● FLAGSHIP RELEASE 2026</text>

        <text x="0" y="78" class="font-serif" font-size="38" font-weight="900" fill="#0f172a" letter-spacing="1">JERMANN X1 ULTRA SOUNDSTAGE</text>
        ${wrapSvgText('Acoustic perfection engineered with dual spatial neural chips, ultra-lossless wireless architecture, and ergonomic aerospace beryllium cups.', 0, 114, 68, 14, '#475569', '500', 22)}

        <!-- Quick Specs Badges -->
        <g transform="translate(0, 168)">
          <rect x="0" y="0" width="130" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="12" y="18" font-size="11" font-weight="700" fill="#2563eb">⚡ 96kHz Lossless</text>

          <rect x="142" y="0" width="130" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="154" y="18" font-size="11" font-weight="700" fill="#0d9488">🔋 48h GaN Charge</text>

          <rect x="284" y="0" width="130" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="296" y="18" font-size="11" font-weight="700" fill="#7c3aed">🎧 -48dB Active ANC</text>
        </g>

        <g transform="translate(0, 218)">
          <rect width="190" height="44" rx="12" fill="url(#cyanBlueGrad)"/>
          <text x="28" y="27" font-size="12" font-weight="900" fill="#ffffff" letter-spacing="0.5">EXPLORE SPECS — AED 1,899</text>

          <rect x="206" y="0" width="150" height="44" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="238" y="27" font-size="12" font-weight="700" fill="#0f172a">ADD TO CART</text>
        </g>
      </g>

      <!-- Headphone Graphic Visualizer Stage -->
      <g transform="translate(1080, 165)">
        <circle cx="0" cy="0" r="120" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 6" opacity="0.6"/>
        <circle cx="0" cy="0" r="95" fill="#ffffff" stroke="#0284c7" stroke-width="3" filter="url(#glassShadow)"/>
        <path d="M-50 -20 C-50 -65, 50 -65, 50 -20" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/>
        <rect x="-70" y="-20" width="32" height="60" rx="12" fill="url(#cyanBlueGrad)"/>
        <rect x="38" y="-20" width="32" height="60" rx="12" fill="url(#cyanBlueGrad)"/>

        <!-- Waveform Spectrum -->
        <path d="M-80 65 L-60 50 L-40 70 L-20 40 L0 75 L20 45 L40 68 L60 52 L80 65" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
        <text x="0" y="98" font-size="12" font-weight="800" fill="#0284c7" text-anchor="middle">JERMANN X1 PRO ACOUSTIC ENGINE</text>
      </g>
    </g>

    <!-- Product Grid Section -->
    <g transform="translate(80, 455)">
      <text x="0" y="0" font-size="18" font-weight="900" fill="#0f172a" letter-spacing="0.5">FEATURED NEXT-GEN ELECTRONICS</text>
      <text x="1440" y="0" font-size="12" font-weight="800" fill="#0284c7" text-anchor="end">VIEW ALL CATEGORIES →</text>

      <!-- 4 Cards Row -->
      <!-- Card 1 -->
      <g transform="translate(0, 22)">
        <rect width="335" height="360" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
        <rect x="16" y="16" width="303" height="175" rx="14" fill="#f1f5f9"/>
        <circle cx="167" cy="103" r="48" fill="#38bdf8" fill-opacity="0.15"/>
        <text x="167" y="112" font-size="38" text-anchor="middle">🎧</text>
        <text x="24" y="222" font-size="15" font-weight="800" fill="#0f172a">Jermann SoundStage X1</text>
        <text x="24" y="242" font-size="11" font-weight="500" fill="#64748b">Active AI Spatial Audio • 48hr Battery</text>
        <text x="24" y="285" font-size="18" font-weight="900" fill="#0284c7">AED 1,899.00</text>
        <rect x="200" y="260" width="115" height="36" rx="10" fill="url(#cyanBlueGrad)"/>
        <text x="228" y="283" font-size="11" font-weight="800" fill="#ffffff">BUY NOW</text>
      </g>

      <!-- Card 2 -->
      <g transform="translate(368, 22)">
        <rect width="335" height="360" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
        <rect x="16" y="16" width="303" height="175" rx="14" fill="#f1f5f9"/>
        <circle cx="167" cy="103" r="48" fill="#f59e0b" fill-opacity="0.15"/>
        <text x="167" y="112" font-size="38" text-anchor="middle">💻</text>
        <text x="24" y="222" font-size="15" font-weight="800" fill="#0f172a">Jermann Book Pro M16</text>
        <text x="24" y="242" font-size="11" font-weight="500" fill="#64748b">Quantum Core i9 • 64GB DDR5 • 4K OLED</text>
        <text x="24" y="285" font-size="18" font-weight="900" fill="#d97706">AED 9,450.00</text>
        <rect x="200" y="260" width="115" height="36" rx="10" fill="url(#amberGoldGrad)"/>
        <text x="228" y="283" font-size="11" font-weight="800" fill="#ffffff">BUY NOW</text>
      </g>

      <!-- Card 3 -->
      <g transform="translate(736, 22)">
        <rect width="335" height="360" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
        <rect x="16" y="16" width="303" height="175" rx="14" fill="#f1f5f9"/>
        <circle cx="167" cy="103" r="48" fill="#7c3aed" fill-opacity="0.15"/>
        <text x="167" y="112" font-size="38" text-anchor="middle">⌚</text>
        <text x="24" y="222" font-size="15" font-weight="800" fill="#0f172a">Jermann Horizon Watch v3</text>
        <text x="24" y="242" font-size="11" font-weight="500" fill="#64748b">Titanium Sapphire Case • Biometric AI</text>
        <text x="24" y="285" font-size="18" font-weight="900" fill="#7c3aed">AED 2,499.00</text>
        <rect x="200" y="260" width="115" height="36" rx="10" fill="url(#violetRoseGrad)"/>
        <text x="228" y="283" font-size="11" font-weight="800" fill="#ffffff">BUY NOW</text>
      </g>

      <!-- Card 4 -->
      <g transform="translate(1104, 22)">
        <rect width="335" height="360" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
        <rect x="16" y="16" width="303" height="175" rx="14" fill="#f1f5f9"/>
        <circle cx="167" cy="103" r="48" fill="#10b981" fill-opacity="0.15"/>
        <text x="167" y="112" font-size="38" text-anchor="middle">📱</text>
        <text x="24" y="222" font-size="15" font-weight="800" fill="#0f172a">Jermann Phone Ultra 15</text>
        <text x="24" y="242" font-size="11" font-weight="500" fill="#64748b">Ceramic Armor • 200MP Quad Camera</text>
        <text x="24" y="285" font-size="18" font-weight="900" fill="#0d9488">AED 4,899.00</text>
        <rect x="200" y="260" width="115" height="36" rx="10" fill="#0d9488"/>
        <text x="228" y="283" font-size="11" font-weight="800" fill="#ffffff">BUY NOW</text>
      </g>
    </g>
  </svg>`;
}

// 2. JERMANN CATALOG (jermann-electronics-catalog.svg)
function buildCatalogSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${electronicsDefs}
    <rect width="1600" height="900" fill="url(#elecBgGrad)" />

    <!-- Ambient Glows -->
    <g opacity="0.5">
      <circle cx="200" cy="200" r="300" fill="#38bdf8" opacity="0.2" filter="url(#colorfulGlow)"/>
      <circle cx="1400" cy="300" r="350" fill="#c084fc" opacity="0.2" filter="url(#colorfulGlow)"/>
    </g>

    ${getElectronicsHeader('CATALOG')}

    <g transform="translate(80, 85)">
      <text x="0" y="24" font-size="24" font-weight="900" fill="#0f172a">MODULAR ELECTRONICS CATALOG</text>
      <text x="0" y="48" font-size="13" font-weight="500" fill="#64748b">Filter by product category, specs, hardware architecture, and executive availability.</text>

      <!-- Search Bar -->
      <g transform="translate(900, 0)">
        <rect width="540" height="44" rx="12" fill="#ffffff" stroke="#cbd5e1" filter="url(#glassShadow)"/>
        <text x="20" y="27" font-size="12" fill="#64748b">🔍 Search laptops, audio, smart watches &amp; accessories...</text>
      </g>
    </g>

    <!-- Catalog Sidebar & Main Grid -->
    <g transform="translate(80, 160)">
      <!-- Sidebar Filter -->
      <rect width="280" height="680" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
      <g transform="translate(24, 28)">
        <text x="0" y="0" font-size="14" font-weight="800" fill="#0284c7">CATEGORIES</text>
        <text x="0" y="32" font-size="12" font-weight="700" fill="#0f172a">• Audio &amp; Soundstage (12)</text>
        <text x="0" y="60" font-size="12" font-weight="500" fill="#64748b">• Laptops &amp; Workstations (8)</text>
        <text x="0" y="88" font-size="12" font-weight="500" fill="#64748b">• Smart Wearables (14)</text>
        <text x="0" y="116" font-size="12" font-weight="500" fill="#64748b">• Mobile Devices (10)</text>
        <text x="0" y="144" font-size="12" font-weight="500" fill="#64748b">• Smart Office &amp; Displays (6)</text>

        <line x1="0" y1="175" x2="230" y2="175" stroke="#e2e8f0"/>
        <text x="0" y="200" font-size="14" font-weight="800" fill="#d97706">PRICE RANGE (AED)</text>
        <rect x="0" y="215" width="230" height="6" rx="3" fill="#e2e8f0"/>
        <rect x="0" y="215" width="160" height="6" rx="3" fill="url(#amberGoldGrad)"/>
        <text x="0" y="242" font-size="11" font-weight="600" fill="#64748b">AED 500 — AED 15,000</text>

        <line x1="0" y1="270" x2="230" y2="270" stroke="#e2e8f0"/>
        <text x="0" y="295" font-size="14" font-weight="800" fill="#7c3aed">AVAILABILITY</text>
        <text x="0" y="322" font-size="12" font-weight="600" fill="#0f172a">☑ In Stock GCC (18)</text>
        <text x="0" y="348" font-size="12" font-weight="500" fill="#64748b">☐ Pre-order Flagship (4)</text>
      </g>

      <!-- Main Catalog Grid -->
      <g transform="translate(310, 0)">
        <!-- 6 Items (3x2) -->
        <g transform="translate(0, 0)">
          <rect width="360" height="320" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <rect x="16" y="16" width="328" height="155" rx="14" fill="#f1f5f9"/>
          <text x="180" y="98" font-size="38" text-anchor="middle">🎧</text>
          <text x="20" y="198" font-size="14" font-weight="800" fill="#0f172a">Jermann X1 SoundStage Pro</text>
          <text x="20" y="218" font-size="11" font-weight="500" fill="#64748b">Active ANC • Lossless Audio</text>
          <text x="20" y="260" font-size="16" font-weight="900" fill="#0284c7">AED 1,899.00</text>
          <rect x="225" y="240" width="115" height="36" rx="10" fill="url(#cyanBlueGrad)"/>
          <text x="252" y="263" font-size="10" font-weight="800" fill="#ffffff">ADD TO CART</text>
        </g>

        <g transform="translate(380, 0)">
          <rect width="360" height="320" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <rect x="16" y="16" width="328" height="155" rx="14" fill="#f1f5f9"/>
          <text x="180" y="98" font-size="38" text-anchor="middle">💻</text>
          <text x="20" y="198" font-size="14" font-weight="800" fill="#0f172a">Jermann Book Pro M16</text>
          <text x="20" y="218" font-size="11" font-weight="500" fill="#64748b">64GB RAM • 2TB NVMe SSD</text>
          <text x="20" y="260" font-size="16" font-weight="900" fill="#d97706">AED 9,450.00</text>
          <rect x="225" y="240" width="115" height="36" rx="10" fill="url(#amberGoldGrad)"/>
          <text x="252" y="263" font-size="10" font-weight="800" fill="#ffffff">ADD TO CART</text>
        </g>

        <g transform="translate(760, 0)">
          <rect width="360" height="320" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <rect x="16" y="16" width="328" height="155" rx="14" fill="#f1f5f9"/>
          <text x="180" y="98" font-size="38" text-anchor="middle">⌚</text>
          <text x="20" y="198" font-size="14" font-weight="800" fill="#0f172a">Jermann Horizon Watch v3</text>
          <text x="20" y="218" font-size="11" font-weight="500" fill="#64748b">Titanium Sapphire • Cellular</text>
          <text x="20" y="260" font-size="16" font-weight="900" fill="#7c3aed">AED 2,499.00</text>
          <rect x="225" y="240" width="115" height="36" rx="10" fill="url(#violetRoseGrad)"/>
          <text x="252" y="263" font-size="10" font-weight="800" fill="#ffffff">ADD TO CART</text>
        </g>

        <g transform="translate(0, 340)">
          <rect width="360" height="320" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <rect x="16" y="16" width="328" height="155" rx="14" fill="#f1f5f9"/>
          <text x="180" y="98" font-size="38" text-anchor="middle">🖥️</text>
          <text x="20" y="198" font-size="14" font-weight="800" fill="#0f172a">Jermann Display Studio 32"</text>
          <text x="20" y="218" font-size="11" font-weight="500" fill="#64748b">6K Retina • Thunderbolt 4</text>
          <text x="20" y="260" font-size="16" font-weight="900" fill="#0284c7">AED 5,999.00</text>
          <rect x="225" y="240" width="115" height="36" rx="10" fill="url(#cyanBlueGrad)"/>
          <text x="252" y="263" font-size="10" font-weight="800" fill="#ffffff">ADD TO CART</text>
        </g>

        <g transform="translate(380, 340)">
          <rect width="360" height="320" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <rect x="16" y="16" width="328" height="155" rx="14" fill="#f1f5f9"/>
          <text x="180" y="98" font-size="38" text-anchor="middle">🔊</text>
          <text x="20" y="198" font-size="14" font-weight="800" fill="#0f172a">Jermann SoundBar Executive</text>
          <text x="20" y="218" font-size="11" font-weight="500" fill="#64748b">7.1.4 Dolby Atmos • Spatial AI</text>
          <text x="20" y="260" font-size="16" font-weight="900" fill="#0d9488">AED 3,200.00</text>
          <rect x="225" y="240" width="115" height="36" rx="10" fill="#0d9488"/>
          <text x="252" y="263" font-size="10" font-weight="800" fill="#ffffff">ADD TO CART</text>
        </g>

        <g transform="translate(760, 340)">
          <rect width="360" height="320" rx="20" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <rect x="16" y="16" width="328" height="155" rx="14" fill="#f1f5f9"/>
          <text x="180" y="98" font-size="38" text-anchor="middle">🔋</text>
          <text x="20" y="198" font-size="14" font-weight="800" fill="#0f172a">Jermann PowerBank Pro 200W</text>
          <text x="20" y="218" font-size="11" font-weight="500" fill="#64748b">GaN III Fast Charge • 27000mAh</text>
          <text x="20" y="260" font-size="16" font-weight="900" fill="#d97706">AED 649.00</text>
          <rect x="225" y="240" width="115" height="36" rx="10" fill="url(#amberGoldGrad)"/>
          <text x="252" y="263" font-size="10" font-weight="800" fill="#ffffff">ADD TO CART</text>
        </g>
      </g>
    </g>
  </svg>`;
}

// 3. JERMANN PRODUCT DETAIL (jermann-electronics-product.svg)
function buildProductSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${electronicsDefs}
    <rect width="1600" height="900" fill="url(#elecBgGrad)" />

    <!-- Ambient Colorful Glows -->
    <g opacity="0.5">
      <circle cx="300" cy="300" r="350" fill="#38bdf8" opacity="0.2" filter="url(#colorfulGlow)"/>
      <circle cx="1200" cy="400" r="400" fill="#f472b6" opacity="0.18" filter="url(#colorfulGlow)"/>
    </g>

    ${getElectronicsHeader('FLAGSHIP X1')}

    <g transform="translate(80, 85)">
      <!-- Left Showcase -->
      <rect width="700" height="750" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
      <rect x="24" y="24" width="652" height="540" rx="18" fill="#f1f5f9"/>

      <!-- Big Headphone Graphic -->
      <g transform="translate(350, 280)">
        <circle cx="0" cy="0" r="170" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 8" opacity="0.6"/>
        <circle cx="0" cy="0" r="130" fill="#ffffff" stroke="#0284c7" stroke-width="4" filter="url(#glassShadow)"/>
        <path d="M-60 -30 C-60 -95, 60 -95, 60 -30" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round"/>
        <rect x="-92" y="-30" width="46" height="88" rx="16" fill="url(#cyanBlueGrad)"/>
        <rect x="46" y="-30" width="46" height="88" rx="16" fill="url(#cyanBlueGrad)"/>

        <!-- Acoustic Response Bezier Curve Chart -->
        <path d="M-120 100 Q -60 40, 0 80 T 120 60" fill="none" stroke="#2563eb" stroke-width="3"/>
      </g>

      <g transform="translate(40, 585)">
        <text x="0" y="0" font-size="12" font-weight="800" fill="#0284c7">3D INTERACTIVE DEVICE CONFIGURATOR</text>
        <text x="0" y="26" font-size="20" font-weight="900" fill="#0f172a">Jermann X1 SoundStage Ultra Pro</text>
        <text x="0" y="50" font-size="12" fill="#64748b">Beryllium Dynamic Drivers • Active Acoustic Tuning • Braided Fiber Cable Included</text>
        
        <!-- Finish Color Options -->
        <g transform="translate(0, 70)">
          <text x="0" y="16" font-size="11" font-weight="700" fill="#0f172a">SELECT SHELL FINISH:</text>
          <circle cx="150" cy="12" r="12" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
          <circle cx="185" cy="12" r="12" fill="#0284c7"/>
          <circle cx="220" cy="12" r="12" fill="#d97706"/>
          <circle cx="255" cy="12" r="12" fill="#7c3aed"/>
        </g>
      </g>

      <!-- Right Specs & Order Config -->
      <g transform="translate(740, 0)">
        <rect width="700" height="750" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
        <g transform="translate(40, 40)">
          <rect width="180" height="26" rx="8" fill="#10b981" fill-opacity="0.12"/>
          <text x="14" y="17" font-size="10" font-weight="800" fill="#10b981">IN STOCK • READY TO SHIP</text>

          <text x="0" y="68" font-size="28" font-weight="900" fill="#0f172a">Jermann X1 SoundStage Ultra</text>
          <text x="0" y="92" font-size="13" font-weight="600" fill="#64748b">Model No: JER-X1-AUDIO-2026</text>

          <text x="0" y="148" font-size="32" font-weight="900" fill="#0284c7">AED 1,899.00</text>
          <text x="220" y="148" font-size="14" font-weight="600" stroke="#94a3b8" fill="#94a3b8" text-decoration="line-through">AED 2,299.00</text>

          <line x1="0" y1="180" x2="620" y2="180" stroke="#e2e8f0"/>

          ${wrapSvgText('Engineered with aerospace-grade aluminum cups, custom beryllium dynamic drivers, and dual neural processor chips for transparent acoustic isolation.', 0, 210, 62, 13, '#475569', '400', 22)}

          <text x="0" y="295" font-size="14" font-weight="800" fill="#0f172a">TECHNICAL SPECIFICATIONS</text>

          <rect x="0" y="315" width="290" height="65" rx="12" fill="#f1f5f9"/>
          <text x="16" y="338" font-size="10" font-weight="700" fill="#64748b">BATTERY LIFE</text>
          <text x="16" y="358" font-size="14" font-weight="800" fill="#0284c7">48 Hours (Fast Charge 10m = 8h)</text>

          <rect x="310" y="315" width="290" height="65" rx="12" fill="#f1f5f9"/>
          <text x="16" y="338" font-size="10" font-weight="700" fill="#64748b">NOISE CANCELLATION</text>
          <text x="16" y="358" font-size="14" font-weight="800" fill="#d97706">-45dB Active Hybrid ANC</text>

          <rect x="0" y="395" width="290" height="65" rx="12" fill="#f1f5f9"/>
          <text x="16" y="418" font-size="10" font-weight="700" fill="#64748b">FREQUENCY RESPONSE</text>
          <text x="16" y="438" font-size="14" font-weight="800" fill="#0f172a">5 Hz – 48,000 Hz</text>

          <rect x="310" y="395" width="290" height="65" rx="12" fill="#f1f5f9"/>
          <text x="16" y="418" font-size="10" font-weight="700" fill="#64748b">WEIGHT &amp; BUILD</text>
          <text x="16" y="438" font-size="14" font-weight="800" fill="#0f172a">285g • Beryllium &amp; Leather</text>

          <g transform="translate(0, 490)">
            <rect width="600" height="54" rx="14" fill="url(#cyanBlueGrad)" filter="url(#glassShadow)"/>
            <text x="300" y="33" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">ADD TO CART — AED 1,899.00</text>
          </g>
        </g>
      </g>
    </g>
  </svg>`;
}

// 4. JERMANN CART & CHECKOUT (jermann-electronics-cart.svg)
function buildCartSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${electronicsDefs}
    <rect width="1600" height="900" fill="url(#elecBgGrad)" />

    <!-- Ambient Colorful Mesh -->
    <g opacity="0.5">
      <circle cx="200" cy="300" r="300" fill="#38bdf8" opacity="0.2" filter="url(#colorfulGlow)"/>
      <circle cx="1300" cy="500" r="350" fill="#a7f3d0" opacity="0.22" filter="url(#colorfulGlow)"/>
    </g>

    ${getElectronicsHeader('CART')}

    <g transform="translate(80, 85)">
      <text x="0" y="24" font-size="24" font-weight="900" fill="#0f172a">YOUR EXECUTIVE SHOPPING CART</text>
      <text x="0" y="48" font-size="13" font-weight="500" fill="#64748b">Items reserved for 15:00 minutes • Express courier shipping across UAE &amp; GCC</text>

      <!-- Cart Table -->
      <g transform="translate(0, 75)">
        <rect width="900" height="630" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>

        <!-- Item 1 -->
        <g transform="translate(30, 30)">
          <rect width="100" height="90" rx="14" fill="#f1f5f9"/>
          <text x="50" y="55" font-size="32" text-anchor="middle">🎧</text>
          <text x="120" y="35" font-size="16" font-weight="800" fill="#0f172a">Jermann X1 SoundStage Ultra</text>
          <text x="120" y="58" font-size="12" font-weight="500" fill="#64748b">Color: Space Black • 2-Year Jermann Care Warranty Included</text>
          <text x="700" y="45" font-size="18" font-weight="900" fill="#0284c7">AED 1,899.00</text>
        </g>

        <line x1="30" y1="140" x2="870" y2="140" stroke="#e2e8f0"/>

        <!-- Item 2 -->
        <g transform="translate(30, 160)">
          <rect width="100" height="90" rx="14" fill="#f1f5f9"/>
          <text x="50" y="55" font-size="32" text-anchor="middle">💻</text>
          <text x="120" y="35" font-size="16" font-weight="800" fill="#0f172a">Jermann Book Pro M16 Workstation</text>
          <text x="120" y="58" font-size="12" font-weight="500" fill="#64748b">64GB RAM • 2TB SSD • English/Arabic Keyboard</text>
          <text x="700" y="45" font-size="18" font-weight="900" fill="#d97706">AED 9,450.00</text>
        </g>

        <line x1="30" y1="270" x2="870" y2="270" stroke="#e2e8f0"/>

        <!-- Item 3 -->
        <g transform="translate(30, 290)">
          <rect width="100" height="90" rx="14" fill="#f1f5f9"/>
          <text x="50" y="55" font-size="32" text-anchor="middle">⌚</text>
          <text x="120" y="35" font-size="16" font-weight="800" fill="#0f172a">Jermann Horizon Watch v3 Titanium</text>
          <text x="120" y="58" font-size="12" font-weight="500" fill="#64748b">Case: 49mm Titanium Sapphire • Alpine Loop Strap</text>
          <text x="700" y="45" font-size="18" font-weight="900" fill="#7c3aed">AED 2,499.00</text>
        </g>

        <line x1="30" y1="400" x2="870" y2="400" stroke="#e2e8f0"/>

        <g transform="translate(30, 435)">
          <text x="0" y="24" font-size="14" font-weight="800" fill="#0f172a">🛡️ JERMANN CARE EXTENDED WARRANTY</text>
          ${wrapSvgText('Add 3 years of global accidental protection, priority battery replacements, and dedicated technical support for AED 450.00.', 0, 48, 80, 12, '#64748b', '400', 18)}
        </g>
      </g>

      <!-- Right Summary Panel -->
      <g transform="translate(940, 75)">
        <rect width="500" height="630" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>

        <g transform="translate(40, 40)">
          <text x="0" y="0" font-size="18" font-weight="900" fill="#0f172a">ORDER SUMMARY</text>

          <text x="0" y="50" font-size="13" fill="#64748b">Subtotal (3 Items)</text>
          <text x="420" y="50" font-size="13" font-weight="800" fill="#0f172a" text-anchor="end">AED 13,848.00</text>

          <text x="0" y="85" font-size="13" fill="#64748b">Express GCC Courier Delivery</text>
          <text x="420" y="85" font-size="13" font-weight="800" fill="#10b981" text-anchor="end">FREE</text>

          <text x="0" y="120" font-size="13" fill="#64748b">Estimated VAT (5%)</text>
          <text x="420" y="120" font-size="13" font-weight="800" fill="#0f172a" text-anchor="end">AED 692.40</text>

          <line x1="0" y1="150" x2="420" y2="150" stroke="#e2e8f0"/>

          <text x="0" y="190" font-size="18" font-weight="900" fill="#0f172a">TOTAL DUE</text>
          <text x="420" y="190" font-size="22" font-weight="900" fill="#0284c7" text-anchor="end">AED 14,540.40</text>

          <!-- Promo Box -->
          <g transform="translate(0, 220)">
            <rect width="420" height="48" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="16" y="29" font-size="12" fill="#64748b">Promo / Corporate Discount Code</text>
            <rect x="305" y="6" width="108" height="36" rx="8" fill="url(#cyanBlueGrad)"/>
            <text x="336" y="28" font-size="11" font-weight="800" fill="#ffffff">APPLY</text>
          </g>

          <g transform="translate(0, 310)">
            <rect width="420" height="56" rx="14" fill="url(#cyanBlueGrad)" filter="url(#glassShadow)"/>
            <text x="210" y="34" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">PROCEED TO EXPRESS CHECKOUT →</text>
          </g>

          <g transform="translate(0, 395)">
            <text x="210" y="20" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">🔒 Encrypted 256-bit SSL Checkout • Apple Pay, Visa, AMEX, Wire</text>
          </g>
        </g>
      </g>
    </g>
  </svg>`;
}

// 5. JERMANN SUPPORT & DIAGNOSTICS (jermann-electronics-support.svg)
function buildSupportSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${electronicsDefs}
    <rect width="1600" height="900" fill="url(#elecBgGrad)" />

    <!-- Ambient Colorful Glows -->
    <g opacity="0.5">
      <circle cx="250" cy="250" r="320" fill="#38bdf8" opacity="0.2" filter="url(#colorfulGlow)"/>
      <circle cx="1350" cy="350" r="380" fill="#c084fc" opacity="0.2" filter="url(#colorfulGlow)"/>
    </g>

    ${getElectronicsHeader('SUPPORT')}

    <g transform="translate(80, 85)">
      <text x="0" y="24" font-size="24" font-weight="900" fill="#0f172a">JERMANN SMART CARE &amp; DIAGNOSTICS</text>
      <text x="0" y="48" font-size="13" font-weight="500" fill="#64748b">Hardware telemetry, firmware updates, device warranty registration &amp; 24/7 executive concierge.</text>

      <g transform="translate(0, 75)">
        <!-- 3 Cards -->
        <g transform="translate(0, 0)">
          <rect width="460" height="630" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <g transform="translate(30, 35)">
            <rect width="48" height="48" rx="12" fill="#0284c7" fill-opacity="0.12"/>
            <text x="12" y="32" font-size="24">🛠️</text>
            <text x="0" y="82" font-size="18" font-weight="900" fill="#0f172a">Hardware Diagnostics</text>
            ${wrapSvgText('Run instant battery health, acoustic driver frequency checks, and bluetooth connectivity telemetry for your registered devices.', 0, 112, 42, 12, '#64748b', '400', 20)}

            <rect x="0" y="220" width="400" height="90" rx="14" fill="#f1f5f9"/>
            <text x="20" y="252" font-size="13" font-weight="800" fill="#0284c7">Jermann SoundStage X1</text>
            <text x="20" y="276" font-size="11" font-weight="600" fill="#0f172a">Firmware v2.4.1 Installed • Battery 98% Healthy</text>
          </g>
        </g>

        <g transform="translate(490, 0)">
          <rect width="460" height="630" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <g transform="translate(30, 35)">
            <rect width="48" height="48" rx="12" fill="#d97706" fill-opacity="0.12"/>
            <text x="12" y="32" font-size="24">📋</text>
            <text x="0" y="82" font-size="18" font-weight="900" fill="#0f172a">Warranty &amp; Registration</text>
            ${wrapSvgText('Register new purchases, manage Jermann Care coverage, request express hardware replacement, or book an in-person technician.', 0, 112, 42, 12, '#64748b', '400', 20)}

            <rect x="0" y="220" width="400" height="90" rx="14" fill="#f1f5f9"/>
            <text x="20" y="252" font-size="13" font-weight="800" fill="#d97706">Jermann Care Active</text>
            <text x="20" y="276" font-size="11" font-weight="600" fill="#0f172a">Coverage valid through August 2028</text>
          </g>
        </g>

        <g transform="translate(980, 0)">
          <rect width="460" height="630" rx="24" fill="url(#glassCardGrad)" stroke="rgba(255,255,255,0.95)" stroke-width="2" filter="url(#glassShadow)"/>
          <g transform="translate(30, 35)">
            <rect width="48" height="48" rx="12" fill="#7c3aed" fill-opacity="0.12"/>
            <text x="12" y="32" font-size="24">💬</text>
            <text x="0" y="82" font-size="18" font-weight="900" fill="#0f172a">24/7 Executive Support</text>
            ${wrapSvgText('Direct messaging line with Jermann chief audio engineers and hardware specialists for enterprise setups &amp; custom deployments.', 0, 112, 42, 12, '#64748b', '400', 20)}

            <rect x="0" y="220" width="400" height="52" rx="14" fill="url(#cyanBlueGrad)" filter="url(#glassShadow)"/>
            <text x="200" y="252" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">START LIVE CHAT WITH ENGINEER</text>
          </g>
        </g>
      </g>
    </g>
  </svg>`;
}

const files = [
  { name: 'jermann-electronics-home', svg: buildHomeSVG() },
  { name: 'jermann-electronics-catalog', svg: buildCatalogSVG() },
  { name: 'jermann-electronics-product', svg: buildProductSVG() },
  { name: 'jermann-electronics-cart', svg: buildCartSVG() },
  { name: 'jermann-electronics-support', svg: buildSupportSVG() }
];

files.forEach(f => {
  const svgPath = path.join(publicImgDir, `${f.name}.svg`);
  const pngPath = path.join(publicImgDir, `${f.name}.png`);

  fs.writeFileSync(svgPath, f.svg, 'utf8');
  console.log(`Generated SVG for ${f.name}`);

  try {
    const resvg = new Resvg(f.svg, {
      fitTo: { mode: 'width', value: 1600 }
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`Generated PNG for ${f.name}`);
  } catch (err) {
    console.error(`Error rendering PNG for ${f.name}:`, err);
  }
});

// Copy home to main jermann-electronics.svg & png
fs.copyFileSync(
  path.join(publicImgDir, 'jermann-electronics-home.svg'),
  path.join(publicImgDir, 'jermann-electronics.svg')
);
fs.copyFileSync(
  path.join(publicImgDir, 'jermann-electronics-home.png'),
  path.join(publicImgDir, 'jermann-electronics.png')
);
console.log('Successfully generated JERMANN Electronics SVGs & PNGs');
