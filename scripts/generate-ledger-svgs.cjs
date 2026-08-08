const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const publicImgDir = path.join(process.cwd(), 'public/images');
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

// Text wrapping helper for crisp SVG rendering without line overflow
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

// Common styles & defs for Ledger 24K Dark Gold Executive Theme
const ledgerDefs = `
  <defs>
    <linearGradient id="ledBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050811" />
      <stop offset="50%" stop-color="#090d1a" />
      <stop offset="100%" stop-color="#04060d" />
    </linearGradient>

    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffe885" />
      <stop offset="100%" stop-color="#ffd700" />
    </linearGradient>

    <linearGradient id="goldBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffd700" />
      <stop offset="100%" stop-color="#ffb700" />
    </linearGradient>

    <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111827" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0.95" />
    </linearGradient>

    <linearGradient id="phoneCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#121a2d" />
      <stop offset="100%" stop-color="#0a0f1d" />
    </linearGradient>

    <filter id="ledShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.7"/>
    </filter>

    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;display=swap');
    * { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    .txt-gold { fill: url(#goldGrad); font-weight: 800; }
    .txt-white { fill: #ffffff; font-weight: 700; }
    .txt-sub { fill: #94a3b8; font-size: 13px; font-weight: 500; }
    .txt-muted { fill: #64748b; font-size: 11px; font-weight: 600; }
  </style>
`;

// Helper to render Mobile Status Bar & Header inside the phone frame
function renderPhoneHeader(activeTab = 'Home') {
  return `
    <!-- Top Phone Status Bar -->
    <g transform="translate(0, 12)">
      <text x="24" y="16" font-size="11" font-weight="700" fill="#ffffff">6:56</text>
      <!-- Status Icons -->
      <path d="M380 12 h12 v8 h-12 z" fill="#ffffff" opacity="0.8"/>
      <circle cx="360" cy="16" r="4" fill="#ffffff" opacity="0.8"/>
      <path d="M335 12 l8 10 h-16 z" fill="#ffffff" opacity="0.8"/>
    </g>

    <!-- App Header Bar -->
    <g transform="translate(16, 36)">
      <!-- Logo Square -->
      <rect x="0" y="0" width="36" height="36" rx="10" fill="#ffd700" />
      <text x="11" y="24" font-size="18" font-weight="900" fill="#050811">c</text>

      <!-- Title & 24K Badge -->
      <text x="46" y="24" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="0.5">Ledger</text>
      <rect x="122" y="8" width="32" height="18" rx="4" fill="#ffd700" />
      <text x="126" y="21" font-size="10" font-weight="900" fill="#050811">24K</text>

      <!-- Sparkle Icon -->
      <circle cx="170" cy="17" r="14" fill="#ffd700" fill-opacity="0.15" stroke="#ffd700" stroke-width="1"/>
      <text x="165" y="22" font-size="12" fill="#ffd700">✨</text>

      <!-- Currency Pill -->
      <rect x="196" y="6" width="68" height="22" rx="11" fill="#1e293b" stroke="rgba(255,255,255,0.1)"/>
      <text x="206" y="21" font-size="10" font-weight="800" fill="#ffffff">AED</text>

      <!-- Cloud Sync -->
      <text x="278" y="22" font-size="14" fill="#94a3b8">☁</text>

      <!-- Notification Bell with badge -->
      <g transform="translate(305, 4)">
        <text x="0" y="18" font-size="15" fill="#ffffff">🔔</text>
        <circle cx="12" cy="4" r="7" fill="#ef4444"/>
        <text x="9" y="7" font-size="9" font-weight="800" fill="#ffffff">2</text>
      </g>

      <!-- User Avatar -->
      <circle cx="348" cy="17" r="14" fill="#334155" stroke="#ffd700" stroke-width="1.5"/>
      <text x="343" y="21" font-size="12" fill="#ffffff">👤</text>
    </g>
  `;
}

// Helper to render Bottom Navigation Bar inside the phone frame
function renderPhoneBottomNav(activeTab = 'Home') {
  const tabs = [
    { name: 'Home', icon: '⊞' },
    { name: 'History', icon: '▤' },
    { name: 'Budgets', icon: '◐' },
    { name: 'Goals', icon: '🐖' },
    { name: 'AI Assist', icon: '✨' }
  ];

  let navItems = '';
  tabs.forEach((t, i) => {
    const x = 20 + i * 72;
    const isActive = t.name === activeTab;
    if (isActive) {
      navItems += `
        <g transform="translate(${x}, 12)">
          <rect x="-6" y="-4" width="56" height="38" rx="10" fill="#ffd700" fill-opacity="0.2" stroke="#ffd700" stroke-width="1"/>
          <text x="22" y="14" font-size="14" text-anchor="middle" fill="#ffd700">${t.icon}</text>
          <text x="22" y="28" font-size="9" font-weight="800" text-anchor="middle" fill="#ffd700">${t.name}</text>
        </g>
      `;
    } else {
      navItems += `
        <g transform="translate(${x}, 12)">
          <text x="22" y="14" font-size="14" text-anchor="middle" fill="#64748b">${t.icon}</text>
          <text x="22" y="28" font-size="9" font-weight="600" text-anchor="middle" fill="#64748b">${t.name}</text>
        </g>
      `;
    }
  });

  return `
    <g transform="translate(0, 765)">
      <rect x="0" y="0" width="410" height="75" fill="#070b14" stroke-top="#1e293b"/>
      ${navItems}
    </g>
  `;
}

// -------------------------------------------------------------
// 1. LEDGER HOME / PORTFOLIO NET WORTH (ledger-home.svg)
// -------------------------------------------------------------
function buildHomeSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${ledgerDefs}
    <rect width="1600" height="900" fill="url(#ledBgGrad)" />

    <!-- Ambient Grid & Gold Glows -->
    <g opacity="0.12">
      <circle cx="800" cy="450" r="400" fill="#ffd700" filter="url(#goldGlow)"/>
      <line x1="0" y1="150" x2="1600" y2="150" stroke="#ffd700" stroke-width="0.5" stroke-dasharray="6 6"/>
      <line x1="0" y1="750" x2="1600" y2="750" stroke="#ffd700" stroke-width="0.5" stroke-dasharray="6 6"/>
    </g>

    <!-- LEFT EXECUTIVE CALLOUT PANEL -->
    <g transform="translate(80, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>

      <rect x="30" y="30" width="140" height="26" rx="6" fill="#ffd700" fill-opacity="0.15" stroke="#ffd700" stroke-opacity="0.4"/>
      <text x="42" y="47" font-size="11" font-weight="900" fill="#ffd700" letter-spacing="1">PROJECT 04 • FINTECH</text>

      <text x="30" y="100" font-size="32" font-weight="900" fill="#ffffff" letter-spacing="0.5">LEDGER 24K</text>
      <text x="30" y="130" font-size="14" font-weight="600" fill="#ffd700">PERSONAL FINANCE &amp; WEALTH PLATFORM</text>

      ${wrapSvgText('Multi-currency wealth tracking, automated AI financial diagnostics, transaction history, budget controls, and high-precision liquidity monitoring.', 30, 165, 48, 12, '#94a3b8', '400', 20)}

      <line x1="30" y1="240" x2="390" y2="240" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

      <!-- Stat Box 1 -->
      <g transform="translate(30, 265)">
        <text x="0" y="0" font-size="11" font-weight="800" fill="#64748b">PORTFOLIO NET WORTH</text>
        <text x="0" y="32" font-size="30" font-weight="900" fill="#ffd700">AED 143,950.00</text>
        <text x="0" y="52" font-size="11" font-weight="700" fill="#10b981">↑ +15.2% Monthly Liquidity Growth</text>
      </g>

      <!-- Stat Box 2 -->
      <g transform="translate(30, 365)">
        <text x="0" y="0" font-size="11" font-weight="800" fill="#64748b">FINANCIAL HEALTH SCORE</text>
        <text x="0" y="32" font-size="30" font-weight="900" fill="#ffffff">100 / 100</text>
        <text x="0" y="52" font-size="11" font-weight="700" fill="#ffd700">🛡️ 24K Automated Diagnostic Verified</text>
      </g>

      <!-- Stat Box 3 -->
      <g transform="translate(30, 465)">
        <text x="0" y="0" font-size="11" font-weight="800" fill="#64748b">MONTHLY SAVINGS RATE</text>
        <text x="0" y="32" font-size="30" font-weight="900" fill="#10b981">69.8%</text>
        <text x="0" y="52" font-size="11" font-weight="700" fill="#94a3b8">Debt-to-Asset Ratio: 1.5% (Healthy)</text>
      </g>

      <rect x="30" y="580" width="360" height="80" rx="12" fill="#070d18" stroke="rgba(255,215,0,0.3)"/>
      <text x="50" y="610" font-size="13" font-weight="800" fill="#ffffff">✨ 24K AI Assistant Active</text>
      <text x="50" y="632" font-size="11" font-weight="500" fill="#94a3b8">Continuous expense diagnostics &amp; prompt response</text>
    </g>

    <!-- CENTER MOBILE PHONE FRAME (ledger-home) -->
    <g transform="translate(595, 30)">
      <rect x="0" y="0" width="410" height="840" rx="40" fill="#070b14" stroke="#ffd700" stroke-width="3" filter="url(#ledShadow)"/>
      <rect x="6" y="6" width="398" height="828" rx="34" fill="#090d18"/>

      ${renderPhoneHeader('Home')}

      <!-- PHONE SCREEN CONTENT -->
      <g transform="translate(16, 90)">

        <!-- CARD 1: Portfolio Net Worth -->
        <g transform="translate(0, 0)">
          <rect width="378" height="185" rx="16" fill="url(#phoneCardGrad)" stroke="rgba(255,215,0,0.3)" stroke-width="1.5"/>
          <circle cx="20" cy="24" r="5" fill="#ffd700"/>
          <text x="32" y="28" font-size="10" font-weight="800" fill="#ffd700" letter-spacing="0.5">TOTAL PORTFOLIO NET WORTH</text>

          <rect x="260" y="12" width="104" height="22" rx="11" fill="#ffd700" fill-opacity="0.15" stroke="#ffd700" stroke-width="1"/>
          <text x="272" y="27" font-size="9" font-weight="900" fill="#ffd700">🛡 24K VERIFIED</text>

          <text x="18" y="70" font-size="28" font-weight="900" fill="#ffffff">AED 143,950.00</text>

          <!-- Inflow Box -->
          <g transform="translate(18, 88)">
            <rect width="165" height="42" rx="10" fill="#0b1326" stroke="rgba(255,255,255,0.08)"/>
            <circle cx="22" cy="21" r="11" fill="#ffd700" fill-opacity="0.2"/>
            <text x="18" y="25" font-size="12" fill="#ffd700">↑</text>
            <text x="40" y="16" font-size="9" font-weight="700" fill="#94a3b8">Inflow</text>
            <text x="40" y="32" font-size="11" font-weight="800" fill="#ffd700">AED 21,700.00</text>
          </g>

          <!-- Outflow Box -->
          <g transform="translate(195, 88)">
            <rect width="165" height="42" rx="10" fill="#0b1326" stroke="rgba(255,255,255,0.08)"/>
            <circle cx="22" cy="21" r="11" fill="#ef4444" fill-opacity="0.2"/>
            <text x="18" y="25" font-size="12" fill="#ef4444">↓</text>
            <text x="40" y="16" font-size="9" font-weight="700" fill="#94a3b8">Outflow</text>
            <text x="40" y="32" font-size="11" font-weight="800" fill="#ef4444">AED 6,545.50</text>
          </g>

          <!-- Liquidity Box -->
          <g transform="translate(18, 138)">
            <rect width="342" height="34" rx="8" fill="#070c18" stroke="rgba(255,215,0,0.2)"/>
            <text x="14" y="22" font-size="11" fill="#ffd700">📈</text>
            <text x="34" y="21" font-size="10" font-weight="700" fill="#ffffff">Monthly Net Liquidity</text>
            <text x="328" y="21" font-size="12" font-weight="900" fill="#ffd700" text-anchor="end">AED 15,154.50</text>
          </g>
        </g>

        <!-- CARD 2: AI Quick Insights -->
        <g transform="translate(0, 198)">
          <rect width="378" height="84" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,255,255,0.1)"/>
          <text x="16" y="25" font-size="12" fill="#ffd700">✨</text>
          <text x="36" y="24" font-size="11" font-weight="800" fill="#ffffff">24K AI Assistant Quick Insights</text>
          <text x="362" y="24" font-size="10" font-weight="800" fill="#ffd700" text-anchor="end">Open Chat →</text>

          <rect x="16" y="38" width="138" height="32" rx="10" fill="#0b1326" stroke="rgba(255,255,255,0.1)"/>
          <text x="26" y="58" font-size="10" font-weight="600" fill="#ffffff">Summarize my month</text>

          <rect x="162" y="38" width="200" height="32" rx="10" fill="#0b1326" stroke="rgba(255,255,255,0.1)"/>
          <text x="172" y="58" font-size="10" font-weight="600" fill="#ffffff">Why did my expenses increase?</text>
        </g>

        <!-- Action Buttons -->
        <g transform="translate(0, 294)">
          <rect x="0" y="0" width="182" height="42" rx="12" fill="url(#goldBtnGrad)"/>
          <text x="28" y="26" font-size="16" fill="#050811">+</text>
          <text x="48" y="25" font-size="11" font-weight="900" fill="#050811">New Transaction</text>

          <rect x="194" y="0" width="184" height="42" rx="12" fill="#0b1326" stroke="#ffd700" stroke-width="1.5"/>
          <text x="218" y="25" font-size="13" fill="#ffd700">✨</text>
          <text x="238" y="25" font-size="11" font-weight="900" fill="#ffd700">Ask AI Assistant</text>
        </g>

        <!-- CARD 3: Financial Health Score -->
        <g transform="translate(0, 348)">
          <rect width="378" height="135" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,215,0,0.2)"/>
          
          <circle cx="32" cy="32" r="16" fill="#ffd700" fill-opacity="0.15"/>
          <text x="25" y="37" font-size="14" fill="#ffd700">🛡</text>

          <text x="60" y="28" font-size="12" font-weight="800" fill="#ffffff">Financial Health Score</text>
          <text x="60" y="44" font-size="9" font-weight="600" fill="#94a3b8">24K Automated Diagnostic</text>

          <text x="362" y="36" font-size="20" font-weight="900" fill="#ffd700" text-anchor="end">100/100</text>

          <rect x="16" y="60" width="346" height="8" rx="4" fill="#1e293b"/>
          <rect x="16" y="60" width="346" height="8" rx="4" fill="#ffd700"/>

          <text x="16" y="88" font-size="11" font-weight="800" fill="#ffffff">Excellent Financial Standing</text>
          <text x="16" y="108" font-size="10" font-weight="500" fill="#94a3b8">You saved 69% of your income this period. Debt ratio healthy at 1%.</text>
        </g>

        <!-- CARD 4: Category Spending Breakdown Preview -->
        <g transform="translate(0, 495)">
          <rect width="378" height="75" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,255,255,0.1)"/>
          <text x="16" y="28" font-size="12" font-weight="800" fill="#ffffff">Category Spending Breakdown</text>
          <text x="362" y="28" font-size="10" font-weight="800" fill="#ffd700" text-anchor="end">24K Portfolio Analytics</text>
          <line x1="16" y1="42" x2="362" y2="42" stroke="rgba(255,255,255,0.08)"/>
          <text x="16" y="60" font-size="10" fill="#94a3b8">Housing: 79% • Groceries: 12% • Dining: 4% • Fuel: 2%</text>
        </g>

      </g>

      ${renderPhoneBottomNav('Home')}
    </g>

    <!-- RIGHT EXECUTIVE HIGHLIGHTS PANEL -->
    <g transform="translate(1100, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>

      <text x="30" y="40" font-size="11" font-weight="900" fill="#ffd700" letter-spacing="1">SYSTEM CAPABILITIES</text>
      <text x="30" y="70" font-size="20" font-weight="800" fill="#ffffff">EXECUTIVE FEATURE MATRIX</text>

      <g transform="translate(30, 100)">
        <rect width="360" height="120" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="13" font-weight="800" fill="#ffd700">01 • AUTOMATED DIAGNOSTICS</text>
        <text x="20" y="55" font-size="12" font-weight="600" fill="#ffffff">Real-time Financial Health Scoring</text>
        ${wrapSvgText('Continuous monitoring of liquidity, debt ratios, savings milestones, and cash flow velocity.', 20, 80, 42, 11, '#94a3b8', '400', 18)}
      </g>

      <g transform="translate(30, 240)">
        <rect width="360" height="120" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="13" font-weight="800" fill="#ffd700">02 • MULTI-CURRENCY ENGINE</text>
        <text x="20" y="55" font-size="12" font-weight="600" fill="#ffffff">AED / USD Real-Time FX Valuation</text>
        ${wrapSvgText('Instant conversion and unified net worth calculation across bank accounts and credit cards.', 20, 80, 42, 11, '#94a3b8', '400', 18)}
      </g>

      <g transform="translate(30, 380)">
        <rect width="360" height="120" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="13" font-weight="800" fill="#ffd700">03 • 24K AI CONVERSATIONAL AGENT</text>
        <text x="20" y="55" font-size="12" font-weight="600" fill="#ffffff">Natural Language Queries &amp; Audits</text>
        ${wrapSvgText('Instant answers regarding spending trends, budget anomalies, and custom transaction searches.', 20, 80, 42, 11, '#94a3b8', '400', 18)}
      </g>
    </g>
  </svg>`;
}

// -------------------------------------------------------------
// 2. LEDGER HISTORY (ledger-history.svg)
// -------------------------------------------------------------
function buildHistorySVG() {
  const txs = [
    { title: 'Carrefour Hypermarket', sub: 'Groceries &amp; Supermarket • ADCB Credit Card', notes: 'Weekly family groceries &amp; essentials', tag: '#Groceries', amount: '-AED 845.50', isNeg: true, icon: '🛍' },
    { title: 'TechCorp Global', sub: 'Salary &amp; Wages • Bank Deposit', notes: 'July Monthly Salary', tag: '#Salary', amount: '+AED 18,500.00', isNeg: false, icon: '💼' },
    { title: 'Emaar Properties', sub: 'Housing &amp; Rent • Bank Transfer', notes: 'Apartment monthly rent', tag: '#Rent', amount: '-AED 5,200.00', isNeg: true, icon: '🏢' },
    { title: 'ADNOC Distribution', sub: 'Transport &amp; Fuel • ADCB Credit Card', notes: 'Vehicle Super 98 fuel refill', tag: '#Fuel', amount: '-AED 180.00', isNeg: true, icon: '⛽' },
    { title: 'Ceviche Seafood Grill', sub: 'Dining &amp; Cafes • ADCB Credit Card', notes: 'Team celebratory dinner', tag: '#Dining', amount: '-AED 320.00', isNeg: true, icon: '🍽' }
  ];

  let txList = '';
  txs.forEach((t, i) => {
    const y = i * 92;
    txList += `
      <g transform="translate(0, ${y})">
        <rect width="378" height="84" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,255,255,0.08)"/>
        
        <rect x="12" y="14" width="36" height="36" rx="10" fill="#0b1326" stroke="rgba(255,255,255,0.1)"/>
        <text x="30" y="38" font-size="16" text-anchor="middle">${t.icon}</text>

        <text x="56" y="28" font-size="12" font-weight="800" fill="#ffffff">${t.title}</text>
        <text x="56" y="44" font-size="9" font-weight="500" fill="#94a3b8">${t.sub}</text>
        <text x="56" y="60" font-size="9" font-weight="600" fill="#64748b">${t.notes}</text>

        <text x="364" y="32" font-size="13" font-weight="900" fill="${t.isNeg ? '#ef4444' : '#10b981'}" text-anchor="end">${t.amount}</text>
        <rect x="304" y="44" width="60" height="18" rx="9" fill="#070c18"/>
        <text x="334" y="56" font-size="8" font-weight="700" fill="#ffd700" text-anchor="middle">${t.tag}</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${ledgerDefs}
    <rect width="1600" height="900" fill="url(#ledBgGrad)" />

    <!-- LEFT PANEL -->
    <g transform="translate(80, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <rect x="30" y="30" width="150" height="26" rx="6" fill="#ffd700" fill-opacity="0.15"/>
      <text x="42" y="47" font-size="11" font-weight="900" fill="#ffd700">TRANSACTION RECORDS</text>

      <text x="30" y="100" font-size="30" font-weight="900" fill="#ffffff">FINANCIAL HISTORY</text>
      <text x="30" y="130" font-size="14" font-weight="600" fill="#ffd700">COMPLETE AUDITABLE LEDGER</text>

      ${wrapSvgText('Real-time transaction tracking, merchant categorization, multi-card expenditure records, and searchable ledger history.', 30, 165, 48, 12, '#94a3b8', '400', 20)}

      <line x1="30" y1="240" x2="390" y2="240" stroke="rgba(255,255,255,0.1)"/>

      <g transform="translate(30, 270)">
        <text x="0" y="0" font-size="11" font-weight="800" fill="#64748b">TOTAL RECORDED ITEMS</text>
        <text x="0" y="32" font-size="28" font-weight="900" fill="#ffffff">1,420 Entries</text>
      </g>
    </g>

    <!-- CENTER PHONE (ledger-history) -->
    <g transform="translate(595, 30)">
      <rect x="0" y="0" width="410" height="840" rx="40" fill="#070b14" stroke="#ffd700" stroke-width="3" filter="url(#ledShadow)"/>
      <rect x="6" y="6" width="398" height="828" rx="34" fill="#090d18"/>

      ${renderPhoneHeader('History')}

      <!-- PHONE SCREEN CONTENT -->
      <g transform="translate(16, 90)">
        <text x="0" y="24" font-size="18" font-weight="900" fill="#ffffff">Transaction History</text>

        <g transform="translate(240, 0)">
          <rect width="138" height="34" rx="10" fill="url(#goldBtnGrad)"/>
          <text x="69" y="21" font-size="10" font-weight="900" fill="#050811" text-anchor="middle">+ Add Record</text>
        </g>

        <!-- Search Bar -->
        <g transform="translate(0, 42)">
          <rect width="378" height="42" rx="12" fill="#0b1326" stroke="rgba(255,255,255,0.1)"/>
          <text x="16" y="26" font-size="11" fill="#94a3b8">🔍 Search by merchant, category, tag...</text>
        </g>

        <!-- Transactions List -->
        <g transform="translate(0, 98)">
          ${txList}
        </g>
      </g>

      ${renderPhoneBottomNav('History')}
    </g>

    <!-- RIGHT PANEL -->
    <g transform="translate(1100, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <text x="30" y="40" font-size="11" font-weight="900" fill="#ffd700">AUDIT TRAIL</text>
      <text x="30" y="70" font-size="20" font-weight="800" fill="#ffffff">MERCHANT INTEGRATION</text>

      <g transform="translate(30, 100)">
        <rect width="360" height="120" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="12" font-weight="800" fill="#ffd700">INSTANT MERCHANT RECOGNITION</text>
        ${wrapSvgText('Detailed merchant tracking and automated expense categorization across all active bank accounts and credit cards.', 20, 55, 42, 11, '#94a3b8', '400', 18)}
      </g>
    </g>

  </svg>`;
}

// -------------------------------------------------------------
// 3. LEDGER BUDGETS (ledger-budgets.svg)
// -------------------------------------------------------------
function buildBudgetsSVG() {
  const budgets = [
    { title: 'Groceries &amp; Supermarket', pct: 42, spent: 'AED 845.50', limit: 'AED 2,000.00', icon: '🛒' },
    { title: 'Dining &amp; Cafes', pct: 26, spent: 'AED 320.00', limit: 'AED 1,200.00', icon: '🍽' },
    { title: 'Shopping &amp; Fashion', pct: 0, spent: 'AED 0.00', limit: 'AED 1,500.00', icon: '🛍' },
    { title: 'Transport &amp; Fuel', pct: 22, spent: 'AED 180.00', limit: 'AED 800.00', icon: '⛽' },
    { title: 'Subscriptions &amp; Media', pct: 0, spent: 'AED 0.00', limit: 'AED 500.00', icon: '📺' }
  ];

  let bList = '';
  budgets.forEach((b, i) => {
    const y = i * 92;
    const barW = Math.max(10, Math.round(346 * (b.pct / 100)));
    bList += `
      <g transform="translate(0, ${y})">
        <rect width="378" height="84" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,255,255,0.08)"/>
        <text x="16" y="28" font-size="14">${b.icon}</text>
        <text x="40" y="27" font-size="12" font-weight="800" fill="#ffffff">${b.title}</text>
        <text x="362" y="27" font-size="11" font-weight="800" fill="#ffd700" text-anchor="end">${b.pct}%</text>

        <!-- Progress Bar -->
        <rect x="16" y="40" width="346" height="8" rx="4" fill="#1e293b"/>
        <rect x="16" y="40" width="${barW}" height="8" rx="4" fill="url(#goldGrad)"/>

        <text x="16" y="66" font-size="10" font-weight="600" fill="#94a3b8">Spent: ${b.spent}</text>
        <text x="362" y="66" font-size="10" font-weight="600" fill="#64748b" text-anchor="end">Limit: ${b.limit}</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${ledgerDefs}
    <rect width="1600" height="900" fill="url(#ledBgGrad)" />

    <!-- LEFT PANEL -->
    <g transform="translate(80, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <rect x="30" y="30" width="150" height="26" rx="6" fill="#ffd700" fill-opacity="0.15"/>
      <text x="42" y="47" font-size="11" font-weight="900" fill="#ffd700">BUDGET CONTROLS</text>

      <text x="30" y="100" font-size="28" font-weight="900" fill="#ffffff">CATEGORY BUDGETS</text>
      <text x="30" y="130" font-size="14" font-weight="600" fill="#ffd700">EXPENDITURE THRESHOLDS</text>

      ${wrapSvgText('Category monthly budget limits, real-time spending progress bars, threshold alerts, and automated budget recommendations.', 30, 165, 48, 12, '#94a3b8', '400', 20)}

      <line x1="30" y1="240" x2="390" y2="240" stroke="rgba(255,255,255,0.1)"/>

      <g transform="translate(30, 270)">
        <text x="0" y="0" font-size="11" font-weight="800" fill="#64748b">OVERALL BUDGET UTILIZATION</text>
        <text x="0" y="32" font-size="28" font-weight="900" fill="#10b981">22.4% Used</text>
      </g>
    </g>

    <!-- CENTER PHONE (ledger-budgets) -->
    <g transform="translate(595, 30)">
      <rect x="0" y="0" width="410" height="840" rx="40" fill="#070b14" stroke="#ffd700" stroke-width="3" filter="url(#ledShadow)"/>
      <rect x="6" y="6" width="398" height="828" rx="34" fill="#090d18"/>

      ${renderPhoneHeader('Budgets')}

      <!-- PHONE SCREEN CONTENT -->
      <g transform="translate(16, 90)">
        <text x="0" y="24" font-size="18" font-weight="900" fill="#ffffff">Category Monthly Budgets</text>

        <g transform="translate(240, 0)">
          <rect width="138" height="34" rx="10" fill="url(#goldBtnGrad)"/>
          <text x="69" y="21" font-size="10" font-weight="900" fill="#050811" text-anchor="middle">+ Add Budget</text>
        </g>

        <!-- Summary Banner -->
        <g transform="translate(0, 42)">
          <rect width="378" height="60" rx="12" fill="url(#phoneCardGrad)" stroke="rgba(255,215,0,0.2)"/>
          <text x="16" y="24" font-size="11" font-weight="700" fill="#ffffff">Total Budget Allocated</text>
          <text x="16" y="44" font-size="14" font-weight="900" fill="#ffd700">AED 6,000.00 / month</text>
          <text x="362" y="34" font-size="11" font-weight="800" fill="#10b981" text-anchor="end">AED 1,345.50 Spent</text>
        </g>

        <!-- Budgets List -->
        <g transform="translate(0, 115)">
          ${bList}
        </g>
      </g>

      ${renderPhoneBottomNav('Budgets')}
    </g>

    <!-- RIGHT PANEL -->
    <g transform="translate(1100, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <text x="30" y="40" font-size="11" font-weight="900" fill="#ffd700">BUDGET INTELLIGENCE</text>
      <text x="30" y="70" font-size="20" font-weight="800" fill="#ffffff">AUTOMATED ALERTS</text>

      <g transform="translate(30, 100)">
        <rect width="360" height="120" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="12" font-weight="800" fill="#ffd700">SMART SPENDING LIMITS</text>
        ${wrapSvgText('Automated warnings when category expenditure reaches 80% threshold, preventing budget overruns.', 20, 55, 42, 11, '#94a3b8', '400', 18)}
      </g>
    </g>

  </svg>`;
}

// -------------------------------------------------------------
// 4. LEDGER GOALS (ledger-goals.svg)
// -------------------------------------------------------------
function buildGoalsSVG() {
  const goals = [
    { title: 'Dubai Luxury Villa Deposit', current: 'AED 85,000.00', target: 'AED 200,000.00', pct: 42.5, icon: '🏡' },
    { title: 'Emergency Reserve Fund', current: 'AED 35,000.00', target: 'AED 50,000.00', pct: 70.0, icon: '🛡' },
    { title: 'Global Tech Investment Portfolio', current: 'AED 23,950.00', target: 'AED 100,000.00', pct: 23.9, icon: '📈' }
  ];

  let gList = '';
  goals.forEach((g, i) => {
    const y = i * 115;
    const barW = Math.max(10, Math.round(346 * (g.pct / 100)));
    gList += `
      <g transform="translate(0, ${y})">
        <rect width="378" height="105" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,215,0,0.2)"/>
        <text x="16" y="28" font-size="16">${g.icon}</text>
        <text x="44" y="27" font-size="12" font-weight="800" fill="#ffffff">${g.title}</text>

        <text x="16" y="52" font-size="13" font-weight="900" fill="#ffd700">${g.current}</text>
        <text x="362" y="52" font-size="11" font-weight="600" fill="#94a3b8" text-anchor="end">Target: ${g.target}</text>

        <!-- Progress Bar -->
        <rect x="16" y="65" width="346" height="8" rx="4" fill="#1e293b"/>
        <rect x="16" y="65" width="${barW}" height="8" rx="4" fill="url(#goldGrad)"/>

        <text x="16" y="90" font-size="10" font-weight="700" fill="#10b981">${g.pct}% Achieved</text>
        <text x="362" y="90" font-size="10" font-weight="600" fill="#ffd700" text-anchor="end">Auto-Deposit Active</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${ledgerDefs}
    <rect width="1600" height="900" fill="url(#ledBgGrad)" />

    <!-- LEFT PANEL -->
    <g transform="translate(80, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <rect x="30" y="30" width="150" height="26" rx="6" fill="#ffd700" fill-opacity="0.15"/>
      <text x="42" y="47" font-size="11" font-weight="900" fill="#ffd700">WEALTH MILESTONES</text>

      <text x="30" y="100" font-size="28" font-weight="900" fill="#ffffff">SAVINGS GOALS</text>
      <text x="30" y="130" font-size="14" font-weight="600" fill="#ffd700">CAPITAL ACCUMULATION</text>

      ${wrapSvgText('Automated savings milestone tracking, emergency fund allocation, investment targets, and high-yield wealth accumulation goals.', 30, 165, 48, 12, '#94a3b8', '400', 20)}

      <line x1="30" y1="240" x2="390" y2="240" stroke="rgba(255,255,255,0.1)"/>

      <g transform="translate(30, 270)">
        <text x="0" y="0" font-size="11" font-weight="800" fill="#64748b">TOTAL SAVINGS SAVED</text>
        <text x="0" y="32" font-size="28" font-weight="900" fill="#ffd700">AED 143,950.00</text>
      </g>
    </g>

    <!-- CENTER PHONE (ledger-goals) -->
    <g transform="translate(595, 30)">
      <rect x="0" y="0" width="410" height="840" rx="40" fill="#070b14" stroke="#ffd700" stroke-width="3" filter="url(#ledShadow)"/>
      <rect x="6" y="6" width="398" height="828" rx="34" fill="#090d18"/>

      ${renderPhoneHeader('Goals')}

      <!-- PHONE SCREEN CONTENT -->
      <g transform="translate(16, 90)">
        <text x="0" y="24" font-size="18" font-weight="900" fill="#ffffff">Savings &amp; Wealth Goals</text>

        <g transform="translate(240, 0)">
          <rect width="138" height="34" rx="10" fill="url(#goldBtnGrad)"/>
          <text x="69" y="21" font-size="10" font-weight="900" fill="#050811" text-anchor="middle">+ New Goal</text>
        </g>

        <!-- Goals List -->
        <g transform="translate(0, 50)">
          ${gList}
        </g>
      </g>

      ${renderPhoneBottomNav('Goals')}
    </g>

    <!-- RIGHT PANEL -->
    <g transform="translate(1100, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <text x="30" y="40" font-size="11" font-weight="900" fill="#ffd700">TARGET STRATEGY</text>
      <text x="30" y="70" font-size="20" font-weight="800" fill="#ffffff">AUTOMATED DEPOSITS</text>

      <g transform="translate(30, 100)">
        <rect width="360" height="120" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="12" font-weight="800" fill="#ffd700">RECURRING ALLOCATION</text>
        ${wrapSvgText('Automated monthly transfers from salary income to dedicated savings sub-accounts and liquidity pools.', 20, 55, 42, 11, '#94a3b8', '400', 18)}
      </g>
    </g>

  </svg>`;
}

// -------------------------------------------------------------
// 5. LEDGER REPORTS (ledger-reports.svg)
// -------------------------------------------------------------
function buildReportsSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${ledgerDefs}
    <rect width="1600" height="900" fill="url(#ledBgGrad)" />

    <!-- LEFT PANEL -->
    <g transform="translate(80, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <rect x="30" y="30" width="150" height="26" rx="6" fill="#ffd700" fill-opacity="0.15"/>
      <text x="42" y="47" font-size="11" font-weight="900" fill="#ffd700">EXECUTIVE ANALYTICS</text>

      <text x="30" y="100" font-size="28" font-weight="900" fill="#ffffff">REPORTS &amp; AUDITS</text>
      <text x="30" y="130" font-size="14" font-weight="600" fill="#ffd700">PORTFOLIO DIAGNOSTICS</text>

      ${wrapSvgText('Executive analytics, cash flow velocity comparisons, category breakdown visualizers, and exportable financial summaries.', 30, 165, 48, 12, '#94a3b8', '400', 20)}

      <line x1="30" y1="240" x2="390" y2="240" stroke="rgba(255,255,255,0.1)"/>

      <g transform="translate(30, 270)">
        <text x="0" y="0" font-size="11" font-weight="800" fill="#64748b">CASH FLOW VELOCITY</text>
        <text x="0" y="32" font-size="28" font-weight="900" fill="#10b981">+3.3x Inflow Ratio</text>
      </g>
    </g>

    <!-- CENTER PHONE (ledger-reports) -->
    <g transform="translate(595, 30)">
      <rect x="0" y="0" width="410" height="840" rx="40" fill="#070b14" stroke="#ffd700" stroke-width="3" filter="url(#ledShadow)"/>
      <rect x="6" y="6" width="398" height="828" rx="34" fill="#090d18"/>

      ${renderPhoneHeader('Reports')}

      <!-- PHONE SCREEN CONTENT -->
      <g transform="translate(16, 90)">
        <text x="0" y="24" font-size="18" font-weight="900" fill="#ffffff">Analytics &amp; Reports</text>

        <g transform="translate(240, 0)">
          <rect width="138" height="34" rx="10" fill="url(#goldBtnGrad)"/>
          <text x="69" y="21" font-size="10" font-weight="900" fill="#050811" text-anchor="middle">📥 Export CSV</text>
        </g>

        <!-- Executive Overview Card -->
        <g transform="translate(0, 42)">
          <rect width="378" height="90" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,255,255,0.08)"/>
          <text x="16" y="24" font-size="11" font-weight="800" fill="#ffffff">Executive Overview</text>

          <text x="16" y="50" font-size="9" font-weight="600" fill="#94a3b8">Monthly Savings</text>
          <text x="16" y="70" font-size="16" font-weight="900" fill="#ffd700">69.8%</text>

          <text x="140" y="50" font-size="9" font-weight="600" fill="#94a3b8">Debt Ratio</text>
          <text x="140" y="70" font-size="16" font-weight="900" fill="#ffd700">1.5%</text>

          <text x="250" y="50" font-size="9" font-weight="600" fill="#94a3b8">Total Accounts</text>
          <text x="250" y="70" font-size="16" font-weight="900" fill="#ffffff">5 Active</text>
        </g>

        <!-- Donut Chart Card -->
        <g transform="translate(0, 145)">
          <rect width="378" height="210" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,215,0,0.2)"/>
          <text x="16" y="24" font-size="12" font-weight="800" fill="#ffffff">Category Spending Breakdown</text>
          <text x="362" y="24" font-size="9" font-weight="800" fill="#ffd700" text-anchor="end">24K Portfolio</text>

          <!-- Donut SVG graphics -->
          <g transform="translate(75, 120)">
            <circle cx="0" cy="0" r="55" fill="none" stroke="#ef4444" stroke-width="20" stroke-dasharray="270 345"/>
            <circle cx="0" cy="0" r="55" fill="none" stroke="#ffd700" stroke-width="20" stroke-dasharray="45 345" stroke-dashoffset="-270"/>
            <circle cx="0" cy="0" r="55" fill="none" stroke="#f59e0b" stroke-width="20" stroke-dasharray="18 345" stroke-dashoffset="-315"/>
            <circle cx="0" cy="0" r="55" fill="none" stroke="#00b4d8" stroke-width="20" stroke-dasharray="10 345" stroke-dashoffset="-333"/>
            <text x="0" y="-5" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="middle">TOTAL</text>
            <text x="0" y="12" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">6,546</text>
          </g>

          <!-- Legend -->
          <g transform="translate(165, 55)">
            <circle cx="8" cy="8" r="5" fill="#ef4444"/>
            <text x="22" y="12" font-size="10" font-weight="600" fill="#ffffff">Housing &amp; Rent</text>
            <text x="190" y="12" font-size="10" font-weight="900" fill="#ffffff" text-anchor="end">79%</text>

            <circle cx="8" cy="38" r="5" fill="#ffd700"/>
            <text x="22" y="42" font-size="10" font-weight="600" fill="#ffffff">Groceries</text>
            <text x="190" y="42" font-size="10" font-weight="900" fill="#ffffff" text-anchor="end">12%</text>

            <circle cx="8" cy="68" r="5" fill="#f59e0b"/>
            <text x="22" y="72" font-size="10" font-weight="600" fill="#ffffff">Dining</text>
            <text x="190" y="72" font-size="10" font-weight="900" fill="#ffffff" text-anchor="end">4%</text>

            <circle cx="8" cy="98" r="5" fill="#00b4d8"/>
            <text x="22" y="102" font-size="10" font-weight="600" fill="#ffffff">Transport</text>
            <text x="190" y="102" font-size="10" font-weight="900" fill="#ffffff" text-anchor="end">2%</text>
          </g>
        </g>

        <!-- Cash Flow Bar Chart Card -->
        <g transform="translate(0, 368)">
          <rect width="378" height="185" rx="14" fill="url(#phoneCardGrad)" stroke="rgba(255,255,255,0.08)"/>
          <text x="16" y="24" font-size="12" font-weight="800" fill="#ffffff">Monthly Cash Flow Comparison</text>

          <g transform="translate(90, 60)">
            <text x="0" y="-8" font-size="9" font-weight="900" fill="#ffd700" text-anchor="middle">AED 21,700</text>
            <rect x="-24" y="0" width="48" height="90" rx="6" fill="url(#goldBtnGrad)"/>

            <text x="120" y="-8" font-size="9" font-weight="900" fill="#ef4444" text-anchor="middle">AED 6,546</text>
            <rect x="96" y="40" width="48" height="50" rx="6" fill="#ef4444"/>
            <text x="120" y="105" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="middle">Outflow</text>
          </g>
        </g>

      </g>

      ${renderPhoneBottomNav('Reports')}
    </g>

    <!-- RIGHT PANEL -->
    <g transform="translate(1100, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <text x="30" y="40" font-size="11" font-weight="900" fill="#ffd700">PORTFOLIO INSIGHTS</text>
      <text x="30" y="70" font-size="20" font-weight="800" fill="#ffffff">AUTOMATED ANALYSIS</text>

      <g transform="translate(30, 100)">
        <rect width="360" height="150" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="12" font-weight="800" fill="#ffd700">NET CASH FLOW POSITIVE</text>
        ${wrapSvgText('Net positive liquidity generated this period. Outflows represent only 30.1% of total gross inflow.', 20, 55, 42, 11, '#94a3b8', '400', 18)}
      </g>
    </g>

  </svg>`;
}

// -------------------------------------------------------------
// 6. LEDGER AI ASSISTANT (ledger-ai.svg)
// -------------------------------------------------------------
function buildAISVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${ledgerDefs}
    <rect width="1600" height="900" fill="url(#ledBgGrad)" />

    <!-- LEFT PANEL -->
    <g transform="translate(80, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <rect x="30" y="30" width="160" height="26" rx="6" fill="#ffd700" fill-opacity="0.15"/>
      <text x="42" y="47" font-size="11" font-weight="900" fill="#ffd700">24K AGENT ENGINE</text>

      <text x="30" y="100" font-size="28" font-weight="900" fill="#ffffff">LEDGER ASSISTANT</text>
      ${wrapSvgText('Natural language financial conversation, automated transaction search, and safe confirmation workflows.', 30, 130, 48, 12, '#94a3b8', '500', 20)}

      <g transform="translate(30, 195)">
        <rect width="360" height="130" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="12" font-weight="800" fill="#ffd700">HUMAN-IN-THE-LOOP CONTROL</text>
        ${wrapSvgText('The AI assistant provides real-time insights and prepares transaction drafts, requiring explicit confirmation before mutating records.', 20, 55, 42, 11, '#94a3b8', '400', 18)}
      </g>
    </g>

    <!-- CENTER PHONE (ledger-ai) -->
    <g transform="translate(595, 30)">
      <rect x="0" y="0" width="410" height="840" rx="40" fill="#070b14" stroke="#ffd700" stroke-width="3" filter="url(#ledShadow)"/>
      <rect x="6" y="6" width="398" height="828" rx="34" fill="#090d18"/>

      ${renderPhoneHeader('AI Assist')}

      <!-- PHONE SCREEN CONTENT -->
      <g transform="translate(16, 90)">

        <!-- Assistant Header Banner -->
        <g transform="translate(0, 0)">
          <rect width="378" height="68" rx="16" fill="url(#phoneCardGrad)" stroke="rgba(255,215,0,0.3)"/>
          <circle cx="28" cy="34" r="16" fill="#ffd700" fill-opacity="0.15"/>
          <text x="21" y="39" font-size="14" fill="#ffd700">✨</text>

          <text x="56" y="30" font-size="14" font-weight="900" fill="#ffffff">Ledger Assistant</text>
          <rect x="185" y="16" width="54" height="20" rx="10" fill="#ffd700" fill-opacity="0.2"/>
          <text x="212" y="30" font-size="9" font-weight="800" fill="#ffd700" text-anchor="middle">Friendly</text>

          <text x="56" y="48" font-size="10" font-weight="500" fill="#94a3b8">Natural Language Financial Assistant</text>

          <text x="290" y="38" font-size="13" fill="#ffffff">🔊</text>
          <text x="320" y="38" font-size="13" fill="#ffffff">⚙</text>
          <text x="350" y="38" font-size="13" fill="#ffffff">⁝</text>
        </g>

        <!-- Suggested Prompt Chips -->
        <g transform="translate(0, 80)">
          <rect x="0" y="0" width="168" height="34" rx="12" fill="#0b1326" stroke="rgba(255,255,255,0.1)"/>
          <text x="84" y="21" font-size="10" font-weight="600" fill="#ffffff" text-anchor="middle">What is my current balance?</text>

          <rect x="176" y="0" width="202" height="34" rx="12" fill="#0b1326" stroke="rgba(255,255,255,0.1)"/>
          <text x="277" y="21" font-size="10" font-weight="600" fill="#ffffff" text-anchor="middle">How much did I spend on groceries?</text>
        </g>

        <!-- Conversational Bubble -->
        <g transform="translate(0, 130)">
          <rect width="378" height="195" rx="16" fill="url(#phoneCardGrad)" stroke="rgba(255,215,0,0.2)"/>
          <circle cx="24" cy="28" r="12" fill="#ffd700" fill-opacity="0.2"/>
          <text x="19" y="32" font-size="11" fill="#ffd700">✨</text>

          ${wrapSvgText('Hello, I\'m Ledger Assistant. I can help you review spending, understand budgets, track savings goals, search transactions, and prepare entries.', 48, 28, 36, 11, '#ffffff', '500', 16)}
          
          ${wrapSvgText('You remain in control—I will always ask for confirmation before changing your financial records. How can I help you today?', 48, 98, 36, 11, '#ffffff', '500', 16)}

          <line x1="48" y1="150" x2="350" y2="150" stroke="rgba(255,255,255,0.08)"/>
          <text x="48" y="175" font-size="12" fill="#94a3b8">🔊</text>
          <text x="300" y="175" font-size="12" fill="#94a3b8">👍</text>
          <text x="330" y="175" font-size="12" fill="#94a3b8">👎</text>
        </g>

        <!-- Bottom Input Bar -->
        <g transform="translate(0, 510)">
          <rect width="378" height="52" rx="26" fill="#0b1326" stroke="#ffd700" stroke-width="1.5"/>
          <circle cx="28" cy="26" r="16" fill="#1e293b"/>
          <text x="22" y="31" font-size="14" fill="#ffd700">🎤</text>

          <text x="56" y="31" font-size="11" font-weight="500" fill="#94a3b8">Ask or instruct Ledger Assistant...</text>

          <circle cx="348" cy="26" r="18" fill="url(#goldBtnGrad)"/>
          <text x="342" y="32" font-size="14" fill="#050811">➤</text>
        </g>

      </g>

      ${renderPhoneBottomNav('AI Assist')}
    </g>

    <!-- RIGHT PANEL -->
    <g transform="translate(1100, 100)">
      <rect width="420" height="700" rx="20" fill="url(#cardBgGrad)" stroke="rgba(255,215,0,0.2)" stroke-width="1.5" filter="url(#ledShadow)"/>
      <text x="30" y="40" font-size="11" font-weight="900" fill="#ffd700">INTELLIGENT QUERY EXAMPLES</text>
      <text x="30" y="70" font-size="20" font-weight="800" fill="#ffffff">VOICE &amp; TEXT COMMANDS</text>

      <g transform="translate(30, 100)">
        <rect width="360" height="140" rx="12" fill="#070c18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="30" font-size="11" font-weight="800" fill="#ffd700">"Summarize my month"</text>
        ${wrapSvgText('Generates an instant executive breakdown of income, top expenses, savings rate, and financial health status.', 20, 55, 42, 11, '#94a3b8', '400', 18)}
      </g>
    </g>

  </svg>`;
}

// Generate files
const files = [
  { name: 'ledger-home', svg: buildHomeSVG() },
  { name: 'ledger-history', svg: buildHistorySVG() },
  { name: 'ledger-budgets', svg: buildBudgetsSVG() },
  { name: 'ledger-goals', svg: buildGoalsSVG() },
  { name: 'ledger-reports', svg: buildReportsSVG() },
  { name: 'ledger-ai', svg: buildAISVG() }
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

// Copy home to main ledger.svg & png
fs.copyFileSync(
  path.join(publicImgDir, 'ledger-home.svg'),
  path.join(publicImgDir, 'ledger.svg')
);
fs.copyFileSync(
  path.join(publicImgDir, 'ledger-home.png'),
  path.join(publicImgDir, 'ledger.png')
);
console.log('Successfully copied ledger-home to ledger.svg and ledger.png');
