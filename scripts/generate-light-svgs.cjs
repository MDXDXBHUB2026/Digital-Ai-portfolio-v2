const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const publicImgDir = path.join(process.cwd(), 'public/images');
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

// -------------------------------------------------------------
// CAREERCONNECT AI LIGHT-THEME DEFINITIONS & TEMPLATES
// -------------------------------------------------------------
const ccDefs = `
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="50%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>

    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>

    <linearGradient id="purpleBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>

    <linearGradient id="accentBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#9333ea" />
    </linearGradient>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;display=swap');
    * { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .font-sans { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    .txt-title { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 800; fill: #0f172a; }
    .txt-sub { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 600; fill: #334155; }
    .txt-muted { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 600; fill: #475569; }
    .txt-purple { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 700; fill: #6d28d9; }
    .txt-green { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 700; fill: #059669; }
    .txt-amber { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 700; fill: #d97706; }
    .txt-white { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 700; fill: #ffffff; }
  </style>
`;

function renderCcHeader(activeBreadcrumb) {
  return `
    <!-- Top Header Navigation Bar -->
    <rect x="220" y="0" width="1380" height="56" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
    
    <!-- Breadcrumb -->
    <g transform="translate(240, 16)" class="font-sans">
      <rect x="0" y="0" width="210" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
      <text x="10" y="17" fill="#334155" font-size="11" font-weight="600">📄 M. Rajan Resume - Final-Mariti...</text>
      
      <text x="222" y="17" fill="#94a3b8" font-size="12">|</text>
      <text x="236" y="17" fill="#6d28d9" font-size="12" font-weight="700">📌 ${activeBreadcrumb}</text>
    </g>

    <!-- Right Header Tools -->
    <g transform="translate(1080, 12)" class="font-sans">
      <rect x="0" y="0" width="180" height="32" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
      <text x="12" y="20" fill="#64748b" font-size="11">🔍 Search or Command...</text>
      <rect x="145" y="6" width="24" height="20" rx="4" fill="#e2e8f0"/>
      <text x="150" y="20" fill="#475569" font-size="10" font-weight="700">⌘K</text>

      <circle cx="210" cy="16" r="14" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
      <text x="204" y="21" fill="#d97706" font-size="12">☀️</text>

      <rect x="235" y="2" width="115" height="28" rx="14" fill="#dcfce7" stroke="#10b981" stroke-width="1"/>
      <circle cx="247" cy="16" r="4" fill="#059669"/>
      <text x="256" y="20" fill="#047857" font-size="11" font-weight="700">cv-project-189d8</text>

      <rect x="360" y="2" width="28" height="28" rx="6" fill="#2563eb"/>
      <text x="368" y="21" fill="#ffffff" font-size="16" font-weight="800">+</text>

      <rect x="400" y="2" width="80" height="28" rx="14" fill="#1d4ed8"/>
      <circle cx="414" cy="16" r="10" fill="#3b82f6"/>
      <text x="410" y="20" fill="#ffffff" font-size="11" font-weight="800">E</text>
      <text x="430" y="20" fill="#ffffff" font-size="11" font-weight="700">Echoflare06</text>
    </g>
  `;
}

function renderCcSidebar(activeMenuKey) {
  const menuItems = [
    { section: 'HOME' },
    { key: 'home', label: 'Home Experience', badge: 'MAIN', icon: '🏠' },
    { section: 'COMMAND CENTER' },
    { key: 'analytics', label: 'Analytics Dashboard', icon: '📊' },
    { key: 'plan', label: "Today's Plan", icon: '📋' },
    { key: 'radar', label: 'Opportunity Radar', icon: '🎯' },
    { section: 'CAREER' },
    { key: 'profile', label: 'Career Profile &amp; CVs', badge: '1', icon: '📄' },
    { key: 'twin', label: 'Career Digital Twin', badge: 'AI', icon: '🧠' },
    { key: 'skills', label: 'Skills Intelligence', icon: '💡' },
    { key: 'roles', label: 'Target Roles', icon: '🎯' },
    { key: 'insights', label: 'Career Insights', icon: '📈' },
    { section: 'OPPORTUNITIES' },
    { key: 'jobsearch', label: 'AI Job Search', icon: '🔍' },
    { key: 'jobtracker', label: 'Job Tracker', icon: '📑' },
    { key: 'companies', label: 'Target Companies', icon: '🏢' },
    { section: 'APPLICATIONS' },
    { key: 'tailor', label: 'CV Studio &amp; Tailor', icon: '✂️' },
    { key: 'cover', label: 'Cover Letters', icon: '✉️' },
    { key: 'reports', label: 'Job Match Reports', icon: '📊' },
    { section: 'NETWORK' },
    { key: 'network', label: 'Contacts &amp; Network', badge: '0', icon: '👥' },
    { key: 'recruiters', label: 'Recruiters Database', icon: '👤' },
    { key: 'outreach', label: 'Outreach Messages', icon: '💬' },
    { key: 'followups', label: 'Follow-Ups', icon: '⏰' }
  ];

  let y = 80;
  let menuSvg = '';

  menuItems.forEach(item => {
    if (item.section) {
      menuSvg += `<text x="20" y="${y}" fill="#64748b" font-family="sans-serif" font-size="9" font-weight="800" letter-spacing="1">${item.section}</text>`;
      y += 18;
    } else {
      const isActive = item.key === activeMenuKey;
      if (isActive) {
        menuSvg += `
          <rect x="10" y="${y - 14}" width="200" height="30" rx="10" fill="url(#accentBtnGrad)" filter="url(#shadow)"/>
          <text x="22" y="${y + 5}" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="700">${item.icon}  ${item.label}</text>
        `;
        if (item.badge) {
          menuSvg += `
            <rect x="172" y="${y - 9}" width="${item.badge.length > 2 ? 24 : 18}" height="18" rx="9" fill="#ffffff"/>
            <text x="${item.badge.length > 2 ? 175 : 177}" y="${y + 4}" fill="#6d28d9" font-family="sans-serif" font-size="9" font-weight="900">${item.badge}</text>
          `;
        }
      } else {
        menuSvg += `
          <text x="22" y="${y + 5}" fill="#475569" font-family="sans-serif" font-size="11" font-weight="500">${item.icon}  ${item.label}</text>
        `;
        if (item.badge) {
          menuSvg += `
            <rect x="175" y="${y - 9}" width="${item.badge.length > 2 ? 22 : 16}" height="18" rx="8" fill="#e2e8f0"/>
            <text x="${item.badge.length > 2 ? 178 : 180}" y="${y + 4}" fill="#334155" font-family="sans-serif" font-size="9" font-weight="700">${item.badge}</text>
          `;
        }
      }
      y += 26;
    }
  });

  return `
    <rect x="0" y="0" width="220" height="900" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>

    <g transform="translate(16, 16)">
      <rect x="0" y="0" width="36" height="36" rx="10" fill="url(#purpleGrad)"/>
      <text x="8" y="24" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900">⚡</text>
      <text x="46" y="20" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="900" letter-spacing="-0.3">CareerConnect<tspan fill="#6d28d9">AI</tspan></text>
      <text x="46" y="32" fill="#64748b" font-family="sans-serif" font-size="8" font-weight="800" letter-spacing="1">CAREER OS</text>
    </g>

    <line x1="0" y1="62" x2="220" y2="62" stroke="#e2e8f0" stroke-width="1"/>

    <g class="font-sans">
      ${menuSvg}
    </g>

    <g transform="translate(10, 860)">
      <rect x="0" y="0" width="200" height="28" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <text x="10" y="18" fill="#475569" font-family="sans-serif" font-size="10" font-weight="600">Direct Local Storage</text>
      <rect x="115" y="4" width="78" height="20" rx="10" fill="#dcfce7"/>
      <text x="122" y="18" fill="#059669" font-family="sans-serif" font-size="9" font-weight="800">✓ Storage Synced</text>
    </g>
  `;
}

// 1. Home SVG
function generateHomeSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${ccDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderCcSidebar('home')}
  ${renderCcHeader('Home Experience &amp; Career Intelligence')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Career Pulse Banner Strip -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="1330" height="36" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <rect x="12" y="6" width="100" height="24" rx="6" fill="#4338ca"/>
      <text x="22" y="22" fill="#ffffff" font-size="10" font-weight="800">⚡ CAREER PULSE</text>
      
      <text x="130" y="22" fill="#6d28d9" font-size="11" font-weight="800">HIGH MATCH:</text>
      <text x="210" y="22" fill="#0f172a" font-size="11" font-weight="600">Digital Transformation Lead (95%) posted 2h ago</text>
      
      <circle cx="610" cy="18" r="4" fill="#d97706"/>
      <text x="622" y="22" fill="#b45309" font-size="11" font-weight="800">FOLLOW-UP DUE:</text>
      <text x="730" y="22" fill="#0f172a" font-size="11" font-weight="600">Microsoft Talent Acquisition (3 days cold)</text>

      <circle cx="1020" cy="18" r="4" fill="#2563eb"/>
      <text x="1032" y="22" fill="#1d4ed8" font-size="11" font-weight="800">TARGET COMPANY:</text>
      <text x="1150" y="22" fill="#0f172a" font-size="11" font-weight="600">Amazon Web Services...</text>
    </g>

    <!-- Welcome Hero Box -->
    <g transform="translate(0, 48)">
      <rect x="0" y="0" width="1330" height="150" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5" filter="url(#shadow)"/>
      
      <!-- Content Left -->
      <g transform="translate(24, 20)">
        <rect x="0" y="0" width="220" height="24" rx="12" fill="#f3e8ff" stroke="#c084fc" stroke-width="1"/>
        <text x="12" y="16" fill="#7e22ce" font-size="10" font-weight="800">✨ CareerConnectAI Operating Engine Active</text>

        <text x="0" y="62" fill="#0f172a" font-size="28" font-weight="900" letter-spacing="-0.5">Good morning, <tspan fill="#d97706">Manoj</tspan></text>
        <text x="0" y="88" fill="#475569" font-size="13">Your career search is moving. <tspan fill="#0f172a" font-weight="700">8 strong opportunities</tspan> need attention, <tspan fill="#0f172a" font-weight="700">3 applications</tspan> need follow-up, and <tspan fill="#0f172a" font-weight="700">2 target companies</tspan> posted new executive roles.</text>

        <!-- CTA Buttons -->
        <g transform="translate(0, 102)">
          <rect x="0" y="0" width="180" height="34" rx="12" fill="url(#purpleBtnGrad)"/>
          <text x="18" y="21" fill="#ffffff" font-size="12" font-weight="800">▶ Start Today's Action Plan</text>

          <rect x="195" y="0" width="170" height="34" rx="12" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="215" y="21" fill="#334155" font-size="12" font-weight="700">Explore 28 Matched Jobs</text>
        </g>
      </g>

      <!-- Right Synced Box -->
      <g transform="translate(820, 16)">
        <rect x="0" y="0" width="480" height="118" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="18" y="24" fill="#4f46e5" font-size="10" font-weight="900" letter-spacing="1">⚙ YOUR CAREERCONNECTAI</text>
        <rect x="400" y="12" width="62" height="18" rx="9" fill="#dcfce7"/>
        <text x="410" y="24" fill="#059669" font-size="9" font-weight="800">SYNCED</text>

        <text x="18" y="46" fill="#475569" font-size="10">CareerConnectAI continuously synthesizes your <tspan fill="#0f172a" font-weight="700">Resume, Jobs, Applications, Companies, Network</tspan> and <tspan fill="#0f172a" font-weight="700">Career Goals</tspan> into single-click high-impact daily actions.</text>

        <!-- Grid Pills -->
        <g transform="translate(18, 68)" font-size="10" font-weight="700">
          <rect x="0" y="0" width="105" height="22" rx="11" fill="#e0e7ff"/>
          <text x="10" y="15" fill="#4338ca">✓ Verified Twin Data</text>

          <rect x="115" y="0" width="115" height="22" rx="11" fill="#e0f2fe"/>
          <text x="125" y="15" fill="#0369a1">✓ Auto-Match Reports</text>

          <rect x="240" y="0" width="105" height="22" rx="11" fill="#dcfce7"/>
          <text x="250" y="15" fill="#15803d">✓ Follow-Up AI Engine</text>

          <rect x="355" y="0" width="105" height="22" rx="11" fill="#fef3c7"/>
          <text x="365" y="15" fill="#b45309">✓ Salary Decision Lab</text>
        </g>
      </g>
    </g>

    <!-- Career Journey Workflow Bar -->
    <g transform="translate(0, 212)">
      <rect x="0" y="0" width="1330" height="92" rx="16" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="20" y="24" fill="#0f172a" font-size="13" font-weight="800">📈 Career Journey Workflow</text>
      <text x="210" y="24" fill="#64748b" font-size="10">Live status pipeline across all stages of your career transition campaign</text>
      <text x="1230" y="24" fill="#4f46e5" font-size="11" font-weight="700">Open Tracker →</text>

      <!-- 8 Pipeline Items -->
      <g transform="translate(20, 36)">
        ${[
          { label: 'DISCOVER', num: '28', sub: 'Opportunities', col: '#4f46e5' },
          { label: 'MATCH', num: '11', sub: 'High Matches', col: '#7c3aed' },
          { label: 'PREPARE', num: '5', sub: 'Packages Ready', col: '#9333ea' },
          { label: 'CONNECT', num: '14', sub: 'Network Contacts', col: '#0284c7' },
          { label: 'APPLY', num: '8', sub: 'Submitted', col: '#059669' },
          { label: 'FOLLOW UP', num: '3', sub: 'Tasks Due', col: '#d97706' },
          { label: 'INTERVIEW', num: '2', sub: 'Active Stages', col: '#e11d48' },
          { label: 'OFFER', num: '1', sub: 'Decision Pending', col: '#16a34a' }
        ].map((p, i) => `
          <g transform="translate(${i * 158}, 0)">
            <rect x="0" y="0" width="150" height="44" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
            <text x="10" y="14" fill="#64748b" font-size="8" font-weight="800">${p.label}</text>
            <text x="10" y="34" fill="${p.col}" font-size="18" font-weight="900">${p.num}</text>
            <text x="42" y="33" fill="#475569" font-size="9">${p.sub}</text>
          </g>
        `).join('')}
      </g>
    </g>

    <!-- Bottom 2x2 Grid -->
    <!-- Card 1: Career Momentum Index -->
    <g transform="translate(0, 318)">
      <rect x="0" y="0" width="380" height="490" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="20" y="28" fill="#0f172a" font-size="14" font-weight="800">📈 Career Momentum Index</text>
      <rect x="270" y="14" width="94" height="20" rx="10" fill="#f3e8ff"/>
      <text x="280" y="28" fill="#7e22ce" font-size="9" font-weight="800">ACTIVE CAMPAIGN</text>

      <!-- Gauge Circle -->
      <g transform="translate(140, 60)">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" stroke-width="10"/>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#4f46e5" stroke-width="10" stroke-dasharray="264" stroke-dashoffset="74"/>
        <text x="50" y="52" fill="#0f172a" font-size="24" font-weight="900" text-anchor="middle">72</text>
        <text x="50" y="66" fill="#64748b" font-size="10" text-anchor="middle">/ 100</text>
      </g>

      <text x="190" y="180" fill="#059669" font-size="13" font-weight="800" text-anchor="middle">Strong Strategy Velocity</text>
      <text x="190" y="198" fill="#475569" font-size="10" text-anchor="middle">Calculated from response rate, networking touchpoints, target role alignment, and application cadence.</text>

      <!-- Breakdown List -->
      <g transform="translate(20, 220)">
        <text x="0" y="0" fill="#64748b" font-size="9" font-weight="800" letter-spacing="1">MOMENTUM BREAKDOWN</text>
        
        <g transform="translate(0, 12)">
          <rect x="0" y="0" width="340" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
          <circle cx="16" cy="24" r="8" fill="#dcfce7"/>
          <text x="12" y="28" fill="#059669" font-size="10">✓</text>
          <text x="32" y="20" fill="#0f172a" font-size="10" font-weight="700">High Match Quality &amp; Positioning Alignment</text>
          <text x="32" y="34" fill="#475569" font-size="9">Target roles aligned to verified master CV</text>
          <text x="290" y="28" fill="#059669" font-size="12" font-weight="800">+18 pts</text>
        </g>

        <g transform="translate(0, 68)">
          <rect x="0" y="0" width="340" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
          <circle cx="16" cy="24" r="8" fill="#dcfce7"/>
          <text x="12" y="28" fill="#059669" font-size="10">✓</text>
          <text x="32" y="20" fill="#0f172a" font-size="10" font-weight="700">Active Recruiter &amp; Executive Outreach</text>
          <text x="32" y="34" fill="#475569" font-size="9">Consistent response velocity with GCC headhunters</text>
          <text x="290" y="28" fill="#059669" font-size="12" font-weight="800">+14 pts</text>
        </g>

        <g transform="translate(0, 124)">
          <rect x="0" y="0" width="340" height="48" rx="10" fill="#fef3c7" stroke="#fde68a"/>
          <circle cx="16" cy="24" r="8" fill="#fef3c7"/>
          <text x="13" y="28" fill="#d97706" font-size="10">⚠</text>
          <text x="32" y="20" fill="#0f172a" font-size="10" font-weight="700">3 Application Follow-Ups Pending Attention</text>
          <text x="32" y="34" fill="#b45309" font-size="9">Applications 3+ days without touchpoint</text>
          <text x="295" y="28" fill="#dc2626" font-size="12" font-weight="800">-6 pts</text>
        </g>
      </g>
    </g>

    <!-- Card 2: Today's Highest-Value Action -->
    <g transform="translate(398, 318)">
      <rect x="0" y="0" width="460" height="490" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect x="20" y="20" width="28" height="28" rx="8" fill="#e0e7ff"/>
      <text x="27" y="39" fill="#4338ca" font-size="14">⚡</text>

      <text x="56" y="32" fill="#0f172a" font-size="13" font-weight="800">TODAY'S HIGHEST-VALUE ACTION</text>
      <text x="56" y="46" fill="#64748b" font-size="10">AI Strategic Recommendation</text>

      <rect x="360" y="20" width="80" height="24" rx="12" fill="#dcfce7"/>
      <text x="372" y="36" fill="#059669" font-size="10" font-weight="900">92% MATCH</text>

      <!-- Opportunity Inner Box -->
      <g transform="translate(20, 60)">
        <rect x="0" y="0" width="420" height="390" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <text x="18" y="32" fill="#0f172a" font-size="18" font-weight="900">Digital Transformation Manager</text>
        <text x="18" y="52" fill="#475569" font-size="11">🏢 McKinsey &amp; Company — Dubai, UAE</text>
        <rect x="320" y="20" width="82" height="20" rx="10" fill="#fef3c7"/>
        <text x="330" y="34" fill="#d97706" font-size="9" font-weight="800">Posted 1d ago</text>

        <text x="18" y="88" fill="#4f46e5" font-size="11" font-weight="800">Why this action today:</text>

        <g transform="translate(18, 104)" font-size="11" fill="#334155">
          <text x="0" y="0">• <tspan fill="#0f172a" font-weight="700">Strong leadership &amp; enterprise transformation</tspan> experience alignment in master CV.</text>
          <text x="0" y="22">• High-priority target role in preferred location (<tspan fill="#059669" font-weight="700">$180k - $220k band</tspan>).</text>
          <text x="0" y="44">• Early applicant window increases recruiter callback probability by <tspan fill="#0284c7" font-weight="700">3.8x</tspan>.</text>
        </g>

        <!-- Action Box -->
        <g transform="translate(18, 180)">
          <rect x="0" y="0" width="384" height="120" rx="12" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="16" y="28" fill="#7e22ce" font-size="12" font-weight="800">✨ AI Recommended Package Strategy</text>
          <text x="16" y="48" fill="#475569" font-size="10">Auto-tailor master CV with emphasis on <tspan fill="#0f172a" font-weight="700">Cloud ERP rollouts</tspan> &amp; <tspan fill="#0f172a" font-weight="700">Vendor Stakeholder SLA management</tspan>.</text>
          
          <rect x="16" y="68" width="352" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
          <text x="100" y="90" fill="#ffffff" font-size="12" font-weight="800">⚡ Prepare Application Package</text>
        </g>

        <text x="190" y="340" fill="#64748b" font-size="10" font-weight="600" text-anchor="middle">View full job listing →</text>
      </g>
    </g>

    <!-- Card 3 & 4 Right Area -->
    <g transform="translate(874, 318)">
      <!-- Morning Intelligence Brief -->
      <rect x="0" y="0" width="456" height="235" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="20" y="28" fill="#0f172a" font-size="13" font-weight="800">🌅 MORNING INTELLIGENCE BRIEF</text>
      <text x="330" y="28" fill="#64748b" font-size="9" font-weight="800">TODAY 08:30 AM</text>

      <g transform="translate(20, 48)" font-size="11">
        <rect x="0" y="0" width="416" height="38" rx="8" fill="#f8fafc"/>
        <circle cx="16" cy="19" r="4" fill="#059669"/>
        <text x="28" y="23" fill="#0f172a"><tspan font-weight="800" fill="#059669">6 new executive roles</tspan> discovered matching your target criteria.</text>

        <rect x="0" y="44" width="416" height="38" rx="8" fill="#f8fafc"/>
        <circle cx="16" cy="19" r="4" fill="#0284c7"/>
        <text x="28" y="23" fill="#0f172a"><tspan font-weight="800" fill="#0284c7">2 high matches identified</tspan> with alignment score &gt;90%.</text>

        <rect x="0" y="88" width="416" height="38" rx="8" fill="#f8fafc"/>
        <circle cx="16" cy="19" r="4" fill="#d97706"/>
        <text x="28" y="23" fill="#0f172a"><tspan font-weight="800" fill="#d97706">3 follow-ups became due</tspan> for submitted applications.</text>

        <rect x="0" y="132" width="416" height="38" rx="8" fill="#f8fafc"/>
        <circle cx="16" cy="19" r="4" fill="#7e22ce"/>
        <text x="28" y="23" fill="#0f172a"><tspan font-weight="800" fill="#7e22ce">1 target company</tspan> (Majid Al Futtaim) posted a new Director role.</text>
      </g>

      <!-- Opportunity Radar -->
      <g transform="translate(0, 250)">
        <rect x="0" y="0" width="456" height="240" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
        <text x="20" y="28" fill="#0f172a" font-size="13" font-weight="800">🎯 Opportunity Radar</text>
        <text x="340" y="28" fill="#64748b" font-size="9" font-weight="800">5 Radar Channels</text>

        <!-- Radar Filter Tabs -->
        <g transform="translate(20, 42)" font-size="9" font-weight="700">
          <rect x="0" y="0" width="72" height="22" rx="11" fill="url(#purpleBtnGrad)"/>
          <text x="10" y="15" fill="#ffffff">Best Match</text>

          <rect x="78" y="0" width="88" height="22" rx="11" fill="#f1f5f9"/>
          <text x="86" y="15" fill="#475569">Emerging Target</text>

          <rect x="172" y="0" width="86" height="22" rx="11" fill="#f1f5f9"/>
          <text x="180" y="15" fill="#475569">Target Company</text>

          <rect x="264" y="0" width="86" height="22" rx="11" fill="#f1f5f9"/>
          <text x="272" y="15" fill="#475569">Network Pathway</text>
        </g>

        <!-- Featured Card -->
        <g transform="translate(20, 78)">
          <rect x="0" y="0" width="416" height="142" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="14" y="22" fill="#64748b" font-size="8" font-weight="800">BEST OVERALL MATCH</text>
          
          <text x="14" y="42" fill="#0f172a" font-size="14" font-weight="900">Digital Transformation Director</text>
          <text x="14" y="58" fill="#475569" font-size="10">McKinsey &amp; Company • Dubai / Riyadh (Hybrid)</text>

          <rect x="330" y="14" width="70" height="34" rx="8" fill="#dcfce7" stroke="#10b981"/>
          <text x="340" y="32" fill="#059669" font-size="14" font-weight="900">95%</text>
          <text x="340" y="42" fill="#047857" font-size="7" font-weight="800">MATCH SCORE</text>

          <text x="14" y="82" fill="#334155" font-size="10">Matches 9/10 core leadership competencies in active CV profile. Direct recruiter referral pathway available.</text>

          <rect x="14" y="96" width="160" height="28" rx="8" fill="url(#purpleBtnGrad)"/>
          <text x="24" y="114" fill="#ffffff" font-size="10" font-weight="800">Prepare Application Package →</text>
          
          <text x="290" y="114" fill="#64748b" font-size="9" font-weight="600">View company profile</text>
        </g>
      </g>
    </g>

  </g>
</svg>`;
}

// 2. Tailor SVG
function generateTailorSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${ccDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderCcSidebar('tailor')}
  ${renderCcHeader('AI CV Tailoring Engine')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Engine Header Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#e0e7ff"/>
    <text x="27" y="40" fill="#4338ca" font-size="18">📌</text>

    <text x="64" y="34" fill="#0f172a" font-size="18" font-weight="900">AI CV Tailoring Engine</text>
    <text x="64" y="52" fill="#475569" font-size="11">Tailor Master CV wording, keyword emphasis, and ATS structure grounded strictly in verified resume experience.</text>

    <rect x="1140" y="18" width="170" height="32" rx="16" fill="#dcfce7" stroke="#10b981"/>
    <text x="1156" y="39" fill="#059669" font-size="11" font-weight="800">🛡 Factual Guardrails Active</text>

    <!-- Main 2-Column Split -->
    <!-- Left Column: Target Opportunity Details -->
    <g transform="translate(0, 84)">
      <rect x="0" y="0" width="420" height="720" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="20" y="32" fill="#0f172a" font-size="15" font-weight="800">Target Opportunity Details</text>

      <g transform="translate(20, 50)">
        <text x="0" y="14" fill="#475569" font-size="11" font-weight="700">Target Job Title</text>
        <rect x="0" y="22" width="380" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="12" y="45" fill="#0f172a" font-size="12" font-weight="700">Digital Transformation Lead</text>

        <text x="0" y="80" fill="#475569" font-size="11" font-weight="700">Company Name</text>
        <rect x="0" y="88" width="380" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="12" y="111" fill="#0f172a" font-size="12" font-weight="700">Enterprise Solutions Corp</text>

        <text x="0" y="146" fill="#475569" font-size="11" font-weight="700">Job Description / Requirements *</text>
        <rect x="0" y="154" width="380" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="12" y="176" fill="#334155" font-size="11" width="350">Looking for an experienced Digital Transformation Lead</text>
        <text x="12" y="194" fill="#334155" font-size="11">to drive enterprise cloud systems rollout, manage vendor</text>
        <text x="12" y="212" fill="#334155" font-size="11">stakeholders, optimize operational processes, and ensure</text>
        <text x="12" y="230" fill="#334155" font-size="11">Agile team execution in Dubai.</text>

        <rect x="0" y="360" width="380" height="42" rx="12" fill="url(#purpleBtnGrad)" filter="url(#shadow)"/>
        <text x="110" y="386" fill="#ffffff" font-size="13" font-weight="800">✨ Generate Tailored CV</text>
      </g>
    </g>

    <!-- Right Column: Tailored Output -->
    <g transform="translate(438, 84)">
      <rect x="0" y="0" width="892" height="720" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      
      <text x="24" y="32" fill="#0f172a" font-size="16" font-weight="900">Tailored CV Output</text>
      <text x="24" y="50" fill="#475569" font-size="11">Optimized for Digital Transformation Lead at Enterprise Solutions Corp</text>

      <rect x="740" y="18" width="100" height="36" rx="10" fill="#dcfce7" stroke="#10b981"/>
      <text x="750" y="34" fill="#64748b" font-size="8" font-weight="800">ATS SCORE</text>
      <text x="750" y="48" fill="#059669" font-size="16" font-weight="900">94%</text>

      <rect x="850" y="18" width="28" height="36" rx="8" fill="#f1f5f9"/>
      <text x="858" y="41" fill="#475569" font-size="14">📋</text>

      <!-- Section 1: Professional Summary -->
      <g transform="translate(24, 70)">
        <text x="0" y="14" fill="#6d28d9" font-size="10" font-weight="900" letter-spacing="1">TAILORED PROFESSIONAL SUMMARY</text>
        <rect x="0" y="22" width="844" height="80" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="16" y="46" fill="#0f172a" font-size="12" font-weight="500">Manoj Rajan is a results-driven <tspan fill="#0284c7" font-weight="700">Digital Transformation Lead</tspan> with over 20 years of experience directing enterprise</text>
        <text x="16" y="66" fill="#0f172a" font-size="12" font-weight="500">system implementations and digital transformation initiatives across regional operations. Proven track record in</text>
        <text x="16" y="86" fill="#0f172a" font-size="12" font-weight="500">Agile project delivery, cloud migration strategy, and senior stakeholder alignment.</text>
      </g>

      <!-- Section 2: Prioritized ATS Skills -->
      <g transform="translate(24, 192)">
        <text x="0" y="14" fill="#6d28d9" font-size="10" font-weight="900" letter-spacing="1">PRIORITIZED ATS SKILLS</text>
        <g transform="translate(0, 24)" font-size="11" font-weight="700">
          <rect x="0" y="0" width="200" height="28" rx="8" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="12" y="18" fill="#6d28d9">✓ Digital Transformation Management</text>

          <rect x="210" y="0" width="210" height="28" rx="8" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="222" y="18" fill="#6d28d9">✓ Enterprise System Implementation</text>

          <rect x="430" y="0" width="160" height="28" rx="8" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="442" y="18" fill="#6d28d9">✓ Agile Project Management</text>

          <rect x="600" y="0" width="150" height="28" rx="8" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="612" y="18" fill="#6d28d9">✓ Stakeholder Alignment</text>

          <rect x="0" y="36" width="190" height="28" rx="8" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="12" y="54" fill="#6d28d9">✓ Vendor &amp; Contract Operations</text>

          <rect x="200" y="36" width="180" height="28" rx="8" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="212" y="54" fill="#6d28d9">✓ Cloud Architecture Strategy</text>
        </g>
      </g>

      <!-- Section 3: Bullet Modifications -->
      <g transform="translate(24, 298)">
        <text x="0" y="14" fill="#6d28d9" font-size="10" font-weight="900" letter-spacing="1">ORIGINAL VS TAILORED BULLET MODIFICATIONS</text>
        
        <!-- Box 1 -->
        <g transform="translate(0, 24)">
          <rect x="0" y="0" width="844" height="130" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="16" y="24" fill="#dc2626" font-size="9" font-weight="800">ORIGINAL BULLET:</text>
          <text x="16" y="40" fill="#475569" font-size="11">Managed software systems and led team meetings for business operations.</text>

          <text x="16" y="66" fill="#059669" font-size="9" font-weight="800">TAILORED ATS BULLET:</text>
          <text x="16" y="82" fill="#0f172a" font-size="12" font-weight="700">Directed cross-functional Agile teams delivering enterprise software platforms, improving operational delivery speed by 28%.</text>
          
          <text x="16" y="110" fill="#64748b" font-size="10">Reason: Rephrased existing achievement to highlight measurable leadership impact and ATS keywords without adding unverified facts.</text>
        </g>

        <!-- Box 2 -->
        <g transform="translate(0, 168)">
          <rect x="0" y="0" width="844" height="130" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="16" y="24" fill="#dc2626" font-size="9" font-weight="800">ORIGINAL BULLET:</text>
          <text x="16" y="40" fill="#475569" font-size="11">Handled vendor discussions and software upgrades.</text>

          <text x="16" y="66" fill="#059669" font-size="9" font-weight="800">TAILORED ATS BULLET:</text>
          <text x="16" y="82" fill="#0f172a" font-size="12" font-weight="700">Managed end-to-end enterprise vendor SLA contracts and Cloud ERP upgrade rollouts across regional business units.</text>

          <text x="16" y="110" fill="#64748b" font-size="10">Reason: Strengthened enterprise terms and keywords aligned directly with the target job posting.</text>
        </g>
      </g>

      <!-- Footer Button -->
      <g transform="translate(24, 640)">
        <rect x="0" y="0" width="240" height="40" rx="10" fill="url(#purpleBtnGrad)"/>
        <text x="24" y="24" fill="#ffffff" font-size="12" font-weight="800">Proceed to Generate Cover Letter →</text>
      </g>
    </g>

  </g>
</svg>`;
}

// 3. Twin SVG
function generateTwinSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${ccDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderCcSidebar('twin')}
  ${renderCcHeader('Career Digital Twin &amp; Market Simulator')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Career Twin Banner Card -->
    <rect x="0" y="0" width="1330" height="110" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
    <g transform="translate(24, 20)">
      <rect x="0" y="0" width="48" height="48" rx="12" fill="#e0e7ff"/>
      <text x="12" y="32" fill="#4338ca" font-size="22">🧠</text>

      <rect x="64" y="0" width="110" height="20" rx="10" fill="#f3e8ff"/>
      <text x="72" y="14" fill="#6d28d9" font-size="9" font-weight="800">Verified Career Twin</text>
      <text x="180" y="14" fill="#64748b" font-size="9">Model Version 3.4</text>

      <text x="64" y="42" fill="#0f172a" font-size="22" font-weight="900">Senior Executive Candidate</text>
      <text x="64" y="60" fill="#475569" font-size="11">Senior Technology Professional • Enterprise Technology</text>
    </g>

    <!-- Twin Scores Right -->
    <g transform="translate(1020, 24)">
      <rect x="0" y="0" width="130" height="60" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="65" y="28" fill="#059669" font-size="20" font-weight="900" text-anchor="middle">96.4%</text>
      <text x="65" y="44" fill="#64748b" font-size="8" font-weight="800" text-anchor="middle">Digital Twin Fidelity</text>

      <rect x="140" y="0" width="130" height="60" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="205" y="28" fill="#0284c7" font-size="20" font-weight="900" text-anchor="middle">8+ Yrs</text>
      <text x="205" y="44" fill="#64748b" font-size="8" font-weight="800" text-anchor="middle">Verified Exp</text>
    </g>

    <!-- 2 Column Split -->
    <!-- Left Column: Verified Profile DNA -->
    <g transform="translate(0, 126)">
      <rect x="0" y="0" width="460" height="670" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="20" y="32" fill="#0f172a" font-size="15" font-weight="800">🛡 Verified Profile DNA</text>

      <g transform="translate(20, 50)">
        <text x="0" y="14" fill="#6d28d9" font-size="10" font-weight="800">Primary Domain Expertise</text>
        <g transform="translate(0, 22)" font-size="10" font-weight="700">
          <rect x="0" y="0" width="120" height="24" rx="6" fill="#f3e8ff"/>
          <text x="10" y="16" fill="#6d28d9">Digital Transformation</text>

          <rect x="128" y="0" width="110" height="24" rx="6" fill="#f3e8ff"/>
          <text x="138" y="16" fill="#6d28d9">Enterprise Systems</text>

          <rect x="0" y="30" width="80" height="24" rx="6" fill="#f3e8ff"/>
          <text x="10" y="46" fill="#6d28d9">Agile Delivery</text>

          <rect x="88" y="30" width="110" height="24" rx="6" fill="#f3e8ff"/>
          <text x="98" y="46" fill="#6d28d9">Cloud Architecture</text>
        </g>

        <text x="0" y="120" fill="#6d28d9" font-size="10" font-weight="800">Quantified Impact &amp; Achievements</text>
        <g transform="translate(0, 132)" font-size="11">
          <rect x="0" y="0" width="420" height="42" rx="8" fill="#f8fafc"/>
          <circle cx="16" cy="21" r="6" fill="#dcfce7"/>
          <text x="13" y="24" fill="#059669" font-size="9">✓</text>
          <text x="28" y="25" fill="#334155">Reduced enterprise operational latency by <tspan fill="#059669" font-weight="700">35%</tspan> through cloud migration</text>

          <rect x="0" y="48" width="420" height="42" rx="8" fill="#f8fafc"/>
          <circle cx="16" cy="21" r="6" fill="#dcfce7"/>
          <text x="13" y="24" fill="#059669" font-size="9">✓</text>
          <text x="28" y="25" fill="#334155">Managed <tspan fill="#0f172a" font-weight="700">$2.4M technology budget</tspan> delivering 18% under-budget savings</text>

          <rect x="0" y="96" width="420" height="42" rx="8" fill="#f8fafc"/>
          <circle cx="16" cy="21" r="6" fill="#dcfce7"/>
          <text x="13" y="24" fill="#059669" font-size="9">✓</text>
          <text x="28" y="25" fill="#334155">Spearheaded 12-person cross-functional engineering team across 2 regions</text>
        </g>

        <text x="0" y="310" fill="#6d28d9" font-size="10" font-weight="800">Seniority Reasoning</text>
        <rect x="0" y="322" width="420" height="70" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="14" y="344" fill="#334155" font-size="11">Demonstrates strategic alignment with Senior Manager / Director level</text>
        <text x="14" y="362" fill="#334155" font-size="11">positions based on team leadership and cross-functional enterprise project delivery.</text>
      </g>
    </g>

    <!-- Right Column: Interactive Trajectory Simulator -->
    <g transform="translate(478, 126)">
      <rect x="0" y="0" width="852" height="670" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="20" y="32" fill="#0f172a" font-size="15" font-weight="800">🎯 Interactive Trajectory Simulator</text>
      <text x="20" y="48" fill="#475569" font-size="11">Select a target career vector to simulate alignment &amp; readiness</text>

      <!-- Horizon Tabs -->
      <g transform="translate(20, 68)">
        <rect x="0" y="0" width="250" height="54" rx="10" fill="#f3e8ff" stroke="#6366f1" stroke-width="1.5"/>
        <text x="14" y="22" fill="#64748b" font-size="9">6–12 Months</text>
        <text x="180" y="22" fill="#0284c7" font-size="10" font-weight="800">92% Match</text>
        <text x="14" y="40" fill="#0f172a" font-size="12" font-weight="800">Digital Transformation Lead</text>

        <rect x="262" y="0" width="260" height="54" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="276" y="22" fill="#64748b" font-size="9">12–24 Months</text>
        <text x="440" y="22" fill="#0284c7" font-size="10" font-weight="800">84% Match</text>
        <text x="276" y="40" fill="#0f172a" font-size="12" font-weight="800">Head of Business Systems &amp; IT</text>

        <rect x="534" y="0" width="270" height="54" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="548" y="22" fill="#64748b" font-size="9">2–4 Years</text>
        <text x="710" y="22" fill="#0284c7" font-size="10" font-weight="800">71% Match</text>
        <text x="548" y="40" fill="#0f172a" font-size="12" font-weight="800">Vice President of Digital...</text>
      </g>

      <!-- Selected Detail Box -->
      <g transform="translate(20, 142)">
        <rect x="0" y="0" width="812" height="490" rx="14" fill="#f8fafc" stroke="#cbd5e1"/>
        
        <text x="20" y="36" fill="#0f172a" font-size="20" font-weight="900">Digital Transformation Lead</text>
        <text x="20" y="56" fill="#475569" font-size="11">Target Horizon: 6–12 Months • Compensation Band: <tspan fill="#059669" font-weight="700">$140,000 – $185,000</tspan></text>

        <rect x="710" y="20" width="82" height="42" rx="10" fill="#f3e8ff" stroke="#6366f1"/>
        <text x="751" y="38" fill="#0284c7" font-size="16" font-weight="900" text-anchor="middle">92%</text>
        <text x="751" y="50" fill="#6d28d9" font-size="7" font-weight="800" text-anchor="middle">READINESS</text>

        <!-- Simulated Execution Roadmap -->
        <g transform="translate(20, 80)">
          <text x="0" y="14" fill="#d97706" font-size="10" font-weight="900" letter-spacing="1">🎯 SIMULATED EXECUTION ROADMAP</text>

          <g transform="translate(0, 24)">
            <rect x="0" y="0" width="772" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
            <rect x="10" y="8" width="120" height="26" rx="6" fill="#f3e8ff"/>
            <text x="20" y="25" fill="#6d28d9" font-size="10" font-weight="800">Phase 1 (Days 1–30)</text>
            <text x="145" y="25" fill="#334155" font-size="11">Audit existing architecture &amp; identify immediate high-impact quick wins</text>
          </g>

          <g transform="translate(0, 72)">
            <rect x="0" y="0" width="772" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
            <rect x="10" y="8" width="120" height="26" rx="6" fill="#f3e8ff"/>
            <text x="20" y="25" fill="#6d28d9" font-size="10" font-weight="800">Phase 2 (Days 31–60)</text>
            <text x="145" y="25" fill="#334155" font-size="11">Implement cross-departmental Agile delivery workflows &amp; key automation</text>
          </g>

          <g transform="translate(0, 120)">
            <rect x="0" y="0" width="772" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
            <rect x="10" y="8" width="120" height="26" rx="6" fill="#f3e8ff"/>
            <text x="20" y="25" fill="#6d28d9" font-size="10" font-weight="800">Phase 3 (Days 61–90)</text>
            <text x="145" y="25" fill="#334155" font-size="11">Scale enterprise cloud governance &amp; establish C-suite KPI reporting</text>
          </g>
        </g>

        <!-- Recommended Skill Bridge -->
        <g transform="translate(20, 280)">
          <rect x="0" y="0" width="772" height="70" rx="10" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="16" y="24" fill="#d97706" font-size="10" font-weight="900" letter-spacing="1">📖 RECOMMENDED SKILL BRIDGE</text>
          
          <g transform="translate(16, 36)" font-size="11" font-weight="700">
            <rect x="0" y="0" width="170" height="24" rx="6" fill="#fef3c7"/>
            <text x="10" y="16" fill="#d97706">• Cloud Security Governance</text>

            <rect x="180" y="0" width="190" height="24" rx="6" fill="#fef3c7"/>
            <text x="190" y="16" fill="#d97706">• TOGAF Enterprise Framework</text>
          </g>
        </g>

      </g>
    </g>

  </g>
</svg>`;
}

// 4. Skills SVG
function generateSkillsSVG() {
  const skillsList = [
    { cat: 'TECHNICAL', title: 'Enterprise Architecture', dem: 'Very High', demCol: '#0284c7', imp: 92 },
    { cat: 'TECHNICAL', title: 'Cloud Logistics Systems', dem: 'Very High', demCol: '#0284c7', imp: 92 },
    { cat: 'TECHNICAL', title: 'Data Analytics', dem: 'Very High', demCol: '#0284c7', imp: 92 },
    { cat: 'TECHNICAL', title: 'SAP/Oracle ERP', dem: 'Very High', demCol: '#0284c7', imp: 92 },
    { cat: 'BUSINESS', title: 'Strategic Planning', dem: 'High', demCol: '#4f46e5', imp: 88 },
    { cat: 'BUSINESS', title: 'Stakeholder Management', dem: 'High', demCol: '#4f46e5', imp: 88 },
    { cat: 'BUSINESS', title: 'Vendor Management', dem: 'High', demCol: '#4f46e5', imp: 88 },
    { cat: 'BUSINESS', title: 'Budgeting', dem: 'High', demCol: '#4f46e5', imp: 88 },
    { cat: 'TOOLS', title: 'Microsoft Azure', dem: 'High', demCol: '#4f46e5', imp: 80 },
    { cat: 'TOOLS', title: 'Power BI', dem: 'High', demCol: '#4f46e5', imp: 80 },
    { cat: 'TOOLS', title: 'Jira', dem: 'High', demCol: '#4f46e5', imp: 80 },
    { cat: 'TOOLS', title: 'SQL', dem: 'High', demCol: '#4f46e5', imp: 80 },
    { cat: 'TOOLS', title: 'Python', dem: 'High', demCol: '#4f46e5', imp: 80 },
    { cat: 'CERTIFICATIONS', title: 'PMP - Project Management Professional', dem: 'Critical', demCol: '#dc2626', imp: 95 },
    { cat: 'CERTIFICATIONS', title: 'ITIL v4', dem: 'Critical', demCol: '#dc2626', imp: 95 },
    { cat: 'CERTIFICATIONS', title: 'AWS Certified Solutions Architect', dem: 'Critical', demCol: '#dc2626', imp: 95 }
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${ccDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderCcSidebar('skills')}
  ${renderCcHeader('Skills Intelligence &amp; Gap Analysis')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Header Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#e0e7ff"/>
    <text x="27" y="40" fill="#4338ca" font-size="18">💡</text>

    <text x="64" y="34" fill="#0f172a" font-size="18" font-weight="900">Skills Intelligence &amp; Market Alignment</text>
    <text x="64" y="52" fill="#475569" font-size="11">Automated skill taxonomy verified against candidate master CV experience and job market demand.</text>

    <rect x="1160" y="16" width="150" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
    <text x="1175" y="38" fill="#ffffff" font-size="11" font-weight="800">🗺 Map to Target Roles</text>

    <!-- 4 Summary Metric Cards -->
    <g transform="translate(0, 80)">
      <rect x="0" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#e2e8f0"/>
      <text x="16" y="22" fill="#64748b" font-size="8" font-weight="800">TOTAL VERIFIED SKILLS</text>
      <text x="16" y="52" fill="#0f172a" font-size="24" font-weight="900">16</text>
      <rect x="230" y="24" width="70" height="22" rx="11" fill="#dcfce7"/>
      <text x="240" y="39" fill="#059669" font-size="9" font-weight="800">✓ Verified</text>

      <rect x="338" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#e2e8f0"/>
      <text x="354" y="22" fill="#64748b" font-size="8" font-weight="800">HIGH MARKET DEMAND</text>
      <text x="354" y="52" fill="#0284c7" font-size="24" font-weight="900">7</text>
      <text x="550" y="39" fill="#0369a1" font-size="9" font-weight="800">Top 10% Market</text>

      <rect x="676" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#e2e8f0"/>
      <text x="692" y="22" fill="#64748b" font-size="8" font-weight="800">EMERGING SKILL FOCUS</text>
      <text x="692" y="52" fill="#6d28d9" font-size="24" font-weight="900">4</text>
      <text x="890" y="39" fill="#7c3aed" font-size="9" font-weight="800">High Growth</text>

      <rect x="1015" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#e2e8f0"/>
      <text x="1031" y="22" fill="#64748b" font-size="8" font-weight="800">MISSING HIGH-DEMAND SKILLS</text>
      <text x="1031" y="52" fill="#d97706" font-size="24" font-weight="900">2</text>
      <text x="1220" y="39" fill="#b45309" font-size="9" font-weight="800">Recommended</text>
    </g>

    <!-- Filter Bar -->
    <g transform="translate(0, 162)">
      <rect x="0" y="0" width="600" height="34" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="14" y="21" fill="#64748b" font-size="11">🔍 Search verified skills...</text>

      <g transform="translate(680, 0)" font-size="10" font-weight="700">
        <rect x="0" y="0" width="40" height="34" rx="8" fill="url(#purpleBtnGrad)"/>
        <text x="12" y="21" fill="#ffffff">All</text>

        <rect x="48" y="0" width="70" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="58" y="21" fill="#334155">Technical</text>

        <rect x="126" y="0" width="70" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="136" y="21" fill="#334155">Business</text>

        <rect x="204" y="0" width="56" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="214" y="21" fill="#334155">Tools</text>

        <rect x="268" y="0" width="90" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="278" y="21" fill="#334155">Certifications</text>
      </g>
    </g>

    <!-- Grid of Skill Cards (3 columns x 5 rows) -->
    <g transform="translate(0, 210)">
      ${skillsList.map((s, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = col * 450;
        const y = row * 125;
        return `
          <g transform="translate(${x}, ${y})">
            <rect x="0" y="0" width="430" height="112" rx="14" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1"/>
            
            <rect x="14" y="12" width="76" height="18" rx="4" fill="#f3e8ff"/>
            <text x="20" y="24" fill="#6d28d9" font-size="8" font-weight="800">${s.cat}</text>

            <rect x="310" y="12" width="105" height="18" rx="9" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="320" y="24" fill="${s.demCol}" font-size="8" font-weight="800">Demand: ${s.dem}</text>

            <text x="14" y="52" fill="#0f172a" font-size="14" font-weight="800">${s.title}</text>
            
            <!-- Impact Bar -->
            <rect x="14" y="68" width="402" height="6" rx="3" fill="#e2e8f0"/>
            <rect x="14" y="68" width="${402 * (s.imp / 100)}" height="6" rx="3" fill="url(#purpleBtnGrad)"/>

            <text x="14" y="96" fill="#059669" font-size="9" font-weight="700">✓ Verified in Master CV</text>
            <text x="340" y="96" fill="#4f46e5" font-size="9" font-weight="700">Emphasize on CV →</text>
          </g>
        `;
      }).join('')}
    </g>

  </g>
</svg>`;
}

// 5. Recruiters SVG
function generateRecruitersSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${ccDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderCcSidebar('recruiters')}
  ${renderCcHeader('Recruiters &amp; Executive Search Database')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#e0e7ff"/>
    <text x="27" y="40" fill="#4338ca" font-size="18">👤</text>

    <text x="64" y="34" fill="#0f172a" font-size="18" font-weight="900">Recruiters &amp; Executive Search Database</text>
    <text x="64" y="52" fill="#475569" font-size="11">Store and categorize executive headhunters, regional recruiters, and agency partners.</text>

    <rect x="1180" y="16" width="130" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
    <text x="1195" y="38" fill="#ffffff" font-size="11" font-weight="800">+ Add Recruiter</text>

    <!-- Cards Grid -->
    <g transform="translate(0, 90)">
      
      <!-- Card 1: Sarah Jenkins -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="640" height="240" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
        
        <text x="24" y="38" fill="#0f172a" font-size="20" font-weight="900">Sarah Jenkins</text>
        <text x="24" y="58" fill="#0284c7" font-size="12" font-weight="700">Michael Page Executive</text>
        <text x="24" y="78" fill="#475569" font-size="11">Technology &amp; Digital Transformation • 📍 Dubai, UAE</text>

        <rect x="490" y="24" width="124" height="34" rx="8" fill="url(#purpleBtnGrad)"/>
        <text x="506" y="45" fill="#ffffff" font-size="11" font-weight="800">💬 Draft Message</text>

        <g transform="translate(24, 100)">
          <rect x="0" y="0" width="590" height="60" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="16" y="35" fill="#334155" font-size="11">Specializes in senior GCC enterprise technology placements. Very responsive.</text>
        </g>

        <text x="24" y="200" fill="#64748b" font-size="10">Contacted: 2026-08-02</text>
        <text x="470" y="200" fill="#d97706" font-size="10" font-weight="800">Follow-Up: 2026-08-09</text>
      </g>

      <!-- Card 2: Marcus Vance -->
      <g transform="translate(670, 0)">
        <rect x="0" y="0" width="640" height="240" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
        
        <text x="24" y="38" fill="#0f172a" font-size="20" font-weight="900">Marcus Vance</text>
        <text x="24" y="58" fill="#0284c7" font-size="12" font-weight="700">Korn Ferry Executive Search</text>
        <text x="24" y="78" fill="#475569" font-size="11">Financial Services &amp; Enterprise IT • 📍 Abu Dhabi, UAE</text>

        <rect x="490" y="24" width="124" height="34" rx="8" fill="url(#purpleBtnGrad)"/>
        <text x="506" y="45" fill="#ffffff" font-size="11" font-weight="800">💬 Draft Message</text>

        <g transform="translate(24, 100)">
          <rect x="0" y="0" width="590" height="60" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="16" y="35" fill="#334155" font-size="11">Discussed upcoming regional Digital Transformation Lead roles.</text>
        </g>

        <text x="24" y="200" fill="#64748b" font-size="10">Contacted: 2026-07-28</text>
        <text x="470" y="200" fill="#d97706" font-size="10" font-weight="800">Follow-Up: 2026-08-08</text>
      </g>

    </g>

  </g>
</svg>`;
}

// 6. Target Companies SVG
function generateCompaniesSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${ccDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderCcSidebar('companies')}
  ${renderCcHeader('Target Companies &amp; Speculative Pipeline')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#e0e7ff"/>
    <text x="27" y="40" fill="#4338ca" font-size="18">🏢</text>

    <text x="64" y="34" fill="#0f172a" font-size="18" font-weight="900">Target Companies &amp; Speculative Pipeline</text>
    <text x="64" y="52" fill="#475569" font-size="11">Proactively track target employers and explore AI-generated speculative role opportunities before jobs are posted.</text>

    <rect x="1150" y="16" width="160" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
    <text x="1165" y="38" fill="#ffffff" font-size="11" font-weight="800">+ Add Target Company</text>

    <!-- Cards Grid -->
    <g transform="translate(0, 90)">
      
      <!-- Card 1: Emirates NBD Tech -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="640" height="420" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
        
        <rect x="24" y="24" width="115" height="22" rx="11" fill="#f3e8ff"/>
        <text x="34" y="39" fill="#6d28d9" font-size="9" font-weight="800">ACTIVE PIPELINE</text>

        <rect x="520" y="24" width="95" height="22" rx="11" fill="#fef3c7"/>
        <text x="530" y="39" fill="#d97706" font-size="9" font-weight="800">High Priority</text>

        <text x="24" y="74" fill="#0f172a" font-size="22" font-weight="900">Emirates NBD Tech</text>
        <text x="24" y="94" fill="#475569" font-size="11">Banking &amp; Financial Technology • 📍 Dubai, UAE</text>

        <!-- Rationale Box -->
        <g transform="translate(24, 110)">
          <rect x="0" y="0" width="590" height="54" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="14" y="20" fill="#64748b" font-size="8" font-weight="800">TARGET RATIONALE:</text>
          <text x="14" y="38" fill="#334155" font-size="11">Expanding digital banking operations and core transformation team in GCC region.</text>
        </g>

        <!-- Speculative Role Box -->
        <g transform="translate(24, 180)">
          <rect x="0" y="0" width="590" height="160" rx="12" fill="#f8fafc" stroke="#c084fc"/>
          <text x="14" y="24" fill="#4f46e5" font-size="9" font-weight="800">✨ SPECULATIVE ROLE OPPORTUNITY</text>
          <rect x="490" y="12" width="85" height="20" rx="10" fill="#f1f5f9"/>
          <text x="500" y="26" fill="#64748b" font-size="8" font-weight="800">Unadvertised</text>

          <text x="14" y="52" fill="#0f172a" font-size="15" font-weight="900">Lead Business Systems Integrator</text>
          <text x="14" y="74" fill="#334155" font-size="10">Recent cloud banking migration demands cross-platform integration leads.</text>

          <line x1="14" y1="90" x2="576" y2="90" stroke="#e2e8f0"/>

          <text x="14" y="112" fill="#64748b" font-size="10">Strategy: Reach out to Head of Enterprise Architecture with a concise value proposition on cloud migration experience.</text>
        </g>

        <text x="24" y="380" fill="#64748b" font-size="11">👥 3 CRM Contacts</text>
        <text x="490" y="380" fill="#4f46e5" font-size="11" font-weight="800">Find Decision Makers →</text>
      </g>

      <!-- Card 2: G42 AI Holdings -->
      <g transform="translate(670, 0)">
        <rect x="0" y="0" width="640" height="420" rx="18" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1.5"/>
        
        <rect x="24" y="24" width="100" height="22" rx="11" fill="#e0f2fe"/>
        <text x="34" y="39" fill="#0284c7" font-size="9" font-weight="800">RESEARCHING</text>

        <rect x="520" y="24" width="95" height="22" rx="11" fill="#fef3c7"/>
        <text x="530" y="39" fill="#d97706" font-size="9" font-weight="800">High Priority</text>

        <text x="24" y="74" fill="#0f172a" font-size="22" font-weight="900">G42 AI Holdings</text>
        <text x="24" y="94" fill="#475569" font-size="11">Artificial Intelligence &amp; Enterprise Cloud • 📍 Abu Dhabi, UAE</text>

        <!-- Rationale Box -->
        <g transform="translate(24, 110)">
          <rect x="0" y="0" width="590" height="54" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="14" y="20" fill="#64748b" font-size="8" font-weight="800">TARGET RATIONALE:</text>
          <text x="14" y="38" fill="#334155" font-size="11">Massive enterprise cloud expansion and government digital modernization contracts.</text>
        </g>

        <!-- Speculative Role Box -->
        <g transform="translate(24, 180)">
          <rect x="0" y="0" width="590" height="160" rx="12" fill="#f8fafc" stroke="#c084fc"/>
          <text x="14" y="24" fill="#4f46e5" font-size="9" font-weight="800">✨ SPECULATIVE ROLE OPPORTUNITY</text>
          <rect x="490" y="12" width="85" height="20" rx="10" fill="#f1f5f9"/>
          <text x="500" y="26" fill="#64748b" font-size="8" font-weight="800">Unadvertised</text>

          <text x="14" y="52" fill="#0f172a" font-size="15" font-weight="900">Senior Program Lead - AI Platform Modernization</text>
          <text x="14" y="74" fill="#334155" font-size="10">Scaling AI infrastructure requires experienced program managers with enterprise governance credentials.</text>

          <line x1="14" y1="90" x2="576" y2="90" stroke="#e2e8f0"/>

          <text x="14" y="112" fill="#64748b" font-size="10">Strategy: Connect with Talent Acquisition Directors specializing in AI Operations.</text>
        </g>

        <text x="24" y="380" fill="#64748b" font-size="11">👥 2 CRM Contacts</text>
        <text x="490" y="380" fill="#4f46e5" font-size="11" font-weight="800">Find Decision Makers →</text>
      </g>

    </g>

  </g>
</svg>`;
}

// -------------------------------------------------------------
// MARITIME AI LIGHT-THEME DEFINITIONS & GENERATOR
// -------------------------------------------------------------
const maritimeSvgs = {
  'maritime-fleet': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
  </defs>

  <rect width="1600" height="900" fill="url(#bgGrad)" />

  <!-- Sidebar Nav -->
  <rect x="0" y="0" width="220" height="900" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
  <circle cx="38" cy="42" r="16" fill="#0284c7" />
  <path d="M 38 32 L 38 52 M 30 42 L 46 42 M 33 50 Q 38 55 43 50" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <text x="64" y="38" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="13" letter-spacing="1">MARITIME AI</text>
  <text x="64" y="50" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" letter-spacing="0.5">OPERATIONS CONTROL TOWER</text>

  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500">
    <rect x="10" y="210" width="200" height="36" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
    <text x="42" y="233" fill="#0284c7" font-weight="700">Fleet Overview</text>
    <text x="42" y="183" fill="#475569">Executive Dashboard</text>
    <text x="42" y="283" fill="#475569">Anomaly Detection</text>
    <text x="42" y="333" fill="#475569">Predictive Maintenance</text>
    <text x="42" y="383" fill="#475569">Voyage &amp; Fuel Optimisation</text>
    <text x="42" y="433" fill="#475569">Safety Monitoring</text>
    <text x="42" y="483" fill="#475569">Staging Admin</text>
  </g>

  <!-- Header Content -->
  <text x="250" y="42" fill="#0284c7" font-family="sans-serif" font-size="10" font-weight="700" letter-spacing="1.5">FLEET OVERVIEW &amp; VESSEL DIRECTORY</text>
  <text x="250" y="75" fill="#0f172a" font-family="sans-serif" font-size="26" font-weight="800" letter-spacing="-0.5">Active Fleet Matrix</text>
  <text x="250" y="98" fill="#475569" font-family="sans-serif" font-size="12">Real-time speed telemetry, destination tracking, and engine maintenance scores for all global vessels.</text>

  <rect x="1390" y="52" width="160" height="38" rx="8" fill="url(#cyanGlow)"/>
  <text x="1415" y="76" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="700">+ Register New Vessel</text>

  <rect x="250" y="130" width="1300" height="52" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
  <rect x="265" y="142" width="280" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="280" y="160" fill="#64748b" font-family="sans-serif" font-size="11">🔍 Filter by vessel name, IMO, location...</text>

  <!-- Table Headers -->
  <g transform="translate(250, 200)" font-family="sans-serif" font-size="11" font-weight="700" fill="#64748b">
    <text x="20" y="0">VESSEL NAME &amp; IMO</text>
    <text x="240" y="0">TYPE &amp; CAPACITY</text>
    <text x="440" y="0">SPEED &amp; DESTINATION</text>
    <text x="700" y="0">HEALTH SCORE</text>
    <text x="880" y="0">ANOMALY STATUS</text>
    <text x="1100" y="0">ACTION</text>
  </g>

  <!-- Table Rows -->
  ${[
    { name: 'VALIANT VOYAGER', imo: 'IMO 9823412', type: 'LNG Carrier', cap: '174,000 m³', spd: '18.4 kts', dest: 'Rotterdam (ETA 12h)', score: '98%', status: 'Normal', statCol: '#059669', bgStat: '#dcfce7' },
    { name: 'OCEANIC TITAN', imo: 'IMO 9711209', type: 'Container (ULCV)', cap: '21,000 TEU', spd: '16.2 kts', dest: 'Singapore (ETA 2d)', score: '82%', status: 'Caution (Fuel)', statCol: '#d97706', bgStat: '#fef3c7' },
    { name: 'NEPTUNE PIONEER', imo: 'IMO 9890123', type: 'Bulk Carrier', cap: '180,000 DWT', spd: '12.1 kts', dest: 'Port Hedland (ETA 4d)', score: '94%', status: 'Normal', statCol: '#059669', bgStat: '#dcfce7' },
    { name: 'PACIFIC SENTINEL', imo: 'IMO 9654321', type: 'Crude Oil Tanker', cap: '300,000 DWT', spd: '14.0 kts', dest: 'Ras Tanura (ETA 1d)', score: '64%', status: 'Critical (Engine)', statCol: '#dc2626', bgStat: '#fee2e2' },
    { name: 'ATLANTIC EXPRESS', imo: 'IMO 9788901', type: 'Ro-Ro Vessel', cap: '6,500 CEU', spd: '19.1 kts', dest: 'Hamburg (ETA 8h)', score: '91%', status: 'Normal', statCol: '#059669', bgStat: '#dcfce7' }
  ].map((row, i) => `
    <g transform="translate(250, ${220 + i * 110})">
      <rect x="0" y="0" width="1300" height="96" rx="12" fill="url(#cardGrad)" stroke="#e2e8f0" stroke-width="1"/>
      
      <circle cx="36" cy="48" r="18" fill="#e0f2fe"/>
      <text x="28" y="54" fill="#0284c7" font-weight="900" font-size="14">🚢</text>
      
      <text x="68" y="42" fill="#0f172a" font-family="sans-serif" font-size="15" font-weight="800">${row.name}</text>
      <text x="68" y="60" fill="#64748b" font-family="sans-serif" font-size="11">${row.imo}</text>

      <text x="240" y="42" fill="#0f172a" font-family="sans-serif" font-size="13" font-weight="700">${row.type}</text>
      <text x="240" y="60" fill="#64748b" font-family="sans-serif" font-size="11">${row.cap}</text>

      <text x="440" y="42" fill="#0284c7" font-family="sans-serif" font-size="13" font-weight="700">⚡ ${row.spd}</text>
      <text x="440" y="60" fill="#475569" font-family="sans-serif" font-size="11">📍 ${row.dest}</text>

      <text x="700" y="48" fill="#0f172a" font-family="sans-serif" font-size="18" font-weight="900">${row.score}</text>

      <rect x="880" y="32" width="140" height="32" rx="16" fill="${row.bgStat}"/>
      <text x="898" y="52" fill="${row.statCol}" font-family="sans-serif" font-size="11" font-weight="800">• ${row.status}</text>

      <rect x="1100" y="32" width="130" height="32" rx="8" fill="#0284c7"/>
      <text x="1120" y="52" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="700">View Telemetry</text>
    </g>
  `).join('')}

</svg>`
};

// Compile list of output files
const allFiles = [
  { name: 'careerconnect-home', svg: generateHomeSVG() },
  { name: 'careerconnect-tailor', svg: generateTailorSVG() },
  { name: 'careerconnect-twin', svg: generateTwinSVG() },
  { name: 'careerconnect-skills', svg: generateSkillsSVG() },
  { name: 'careerconnect-recruiters', svg: generateRecruitersSVG() },
  { name: 'careerconnect-companies', svg: generateCompaniesSVG() },
  { name: 'maritime-fleet', svg: maritimeSvgs['maritime-fleet'] }
];

allFiles.forEach(f => {
  const svgPath = path.join(publicImgDir, `${f.name}.svg`);
  const pngPath = path.join(publicImgDir, `${f.name}.png`);
  
  fs.writeFileSync(svgPath, f.svg, 'utf-8');
  console.log(`Saved SVG: ${svgPath}`);

  const resvg = new Resvg(f.svg, {
    fitTo: { mode: 'width', value: 2400 }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(pngPath, pngBuffer);
  console.log(`Rendered 2400px PNG: ${pngPath} (${pngBuffer.length} bytes)`);
});

console.log('All light-themed SVGs & PNGs generated successfully!');
