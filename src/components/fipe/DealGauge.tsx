interface DealGaugeProps {
  percentage: number;
  label: string;
  color: 'green' | 'yellow' | 'red';
}

const DealGauge = ({ percentage, label, color }: DealGaugeProps) => {
  const clampedPerc = Math.max(60, Math.min(140, percentage));
  const angle = ((clampedPerc - 60) / 80) * 180;

  const colorMap = {
    green: { stroke: 'hsl(145, 65%, 42%)', text: 'text-success' },
    yellow: { stroke: 'hsl(25, 95%, 53%)', text: 'text-accent' },
    red: { stroke: 'hsl(0, 72%, 51%)', text: 'text-destructive' },
  };

  const c = colorMap[color];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-30 overflow-hidden">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(0, 0%, 14%)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Red zone left */}
          <path
            d="M 20 100 A 80 80 0 0 1 55 40"
            fill="none"
            stroke="hsl(0, 72%, 51%, 0.3)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Green zone center */}
          <path
            d="M 65 30 A 80 80 0 0 1 135 30"
            fill="none"
            stroke="hsl(145, 65%, 42%, 0.3)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Orange zone right */}
          <path
            d="M 145 40 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(25, 95%, 53%, 0.3)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2={100 + 65 * Math.cos(((180 - angle) * Math.PI) / 180)}
            y2={100 - 65 * Math.sin(((180 - angle) * Math.PI) / 180)}
            stroke={c.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          {/* Center dot */}
          <circle cx="100" cy="100" r="7" fill={c.stroke} />
          <circle cx="100" cy="100" r="3" fill="hsl(0, 0%, 8%)" />

          {/* Labels */}
          <text x="8" y="108" fontSize="8" fill="hsl(0, 72%, 55%)" fontWeight="700" fontFamily="Space Grotesk">GOLPE</text>
          <text x="83" y="18" fontSize="8" fill="hsl(145, 65%, 50%)" fontWeight="700" fontFamily="Space Grotesk">BOM</text>
          <text x="153" y="108" fontSize="8" fill="hsl(25, 95%, 58%)" fontWeight="700" fontFamily="Space Grotesk">CARO</text>
        </svg>
      </div>
      <div className="text-center -mt-1">
        <p className={`text-3xl font-extrabold font-display ${c.text}`}>{percentage.toFixed(0)}%</p>
        <p className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{label}</p>
      </div>
    </div>
  );
};

export default DealGauge;
