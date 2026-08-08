const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const publicImgDir = path.join(process.cwd(), 'public/images');
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

// Common styles & defs for Jermann dark executive theme
const jermannDefs = `
  <defs>
    <linearGradient id="jerBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#02040a" />
      <stop offset="50%" stop-color="#070c18" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>

    <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffe28a" />
      <stop offset="100%" stop-color="#e2b041" />
    </linearGradient>

    <linearGradient id="cyanBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00b4d8" />
      <stop offset="100%" stop-color="#00f5d4" />
    </linearGradient>

    <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#070d19" stop-opacity="0.95" />
    </linearGradient>

    <linearGradient id="cardGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f5d4" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#00b4d8" stop-opacity="0.0" />
    </linearGradient>

    <filter id="jerShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap');
    * { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    .font-serif { font-family: 'Cinzel', Georgia, serif; }
    .txt-gold { font-family: 'Cinzel', Georgia, serif; fill: url(#goldTextGrad); }
    .txt-white-serif { font-family: 'Cinzel', Georgia, serif; fill: #ffffff; }
    .txt-cyan { fill: #00f5d4; }
    .txt-sub { fill: #94a3b8; font-size: 14px; font-weight: 500; }
    .txt-card-title { fill: #ffffff; font-weight: 700; font-size: 16px; }
  </style>
`;

// Common Header Bar for Jermann Screenshots
function getHeaderSVG(activeTab = 'HOME') {
  const tabs = ['HOME', 'ABOUT', 'SERVICES', 'INDUSTRIES', 'FRAMEWORK', 'EXPERIENCE', 'INSIGHTS', 'CONTACT'];
  let xOffset = 390;
  let navItems = '';

  tabs.forEach(tab => {
    const isActive = tab === activeTab;
    if (isActive) {
      navItems += `
        <rect x="${xOffset - 8}" y="18" width="${tab.length * 9 + 18}" height="28" rx="6" fill="#00f5d4" fill-opacity="0.12" stroke="#00f5d4" stroke-opacity="0.4" />
        <text x="${xOffset}" y="36" fill="#00f5d4" font-size="11" font-weight="700" letter-spacing="0.5">${tab}</text>
      `;
    } else {
      navItems += `
        <text x="${xOffset}" y="36" fill="#94a3b8" font-size="11" font-weight="600" letter-spacing="0.5">${tab}</text>
      `;
    }
    xOffset += tab.length * 9 + 28;
  });

  return `
    <!-- Top Header Navigation -->
    <rect x="0" y="0" width="1600" height="64" fill="#030712" fill-opacity="0.9" stroke-bottom="#1e293b" />
    <line x1="0" y1="64" x2="1600" y2="64" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- Jermann Logo -->
    <g transform="translate(40, 16)">
      <rect x="0" y="0" width="32" height="32" rx="8" fill="#00b4d8" fill-opacity="0.15" stroke="#00f5d4" stroke-width="1.5"/>
      <text x="11" y="23" font-family="'Cinzel', serif" font-size="20" font-weight="900" fill="#00f5d4">J</text>
      <text x="42" y="17" font-family="'Cinzel', serif" font-size="16" font-weight="800" fill="#ffffff" letter-spacing="1">JERMANN</text>
      <text x="42" y="28" font-size="8" font-weight="700" fill="#00f5d4" letter-spacing="0.8">ENTERPRISE DIGITAL TRANSFORMATION • AI ADVISORY</text>
    </g>

    <!-- Navigation Links -->
    ${navItems}

    <!-- Right Action Button -->
    <g transform="translate(1420, 15)">
      <rect x="0" y="0" width="140" height="34" rx="8" fill="url(#cyanBtnGrad)" />
      <text x="18" y="21" font-size="11" font-weight="800" fill="#040711" letter-spacing="0.5">BOOK CONSULTATION</text>
    </g>
  `;
}

// -------------------------------------------------------------
// 1. JERMANN HERO & BENTO ENGINE (jermann-hero.svg)
// -------------------------------------------------------------
function buildHeroSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${jermannDefs}

    <!-- Background Canvas -->
    <rect width="1600" height="900" fill="url(#jerBgGrad)" />

    <!-- Ambient Grid Lines & Constellation Nodes -->
    <g opacity="0.15">
      <line x1="0" y1="200" x2="1600" y2="200" stroke="#00f5d4" stroke-width="0.5" stroke-dasharray="4 8"/>
      <line x1="0" y1="500" x2="1600" y2="500" stroke="#00f5d4" stroke-width="0.5" stroke-dasharray="4 8"/>
      <line x1="0" y1="750" x2="1600" y2="750" stroke="#00f5d4" stroke-width="0.5" stroke-dasharray="4 8"/>
      <circle cx="200" cy="200" r="3" fill="#00f5d4"/>
      <circle cx="800" cy="150" r="4" fill="#ffe28a"/>
      <circle cx="1400" cy="260" r="3" fill="#00f5d4"/>
      <line x1="200" y1="200" x2="800" y2="150" stroke="#00f5d4" stroke-width="0.5"/>
      <line x1="800" y1="150" x2="1400" y2="260" stroke="#00f5d4" stroke-width="0.5"/>
    </g>

    ${getHeaderSVG('HOME')}

    <!-- Hero Display Typography -->
    <g transform="translate(800, 190)" text-anchor="middle">
      <text y="0" font-family="'Cinzel', serif" font-size="64" font-weight="900" fill="url(#goldTextGrad)" letter-spacing="4">STRATEGY REDEFINED.</text>
      <text y="75" font-family="'Cinzel', serif" font-size="64" font-weight="900" fill="#ffffff" letter-spacing="4">SCALE ACCELERATED.</text>
      
      <text y="135" font-size="16" font-weight="500" fill="#cbd5e1" max-width="800">
        We partner with Fortune 500 brands, sovereign funds, and industry category leaders to architect high-stakes market expansion and digital transformation.
      </text>
    </g>

    <!-- 5 Bento Strategic Capability Cards -->
    <g transform="translate(100, 390)">

      <!-- Card 01 -->
      <g transform="translate(0, 0)">
        <rect width="260" height="110" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>
        <rect x="16" y="16" width="28" height="20" rx="4" fill="#ffe28a" fill-opacity="0.15"/>
        <text x="24" y="30" font-size="10" font-weight="800" fill="#ffe28a">01</text>
        <text x="54" y="30" font-size="13" font-weight="800" fill="#ffffff">DIGITAL TRANSFORMATION</text>
        <text x="16" y="60" font-size="11" font-weight="500" fill="#94a3b8">Enterprise Architecture &amp; Tech Alignment</text>
        <circle cx="236" cy="24" r="4" fill="#00f5d4"/>
      </g>

      <!-- Card 02 -->
      <g transform="translate(285, 0)">
        <rect width="260" height="110" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>
        <rect x="16" y="16" width="28" height="20" rx="4" fill="#ffe28a" fill-opacity="0.15"/>
        <text x="23" y="30" font-size="10" font-weight="800" fill="#ffe28a">02</text>
        <text x="54" y="30" font-size="13" font-weight="800" fill="#ffffff">AI &amp; AUTOMATION</text>
        <text x="16" y="60" font-size="11" font-weight="500" fill="#94a3b8">Responsible Agentic Workflows</text>
        <circle cx="236" cy="24" r="4" fill="#00f5d4"/>
      </g>

      <!-- Card 03 -->
      <g transform="translate(570, 0)">
        <rect width="260" height="110" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>
        <rect x="16" y="16" width="28" height="20" rx="4" fill="#ffe28a" fill-opacity="0.15"/>
        <text x="23" y="30" font-size="10" font-weight="800" fill="#ffe28a">03</text>
        <text x="54" y="30" font-size="12" font-weight="800" fill="#ffffff">SOVEREIGN FUND ADVISORY</text>
        <text x="16" y="60" font-size="11" font-weight="500" fill="#94a3b8">High-Stakes Capital &amp; Growth</text>
        <circle cx="236" cy="24" r="4" fill="#00f5d4"/>
      </g>

      <!-- Card 04 -->
      <g transform="translate(855, 0)">
        <rect width="260" height="110" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>
        <rect x="16" y="16" width="28" height="20" rx="4" fill="#ffe28a" fill-opacity="0.15"/>
        <text x="23" y="30" font-size="10" font-weight="800" fill="#ffe28a">04</text>
        <text x="52" y="30" font-size="11" font-weight="800" fill="#ffffff">BUSINESS PROCESS OPTIMIZATION</text>
        <text x="16" y="60" font-size="11" font-weight="500" fill="#94a3b8">Lean &amp; Continuous Improvement</text>
        <circle cx="236" cy="24" r="4" fill="#00f5d4"/>
      </g>

      <!-- Card 05 -->
      <g transform="translate(1140, 0)">
        <rect width="260" height="110" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>
        <rect x="16" y="16" width="28" height="20" rx="4" fill="#ffe28a" fill-opacity="0.15"/>
        <text x="23" y="30" font-size="10" font-weight="800" fill="#ffe28a">05</text>
        <text x="54" y="30" font-size="12" font-weight="800" fill="#ffffff">EXECUTIVE GOVERNANCE</text>
        <text x="16" y="60" font-size="11" font-weight="500" fill="#94a3b8">Boardroom Strategy &amp; Delivery</text>
        <circle cx="236" cy="24" r="4" fill="#00f5d4"/>
      </g>
    </g>

    <!-- Action Bar & Controls -->
    <g transform="translate(800, 560)" text-anchor="middle">
      <rect x="-140" y="0" width="280" height="46" rx="10" fill="url(#cyanBtnGrad)" filter="url(#cyanGlow)"/>
      <text y="28" font-size="13" font-weight="800" fill="#040711" letter-spacing="1">BOOK EXECUTIVE BRIEFING  →</text>
    </g>

    <!-- Bottom Controls -->
    <g transform="translate(40, 820)">
      <rect x="0" y="0" width="160" height="38" rx="10" fill="#0b132b" stroke="rgba(255,255,255,0.15)"/>
      <text x="20" y="23" font-size="12" fill="#00f5d4">⏸ ♫ 🔊 AMBIENT AUDIO</text>
    </g>

    <g transform="translate(1360, 820)">
      <rect x="0" y="0" width="200" height="38" rx="19" fill="#00c853" />
      <text x="20" y="24" font-size="11" font-weight="800" fill="#ffffff">💬 WHATSAPP EXECUTIVE CONNECT</text>
    </g>
  </svg>`;
}

// -------------------------------------------------------------
// 2. CORPORATE ADVISORY & PRACTICE DOMAINS (jermann-advisory.svg)
// -------------------------------------------------------------
function buildAdvisorySVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${jermannDefs}

    <rect width="1600" height="900" fill="url(#jerBgGrad)" />

    ${getHeaderSVG('SERVICES')}

    <!-- Section Badge & Title -->
    <g transform="translate(800, 110)" text-anchor="middle">
      <rect x="-100" y="0" width="200" height="24" rx="12" fill="#00f5d4" fill-opacity="0.1" stroke="#00f5d4" stroke-opacity="0.3"/>
      <text y="16" font-size="10" font-weight="800" fill="#00f5d4" letter-spacing="1">HIGH-IMPACT PRACTICE AREAS</text>

      <text y="58" font-family="'Cinzel', serif" font-size="38" font-weight="900" fill="#ffffff" letter-spacing="2">COMPREHENSIVE CORPORATE ADVISORY.</text>
      <text y="88" font-size="14" font-weight="500" fill="#cbd5e1">From multi-billion dollar cross-border M&amp;A transactions to autonomous enterprise AI architecture, our practice groups deliver quantifiable EBITDA expansion.</text>
    </g>

    <!-- 4 Practice Domain Grid (2x2) -->
    <g transform="translate(160, 240)">

      <!-- Card 1 -->
      <g transform="translate(0, 0)">
        <rect width="610" height="280" rx="16" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>
        
        <rect x="30" y="28" width="110" height="22" rx="6" fill="#00b4d8" fill-opacity="0.15"/>
        <text x="40" y="43" font-size="10" font-weight="800" fill="#00f5d4">DIGITAL &amp; AI</text>

        <text x="30" y="85" font-family="'Cinzel', serif" font-size="22" font-weight="800" fill="#ffffff">ENTERPRISE DIGITAL &amp; AI ARCHITECTURE</text>
        <text x="30" y="112" font-size="12" font-weight="600" fill="#00f5d4">Modernize core architecture with autonomous AI workflows</text>

        <text x="30" y="145" font-size="12" font-weight="400" fill="#94a3b8" width="550">
          We re-architect legacy IT infrastructure into high-velocity, cloud-native digital ecosystems powered by proprietary AI agents. Our models optimize cost structures and streamline automated governance.
        </text>

        <text x="30" y="235" font-family="'Cinzel', serif" font-size="36" font-weight="900" fill="#ffffff">3.8x</text>
        <text x="120" y="232" font-size="10" font-weight="600" fill="#64748b">Average ROI on IT modernization</text>

        <text x="480" y="235" font-size="11" font-weight="800" fill="#00f5d4">Inspect Framework →</text>
      </g>

      <!-- Card 2 -->
      <g transform="translate(670, 0)">
        <rect width="610" height="280" rx="16" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>

        <rect x="30" y="28" width="130" height="22" rx="6" fill="#00b4d8" fill-opacity="0.15"/>
        <text x="40" y="43" font-size="10" font-weight="800" fill="#00f5d4">FINANCIAL ADVISORY</text>

        <text x="30" y="85" font-family="'Cinzel', serif" font-size="22" font-weight="800" fill="#ffffff">M&amp;A &amp; FINANCIAL ENGINEERING</text>
        <text x="30" y="112" font-size="12" font-weight="600" fill="#00f5d4">Cross-border valuation, due diligence, and deal execution</text>

        <text x="30" y="145" font-size="12" font-weight="400" fill="#94a3b8">
          Structure complex transaction architectures, optimize capital efficiency, and conduct rigorous commercial and technological due diligence for cross-border private equity and sovereign funds.
        </text>

        <text x="30" y="235" font-family="'Cinzel', serif" font-size="36" font-weight="900" fill="#ffffff">$4.2B+</text>
        <text x="180" y="232" font-size="10" font-weight="600" fill="#64748b">Cross-border deal volume advised</text>

        <text x="480" y="235" font-size="11" font-weight="800" fill="#00f5d4">Inspect Framework →</text>
      </g>

      <!-- Card 3 -->
      <g transform="translate(0, 300)">
        <rect width="610" height="280" rx="16" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>

        <rect x="30" y="28" width="140" height="22" rx="6" fill="#00b4d8" fill-opacity="0.15"/>
        <text x="40" y="43" font-size="10" font-weight="800" fill="#00f5d4">STRATEGIC EXPANSION</text>

        <text x="30" y="85" font-family="'Cinzel', serif" font-size="22" font-weight="800" fill="#ffffff">GCC &amp; GLOBAL MARKET EXPANSION</text>
        <text x="30" y="112" font-size="12" font-weight="600" fill="#00f5d4">Strategic market entry and sovereign partnerships</text>

        <text x="30" y="145" font-size="12" font-weight="400" fill="#94a3b8">
          Unlock rapid growth in high-velocity markets across the Middle East, Europe, and Asia through tailored regulatory &amp; commercial frameworks, joint ventures, and direct foreign investment advisory.
        </text>

        <text x="30" y="235" font-family="'Cinzel', serif" font-size="36" font-weight="900" fill="#ffffff">45+</text>
        <text x="120" y="232" font-size="10" font-weight="600" fill="#64748b">Global markets entered</text>

        <text x="480" y="235" font-size="11" font-weight="800" fill="#00f5d4">Inspect Framework →</text>
      </g>

      <!-- Card 4 -->
      <g transform="translate(670, 300)">
        <rect width="610" height="280" rx="16" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>

        <rect x="30" y="28" width="100" height="22" rx="6" fill="#00b4d8" fill-opacity="0.15"/>
        <text x="40" y="43" font-size="10" font-weight="800" fill="#00f5d4">OPERATIONS</text>

        <text x="30" y="85" font-family="'Cinzel', serif" font-size="22" font-weight="800" fill="#ffffff">OPERATIONAL EXCELLENCE &amp; TURNAROUND</text>
        <text x="30" y="112" font-size="12" font-weight="600" fill="#00f5d4">EBITDA optimization and lean process engineering</text>

        <text x="30" y="145" font-size="12" font-weight="400" fill="#94a3b8">
          Identify systemic operational bottlenecks, restructure cost architectures, and instill lean management practices to maximize EBITDA margins and long-term organizational agility.
        </text>

        <text x="30" y="235" font-family="'Cinzel', serif" font-size="36" font-weight="900" fill="#ffffff">+420 BPS</text>
        <text x="210" y="232" font-size="10" font-weight="600" fill="#64748b">Average EBITDA margin expansion</text>

        <text x="480" y="235" font-size="11" font-weight="800" fill="#00f5d4">Inspect Framework →</text>
      </g>

    </g>
  </svg>`;
}

// -------------------------------------------------------------
// 3. FEATURED ADVISORY CAPABILITIES MATRIX (jermann-capabilities.svg)
// -------------------------------------------------------------
function buildCapabilitiesSVG() {
  const caps = [
    { icon: '⚡', title: 'ENTERPRISE DIGITAL TRANSFORMATION', desc: 'Develop practical transformation roadmaps that align business strategy, technology investments, and operational execution.', benchmark: '96%', tag: null },
    { icon: '💾', title: 'ENTERPRISE APPLICATIONS &amp; ERP', desc: 'Optimize enterprise platforms to improve adoption, operational efficiency, reporting, and long-term business value.', benchmark: '96%', tag: null },
    { icon: '🔁', title: 'BUSINESS PROCESS IMPROVEMENT', desc: 'Analyze, redesign, and optimize business processes to eliminate inefficiencies and improve organizational performance.', benchmark: '96%', tag: null },
    { icon: '📄', title: 'BUSINESS ANALYSIS', desc: 'Translate business needs into structured requirements, solution options, and measurable implementation plans.', benchmark: '96%', tag: null },
    { icon: '✨', title: 'AI ADOPTION &amp; AUTOMATION', desc: 'Identify practical opportunities for AI-assisted workflows, document processing, intelligent analytics, and agentic task execution.', benchmark: '92%', tag: 'EMERGING CAPABILITY' },
    { icon: '🎯', title: 'PROJECT &amp; PROGRAMME DELIVERY', desc: 'Support transformation initiatives with structured governance, risk management, vendor oversight, and clear delivery tracking.', benchmark: '95%', tag: null },
    { icon: '📊', title: 'EXECUTIVE REPORTING &amp; ANALYTICS', desc: 'Develop meaningful KPI frameworks and executive dashboards that provide actionable insights for senior leadership.', benchmark: '98%', tag: null },
    { icon: '👥', title: 'CHANGE MANAGEMENT &amp; USER ADOPTION', desc: 'Help organizations successfully navigate change, address user resistance, and drive sustainable technology adoption.', benchmark: '97%', tag: 'CORE STRENGTH' }
  ];

  let gridCards = '';
  caps.forEach((item, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const x = col * 340;
    const y = row * 320;

    let tagElement = '';
    if (item.tag) {
      tagElement = `
        <rect x="150" y="24" width="135" height="18" rx="9" fill="#00f5d4" fill-opacity="0.12" stroke="#00f5d4" stroke-opacity="0.4"/>
        <text x="217" y="36" font-size="8" font-weight="800" fill="#00f5d4" text-anchor="middle">${item.tag}</text>
      `;
    }

    gridCards += `
      <g transform="translate(${x}, ${y})">
        <rect width="320" height="295" rx="14" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.1)" stroke-width="1" filter="url(#jerShadow)"/>

        <!-- Icon circle -->
        <circle cx="42" cy="40" r="20" fill="#00b4d8" fill-opacity="0.15" stroke="#00f5d4" stroke-width="1"/>
        <text x="42" y="46" font-size="16" text-anchor="middle">${item.icon}</text>

        ${tagElement}

        <text x="24" y="95" font-family="'Cinzel', serif" font-size="15" font-weight="800" fill="#ffffff">${item.title}</text>

        <text x="24" y="125" font-size="11" font-weight="400" fill="#94a3b8" width="270">
          ${item.desc}
        </text>

        <!-- Benchmark progress bar -->
        <text x="24" y="225" font-size="9" font-weight="800" fill="#64748b" letter-spacing="0.5">ADVISORY BENCHMARK</text>
        <text x="296" y="225" font-size="11" font-weight="800" fill="#00f5d4" text-anchor="end">${item.benchmark}</text>

        <rect x="24" y="235" width="272" height="6" rx="3" fill="#1e293b"/>
        <rect x="24" y="235" width="260" height="6" rx="3" fill="url(#cyanBtnGrad)"/>

        <text x="24" y="270" font-size="11" font-weight="700" fill="#00f5d4">Explore Capability  →</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${jermannDefs}

    <rect width="1600" height="900" fill="url(#jerBgGrad)" />

    ${getHeaderSVG('SERVICES')}

    <g transform="translate(800, 100)" text-anchor="middle">
      <text y="0" font-size="10" font-weight="800" fill="#ffe28a" letter-spacing="1">CORE PRACTICE AREAS</text>
      <text y="36" font-family="'Cinzel', serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="2">FEATURED ADVISORY CAPABILITIES</text>
      <text y="64" font-size="13" font-weight="500" fill="#cbd5e1">Explore the core consulting capabilities that help organizations improve business performance, modernize enterprise systems, and deliver digital transformation.</text>
    </g>

    <g transform="translate(120, 200)">
      ${gridCards}
    </g>
  </svg>`;
}

// -------------------------------------------------------------
// 4. EXECUTIVE INSIGHTS & ARTICLES GRID (jermann-insights.svg)
// -------------------------------------------------------------
function buildInsightsSVG() {
  const articles = [
    { category: 'DIGITAL TRANSFORMATION', time: 'July 2026', read: '6 min read', title: 'WHY DIGITAL TRANSFORMATION PROJECTS LOSE MOMENTUM', desc: 'An executive analysis of common operational challenges in enterprise transformations and how structured governance keeps strategic initiatives on track.' },
    { category: 'EXECUTIVE ANALYTICS', time: 'July 2026', read: '5 min read', title: 'BUILDING ENTERPRISE DASHBOARDS THAT DRIVE BETTER DECISIONS', desc: 'How to design executive reporting systems focused on clear, actionable metrics rather than visual clutter.' },
    { category: 'ENTERPRISE APPLICATIONS', time: 'June 2026', read: '7 min read', title: 'FIVE LESSONS FROM ENTERPRISE ERP MODERNIZATION', desc: 'Practical insights from optimizing complex ERP environments, harmonizing master data, and maintaining business continuity.' },
    { category: 'ARTIFICIAL INTELLIGENCE', time: 'June 2026', read: '6 min read', title: 'INTRODUCING AI INTO EXISTING BUSINESS PROCESSES', desc: 'A pragmatic approach to integrating AI capabilities into established enterprise workflows with clear human oversight.' },
    { category: 'BUSINESS ANALYSIS', time: 'May 2026', read: '5 min read', title: 'BUSINESS PROCESS IMPROVEMENT BEYOND AUTOMATION', desc: 'Why re-engineering core value streams yields higher returns than simply digitizing inefficient manual steps.' },
    { category: 'CHANGE MANAGEMENT', time: 'May 2026', read: '6 min read', title: 'MANAGING ORGANIZATIONAL CHANGE DURING TRANSFORMATION', desc: 'Practical strategies to align leadership, reduce user resistance, and build long-term technology adoption.' }
  ];

  let cardsSVG = '';
  articles.forEach((item, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = col * 450;
    const y = row * 310;

    cardsSVG += `
      <g transform="translate(${x}, ${y})">
        <rect width="420" height="285" rx="14" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#jerShadow)"/>

        <!-- Category tag -->
        <rect x="24" y="24" width="${item.category.length * 7 + 16}" height="22" rx="4" fill="#00b4d8" fill-opacity="0.15"/>
        <text x="32" y="39" font-size="9" font-weight="800" fill="#00f5d4">${item.category}</text>

        <text x="396" y="39" font-size="10" font-weight="600" fill="#64748b" text-anchor="end">🕒 ${item.read} • ${item.time}</text>

        <text x="24" y="90" font-family="'Cinzel', serif" font-size="16" font-weight="800" fill="#ffffff" width="370">${item.title}</text>

        <text x="24" y="150" font-size="11" font-weight="400" fill="#94a3b8">
          ${item.desc}
        </text>

        <line x1="24" y1="230" x2="396" y2="230" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

        <circle cx="36" cy="252" r="10" fill="#00f5d4" fill-opacity="0.2"/>
        <text x="36" y="256" font-size="10" text-anchor="middle" fill="#00f5d4">✍</text>

        <text x="54" y="250" font-size="10" font-weight="700" fill="#ffffff">JERMANN CONSULTING</text>
        <text x="54" y="260" font-size="8" font-weight="600" fill="#64748b">Enterprise Practice Group</text>

        <text x="396" y="255" font-size="11" font-weight="800" fill="#00f5d4" text-anchor="end">Read Article →</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${jermannDefs}

    <rect width="1600" height="900" fill="url(#jerBgGrad)" />

    ${getHeaderSVG('INSIGHTS')}

    <!-- Category filter buttons -->
    <g transform="translate(160, 90)">
      <rect x="0" y="0" width="48" height="28" rx="14" fill="#00f5d4"/>
      <text x="24" y="18" font-size="11" font-weight="800" fill="#040711" text-anchor="middle">All</text>

      <rect x="58" y="0" width="150" height="28" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.1)"/>
      <text x="133" y="18" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Digital Transformation</text>

      <rect x="218" y="0" width="130" height="28" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.1)"/>
      <text x="283" y="18" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Executive Analytics</text>

      <rect x="358" y="0" width="150" height="28" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.1)"/>
      <text x="433" y="18" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Enterprise Applications</text>

      <rect x="518" y="0" width="140" height="28" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.1)"/>
      <text x="588" y="18" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Artificial Intelligence</text>
    </g>

    <g transform="translate(130, 160)">
      ${cardsSVG}
    </g>
  </svg>`;
}

// -------------------------------------------------------------
// 5. METHODOLOGY & FRAMEWORK WORKFLOW (jermann-framework.svg)
// -------------------------------------------------------------
function buildFrameworkSVG() {
  const steps = ['UNDERSTAND', 'ASSESS', 'IDENTIFY', 'PRIORITIZE', 'DESIGN', 'SUPPORT', 'ENABLE', 'MEASURE', 'IMPROVE'];
  let stepsSVG = '';

  steps.forEach((st, i) => {
    const x = i * 140;
    const isActive = i === 0;
    stepsSVG += `
      <g transform="translate(${x}, 0)">
        <circle cx="36" cy="24" r="18" fill="${isActive ? '#00f5d4' : '#0f172a'}" stroke="${isActive ? '#00f5d4' : 'rgba(255,255,255,0.2)'}" stroke-width="1.5"/>
        <text x="36" y="28" font-size="10" font-weight="800" fill="${isActive ? '#040711' : '#ffffff'}" text-anchor="middle">0${i+1}</text>
        <text x="36" y="56" font-size="9" font-weight="700" fill="${isActive ? '#00f5d4' : '#64748b'}" text-anchor="middle">${st}</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${jermannDefs}

    <rect width="1600" height="900" fill="url(#jerBgGrad)" />

    ${getHeaderSVG('FRAMEWORK')}

    <g transform="translate(800, 100)" text-anchor="middle">
      <text y="0" font-size="10" font-weight="800" fill="#ffe28a" letter-spacing="1">ADVISORY METHODOLOGY</text>
      <text y="36" font-family="'Cinzel', serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="2">HOW JERMANN SUPPORTS TRANSFORMATION</text>
      <text y="64" font-size="13" font-weight="500" fill="#cbd5e1">Our structured 9-step advisory methodology connects business objectives with practical execution.</text>
    </g>

    <!-- Step Sequence Indicator -->
    <g transform="translate(170, 200)">
      <line x1="36" y1="24" x2="1180" y2="24" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      ${stepsSVG}
    </g>

    <!-- Active Step Detail Box -->
    <g transform="translate(160, 310)">
      <rect width="1280" height="240" rx="16" fill="url(#cardBgGrad)" stroke="#00f5d4" stroke-opacity="0.4" stroke-width="1.5" filter="url(#jerShadow)"/>

      <text x="40" y="45" font-size="10" font-weight="800" fill="#00f5d4" letter-spacing="1">STEP 01 OF 09 • TIMEFRAME: 1 - 2 WEEKS</text>
      <text x="40" y="85" font-family="'Cinzel', serif" font-size="26" font-weight="900" fill="#ffffff">UNDERSTAND THE BUSINESS</text>

      <text x="40" y="125" font-size="13" font-weight="600" fill="#ffffff">CONSULTING OBJECTIVE</text>
      <text x="40" y="150" font-size="12" font-weight="400" fill="#94a3b8" width="600">
        Engage leadership and key stakeholders to gain a thorough understanding of core business objectives, strategic priorities, and operational context.
      </text>

      <rect x="720" y="30" width="520" height="180" rx="12" fill="#040814" stroke="rgba(255,255,255,0.08)"/>
      <text x="740" y="60" font-size="11" font-weight="800" fill="#00f5d4">CORE ACTIVITIES &amp; ADVISORY FOCUS</text>
      
      <circle cx="750" cy="95" r="4" fill="#00f5d4"/>
      <text x="765" y="99" font-size="12" font-weight="600" fill="#ffffff">Executive Stakeholder Interviews</text>

      <circle cx="750" cy="130" r="4" fill="#00f5d4"/>
      <text x="765" y="134" font-size="12" font-weight="600" fill="#ffffff">Strategic Business Objectives Review</text>

      <circle cx="750" cy="165" r="4" fill="#00f5d4"/>
      <text x="765" y="169" font-size="12" font-weight="600" fill="#ffffff">Operational Context &amp; Governance Assessment</text>
    </g>

    <!-- Industry Highlights -->
    <g transform="translate(160, 580)">
      <text x="0" y="30" font-family="'Cinzel', serif" font-size="22" font-weight="800" fill="#ffffff">PROFESSIONAL EXPERIENCE HIGHLIGHTS</text>

      <g transform="translate(0, 50)">
        <rect width="400" height="200" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.1)"/>
        <text x="24" y="36" font-size="10" font-weight="800" fill="#00f5d4">MARITIME &amp; FLEET OPERATIONS</text>
        <text x="24" y="65" font-family="'Cinzel', serif" font-size="16" font-weight="800" fill="#ffffff">Fleet Operations Digital Transformation</text>
        <text x="24" y="100" font-size="11" font-weight="400" fill="#94a3b8">Supported implementation &amp; adoption of digital safety and operational workflows across a large maritime fleet.</text>
      </g>

      <g transform="translate(440, 50)">
        <rect width="400" height="200" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.1)"/>
        <text x="24" y="36" font-size="10" font-weight="800" fill="#00f5d4">ENTERPRISE SYSTEMS &amp; ERP</text>
        <text x="24" y="65" font-family="'Cinzel', serif" font-size="16" font-weight="800" fill="#ffffff">Enterprise Application &amp; ERP Optimization</text>
        <text x="24" y="100" font-size="11" font-weight="400" fill="#94a3b8">Conducted process capability assessments and supported ERP platform modernization across operational departments.</text>
      </g>

      <g transform="translate(880, 50)">
        <rect width="400" height="200" rx="12" fill="url(#cardBgGrad)" stroke="rgba(255,255,255,0.1)"/>
        <text x="24" y="36" font-size="10" font-weight="800" fill="#00f5d4">AI &amp; WORKFLOW EXPLORATION</text>
        <text x="24" y="65" font-family="'Cinzel', serif" font-size="16" font-weight="800" fill="#ffffff">AI-Assisted Business Prototypes</text>
        <text x="24" y="100" font-size="11" font-weight="400" fill="#94a3b8">Explored practical applications of artificial intelligence in business operations, decision support, and project delivery.</text>
      </g>
    </g>
  </svg>`;
}

// Generate files
const files = [
  { name: 'jermann-hero', svg: buildHeroSVG() },
  { name: 'jermann-advisory', svg: buildAdvisorySVG() },
  { name: 'jermann-capabilities', svg: buildCapabilitiesSVG() },
  { name: 'jermann-insights', svg: buildInsightsSVG() },
  { name: 'jermann-framework', svg: buildFrameworkSVG() }
];

files.forEach(f => {
  const svgPath = path.join(publicImgDir, `${f.name}.svg`);
  const pngPath = path.join(publicImgDir, `${f.name}.png`);

  fs.writeFileSync(svgPath, f.svg, 'utf-8');

  try {
    const opts = {
      font: { loadSystemFonts: true },
      fitTo: { mode: 'width', value: 2400 }
    };
    const resvg = new Resvg(f.svg, opts);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`Generated SVG & PNG for ${f.name}`);
  } catch (err) {
    console.error(`Error rendering PNG for ${f.name}:`, err);
  }
});

// Also copy jermann-hero to jermann.svg and jermann.png
fs.copyFileSync(path.join(publicImgDir, 'jermann-hero.svg'), path.join(publicImgDir, 'jermann.svg'));
fs.copyFileSync(path.join(publicImgDir, 'jermann-hero.png'), path.join(publicImgDir, 'jermann.png'));
console.log('Successfully copied jermann-hero to jermann.svg and jermann.png');
