interface NeonOrbProps {
  className?: string;
}

export function NeonOrb({ className }: NeonOrbProps) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 240 240" className="h-full w-full animate-orb-spin">
        <defs>
          <radialGradient id="orb-core" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f1d8ff" />
            <stop offset="42%" stopColor="#a56bff" />
            <stop offset="72%" stopColor="#5f57ff" />
            <stop offset="100%" stopColor="#1f265f" />
          </radialGradient>
        </defs>

        <circle cx="120" cy="120" r="106" fill="url(#orb-core)" opacity="0.92" />

        <g fill="none" stroke="rgba(229,213,255,0.9)" strokeWidth="3.5">
          <ellipse cx="120" cy="120" rx="90" ry="40" />
          <ellipse cx="120" cy="120" rx="90" ry="40" transform="rotate(40 120 120)" />
          <ellipse cx="120" cy="120" rx="90" ry="40" transform="rotate(80 120 120)" />
          <ellipse cx="120" cy="120" rx="90" ry="40" transform="rotate(120 120 120)" />
          <ellipse cx="120" cy="120" rx="90" ry="40" transform="rotate(160 120 120)" />
        </g>

        <circle cx="120" cy="120" r="102" fill="none" stroke="rgba(146,108,255,0.5)" strokeWidth="2" />
      </svg>
    </div>
  );
}
