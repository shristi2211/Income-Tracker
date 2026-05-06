import React from 'react';

export default function IsometricHeroGraphic() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center transform lg:scale-110 xl:scale-125 z-10 pointer-events-none relative transition-transform duration-500 ease-in-out">
       <svg viewBox="0 0 1000 700" className="w-[800px] h-[560px] max-w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)] overflow-visible">
          <defs>
             {/* Gradients */}
             <linearGradient id="phoneScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#15803D" />
             </linearGradient>
             <linearGradient id="blob" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#15803D" stopOpacity="0.05" />
             </linearGradient>
             <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEA70" />
                <stop offset="100%" stopColor="#F59E0B" />
             </linearGradient>

             {/* Filters */}
             <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="-10" dy="30" stdDeviation="20" floodOpacity="0.25" />
             </filter>
             <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="-5" dy="20" stdDeviation="15" floodOpacity="0.15" />
             </filter>
             <filter id="coinShadow" x="-50%" y="-40%" width="200%" height="200%">
                <feDropShadow dx="0" dy="15" stdDeviation="10" floodOpacity="0.3" floodColor="#D97706" />
             </filter>
          </defs>

          {/* BACKGROUND GLOW */}
          {/* Angled ellipse to mimic the soft green light in the image */}
          <ellipse cx="500" cy="350" rx="350" ry="800" fill="url(#blob)" transform="rotate(45 500 350)" style={{ mixBlendMode: 'multiply' }} />

          {/* ================= STATIC MOUNTAIN COINS (Back layer) ================= */}
          {/* Left stack of coins near wallet */}
          <g transform="translate(180, 520)" filter="url(#softShadow)">
             <g transform="translate(0, 0)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
             <g transform="translate(0, -12)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
             <g transform="translate(0, -24)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
          </g>

          {/* ================= PHONE (Right Side, Facing Left) ================= */}
          {/* Phone coordinates calculated using matrix(-0.866, -0.5, 0, 1, Tx, Ty) */}
          <g filter="url(#shadow)">
             {/* Phone Shadow / Base Extrusion (Thickness) */}
             <g transform="matrix(-0.866, -0.5, 0, 1, 740, 540)">
                <rect x="-10" y="-340" width="160" height="340" rx="24" fill="#0F172A" />
             </g>
             <g transform="matrix(-0.866, -0.5, 0, 1, 720, 530)">
                {/* Phone Back Shell */}
                <rect x="0" y="-340" width="160" height="340" rx="24" fill="#1E293B" />
             </g>
             <g transform="matrix(-0.866, -0.5, 0, 1, 700, 520)">
                {/* Phone Front Face (Black bezel) */}
                <rect x="0" y="-340" width="160" height="340" rx="24" fill="#111827" />
             </g>
             <g transform="matrix(-0.866, -0.5, 0, 1, 688, 514)">
                {/* Phone Glowing Screen */}
                <rect x="0" y="-328" width="136" height="316" rx="16" fill="url(#phoneScreen)" />
                {/* Screen Highlight */}
                <rect x="0" y="-328" width="136" height="316" rx="16" fill="url(#phoneScreen)" opacity="0.6" style={{mixBlendMode: 'screen'}} />
                
                {/* Coin Slot (Deep slit) */}
                <rect x="64" y="-230" width="8" height="140" rx="4" fill="#020617" />
                <rect x="63" y="-230" width="2" height="140" rx="1" fill="#FFFFFF" opacity="0.15" />
             </g>
          </g>

          {/* ================= STATIC COINS (Middle layer near phone) ================= */}
          <g transform="translate(760, 480)" filter="url(#softShadow)">
             <g transform="translate(0, 0)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
             <g transform="translate(0, -12)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
             <g transform="translate(0, -24)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
             <g transform="translate(0, -36)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
          </g>


          {/* ================= WALLET (Left Side, Flap facing Right) ================= */}
          <g filter="url(#shadow)">
             {/* Wallet Back panel & Thickness */}
             <g transform="matrix(0.866, -0.5, 0, 1, 220, 540)">
                <rect x="0" y="-160" width="240" height="160" rx="16" fill="#78350F" />
             </g>
             <g transform="matrix(0.866, -0.5, 0, 1, 220, 530)">
                {/* Back Face Leather */}
                <rect x="0" y="-160" width="240" height="160" rx="16" fill="#92400E" />
             </g>
             
             {/* Dollar Bill Inside Sticking Out */}
             <g transform="matrix(0.866, -0.5, 0, 1, 220, 530)">
                {/* Tilted bill slightly rotated inside the pocket */}
                <g transform="translate(40, -180) rotate(12)">
                   {/* Shadow/Thickness of bill */}
                   <rect x="2" y="-10" width="112" height="160" rx="8" fill="#166534" />
                   
                   <rect x="0" y="-10" width="112" height="160" rx="8" fill="#4ADE80" />
                   <rect x="6" y="-4" width="100" height="148" rx="4" fill="none" stroke="#22C55E" strokeWidth="4" />
                   <circle cx="56" cy="70" r="28" fill="none" stroke="#22C55E" strokeWidth="6" />
                   <circle cx="56" cy="70" r="14" fill="#22C55E" opacity="0.6" />
                </g>
                <g transform="translate(10, -150) rotate(-6)">
                   <rect x="2" y="-10" width="112" height="160" rx="8" fill="#166534" />
                   <rect x="0" y="-10" width="112" height="160" rx="8" fill="#22C55E" />
                   <rect x="6" y="-4" width="100" height="148" rx="4" fill="none" stroke="#16A34A" strokeWidth="4" />
                   <circle cx="56" cy="70" r="28" fill="none" stroke="#16A34A" strokeWidth="6" />
                </g>
             </g>
             
             {/* Wallet Front Flap (Folded Forward) */}
             <g transform="matrix(0.866, -0.5, 0, 1, 220, 530)">
                {/* The front flap slightly translates to show opening depth */}
                <g transform="translate(30, 20)">
                   <rect x="-30" y="-140" width="240" height="140" rx="16" fill="#B45309" />
                   <rect x="-30" y="-140" width="240" height="140" rx="16" fill="white" opacity="0.05" />
                   {/* Stitching lines (Dashed) */}
                   <rect x="-24" y="-134" width="228" height="128" rx="12" fill="none" stroke="#FDE68A" strokeWidth="2" strokeDasharray="8,6" opacity="0.75" />
                </g>
             </g>
          </g>


          {/* ================= STATIC COINS (Front layer) ================= */}
          <g transform="translate(360, 640)" filter="url(#softShadow)">
             <g transform="translate(0, 0)">
                <path d="M-40,0 L-40,8 A40,20 0 0,0 40,8 L40,0 A40,20 0 0,1 -40,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="40" ry="20" fill="url(#coinGrad)" />
             </g>
          </g>


          {/* ================= ANIMATED FLYING COINS ================= */}
          {/* UPWARDS COIN: From Wallet to Phone */}
          {/* Start: ~ (320, 480) | Arc High: (460, 0) | End: (630, 280) */}
          <g filter="url(#coinShadow)">
             {/* Opacity fade to look like it drops inside the pocket/slot */}
             <animate attributeName="opacity" values="0; 1; 1; 1; 0" keyTimes="0; 0.15; 0.5; 0.85; 1" dur="2s" repeatCount="indefinite" />
             <animateMotion dur="2s" repeatCount="indefinite" path="M 320,480 Q 460,0 630,280" />
             {/* Standing 3D Coin Shape */}
             <g transform="scale(0.8) translate(0, -35)">
                {/* Cylinder side (height) */}
                <path d="M-30,0 L-30,12 A30,42 0 0,0 30,12 L30,0 A30,42 0 0,1 -30,0 Z" fill="#D4AF37"/>
                {/* Flat face */}
                <ellipse cx="0" cy="0" rx="30" ry="42" fill="url(#coinGrad)" />
                <ellipse cx="0" cy="0" rx="22" ry="32" fill="none" stroke="#D4AF37" strokeWidth="2" />
                <text x="-9" y="8" fontSize="28" fontWeight="900" fontFamily="sans-serif" fill="#B45309">₹</text>
             </g>
             {/* Slight wobble / rotate effect for the flying coin */}
             <animateTransform attributeName="transform" type="rotate" values="-10; 10; -10" dur="2s" repeatCount="indefinite" additive="sum" />
          </g>

          {/* DOWNWARDS COIN: From Phone to Wallet */}
          {/* Start: ~ (630, 280) | Arc Low: (460, 600) | End: (320, 480) */}
          <g filter="url(#coinShadow)">
             <animate attributeName="opacity" values="0; 1; 1; 1; 0" keyTimes="0; 0.15; 0.5; 0.85; 1" dur="2s" begin="1s" repeatCount="indefinite" />
             <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 630,280 Q 560,700 320,480" />
             {/* Standing 3D Coin Shape */}
             <g transform="scale(0.8) translate(0, -35)">
                <path d="M-30,0 L-30,12 A30,42 0 0,0 30,12 L30,0 A30,42 0 0,1 -30,0 Z" fill="#D4AF37"/>
                <ellipse cx="0" cy="0" rx="30" ry="42" fill="url(#phoneScreen)" />
                <ellipse cx="0" cy="0" rx="22" ry="32" fill="none" stroke="#15803D" strokeWidth="2" />
                <text x="-9" y="8" fontSize="28" fontWeight="900" fontFamily="sans-serif" fill="#14532D">₹</text>
             </g>
             <animateTransform attributeName="transform" type="rotate" values="10; -10; 10" dur="2s" repeatCount="indefinite" additive="sum" />
          </g>

       </svg>
    </div>
  );
}
