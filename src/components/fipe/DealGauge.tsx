interface DealGaugeProps {
  percentage: number; // 0 to 200 (percentage of FIPE price)
  label: string;
  color: 'green' | 'yellow' | 'red';
}

const DealGauge = ({ percentage, label, color }: DealGaugeProps) => {
  // Map 60-140% range to 0-180 degrees
  const clampedPerc = Math.max(60, Math.min(140, percentage));
  const angle = ((clampedPerc - 60) / 80) * 180;

  const colorMap = {
    green: { stroke: 'hsl(145, 65%, 42%)', bg: 'hsl(145, 65%, 42%, 0.15)', text: 'text-accent' },
    yellow: { stroke: 'hsl(38, 92%, 50%)', bg: 'hsl(38, 92%, 50%, 0.15)', text: 'text-warning' },
    red: { stroke: 'hsl(0, 72%, 51%)', bg: 'hsl(0, 72%, 51%, 0.15)', text: 'text-destructive' },
  };

  const c = colorMap[color];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-28 overflow-hidden">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(240, 4%, 16%)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Green zone (80-120%) */}
          <path
            d="M 70 30 A 80 80 0 0 1 130 30"
            fill="none"
            stroke="hsl(145, 65%, 42%, 0.3)"
            strokeWidth="14"
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
          <circle cx="100" cy="100" r="6" fill={c.stroke} />
          <circle cx="100" cy="100" r="3" fill="hsl(240, 6%, 10%)" />
          
          {/* Labels */}
          <text x="15" y="108" fontSize="9" fill="hsl(0, 72%, 51%)" fontWeight="500">GOLPE</text>
          <text x="85" y="20" fontSize="9" fill="hsl(145, 65%, 42%)" fontWeight="500">BOM</text>
          <text x="155" y="108" fontSize="9" fill="hsl(38, 92%, 50%)" fontWeight="500">CARO</text>
        </svg>
      </div>
      <div className="text-center -mt-2">
        <p className={`text-2xl font-bold ${c.text}`}>{percentage.toFixed(0)}%</p>
        <p className={`text-sm font-medium ${c.text}`}>{label}</p>
      </div>
    </div>
  );
};

export default DealGauge;
