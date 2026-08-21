/**
 * The Doom minifigure, hand-drawn as flat SVG rather than a render.
 * Vector keeps it crisp at any size and costs ~2KB against a WebP export.
 */
export function DoomFigure() {
  return (
    <svg
      className="fig fig--doom"
      viewBox="0 0 240 380"
      role="img"
      aria-label="Armoured monarch minifigure"
    >
      <defs>
        <linearGradient id="dmCloak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5CB85A" />
          <stop offset="1" stopColor="#2A5F29" />
        </linearGradient>
        <linearGradient id="dmGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7DC6B" />
          <stop offset="1" stopColor="#B8891F" />
        </linearGradient>
        <linearGradient id="dmTunic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4B9F4A" />
          <stop offset="1" stopColor="#2C6B2C" />
        </linearGradient>
      </defs>
      <path
        d="M58 352 Q46 236 92 192 L148 192 Q194 236 182 352 Q120 340 58 352 Z"
        fill="url(#dmCloak)"
      />
      <path d="M58 352 Q46 236 92 192 L114 192 Q84 250 88 348 Z" fill="#215021" opacity=".45" />
      <rect x="80" y="292" width="80" height="20" rx="3" fill="#0A3463" />
      <rect x="82" y="312" width="36" height="56" rx="3" fill="#0E4179" />
      <rect x="122" y="312" width="36" height="56" rx="3" fill="#0A3463" />
      <rect x="82" y="356" width="36" height="12" rx="2" fill="#072949" />
      <rect x="122" y="356" width="36" height="12" rx="2" fill="#061F3A" />
      <path d="M88 180 L152 180 L164 292 L76 292 Z" fill="url(#dmTunic)" />
      <path d="M120 180 L152 180 L164 292 L120 292 Z" fill="#2C6B2C" opacity=".4" />
      <path d="M98 194 L142 194 L150 250 L90 250 Z" fill="url(#dmGold)" />
      <path d="M120 194 L142 194 L150 250 L120 250 Z" fill="#B8891F" opacity=".35" />
      <path d="M108 206 L132 206 L128 236 L112 236 Z" fill="#2F6B2E" />
      <rect x="80" y="266" width="80" height="16" rx="2" fill="#B8891F" />
      <rect x="110" y="268" width="20" height="12" rx="2" fill="#F7DC6B" />
      <path d="M88 186 L64 196 L54 254 L78 260 Z" fill="#4B9F4A" />
      <path d="M152 186 L176 196 L186 254 L162 260 Z" fill="#3C8A3B" />
      <circle
        cx="64"
        cy="272"
        r="13"
        fill="none"
        stroke="#DBAC34"
        strokeWidth="11"
        strokeDasharray="58 24"
        transform="rotate(150 64 272)"
      />
      <circle
        cx="176"
        cy="272"
        r="13"
        fill="none"
        stroke="#B8891F"
        strokeWidth="11"
        strokeDasharray="58 24"
        transform="rotate(30 176 272)"
      />
      <rect x="106" y="168" width="28" height="14" fill="#2F6B2E" />
      <rect x="76" y="84" width="88" height="84" rx="13" fill="url(#dmGold)" />
      <path
        d="M120 84 L151 84 A13 13 0 0 1 164 97 L164 155 A13 13 0 0 1 151 168 L120 168 Z"
        fill="#B8891F"
        opacity=".28"
      />
      <path d="M78 116 H162" stroke="#8F6A16" strokeWidth="2.5" />
      <circle cx="88" cy="106" r="2.6" fill="#8F6A16" />
      <circle cx="152" cy="106" r="2.6" fill="#8F6A16" />
      <rect x="90" y="126" width="24" height="11" rx="3" fill="#0A0A0F" />
      <rect x="126" y="126" width="24" height="11" rx="3" fill="#0A0A0F" />
      <rect x="100" y="150" width="40" height="7" rx="2" fill="#8F6A16" />
      <path d="M108 150 V157 M120 150 V157 M132 150 V157" stroke="#0A0A0F" strokeWidth="2" />
      <path
        d="M66 176 Q60 84 120 84 Q180 84 174 176 L156 176 Q160 104 120 104 Q80 104 84 176 Z"
        fill="url(#dmCloak)"
      />
      <path d="M84 104 Q120 96 156 104 L156 114 Q120 106 84 114 Z" fill="#215021" opacity=".5" />
      <ellipse cx="120" cy="84" rx="17" ry="7" fill="#2A5F29" />
      <rect x="103" y="74" width="34" height="11" fill="#2A5F29" />
      <ellipse cx="120" cy="74" rx="17" ry="7" fill="#4B9F4A" />
    </svg>
  );
}
