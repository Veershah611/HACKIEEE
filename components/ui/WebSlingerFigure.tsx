/** The web-slinging mentor minifigure. Flat SVG, same reasoning as DoomFigure. */
export function WebSlingerFigure() {
  return (
    <svg
      className="fig fig--web"
      viewBox="0 0 240 380"
      role="img"
      aria-label="Web-slinging builder minifigure"
    >
      <defs>
        <linearGradient id="wbRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E5341F" />
          <stop offset="1" stopColor="#A31408" />
        </linearGradient>
        <linearGradient id="wbBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0A68D8" />
          <stop offset="1" stopColor="#00408F" />
        </linearGradient>
        <pattern id="wbWeb" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M8 0 V16 M0 8 H16 M0 0 L16 16 M16 0 L0 16"
            stroke="#3A0703"
            strokeWidth=".9"
            fill="none"
            opacity=".45"
          />
        </pattern>
      </defs>
      <path d="M120 0 V52" stroke="#F0EDE8" strokeWidth="2.5" opacity=".45" />
      <rect x="80" y="292" width="80" height="20" rx="3" fill="#00408F" />
      <rect x="82" y="312" width="36" height="56" rx="3" fill="url(#wbBlue)" />
      <rect x="122" y="312" width="36" height="56" rx="3" fill="#00408F" />
      <rect x="82" y="356" width="36" height="12" rx="2" fill="#00305F" />
      <rect x="122" y="356" width="36" height="12" rx="2" fill="#00274D" />
      <path d="M88 180 L152 180 L164 292 L76 292 Z" fill="url(#wbRed)" />
      <path d="M88 180 L152 180 L164 292 L76 292 Z" fill="url(#wbWeb)" />
      <path d="M88 180 L110 180 L102 292 L76 292 Z" fill="url(#wbBlue)" />
      <path d="M152 180 L130 180 L138 292 L164 292 Z" fill="#00408F" />
      <g stroke="#3A0703" strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M114 212 Q104 204 100 194 M126 212 Q136 204 140 194" />
        <path d="M113 220 Q101 218 96 211 M127 220 Q139 218 144 211" />
        <path d="M114 228 Q105 236 102 244 M126 228 Q135 236 138 244" />
      </g>
      <ellipse cx="120" cy="222" rx="6" ry="9" fill="#3A0703" />
      <ellipse cx="120" cy="209" rx="4" ry="3.5" fill="#3A0703" />
      <path d="M152 186 L182 154 L202 172 L172 204 Z" fill="url(#wbBlue)" />
      <path d="M88 186 L64 196 L54 254 L78 260 Z" fill="url(#wbBlue)" />
      <circle
        cx="199"
        cy="167"
        r="13"
        fill="none"
        stroke="#C91A09"
        strokeWidth="11"
        strokeDasharray="58 24"
        transform="rotate(-40 199 167)"
      />
      <circle
        cx="64"
        cy="272"
        r="13"
        fill="none"
        stroke="#C91A09"
        strokeWidth="11"
        strokeDasharray="58 24"
        transform="rotate(150 64 272)"
      />
      <g stroke="#F0EDE8" fill="none" strokeLinecap="round" opacity=".55">
        <path d="M208 158 L238 128" strokeWidth="2.4" />
        <path d="M212 164 L236 152" strokeWidth="1.5" opacity=".7" />
      </g>
      <rect x="106" y="168" width="28" height="14" fill="#A31408" />
      <rect x="76" y="84" width="88" height="84" rx="15" fill="url(#wbRed)" />
      <rect x="76" y="84" width="88" height="84" rx="15" fill="url(#wbWeb)" />
      <path
        d="M88 130 Q86 106 108 104 Q120 103 118 122 Q116 138 100 138 Q89 138 88 130 Z"
        fill="#F0EDE8"
        stroke="#120303"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M152 130 Q154 106 132 104 Q120 103 122 122 Q124 138 140 138 Q151 138 152 130 Z"
        fill="#F0EDE8"
        stroke="#120303"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <ellipse cx="120" cy="84" rx="17" ry="7" fill="#A31408" />
      <rect x="103" y="74" width="34" height="11" fill="#A31408" />
      <ellipse cx="120" cy="74" rx="17" ry="7" fill="#E5341F" />
    </svg>
  );
}
