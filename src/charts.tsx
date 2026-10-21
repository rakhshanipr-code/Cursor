type Series = {
  name: string;
  data: number[];
  color: string;
};

type BarChartProps = {
  categories: string[];
  series: Series[];
  height?: number;
  suffix?: string;
};

const W = 640;
const PAD = { t: 16, r: 16, b: 36, l: 48 };

function maxOf(series: Series[]) {
  return Math.max(1, ...series.flatMap((s) => s.data));
}

function niceMax(n: number) {
  const p = 10 ** Math.floor(Math.log10(n));
  return Math.ceil(n / p) * p;
}

export function BarChart({
  categories,
  series,
  height = 220,
  suffix = "",
}: BarChartProps) {
  const plotW = W - PAD.l - PAD.r;
  const plotH = height - PAD.t - PAD.b;
  const yMax = niceMax(maxOf(series));
  const groupW = plotW / categories.length;
  const barW = Math.min(28, (groupW * 0.7) / series.length);

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="chart" role="img">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = PAD.t + plotH * (1 - t);
        return (
          <g key={t}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y}
              y2={y}
              className="grid"
            />
            <text x={PAD.l - 8} y={y + 4} className="axis" textAnchor="end">
              {formatNum(yMax * t)}
              {suffix}
            </text>
          </g>
        );
      })}
      {categories.map((label, i) => {
        const gx = PAD.l + i * groupW + groupW / 2;
        return (
          <g key={label}>
            {series.map((s, si) => {
              const h = (s.data[i] / yMax) * plotH;
              const x = gx - (series.length * barW) / 2 + si * barW;
              return (
                <rect
                  key={s.name}
                  x={x}
                  y={PAD.t + plotH - h}
                  width={barW - 3}
                  height={Math.max(0, h)}
                  fill={s.color}
                  rx={2}
                >
                  <title>
                    {s.name} · {label} · {formatNum(s.data[i])}
                    {suffix}
                  </title>
                </rect>
              );
            })}
            <text x={gx} y={height - 10} className="axis" textAnchor="middle">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

type LineChartProps = {
  categories: string[];
  series: Series[];
  height?: number;
  suffix?: string;
  reference?: { value: number; label: string };
};

export function LineChart({
  categories,
  series,
  height = 240,
  suffix = "",
  reference,
}: LineChartProps) {
  const plotW = W - PAD.l - PAD.r;
  const plotH = height - PAD.t - PAD.b;
  const yMax = niceMax(
    Math.max(maxOf(series), reference?.value ?? 0),
  );
  const step = categories.length === 1 ? 0 : plotW / (categories.length - 1);
  const xAt = (i: number) => PAD.l + i * step;
  const yAt = (v: number) => PAD.t + plotH * (1 - v / yMax);

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="chart" role="img">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = PAD.t + plotH * (1 - t);
        return (
          <g key={t}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y}
              y2={y}
              className="grid"
            />
            <text x={PAD.l - 8} y={y + 4} className="axis" textAnchor="end">
              {formatNum(yMax * t)}
              {suffix}
            </text>
          </g>
        );
      })}
      {reference ? (
        <g>
          <line
            x1={PAD.l}
            x2={W - PAD.r}
            y1={yAt(reference.value)}
            y2={yAt(reference.value)}
            className="ref"
          />
          <text
            x={W - PAD.r}
            y={yAt(reference.value) - 6}
            className="axis"
            textAnchor="end"
          >
            {reference.label}
          </text>
        </g>
      ) : null}
      {series.map((s) => {
        const d = s.data
          .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`)
          .join(" ");
        return (
          <g key={s.name}>
            <path d={d} fill="none" stroke={s.color} strokeWidth={2} />
            {s.data.map((v, i) => (
              <circle key={i} cx={xAt(i)} cy={yAt(v)} r={3} fill={s.color}>
                <title>
                  {s.name} · {categories[i]} · {formatNum(v)}
                  {suffix}
                </title>
              </circle>
            ))}
          </g>
        );
      })}
      {categories.map((label, i) => (
        <text
          key={label}
          x={xAt(i)}
          y={height - 10}
          className="axis"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export function Legend({ series }: { series: Series[] }) {
  return (
    <div className="legend">
      {series.map((s) => (
        <span key={s.name}>
          <i style={{ background: s.color }} />
          {s.name}
        </span>
      ))}
    </div>
  );
}

export function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}م`;
  if (n >= 1000) return new Intl.NumberFormat("fa-IR").format(Math.round(n));
  if (Number.isInteger(n)) return new Intl.NumberFormat("fa-IR").format(n);
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  }).format(n);
}

export const C = {
  teal: "#0f766e",
  amber: "#b45309",
  rose: "#be123c",
  slate: "#475569",
  blue: "#1d4ed8",
};
