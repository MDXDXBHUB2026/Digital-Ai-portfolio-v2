const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const publicImgDir = path.join(process.cwd(), 'public/images');
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

const commonDefs = `
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080b11" />
      <stop offset="50%" stop-color="#0b0f19" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111827" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>

    <linearGradient id="purpleBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>

    <linearGradient id="accentBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.4"/>
    </filter>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <style>
    .font-sans { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .txt-title { font-family: system-ui, -apple-system, sans-serif; font-weight: 800; fill: #f8fafc; }
    .txt-sub { font-family: system-ui, -apple-system, sans-serif; font-weight: 500; fill: #94a3b8; }
    .txt-muted { font-family: system-ui, -apple-system, sans-serif; font-weight: 600; fill: #64748b; }
    .txt-purple { font-family: system-ui, -apple-system, sans-serif; font-weight: 700; fill: #a78bfa; }
    .txt-green { font-family: system-ui, -apple-system, sans-serif; font-weight: 700; fill: #34d399; }
    .txt-amber { font-family: system-ui, -apple-system, sans-serif; font-weight: 700; fill: #fbbf24; }
    .txt-white { font-family: system-ui, -apple-system, sans-serif; font-weight: 700; fill: #ffffff; }
  </style>
`;

function renderTopHeader(activeBreadcrumb) {
  return `
    <!-- Top Header Navigation Bar -->
    <rect x="220" y="0" width="1380" height="56" fill="#0d1322" stroke="#1e293b" stroke-width="1"/>
    
    <!-- Breadcrumb -->
    <g transform="translate(240, 16)" class="font-sans">
      <rect x="0" y="0" width="210" height="26" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="10" y="17" fill="#cbd5e1" font-size="11" font-weight="600">📄 M. Rajan Resume - Final-Mariti...</text>
      
      <text x="222" y="17" fill="#64748b" font-size="12">|</text>
      <text x="236" y="17" fill="#a78bfa" font-size="12" font-weight="700">📌 ${activeBreadcrumb}</text>
    </g>

    <!-- Right Header Tools -->
    <g transform="translate(1080, 12)" class="font-sans">
      <rect x="0" y="0" width="180" height="32" rx="8" fill="#111827" stroke="#334155" stroke-width="1"/>
      <text x="12" y="20" fill="#64748b" font-size="11">🔍 Search or Command...</text>
      <rect x="145" y="6" width="24" height="20" rx="4" fill="#1e293b"/>
      <text x="150" y="20" fill="#94a3b8" font-size="10" font-weight="700">⌘K</text>

      <circle cx="210" cy="16" r="14" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="204" y="21" fill="#f59e0b" font-size="12">☀️</text>

      <rect x="235" y="2" width="115" height="28" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
      <circle cx="247" cy="16" r="4" fill="#34d399"/>
      <text x="256" y="20" fill="#34d399" font-size="11" font-weight="700">cv-project-189d8</text>

      <rect x="360" y="2" width="28" height="28" rx="6" fill="#3b82f6"/>
      <text x="368" y="21" fill="#ffffff" font-size="16" font-weight="800">+</text>

      <rect x="400" y="2" width="80" height="28" rx="14" fill="#1d4ed8"/>
      <circle cx="414" cy="16" r="10" fill="#3b82f6"/>
      <text x="410" y="20" fill="#ffffff" font-size="11" font-weight="800">E</text>
      <text x="430" y="20" fill="#ffffff" font-size="11" font-weight="700">Echoflare06</text>
    </g>
  `;
}

function renderSidebar(activeMenuKey) {
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
      menuSvg += `<text x="20" y="${y}" fill="#475569" font-family="sans-serif" font-size="9" font-weight="800" letter-spacing="1">${item.section}</text>`;
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
          <text x="22" y="${y + 5}" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="500">${item.icon}  ${item.label}</text>
        `;
        if (item.badge) {
          menuSvg += `
            <rect x="175" y="${y - 9}" width="${item.badge.length > 2 ? 22 : 16}" height="18" rx="8" fill="#1e293b"/>
            <text x="${item.badge.length > 2 ? 178 : 180}" y="${y + 4}" fill="#cbd5e1" font-family="sans-serif" font-size="9" font-weight="700">${item.badge}</text>
          `;
        }
      }
      y += 26;
    }
  });

  return `
    <rect x="0" y="0" width="220" height="900" fill="#0a0e17" stroke="#1e293b" stroke-width="1"/>

    <g transform="translate(16, 16)">
      <rect x="0" y="0" width="36" height="36" rx="10" fill="url(#purpleGrad)"/>
      <text x="8" y="24" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900">⚡</text>
      <text x="46" y="20" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="900" letter-spacing="-0.3">CareerConnect<tspan fill="#a78bfa">AI</tspan></text>
      <text x="46" y="32" fill="#64748b" font-family="sans-serif" font-size="8" font-weight="800" letter-spacing="1">CAREER OS</text>
    </g>

    <line x1="0" y1="62" x2="220" y2="62" stroke="#1e293b" stroke-width="1"/>

    <g class="font-sans">
      ${menuSvg}
    </g>

    <g transform="translate(10, 860)">
      <rect x="0" y="0" width="200" height="28" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="10" y="18" fill="#94a3b8" font-family="sans-serif" font-size="10" font-weight="600">Direct Local Storage</text>
      <rect x="115" y="4" width="78" height="20" rx="10" fill="#064e3b"/>
      <text x="122" y="18" fill="#34d399" font-family="sans-serif" font-size="9" font-weight="800">✓ Storage Synced</text>
    </g>
  `;
}

// -------------------------------------------------------------
// 1. CAREERCONNECT HOME SNAPSHOT
// -------------------------------------------------------------
function generateHomeSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${commonDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderSidebar('home')}
  ${renderTopHeader('Home Experience &amp; Career Intelligence')}

  <!-- Main Workspace Area -->
  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Career Pulse Banner Strip -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="1330" height="36" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <rect x="12" y="6" width="100" height="24" rx="6" fill="#4338ca"/>
      <text x="22" y="22" fill="#ffffff" font-size="10" font-weight="800">⚡ CAREER PULSE</text>
      
      <text x="130" y="22" fill="#a78bfa" font-size="11" font-weight="800">HIGH MATCH:</text>
      <text x="210" y="22" fill="#f8fafc" font-size="11" font-weight="600">Digital Transformation Lead (95%) posted 2h ago</text>
      
      <circle cx="610" cy="18" r="4" fill="#f59e0b"/>
      <text x="622" y="22" fill="#fbbf24" font-size="11" font-weight="800">FOLLOW-UP DUE:</text>
      <text x="730" y="22" fill="#f8fafc" font-size="11" font-weight="600">Microsoft Talent Acquisition (3 days cold)</text>

      <circle cx="1020" cy="18" r="4" fill="#3b82f6"/>
      <text x="1032" y="22" fill="#60a5fa" font-size="11" font-weight="800">TARGET COMPANY:</text>
      <text x="1150" y="22" fill="#f8fafc" font-size="11" font-weight="600">Amazon Web Services...</text>
    </g>

    <!-- Welcome Hero Box -->
    <g transform="translate(0, 48)">
      <rect x="0" y="0" width="1330" height="150" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5" filter="url(#shadow)"/>
      
      <!-- Content Left -->
      <g transform="translate(24, 20)">
        <rect x="0" y="0" width="220" height="24" rx="12" fill="#2e1065" stroke="#7c3aed" stroke-width="1"/>
        <text x="12" y="16" fill="#c084fc" font-size="10" font-weight="800">✨ CareerConnectAI Operating Engine Active</text>

        <text x="0" y="62" fill="#ffffff" font-size="28" font-weight="900" letter-spacing="-0.5">Good morning, <tspan fill="#fbbf24">Manoj</tspan></text>
        <text x="0" y="88" fill="#94a3b8" font-size="13">Your career search is moving. <tspan fill="#ffffff" font-weight="700">8 strong opportunities</tspan> need attention, <tspan fill="#ffffff" font-weight="700">3 applications</tspan> need follow-up, and <tspan fill="#ffffff" font-weight="700">2 target companies</tspan> posted new executive roles.</text>

        <!-- CTA Buttons -->
        <g transform="translate(0, 102)">
          <rect x="0" y="0" width="180" height="34" rx="12" fill="url(#purpleBtnGrad)"/>
          <text x="18" y="21" fill="#ffffff" font-size="12" font-weight="800">▶ Start Today's Action Plan</text>

          <rect x="195" y="0" width="170" height="34" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="215" y="21" fill="#cbd5e1" font-size="12" font-weight="700">Explore 28 Matched Jobs</text>
        </g>
      </g>

      <!-- Right Synced Box -->
      <g transform="translate(820, 16)">
        <rect x="0" y="0" width="480" height="118" rx="14" fill="#090d16" stroke="#334155" stroke-width="1"/>
        <text x="18" y="24" fill="#818cf8" font-size="10" font-weight="900" letter-spacing="1">⚙ YOUR CAREERCONNECTAI</text>
        <rect x="400" y="12" width="62" height="18" rx="9" fill="#064e3b"/>
        <text x="410" y="24" fill="#34d399" font-size="9" font-weight="800">SYNCED</text>

        <text x="18" y="46" fill="#94a3b8" font-size="10">CareerConnectAI continuously synthesizes your <tspan fill="#ffffff" font-weight="700">Resume, Jobs, Applications, Companies, Network</tspan> and <tspan fill="#ffffff" font-weight="700">Career Goals</tspan> into single-click high-impact daily actions.</text>

        <!-- Grid Pills -->
        <g transform="translate(18, 68)" font-size="10" font-weight="700">
          <rect x="0" y="0" width="105" height="22" rx="11" fill="#1e293b"/>
          <text x="10" y="15" fill="#a78bfa">✓ Verified Twin Data</text>

          <rect x="115" y="0" width="115" height="22" rx="11" fill="#1e293b"/>
          <text x="125" y="15" fill="#38bdf8">✓ Auto-Match Reports</text>

          <rect x="240" y="0" width="105" height="22" rx="11" fill="#1e293b"/>
          <text x="250" y="15" fill="#34d399">✓ Follow-Up AI Engine</text>

          <rect x="355" y="0" width="105" height="22" rx="11" fill="#1e293b"/>
          <text x="365" y="15" fill="#fbbf24">✓ Salary Decision Lab</text>
        </g>
      </g>
    </g>

    <!-- Career Journey Workflow Bar -->
    <g transform="translate(0, 212)">
      <rect x="0" y="0" width="1330" height="92" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="24" fill="#ffffff" font-size="13" font-weight="800">📈 Career Journey Workflow</text>
      <text x="210" y="24" fill="#64748b" font-size="10">Live status pipeline across all stages of your career transition campaign</text>
      <text x="1230" y="24" fill="#818cf8" font-size="11" font-weight="700">Open Tracker →</text>

      <!-- 8 Pipeline Items -->
      <g transform="translate(20, 36)">
        ${[
          { label: 'DISCOVER', num: '28', sub: 'Opportunities', col: '#818cf8' },
          { label: 'MATCH', num: '11', sub: 'High Matches', col: '#a78bfa' },
          { label: 'PREPARE', num: '5', sub: 'Packages Ready', col: '#c084fc' },
          { label: 'CONNECT', num: '14', sub: 'Network Contacts', col: '#38bdf8' },
          { label: 'APPLY', num: '8', sub: 'Submitted', col: '#34d399' },
          { label: 'FOLLOW UP', num: '3', sub: 'Tasks Due', col: '#fbbf24' },
          { label: 'INTERVIEW', num: '2', sub: 'Active Stages', col: '#f43f5e' },
          { label: 'OFFER', num: '1', sub: 'Decision Pending', col: '#10b981' }
        ].map((p, i) => `
          <g transform="translate(${i * 158}, 0)">
            <rect x="0" y="0" width="150" height="44" rx="10" fill="#0a0e17" stroke="#1e293b" stroke-width="1"/>
            <text x="10" y="14" fill="#64748b" font-size="8" font-weight="800">${p.label}</text>
            <text x="10" y="34" fill="${p.col}" font-size="18" font-weight="900">${p.num}</text>
            <text x="42" y="33" fill="#94a3b8" font-size="9">${p.sub}</text>
          </g>
        `).join('')}
      </g>
    </g>

    <!-- Bottom 2x2 Grid -->
    <!-- Card 1: Career Momentum Index -->
    <g transform="translate(0, 318)">
      <rect x="0" y="0" width="380" height="490" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="28" fill="#ffffff" font-size="14" font-weight="800">📈 Career Momentum Index</text>
      <rect x="270" y="14" width="94" height="20" rx="10" fill="#2e1065"/>
      <text x="280" y="28" fill="#c084fc" font-size="9" font-weight="800">ACTIVE CAMPAIGN</text>

      <!-- Gauge Circle -->
      <g transform="translate(140, 60)">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" stroke-width="10"/>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#818cf8" stroke-width="10" stroke-dasharray="264" stroke-dashoffset="74"/>
        <text x="50" y="52" fill="#ffffff" font-size="24" font-weight="900" text-anchor="middle">72</text>
        <text x="50" y="66" fill="#64748b" font-size="10" text-anchor="middle">/ 100</text>
      </g>

      <text x="190" y="180" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle">Strong Strategy Velocity</text>
      <text x="190" y="198" fill="#94a3b8" font-size="10" text-anchor="middle">Calculated from response rate, networking touchpoints, target role alignment, and application cadence.</text>

      <!-- Breakdown List -->
      <g transform="translate(20, 220)">
        <text x="0" y="0" fill="#64748b" font-size="9" font-weight="800" letter-spacing="1">MOMENTUM BREAKDOWN</text>
        
        <g transform="translate(0, 12)">
          <rect x="0" y="0" width="340" height="48" rx="10" fill="#0a0e17" stroke="#1e293b"/>
          <circle cx="16" cy="24" r="8" fill="#064e3b"/>
          <text x="12" y="28" fill="#34d399" font-size="10">✓</text>
          <text x="32" y="20" fill="#f8fafc" font-size="10" font-weight="700">High Match Quality &amp; Positioning Alignment</text>
          <text x="32" y="34" fill="#94a3b8" font-size="9">Target roles aligned to verified master CV</text>
          <text x="290" y="28" fill="#34d399" font-size="12" font-weight="800">+18 pts</text>
        </g>

        <g transform="translate(0, 68)">
          <rect x="0" y="0" width="340" height="48" rx="10" fill="#0a0e17" stroke="#1e293b"/>
          <circle cx="16" cy="24" r="8" fill="#064e3b"/>
          <text x="12" y="28" fill="#34d399" font-size="10">✓</text>
          <text x="32" y="20" fill="#f8fafc" font-size="10" font-weight="700">Active Recruiter &amp; Executive Outreach</text>
          <text x="32" y="34" fill="#94a3b8" font-size="9">Consistent response velocity with GCC headhunters</text>
          <text x="290" y="28" fill="#34d399" font-size="12" font-weight="800">+14 pts</text>
        </g>

        <g transform="translate(0, 124)">
          <rect x="0" y="0" width="340" height="48" rx="10" fill="#0a0e17" stroke="#854d0e"/>
          <circle cx="16" cy="24" r="8" fill="#451a03"/>
          <text x="13" y="28" fill="#fbbf24" font-size="10">⚠</text>
          <text x="32" y="20" fill="#f8fafc" font-size="10" font-weight="700">3 Application Follow-Ups Pending Attention</text>
          <text x="32" y="34" fill="#fbbf24" font-size="9">Applications 3+ days without touchpoint</text>
          <text x="295" y="28" fill="#f43f5e" font-size="12" font-weight="800">-6 pts</text>
        </g>
      </g>
    </g>

    <!-- Card 2: Today's Highest-Value Action -->
    <g transform="translate(398, 318)">
      <rect x="0" y="0" width="460" height="490" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      <rect x="20" y="20" width="28" height="28" rx="8" fill="#312e81"/>
      <text x="27" y="39" fill="#818cf8" font-size="14">⚡</text>

      <text x="56" y="32" fill="#ffffff" font-size="13" font-weight="800">TODAY'S HIGHEST-VALUE ACTION</text>
      <text x="56" y="46" fill="#64748b" font-size="10">AI Strategic Recommendation</text>

      <rect x="360" y="20" width="80" height="24" rx="12" fill="#064e3b"/>
      <text x="372" y="36" fill="#34d399" font-size="10" font-weight="900">92% MATCH</text>

      <!-- Opportunity Inner Box -->
      <g transform="translate(20, 60)">
        <rect x="0" y="0" width="420" height="390" rx="14" fill="#0a0e17" stroke="#334155" stroke-width="1"/>
        <text x="18" y="32" fill="#ffffff" font-size="18" font-weight="900">Digital Transformation Manager</text>
        <text x="18" y="52" fill="#94a3b8" font-size="11">🏢 McKinsey &amp; Company — Dubai, UAE</text>
        <rect x="320" y="20" width="82" height="20" rx="10" fill="#451a03"/>
        <text x="330" y="34" fill="#fbbf24" font-size="9" font-weight="800">Posted 1d ago</text>

        <text x="18" y="88" fill="#818cf8" font-size="11" font-weight="800">Why this action today:</text>

        <g transform="translate(18, 104)" font-size="11" fill="#cbd5e1">
          <text x="0" y="0">• <tspan fill="#ffffff" font-weight="700">Strong leadership &amp; enterprise transformation</tspan> experience alignment in master CV.</text>
          <text x="0" y="22">• High-priority target role in preferred location (<tspan fill="#34d399" font-weight="700">$180k - $220k band</tspan>).</text>
          <text x="0" y="44">• Early applicant window increases recruiter callback probability by <tspan fill="#38bdf8" font-weight="700">3.8x</tspan>.</text>
        </g>

        <!-- Action Box -->
        <g transform="translate(18, 180)">
          <rect x="0" y="0" width="384" height="120" rx="12" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="16" y="28" fill="#c084fc" font-size="12" font-weight="800">✨ AI Recommended Package Strategy</text>
          <text x="16" y="48" fill="#94a3b8" font-size="10">Auto-tailor master CV with emphasis on <tspan fill="#ffffff" font-weight="700">Cloud ERP rollouts</tspan> &amp; <tspan fill="#ffffff" font-weight="700">Vendor Stakeholder SLA management</tspan>.</text>
          
          <rect x="16" y="68" width="352" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
          <text x="100" y="90" fill="#ffffff" font-size="12" font-weight="800">⚡ Prepare Application Package</text>
        </g>

        <text x="190" y="340" fill="#64748b" font-size="10" font-weight="600" text-anchor="middle">View full job listing →</text>
      </g>
    </g>

    <!-- Card 3 &amp; 4 Right Area -->
    <g transform="translate(874, 318)">
      <!-- Morning Intelligence Brief -->
      <rect x="0" y="0" width="456" height="235" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="28" fill="#ffffff" font-size="13" font-weight="800">🌅 MORNING INTELLIGENCE BRIEF</text>
      <text x="330" y="28" fill="#64748b" font-size="9" font-weight="800">TODAY 08:30 AM</text>

      <g transform="translate(20, 48)" font-size="11">
        <rect x="0" y="0" width="416" height="38" rx="8" fill="#0a0e17"/>
        <circle cx="16" cy="19" r="4" fill="#34d399"/>
        <text x="28" y="23" fill="#f8fafc"><tspan font-weight="800" fill="#34d399">6 new executive roles</tspan> discovered matching your target criteria.</text>

        <rect x="0" y="44" width="416" height="38" rx="8" fill="#0a0e17"/>
        <circle cx="16" cy="19" r="4" fill="#38bdf8"/>
        <text x="28" y="23" fill="#f8fafc"><tspan font-weight="800" fill="#38bdf8">2 high matches identified</tspan> with alignment score &gt;90%.</text>

        <rect x="0" y="88" width="416" height="38" rx="8" fill="#0a0e17"/>
        <circle cx="16" cy="19" r="4" fill="#fbbf24"/>
        <text x="28" y="23" fill="#f8fafc"><tspan font-weight="800" fill="#fbbf24">3 follow-ups became due</tspan> for submitted applications.</text>

        <rect x="0" y="132" width="416" height="38" rx="8" fill="#0a0e17"/>
        <circle cx="16" cy="19" r="4" fill="#c084fc"/>
        <text x="28" y="23" fill="#f8fafc"><tspan font-weight="800" fill="#c084fc">1 target company</tspan> (Majid Al Futtaim) posted a new Director role.</text>
      </g>

      <!-- Opportunity Radar -->
      <g transform="translate(0, 250)">
        <rect x="0" y="0" width="456" height="240" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
        <text x="20" y="28" fill="#ffffff" font-size="13" font-weight="800">🎯 Opportunity Radar</text>
        <text x="340" y="28" fill="#64748b" font-size="9" font-weight="800">5 Radar Channels</text>

        <!-- Radar Filter Tabs -->
        <g transform="translate(20, 42)" font-size="9" font-weight="700">
          <rect x="0" y="0" width="72" height="22" rx="11" fill="url(#purpleBtnGrad)"/>
          <text x="10" y="15" fill="#ffffff">Best Match</text>

          <rect x="78" y="0" width="88" height="22" rx="11" fill="#1e293b"/>
          <text x="86" y="15" fill="#94a3b8">Emerging Target</text>

          <rect x="172" y="0" width="86" height="22" rx="11" fill="#1e293b"/>
          <text x="180" y="15" fill="#94a3b8">Target Company</text>

          <rect x="264" y="0" width="86" height="22" rx="11" fill="#1e293b"/>
          <text x="272" y="15" fill="#94a3b8">Network Pathway</text>
        </g>

        <!-- Featured Card -->
        <g transform="translate(20, 78)">
          <rect x="0" y="0" width="416" height="142" rx="12" fill="#0a0e17" stroke="#334155"/>
          <text x="14" y="22" fill="#64748b" font-size="8" font-weight="800">BEST OVERALL MATCH</text>
          
          <text x="14" y="42" fill="#ffffff" font-size="14" font-weight="900">Digital Transformation Director</text>
          <text x="14" y="58" fill="#94a3b8" font-size="10">McKinsey &amp; Company • Dubai / Riyadh (Hybrid)</text>

          <rect x="330" y="14" width="70" height="34" rx="8" fill="#022c22" stroke="#10b981"/>
          <text x="340" y="32" fill="#34d399" font-size="14" font-weight="900">95%</text>
          <text x="340" y="42" fill="#059669" font-size="7" font-weight="800">MATCH SCORE</text>

          <text x="14" y="82" fill="#cbd5e1" font-size="10">Matches 9/10 core leadership competencies in active CV profile. Direct recruiter referral pathway available.</text>

          <rect x="14" y="96" width="160" height="28" rx="8" fill="url(#purpleBtnGrad)"/>
          <text x="24" y="114" fill="#ffffff" font-size="10" font-weight="800">Prepare Application Package →</text>
          
          <text x="290" y="114" fill="#64748b" font-size="9" font-weight="600">View company profile</text>
        </g>
      </g>
    </g>

  </g>
</svg>`;
}

// -------------------------------------------------------------
// 2. CAREERCONNECT TAILOR SNAPSHOT
// -------------------------------------------------------------
function generateTailorSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${commonDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderSidebar('tailor')}
  ${renderTopHeader('AI CV Tailoring Engine')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Engine Header Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#312e81"/>
    <text x="27" y="40" fill="#818cf8" font-size="18">📌</text>

    <text x="64" y="34" fill="#ffffff" font-size="18" font-weight="900">AI CV Tailoring Engine</text>
    <text x="64" y="52" fill="#94a3b8" font-size="11">Tailor Master CV wording, keyword emphasis, and ATS structure grounded strictly in verified resume experience.</text>

    <rect x="1140" y="18" width="170" height="32" rx="16" fill="#022c22" stroke="#10b981"/>
    <text x="1156" y="39" fill="#34d399" font-size="11" font-weight="800">🛡 Factual Guardrails Active</text>

    <!-- Main 2-Column Split -->
    <!-- Left Column: Target Opportunity Details -->
    <g transform="translate(0, 84)">
      <rect x="0" y="0" width="420" height="720" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="32" fill="#ffffff" font-size="15" font-weight="800">Target Opportunity Details</text>

      <g transform="translate(20, 50)">
        <text x="0" y="14" fill="#94a3b8" font-size="11" font-weight="700">Target Job Title</text>
        <rect x="0" y="22" width="380" height="36" rx="8" fill="#0a0e17" stroke="#334155"/>
        <text x="12" y="45" fill="#ffffff" font-size="12" font-weight="700">Digital Transformation Lead</text>

        <text x="0" y="80" fill="#94a3b8" font-size="11" font-weight="700">Company Name</text>
        <rect x="0" y="88" width="380" height="36" rx="8" fill="#0a0e17" stroke="#334155"/>
        <text x="12" y="111" fill="#ffffff" font-size="12" font-weight="700">Enterprise Solutions Corp</text>

        <text x="0" y="146" fill="#94a3b8" font-size="11" font-weight="700">Job Description / Requirements *</text>
        <rect x="0" y="154" width="380" height="180" rx="8" fill="#0a0e17" stroke="#334155"/>
        <text x="12" y="176" fill="#cbd5e1" font-size="11" width="350">Looking for an experienced Digital Transformation Lead</text>
        <text x="12" y="194" fill="#cbd5e1" font-size="11">to drive enterprise cloud systems rollout, manage vendor</text>
        <text x="12" y="212" fill="#cbd5e1" font-size="11">stakeholders, optimize operational processes, and ensure</text>
        <text x="12" y="230" fill="#cbd5e1" font-size="11">Agile team execution in Dubai.</text>

        <rect x="0" y="360" width="380" height="42" rx="12" fill="url(#purpleBtnGrad)" filter="url(#shadow)"/>
        <text x="110" y="386" fill="#ffffff" font-size="13" font-weight="800">✨ Generate Tailored CV</text>
      </g>
    </g>

    <!-- Right Column: Tailored Output -->
    <g transform="translate(438, 84)">
      <rect x="0" y="0" width="892" height="720" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      
      <text x="24" y="32" fill="#ffffff" font-size="16" font-weight="900">Tailored CV Output</text>
      <text x="24" y="50" fill="#94a3b8" font-size="11">Optimized for Digital Transformation Lead at Enterprise Solutions Corp</text>

      <rect x="740" y="18" width="100" height="36" rx="10" fill="#022c22" stroke="#10b981"/>
      <text x="750" y="34" fill="#64748b" font-size="8" font-weight="800">ATS SCORE</text>
      <text x="750" y="48" fill="#34d399" font-size="16" font-weight="900">94%</text>

      <rect x="850" y="18" width="28" height="36" rx="8" fill="#1e293b"/>
      <text x="858" y="41" fill="#94a3b8" font-size="14">📋</text>

      <!-- Section 1: Professional Summary -->
      <g transform="translate(24, 70)">
        <text x="0" y="14" fill="#a78bfa" font-size="10" font-weight="900" letter-spacing="1">TAILORED PROFESSIONAL SUMMARY</text>
        <rect x="0" y="22" width="844" height="80" rx="10" fill="#0a0e17" stroke="#334155"/>
        <text x="16" y="46" fill="#f8fafc" font-size="12" font-weight="500">Manoj Rajan is a results-driven <tspan fill="#38bdf8" font-weight="700">Digital Transformation Lead</tspan> with over 20 years of experience directing enterprise</text>
        <text x="16" y="66" fill="#f8fafc" font-size="12" font-weight="500">system implementations and digital transformation initiatives across regional operations. Proven track record in</text>
        <text x="16" y="86" fill="#f8fafc" font-size="12" font-weight="500">Agile project delivery, cloud migration strategy, and senior stakeholder alignment.</text>
      </g>

      <!-- Section 2: Prioritized ATS Skills -->
      <g transform="translate(24, 192)">
        <text x="0" y="14" fill="#a78bfa" font-size="10" font-weight="900" letter-spacing="1">PRIORITIZED ATS SKILLS</text>
        <g transform="translate(0, 24)" font-size="11" font-weight="700">
          <rect x="0" y="0" width="200" height="28" rx="8" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="12" y="18" fill="#a78bfa">✓ Digital Transformation Management</text>

          <rect x="210" y="0" width="210" height="28" rx="8" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="222" y="18" fill="#a78bfa">✓ Enterprise System Implementation</text>

          <rect x="430" y="0" width="160" height="28" rx="8" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="442" y="18" fill="#a78bfa">✓ Agile Project Management</text>

          <rect x="600" y="0" width="150" height="28" rx="8" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="612" y="18" fill="#a78bfa">✓ Stakeholder Alignment</text>

          <rect x="0" y="36" width="190" height="28" rx="8" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="12" y="54" fill="#a78bfa">✓ Vendor &amp; Contract Operations</text>

          <rect x="200" y="36" width="180" height="28" rx="8" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="212" y="54" fill="#a78bfa">✓ Cloud Architecture Strategy</text>
        </g>
      </g>

      <!-- Section 3: Bullet Modifications -->
      <g transform="translate(24, 298)">
        <text x="0" y="14" fill="#a78bfa" font-size="10" font-weight="900" letter-spacing="1">ORIGINAL VS TAILORED BULLET MODIFICATIONS</text>
        
        <!-- Box 1 -->
        <g transform="translate(0, 24)">
          <rect x="0" y="0" width="844" height="130" rx="12" fill="#0a0e17" stroke="#334155"/>
          <text x="16" y="24" fill="#f43f5e" font-size="9" font-weight="800">ORIGINAL BULLET:</text>
          <text x="16" y="40" fill="#cbd5e1" font-size="11">Managed software systems and led team meetings for business operations.</text>

          <text x="16" y="66" fill="#34d399" font-size="9" font-weight="800">TAILORED ATS BULLET:</text>
          <text x="16" y="82" fill="#ffffff" font-size="12" font-weight="700">Directed cross-functional Agile teams delivering enterprise software platforms, improving operational delivery speed by 28%.</text>
          
          <text x="16" y="110" fill="#64748b" font-size="10">Reason: Rephrased existing achievement to highlight measurable leadership impact and ATS keywords without adding unverified facts.</text>
        </g>

        <!-- Box 2 -->
        <g transform="translate(0, 168)">
          <rect x="0" y="0" width="844" height="130" rx="12" fill="#0a0e17" stroke="#334155"/>
          <text x="16" y="24" fill="#f43f5e" font-size="9" font-weight="800">ORIGINAL BULLET:</text>
          <text x="16" y="40" fill="#cbd5e1" font-size="11">Handled vendor discussions and software upgrades.</text>

          <text x="16" y="66" fill="#34d399" font-size="9" font-weight="800">TAILORED ATS BULLET:</text>
          <text x="16" y="82" fill="#ffffff" font-size="12" font-weight="700">Managed end-to-end enterprise vendor SLA contracts and Cloud ERP upgrade rollouts across regional business units.</text>

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

// -------------------------------------------------------------
// 3. CAREERCONNECT DIGITAL TWIN SNAPSHOT
// -------------------------------------------------------------
function generateTwinSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${commonDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderSidebar('twin')}
  ${renderTopHeader('Career Digital Twin &amp; Market Simulator')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Career Twin Banner Card -->
    <rect x="0" y="0" width="1330" height="110" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
    <g transform="translate(24, 20)">
      <rect x="0" y="0" width="48" height="48" rx="12" fill="#312e81"/>
      <text x="12" y="32" fill="#818cf8" font-size="22">🧠</text>

      <rect x="64" y="0" width="110" height="20" rx="10" fill="#1e1b4b"/>
      <text x="72" y="14" fill="#a78bfa" font-size="9" font-weight="800">Verified Career Twin</text>
      <text x="180" y="14" fill="#64748b" font-size="9">Model Version 3.4</text>

      <text x="64" y="42" fill="#ffffff" font-size="22" font-weight="900">Senior Executive Candidate</text>
      <text x="64" y="60" fill="#94a3b8" font-size="11">Senior Technology Professional • Enterprise Technology</text>
    </g>

    <!-- Twin Scores Right -->
    <g transform="translate(1020, 24)">
      <rect x="0" y="0" width="130" height="60" rx="12" fill="#0a0e17" stroke="#334155"/>
      <text x="65" y="28" fill="#34d399" font-size="20" font-weight="900" text-anchor="middle">96.4%</text>
      <text x="65" y="44" fill="#64748b" font-size="8" font-weight="800" text-anchor="middle">Digital Twin Fidelity</text>

      <rect x="140" y="0" width="130" height="60" rx="12" fill="#0a0e17" stroke="#334155"/>
      <text x="205" y="28" fill="#38bdf8" font-size="20" font-weight="900" text-anchor="middle">8+ Yrs</text>
      <text x="205" y="44" fill="#64748b" font-size="8" font-weight="800" text-anchor="middle">Verified Exp</text>
    </g>

    <!-- 2 Column Split -->
    <!-- Left Column: Verified Profile DNA -->
    <g transform="translate(0, 126)">
      <rect x="0" y="0" width="460" height="670" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="32" fill="#ffffff" font-size="15" font-weight="800">🛡 Verified Profile DNA</text>

      <g transform="translate(20, 50)">
        <text x="0" y="14" fill="#a78bfa" font-size="10" font-weight="800">Primary Domain Expertise</text>
        <g transform="translate(0, 22)" font-size="10" font-weight="700">
          <rect x="0" y="0" width="120" height="24" rx="6" fill="#1e1b4b"/>
          <text x="10" y="16" fill="#a78bfa">Digital Transformation</text>

          <rect x="128" y="0" width="110" height="24" rx="6" fill="#1e1b4b"/>
          <text x="138" y="16" fill="#a78bfa">Enterprise Systems</text>

          <rect x="0" y="30" width="80" height="24" rx="6" fill="#1e1b4b"/>
          <text x="10" y="46" fill="#a78bfa">Agile Delivery</text>

          <rect x="88" y="30" width="110" height="24" rx="6" fill="#1e1b4b"/>
          <text x="98" y="46" fill="#a78bfa">Cloud Architecture</text>
        </g>

        <text x="0" y="120" fill="#a78bfa" font-size="10" font-weight="800">Quantified Impact &amp; Achievements</text>
        <g transform="translate(0, 132)" font-size="11">
          <rect x="0" y="0" width="420" height="42" rx="8" fill="#0a0e17"/>
          <circle cx="16" cy="21" r="6" fill="#064e3b"/>
          <text x="13" y="24" fill="#34d399" font-size="9">✓</text>
          <text x="28" y="25" fill="#cbd5e1">Reduced enterprise operational latency by <tspan fill="#34d399" font-weight="700">35%</tspan> through cloud migration</text>

          <rect x="0" y="48" width="420" height="42" rx="8" fill="#0a0e17"/>
          <circle cx="16" cy="21" r="6" fill="#064e3b"/>
          <text x="13" y="24" fill="#34d399" font-size="9">✓</text>
          <text x="28" y="25" fill="#cbd5e1">Managed <tspan fill="#ffffff" font-weight="700">$2.4M technology budget</tspan> delivering 18% under-budget savings</text>

          <rect x="0" y="96" width="420" height="42" rx="8" fill="#0a0e17"/>
          <circle cx="16" cy="21" r="6" fill="#064e3b"/>
          <text x="13" y="24" fill="#34d399" font-size="9">✓</text>
          <text x="28" y="25" fill="#cbd5e1">Spearheaded 12-person cross-functional engineering team across 2 regions</text>
        </g>

        <text x="0" y="310" fill="#a78bfa" font-size="10" font-weight="800">Seniority Reasoning</text>
        <rect x="0" y="322" width="420" height="70" rx="8" fill="#0a0e17" stroke="#334155"/>
        <text x="14" y="344" fill="#cbd5e1" font-size="11">Demonstrates strategic alignment with Senior Manager / Director level</text>
        <text x="14" y="362" fill="#cbd5e1" font-size="11">positions based on team leadership and cross-functional enterprise project delivery.</text>
      </g>
    </g>

    <!-- Right Column: Interactive Trajectory Simulator -->
    <g transform="translate(478, 126)">
      <rect x="0" y="0" width="852" height="670" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="32" fill="#ffffff" font-size="15" font-weight="800">🎯 Interactive Trajectory Simulator</text>
      <text x="20" y="48" fill="#94a3b8" font-size="11">Select a target career vector to simulate alignment &amp; readiness</text>

      <!-- Horizon Tabs -->
      <g transform="translate(20, 68)">
        <rect x="0" y="0" width="250" height="54" rx="10" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
        <text x="14" y="22" fill="#64748b" font-size="9">6–12 Months</text>
        <text x="180" y="22" fill="#38bdf8" font-size="10" font-weight="800">92% Match</text>
        <text x="14" y="40" fill="#ffffff" font-size="12" font-weight="800">Digital Transformation Lead</text>

        <rect x="262" y="0" width="260" height="54" rx="10" fill="#0a0e17" stroke="#334155"/>
        <text x="276" y="22" fill="#64748b" font-size="9">12–24 Months</text>
        <text x="440" y="22" fill="#38bdf8" font-size="10" font-weight="800">84% Match</text>
        <text x="276" y="40" fill="#ffffff" font-size="12" font-weight="800">Head of Business Systems &amp; IT</text>

        <rect x="534" y="0" width="270" height="54" rx="10" fill="#0a0e17" stroke="#334155"/>
        <text x="548" y="22" fill="#64748b" font-size="9">2–4 Years</text>
        <text x="710" y="22" fill="#38bdf8" font-size="10" font-weight="800">71% Match</text>
        <text x="548" y="40" fill="#ffffff" font-size="12" font-weight="800">Vice President of Digital...</text>
      </g>

      <!-- Selected Detail Box -->
      <g transform="translate(20, 142)">
        <rect x="0" y="0" width="812" height="490" rx="14" fill="#0a0e17" stroke="#334155"/>
        
        <text x="20" y="36" fill="#ffffff" font-size="20" font-weight="900">Digital Transformation Lead</text>
        <text x="20" y="56" fill="#94a3b8" font-size="11">Target Horizon: 6–12 Months • Compensation Band: <tspan fill="#34d399" font-weight="700">$140,000 – $185,000</tspan></text>

        <rect x="710" y="20" width="82" height="42" rx="10" fill="#1e1b4b" stroke="#6366f1"/>
        <text x="751" y="38" fill="#38bdf8" font-size="16" font-weight="900" text-anchor="middle">92%</text>
        <text x="751" y="50" fill="#a78bfa" font-size="7" font-weight="800" text-anchor="middle">READINESS</text>

        <!-- Simulated Execution Roadmap -->
        <g transform="translate(20, 80)">
          <text x="0" y="14" fill="#fbbf24" font-size="10" font-weight="900" letter-spacing="1">🎯 SIMULATED EXECUTION ROADMAP</text>

          <g transform="translate(0, 24)">
            <rect x="0" y="0" width="772" height="42" rx="8" fill="#111827" stroke="#1e293b"/>
            <rect x="10" y="8" width="120" height="26" rx="6" fill="#1e1b4b"/>
            <text x="20" y="25" fill="#a78bfa" font-size="10" font-weight="800">Phase 1 (Days 1–30)</text>
            <text x="145" y="25" fill="#cbd5e1" font-size="11">Audit existing architecture &amp; identify immediate high-impact quick wins</text>
          </g>

          <g transform="translate(0, 72)">
            <rect x="0" y="0" width="772" height="42" rx="8" fill="#111827" stroke="#1e293b"/>
            <rect x="10" y="8" width="120" height="26" rx="6" fill="#1e1b4b"/>
            <text x="20" y="25" fill="#a78bfa" font-size="10" font-weight="800">Phase 2 (Days 31–60)</text>
            <text x="145" y="25" fill="#cbd5e1" font-size="11">Implement cross-departmental Agile delivery workflows &amp; key automation</text>
          </g>

          <g transform="translate(0, 120)">
            <rect x="0" y="0" width="772" height="42" rx="8" fill="#111827" stroke="#1e293b"/>
            <rect x="10" y="8" width="120" height="26" rx="6" fill="#1e1b4b"/>
            <text x="20" y="25" fill="#a78bfa" font-size="10" font-weight="800">Phase 3 (Days 61–90)</text>
            <text x="145" y="25" fill="#cbd5e1" font-size="11">Scale enterprise cloud governance &amp; establish C-suite KPI reporting</text>
          </g>
        </g>

        <!-- Recommended Skill Bridge -->
        <g transform="translate(20, 280)">
          <rect x="0" y="0" width="772" height="70" rx="10" fill="#1e1b4b" stroke="#4c1d95"/>
          <text x="16" y="24" fill="#fbbf24" font-size="10" font-weight="900" letter-spacing="1">📖 RECOMMENDED SKILL BRIDGE</text>
          
          <g transform="translate(16, 36)" font-size="11" font-weight="700">
            <rect x="0" y="0" width="170" height="24" rx="6" fill="#451a03"/>
            <text x="10" y="16" fill="#fbbf24">• Cloud Security Governance</text>

            <rect x="180" y="0" width="190" height="24" rx="6" fill="#451a03"/>
            <text x="190" y="16" fill="#fbbf24">• TOGAF Enterprise Framework</text>
          </g>
        </g>

      </g>
    </g>

  </g>
</svg>`;
}

// -------------------------------------------------------------
// 4. CAREERCONNECT SKILLS SNAPSHOT
// -------------------------------------------------------------
function generateSkillsSVG() {
  const skillsList = [
    { cat: 'TECHNICAL', title: 'Enterprise Architecture', dem: 'Very High', demCol: '#38bdf8', imp: 92 },
    { cat: 'TECHNICAL', title: 'Cloud Logistics Systems', dem: 'Very High', demCol: '#38bdf8', imp: 92 },
    { cat: 'TECHNICAL', title: 'Data Analytics', dem: 'Very High', demCol: '#38bdf8', imp: 92 },
    { cat: 'TECHNICAL', title: 'SAP/Oracle ERP', dem: 'Very High', demCol: '#38bdf8', imp: 92 },
    { cat: 'BUSINESS', title: 'Strategic Planning', dem: 'High', demCol: '#818cf8', imp: 88 },
    { cat: 'BUSINESS', title: 'Stakeholder Management', dem: 'High', demCol: '#818cf8', imp: 88 },
    { cat: 'BUSINESS', title: 'Vendor Management', dem: 'High', demCol: '#818cf8', imp: 88 },
    { cat: 'BUSINESS', title: 'Budgeting', dem: 'High', demCol: '#818cf8', imp: 88 },
    { cat: 'TOOLS', title: 'Microsoft Azure', dem: 'High', demCol: '#818cf8', imp: 80 },
    { cat: 'TOOLS', title: 'Power BI', dem: 'High', demCol: '#818cf8', imp: 80 },
    { cat: 'TOOLS', title: 'Jira', dem: 'High', demCol: '#818cf8', imp: 80 },
    { cat: 'TOOLS', title: 'SQL', dem: 'High', demCol: '#818cf8', imp: 80 },
    { cat: 'TOOLS', title: 'Python', dem: 'High', demCol: '#818cf8', imp: 80 },
    { cat: 'CERTIFICATIONS', title: 'PMP - Project Management Professional', dem: 'Critical', demCol: '#f43f5e', imp: 95 },
    { cat: 'CERTIFICATIONS', title: 'ITIL v4', dem: 'Critical', demCol: '#f43f5e', imp: 95 },
    { cat: 'CERTIFICATIONS', title: 'AWS Certified Solutions Architect', dem: 'Critical', demCol: '#f43f5e', imp: 95 }
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${commonDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderSidebar('skills')}
  ${renderTopHeader('Skills Intelligence &amp; Gap Analysis')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Header Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#312e81"/>
    <text x="27" y="40" fill="#818cf8" font-size="18">💡</text>

    <text x="64" y="34" fill="#ffffff" font-size="18" font-weight="900">Skills Intelligence &amp; Market Alignment</text>
    <text x="64" y="52" fill="#94a3b8" font-size="11">Automated skill taxonomy verified against candidate master CV experience and job market demand.</text>

    <rect x="1160" y="16" width="150" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
    <text x="1175" y="38" fill="#ffffff" font-size="11" font-weight="800">🗺 Map to Target Roles</text>

    <!-- 4 Summary Metric Cards -->
    <g transform="translate(0, 80)">
      <rect x="0" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#1e293b"/>
      <text x="16" y="22" fill="#64748b" font-size="8" font-weight="800">TOTAL VERIFIED SKILLS</text>
      <text x="16" y="52" fill="#ffffff" font-size="24" font-weight="900">16</text>
      <rect x="230" y="24" width="70" height="22" rx="11" fill="#064e3b"/>
      <text x="240" y="39" fill="#34d399" font-size="9" font-weight="800">✓ Verified</text>

      <rect x="338" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#1e293b"/>
      <text x="354" y="22" fill="#64748b" font-size="8" font-weight="800">HIGH MARKET DEMAND</text>
      <text x="354" y="52" fill="#38bdf8" font-size="24" font-weight="900">7</text>
      <text x="550" y="39" fill="#0284c7" font-size="9" font-weight="800">Top 10% Market</text>

      <rect x="676" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#1e293b"/>
      <text x="692" y="22" fill="#64748b" font-size="8" font-weight="800">EMERGING SKILL FOCUS</text>
      <text x="692" y="52" fill="#a78bfa" font-size="24" font-weight="900">4</text>
      <text x="890" y="39" fill="#7c3aed" font-size="9" font-weight="800">High Growth</text>

      <rect x="1015" y="0" width="315" height="70" rx="12" fill="url(#cardGrad)" stroke="#1e293b"/>
      <text x="1031" y="22" fill="#64748b" font-size="8" font-weight="800">MISSING HIGH-DEMAND SKILLS</text>
      <text x="1031" y="52" fill="#fbbf24" font-size="24" font-weight="900">2</text>
      <text x="1220" y="39" fill="#b45309" font-size="9" font-weight="800">Recommended</text>
    </g>

    <!-- Filter Bar -->
    <g transform="translate(0, 162)">
      <rect x="0" y="0" width="600" height="34" rx="8" fill="#0a0e17" stroke="#334155"/>
      <text x="14" y="21" fill="#64748b" font-size="11">🔍 Search verified skills...</text>

      <g transform="translate(680, 0)" font-size="10" font-weight="700">
        <rect x="0" y="0" width="40" height="34" rx="8" fill="url(#purpleBtnGrad)"/>
        <text x="12" y="21" fill="#ffffff">All</text>

        <rect x="48" y="0" width="70" height="34" rx="8" fill="#111827" stroke="#334155"/>
        <text x="58" y="21" fill="#cbd5e1">Technical</text>

        <rect x="126" y="0" width="70" height="34" rx="8" fill="#111827" stroke="#334155"/>
        <text x="136" y="21" fill="#cbd5e1">Business</text>

        <rect x="204" y="0" width="56" height="34" rx="8" fill="#111827" stroke="#334155"/>
        <text x="214" y="21" fill="#cbd5e1">Tools</text>

        <rect x="268" y="0" width="90" height="34" rx="8" fill="#111827" stroke="#334155"/>
        <text x="278" y="21" fill="#cbd5e1">Certifications</text>
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
            <rect x="0" y="0" width="430" height="112" rx="14" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1"/>
            
            <rect x="14" y="12" width="76" height="18" rx="4" fill="#1e1b4b"/>
            <text x="20" y="24" fill="#a78bfa" font-size="8" font-weight="800">${s.cat}</text>

            <rect x="310" y="12" width="105" height="18" rx="9" fill="#0f172a" stroke="#334155"/>
            <text x="320" y="24" fill="${s.demCol}" font-size="8" font-weight="800">Demand: ${s.dem}</text>

            <text x="14" y="52" fill="#ffffff" font-size="14" font-weight="800">${s.title}</text>
            
            <!-- Impact Bar -->
            <rect x="14" y="68" width="402" height="6" rx="3" fill="#1e293b"/>
            <rect x="14" y="68" width="${402 * (s.imp / 100)}" height="6" rx="3" fill="url(#purpleBtnGrad)"/>

            <text x="14" y="96" fill="#34d399" font-size="9" font-weight="700">✓ Verified in Master CV</text>
            <text x="340" y="96" fill="#818cf8" font-size="9" font-weight="700">Emphasize on CV →</text>
          </g>
        `;
      }).join('')}
    </g>

  </g>
</svg>`;
}

// -------------------------------------------------------------
// 5. CAREERCONNECT RECRUITERS SNAPSHOT
// -------------------------------------------------------------
function generateRecruitersSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${commonDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderSidebar('recruiters')}
  ${renderTopHeader('Recruiters &amp; Executive Search Database')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#312e81"/>
    <text x="27" y="40" fill="#818cf8" font-size="18">👤</text>

    <text x="64" y="34" fill="#ffffff" font-size="18" font-weight="900">Recruiters &amp; Executive Search Database</text>
    <text x="64" y="52" fill="#94a3b8" font-size="11">Store and categorize executive headhunters, regional recruiters, and agency partners.</text>

    <rect x="1180" y="16" width="130" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
    <text x="1195" y="38" fill="#ffffff" font-size="11" font-weight="800">+ Add Recruiter</text>

    <!-- Cards Grid -->
    <g transform="translate(0, 90)">
      
      <!-- Card 1: Sarah Jenkins -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="640" height="240" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
        
        <text x="24" y="38" fill="#ffffff" font-size="20" font-weight="900">Sarah Jenkins</text>
        <text x="24" y="58" fill="#38bdf8" font-size="12" font-weight="700">Michael Page Executive</text>
        <text x="24" y="78" fill="#94a3b8" font-size="11">Technology &amp; Digital Transformation • 📍 Dubai, UAE</text>

        <rect x="490" y="24" width="124" height="34" rx="8" fill="url(#purpleBtnGrad)"/>
        <text x="506" y="45" fill="#ffffff" font-size="11" font-weight="800">💬 Draft Message</text>

        <g transform="translate(24, 100)">
          <rect x="0" y="0" width="590" height="60" rx="10" fill="#0a0e17" stroke="#334155"/>
          <text x="16" y="35" fill="#cbd5e1" font-size="11">Specializes in senior GCC enterprise technology placements. Very responsive.</text>
        </g>

        <text x="24" y="200" fill="#64748b" font-size="10">Contacted: 2026-08-02</text>
        <text x="470" y="200" fill="#fbbf24" font-size="10" font-weight="800">Follow-Up: 2026-08-09</text>
      </g>

      <!-- Card 2: Marcus Vance -->
      <g transform="translate(670, 0)">
        <rect x="0" y="0" width="640" height="240" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
        
        <text x="24" y="38" fill="#ffffff" font-size="20" font-weight="900">Marcus Vance</text>
        <text x="24" y="58" fill="#38bdf8" font-size="12" font-weight="700">Korn Ferry Executive Search</text>
        <text x="24" y="78" fill="#94a3b8" font-size="11">Financial Services &amp; Enterprise IT • 📍 Abu Dhabi, UAE</text>

        <rect x="490" y="24" width="124" height="34" rx="8" fill="url(#purpleBtnGrad)"/>
        <text x="506" y="45" fill="#ffffff" font-size="11" font-weight="800">💬 Draft Message</text>

        <g transform="translate(24, 100)">
          <rect x="0" y="0" width="590" height="60" rx="10" fill="#0a0e17" stroke="#334155"/>
          <text x="16" y="35" fill="#cbd5e1" font-size="11">Discussed upcoming regional Digital Transformation Lead roles.</text>
        </g>

        <text x="24" y="200" fill="#64748b" font-size="10">Contacted: 2026-07-28</text>
        <text x="470" y="200" fill="#fbbf24" font-size="10" font-weight="800">Follow-Up: 2026-08-08</text>
      </g>

    </g>

  </g>
</svg>`;
}

// -------------------------------------------------------------
// 6. CAREERCONNECT TARGET COMPANIES SNAPSHOT
// -------------------------------------------------------------
function generateCompaniesSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  ${commonDefs}
  <rect width="1600" height="900" fill="url(#bgGrad)" />
  ${renderSidebar('companies')}
  ${renderTopHeader('Target Companies &amp; Speculative Pipeline')}

  <g transform="translate(240, 70)" class="font-sans">
    
    <!-- Top Banner -->
    <rect x="0" y="0" width="1330" height="68" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="18" y="16" width="36" height="36" rx="10" fill="#312e81"/>
    <text x="27" y="40" fill="#818cf8" font-size="18">🏢</text>

    <text x="64" y="34" fill="#ffffff" font-size="18" font-weight="900">Target Companies &amp; Speculative Pipeline</text>
    <text x="64" y="52" fill="#94a3b8" font-size="11">Proactively track target employers and explore AI-generated speculative role opportunities before jobs are posted.</text>

    <rect x="1150" y="16" width="160" height="36" rx="10" fill="url(#purpleBtnGrad)"/>
    <text x="1165" y="38" fill="#ffffff" font-size="11" font-weight="800">+ Add Target Company</text>

    <!-- Cards Grid -->
    <g transform="translate(0, 90)">
      
      <!-- Card 1: Emirates NBD Tech -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="640" height="420" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
        
        <rect x="24" y="24" width="115" height="22" rx="11" fill="#1e1b4b"/>
        <text x="34" y="39" fill="#a78bfa" font-size="9" font-weight="800">ACTIVE PIPELINE</text>

        <rect x="520" y="24" width="95" height="22" rx="11" fill="#451a03"/>
        <text x="530" y="39" fill="#fbbf24" font-size="9" font-weight="800">High Priority</text>

        <text x="24" y="74" fill="#ffffff" font-size="22" font-weight="900">Emirates NBD Tech</text>
        <text x="24" y="94" fill="#94a3b8" font-size="11">Banking &amp; Financial Technology • 📍 Dubai, UAE</text>

        <!-- Rationale Box -->
        <g transform="translate(24, 110)">
          <rect x="0" y="0" width="590" height="54" rx="10" fill="#0a0e17" stroke="#334155"/>
          <text x="14" y="20" fill="#64748b" font-size="8" font-weight="800">TARGET RATIONALE:</text>
          <text x="14" y="38" fill="#cbd5e1" font-size="11">Expanding digital banking operations and core transformation team in GCC region.</text>
        </g>

        <!-- Speculative Role Box -->
        <g transform="translate(24, 180)">
          <rect x="0" y="0" width="590" height="160" rx="12" fill="#0a0e17" stroke="#4c1d95"/>
          <text x="14" y="24" fill="#818cf8" font-size="9" font-weight="800">✨ SPECULATIVE ROLE OPPORTUNITY</text>
          <rect x="490" y="12" width="85" height="20" rx="10" fill="#1e293b"/>
          <text x="500" y="26" fill="#94a3b8" font-size="8" font-weight="800">Unadvertised</text>

          <text x="14" y="52" fill="#ffffff" font-size="15" font-weight="900">Lead Business Systems Integrator</text>
          <text x="14" y="74" fill="#cbd5e1" font-size="10">Recent cloud banking migration demands cross-platform integration leads.</text>

          <line x1="14" y1="90" x2="576" y2="90" stroke="#1e293b"/>

          <text x="14" y="112" fill="#94a3b8" font-size="10">Strategy: Reach out to Head of Enterprise Architecture with a concise value proposition on cloud migration experience.</text>
        </g>

        <text x="24" y="380" fill="#94a3b8" font-size="11">👥 3 CRM Contacts</text>
        <text x="490" y="380" fill="#818cf8" font-size="11" font-weight="800">Find Decision Makers →</text>
      </g>

      <!-- Card 2: G42 AI Holdings -->
      <g transform="translate(670, 0)">
        <rect x="0" y="0" width="640" height="420" rx="18" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
        
        <rect x="24" y="24" width="100" height="22" rx="11" fill="#0284c7"/>
        <text x="34" y="39" fill="#ffffff" font-size="9" font-weight="800">RESEARCHING</text>

        <rect x="520" y="24" width="95" height="22" rx="11" fill="#451a03"/>
        <text x="530" y="39" fill="#fbbf24" font-size="9" font-weight="800">High Priority</text>

        <text x="24" y="74" fill="#ffffff" font-size="22" font-weight="900">G42 AI Holdings</text>
        <text x="24" y="94" fill="#94a3b8" font-size="11">Artificial Intelligence &amp; Enterprise Cloud • 📍 Abu Dhabi, UAE</text>

        <!-- Rationale Box -->
        <g transform="translate(24, 110)">
          <rect x="0" y="0" width="590" height="54" rx="10" fill="#0a0e17" stroke="#334155"/>
          <text x="14" y="20" fill="#64748b" font-size="8" font-weight="800">TARGET RATIONALE:</text>
          <text x="14" y="38" fill="#cbd5e1" font-size="11">Massive enterprise cloud expansion and government digital modernization contracts.</text>
        </g>

        <!-- Speculative Role Box -->
        <g transform="translate(24, 180)">
          <rect x="0" y="0" width="590" height="160" rx="12" fill="#0a0e17" stroke="#4c1d95"/>
          <text x="14" y="24" fill="#818cf8" font-size="9" font-weight="800">✨ SPECULATIVE ROLE OPPORTUNITY</text>
          <rect x="490" y="12" width="85" height="20" rx="10" fill="#1e293b"/>
          <text x="500" y="26" fill="#94a3b8" font-size="8" font-weight="800">Unadvertised</text>

          <text x="14" y="52" fill="#ffffff" font-size="15" font-weight="900">Senior Program Lead - AI Platform Modernization</text>
          <text x="14" y="74" fill="#cbd5e1" font-size="10">Scaling AI infrastructure requires experienced program managers with enterprise governance credentials.</text>

          <line x1="14" y1="90" x2="576" y2="90" stroke="#1e293b"/>

          <text x="14" y="112" fill="#94a3b8" font-size="10">Strategy: Connect with Talent Acquisition Directors specializing in AI Operations.</text>
        </g>

        <text x="24" y="380" fill="#94a3b8" font-size="11">👥 2 CRM Contacts</text>
        <text x="490" y="380" fill="#818cf8" font-size="11" font-weight="800">Find Decision Makers →</text>
      </g>

    </g>

  </g>
</svg>`;
}

// Generate files
const files = [
  { name: 'careerconnect-home', svg: generateHomeSVG() },
  { name: 'careerconnect-tailor', svg: generateTailorSVG() },
  { name: 'careerconnect-twin', svg: generateTwinSVG() },
  { name: 'careerconnect-skills', svg: generateSkillsSVG() },
  { name: 'careerconnect-recruiters', svg: generateRecruitersSVG() },
  { name: 'careerconnect-companies', svg: generateCompaniesSVG() }
];

files.forEach(f => {
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

console.log('All CareerConnectAI SVG &amp; PNG snapshots generated successfully!');
