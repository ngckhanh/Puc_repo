import { useState } from 'react';
import { Maximize2, Settings, Plus, Minus } from 'lucide-react';

/** Brighter chart series — clear on #1A1E26, still solid & balanced */
const chartSeries = [
  '#64B5F6',
  '#81C784',
  '#4DD0E1',
  '#FFD54F',
  '#FFB74D',
  '#BA68C8',
  '#F06292',
  '#FFCC80',
  '#4DB6AC',
  '#90CAF9',
];

const palette = {
  canvas: '#1A1E26',
  card: '#242D38',
  cardRaised: '#2A3341',
  cardBorder: '#455A6E',
  cardShadow: 'none',
  sidebar: '#1F2730',
  track: '#354552',
  text: '#F8FAFC',
  textMuted: '#B8C5D4',
  textSubtle: '#7A8A9C',
  cream: '#FFF8E1',
  sage: '#A5D6A7',
  sageLight: '#C8E6C9',
  peach: '#FFCC80',
  slate: '#5A7082',
  slateLight: '#6B8FA3',
  vn50: {
    header: '#4A7A9A',
    accent: '#FFF8E1',
    selected: '#3D5A72',
  },
  vn51: {
    header: '#C4886A',
    accent: '#FFCC80',
    selected: '#5A4A42',
    headerText: '#FFF8E1',
  },
  kpiFeatured: '#3D5A72',
  kpiFeaturedBorder: '#64B5F6',
  positive: '#81C784',
  negative: '#FFB74D',
  barPrimary: '#64B5F6',
  barSecondary: '#81C784',
  barOutline: '#5A7A94',
  grid: '#3D4F5E',
  categories: chartSeries,
  chart: {
    series: chartSeries,
    pieOther: '#F48FB1',
    barBorder: '#5A9FD4',
    legendRow: '#1F2730',
    legendRowAlt: '#242D38',
  },
  lightCard: {
    bg: '#F4F7FA',
    border: '#C5D4E3',
    title: '#5A6B7D',
    hint: '#7A8C9E',
    value: '#1A1E26',
    track: '#D5DEE8',
  },
};

const vn50Metrics = {
  mtdCost: '291.83M',
  ytdCost: '595.29M',
  mtdPallets: '79.04K',
  ytdPallets: '161.24K',
  minPallet: '2.82K',
  maxPallet: '4.02K',
  avgPallet: '3.43K',
  capacity: 3.94,
  capacityMax: 4.5,
  sapStorage: '3.63K',
  sapChange: '-6.24%',
};

const vn51Metrics = {
  mtdCost: '107.93M',
  ytdCost: '235.26M',
  mtdPallets: '29.23K',
  ytdPallets: '63.72K',
  minPallet: '1.19K',
  maxPallet: '1.68K',
  avgPallet: '1.36K',
  capacity: 1.64,
  capacityMax: 1.8,
  sapStorage: '1.56K',
  sapPct: 75,
};

const timelineDates = [
  '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
  '19', '20', '21',
];

const overviewTotals = [
  '4.46K', '4.67K', '4.32K', '4.53K', '4.71K', '4.89K', '5.12K', '4.98K', '5.05K',
  '5.21K', '5.34K', '5.18K', '5.29K', '5.41K', '5.52K', '5.48K', '5.57K',
];

const fgSubCats = [
  'TOOTHBRUSH', 'MOUTHWASH', 'TOOTHPASTE', 'SHAMPOO', 'FLOSSER', 'POWER TB', 'BODYWASH', 'CONDITION',
];

const otherSkuTypes = [
  'PREMIUM', 'STICKER/LABEL', 'PM', 'CARTON', 'PALLET', 'DOCUMENT', 'MACHINERY', 'RETURN',
];

const fgLegend = [...fgSubCats, 'COPACKING'];

const topSkusBar = [
  { name: 'COL TP MF PPMT 225g+TB x 36_for promo_SR', value: 264.35 },
  { name: 'COL TP CDC 225G x 36', value: 194.94 },
  { name: 'POSH Intensive Moisture 600ml', value: 190.33 },
  { name: 'PO SH Intensive Moisture 6gx880 VN', value: 127.61 },
  { name: 'Colgate Natural pure clean charcoal 180g', value: 122.14 },
  { name: 'COL TP MF GreenTea 180g x36 Utral frzz', value: 93.23 },
  { name: 'TRIPLE ACTION FH S VNX144', value: 91.19 },
  { name: 'CTB Slim Soft Deep Clean B1G1 x 72(36P)', value: 86.22 },
  { name: 'COL Vitamin C 170g x 48_VN', value: 77.86 },
  { name: 'POSH silky straight 600ml', value: 74.95 },
];

const topSkusPie = [
  { id: '61043863', pct: 5.46 },
  { id: 'TH03447A', pct: 4.45 },
  { id: '61053251', pct: 4.24 },
  { id: '61054902', pct: 3.46 },
  { id: '61023842', pct: 3.26 },
  { id: '61017308', pct: 2.14 },
  { id: 'CN07591A', pct: 2.12 },
  { id: '61063453', pct: 2.1 },
  { id: '61044736', pct: 2.03 },
  { id: '61043861', pct: 1.93 },
  { id: 'Other', pct: 68.8 },
];

function Card({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-sm border ${className}`}
      style={{
        backgroundColor: palette.card,
        borderColor: palette.cardBorder,
        boxShadow: palette.cardShadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ label, backgroundColor, textColor = palette.vn50.accent }) {
  return (
    <div
      className="rounded-sm py-3 text-center text-lg font-bold tracking-wide shadow-sm"
      style={{ backgroundColor, color: textColor }}
    >
      {label}
    </div>
  );
}

function getGaugeFillColor(percentage) {
  if (percentage > 85) return palette.peach;
  if (percentage > 60) return palette.cream;
  return palette.sage;
}

function KpiCard({
  title,
  value,
  hint,
  featured = false,
  light = false,
  valueColor,
  children,
}) {
  const resolvedValueColor = valueColor ?? (light ? palette.lightCard.value : palette.cream);

  const cardStyle = light
    ? {
        backgroundColor: palette.lightCard.bg,
        borderColor: palette.lightCard.border,
      }
    : featured
      ? {
          backgroundColor: palette.kpiFeatured,
          borderColor: palette.kpiFeaturedBorder,
          borderLeftWidth: 4,
        }
      : {};

  const titleColor = light ? palette.lightCard.title : palette.textMuted;
  const hintColor = light ? palette.lightCard.hint : palette.textSubtle;

  return (
    <Card className="flex min-h-[120px] flex-col p-4" style={cardStyle}>
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: titleColor }}>
        {title}
      </p>
      {hint && (
        <p className="mt-1 text-[10px]" style={{ color: hintColor }}>
          {hint}
        </p>
      )}
      {children ?? (
        <p className="mt-auto pt-4 text-center text-3xl font-bold" style={{ color: resolvedValueColor }}>
          {value}
        </p>
      )}
    </Card>
  );
}

function SemiGauge({ value, max, markers = [], light = false }) {
  const pct = Math.min(value / max, 1);
  const angle = pct * 180 - 90;
  const fillColor = getGaugeFillColor(pct * 100);
  const trackColor = light ? palette.lightCard.track : palette.track;
  const needleColor = light ? palette.lightCard.value : palette.cream;
  const markerColor = light ? palette.lightCard.hint : palette.textMuted;

  return (
    <div className="flex flex-col items-center pt-2">
      <svg viewBox="0 0 120 70" className="w-full max-w-[200px]">
        <path
          d="M 15 58 A 45 45 0 0 1 105 58"
          fill="none"
          stroke={trackColor}
          strokeWidth="10"
        />
        <path
          d="M 15 58 A 45 45 0 0 1 105 58"
          fill="none"
          stroke={fillColor}
          strokeWidth="10"
          strokeDasharray={`${pct * 141.4} 141.4`}
        />
        <g transform={`rotate(${angle} 60 58)`}>
          <line x1="60" y1="58" x2="60" y2="18" stroke={needleColor} strokeWidth="2" />
          <circle cx="60" cy="58" r="4" fill={needleColor} />
        </g>
        {markers.map((m) => (
          <text
            key={m.label}
            x={m.x}
            y={m.y}
            fontSize="8"
            fill={m.color ?? markerColor}
            textAnchor="middle"
          >
            {m.label}
          </text>
        ))}
        <text x="95" y="42" fontSize="11" fontWeight="bold" fill={fillColor}>
          {value.toFixed(2)}K
        </text>
      </svg>
    </div>
  );
}

function DonutGauge({ value, pct, light = false }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const trackColor = light ? palette.lightCard.track : palette.track;

  return (
    <div className="flex flex-col items-center justify-center pt-2">
      <svg viewBox="0 0 100 100" className="h-24 w-24">
        <circle cx="50" cy="50" r={r} fill="none" stroke={trackColor} strokeWidth="12" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={palette.negative}
          strokeWidth="12"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="54"
          fontSize="14"
          fontWeight="bold"
          fill={light ? '#E65100' : palette.negative}
          textAnchor="middle"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}

function SidebarList({ title, items, selected, onSelect }) {
  return (
    <div
      className="flex w-[130px] shrink-0 flex-col border-r p-3"
      style={{ borderColor: palette.cardBorder, backgroundColor: palette.sidebar }}
    >
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: palette.text }}>
        {title}
      </h4>
      <div className="flex flex-1 flex-col gap-1">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className="rounded border px-2 py-1.5 text-left text-[10px] font-semibold transition-colors"
            style={{
              borderColor: selected === item ? palette.cream : palette.cardBorder,
              backgroundColor: selected === item ? palette.vn50.selected : palette.card,
              color: selected === item ? palette.cream : palette.textMuted,
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function StackedBars({
  barCount,
  totals,
  maxHeight = 200,
  yMax,
  yTicks,
  segmentCount = 2,
  colors,
  showLabels = true,
}) {
  const barW = 14;
  const gap = 22;
  const chartW = 80 + barCount * gap;

  return (
    <svg viewBox={`0 0 ${chartW} 280`} className="w-full" style={{ minWidth: chartW }}>
      {[...yTicks].reverse().map((tick, i) => {
        const y = 30 + i * (maxHeight / (yTicks.length - 1));
        return (
          <g key={tick}>
            <text x="48" y={y + 4} fontSize="10" fill={palette.textMuted} textAnchor="end">
              {tick}
            </text>
            <line x1="55" y1={y} x2={chartW - 20} y2={y} stroke={palette.grid} strokeWidth="1" />
          </g>
        );
      })}
      <line x1="55" y1="30" x2="55" y2={30 + maxHeight} stroke={palette.textSubtle} strokeWidth="1" />

      {Array.from({ length: barCount }).map((_, idx) => {
        const x = 70 + idx * gap;
        const total = 0.52 + ((idx * 7) % 11) * 0.035;
        let yOff = 30 + maxHeight;
        const segments = Array.from({ length: segmentCount }).map((__, s) => {
          const h = ((maxHeight * total) / segmentCount) * (0.65 + ((s + idx) % 4) * 0.12);
          yOff -= h;
          return { h, y: yOff, color: colors[s % colors.length] };
        });

        return (
          <g key={idx}>
            {segments.map((seg, s) => (
              <rect
                key={s}
                x={x - barW / 2}
                y={seg.y}
                width={barW}
                height={seg.h}
                fill={seg.color}
                stroke={palette.barOutline}
                strokeWidth="0.5"
              />
            ))}
            {showLabels && totals?.[idx] && (
              <text x={x} y={segments[0].y - 4} fontSize="8" fill={palette.text} textAnchor="middle" fontWeight="600">
                {totals[idx]}
              </text>
            )}
            <text x={x} y={30 + maxHeight + 14} fontSize="9" fill={palette.textMuted} textAnchor="middle">
              {timelineDates[idx] ?? idx + 1}
            </text>
          </g>
        );
      })}
      <text x={chartW / 2 - 40} y={30 + maxHeight + 32} fontSize="10" fill={palette.textMuted} textAnchor="middle">
        Apr 2026
      </text>
      <text x={chartW / 2 + 60} y={30 + maxHeight + 32} fontSize="10" fill={palette.textMuted} textAnchor="middle">
        May 2026
      </text>
    </svg>
  );
}

function ChartLegend({ items, colors }) {
  return (
    <div className="flex shrink-0 flex-col gap-1.5 pl-4">
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
          <span className="text-[10px] font-medium" style={{ color: palette.textMuted }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

function getPieSliceColor(item, index) {
  if (item.id === 'Other') return palette.chart.pieOther;
  return palette.chart.series[index % palette.chart.series.length];
}

function HorizontalBarChart() {
  const maxVal = topSkusBar[0].value;

  return (
    <div className="space-y-2 p-4">
      <div className="mb-2 flex justify-between text-[10px]" style={{ color: palette.textMuted }}>
        <span>0</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
      </div>
      {topSkusBar.map((sku, i) => (
        <div key={sku.name} className="flex items-center gap-2">
          <span
            className="w-[38%] shrink-0 truncate text-right text-[9px] leading-tight"
            style={{ color: palette.text }}
            title={sku.name}
          >
            {sku.name}
          </span>
          <div className="relative flex-1">
            <div
              className="h-5 rounded-sm"
              style={{
                width: `${(sku.value / maxVal) * 100}%`,
                backgroundColor: palette.chart.series[i % palette.chart.series.length],
                border: `1px solid ${palette.chart.barBorder}`,
              }}
            />
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-1 text-[9px] font-semibold"
              style={{ color: palette.text }}
            >
              {sku.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PieChartPanel() {
  let angle = -90;
  const slices = topSkusPie.map((item, i) => {
    const sweep = (item.pct / 100) * 360;
    const start = angle;
    angle += sweep;
    const rad = (deg) => (deg * Math.PI) / 180;
    const x1 = 50 + 40 * Math.cos(rad(start));
    const y1 = 50 + 40 * Math.sin(rad(start));
    const x2 = 50 + 40 * Math.cos(rad(start + sweep));
    const y2 = 50 + 40 * Math.sin(rad(start + sweep));
    const large = sweep > 180 ? 1 : 0;
    const color = getPieSliceColor(item, i);
    const path =
      sweep >= 359.9
        ? `M 50 10 A 40 40 0 1 1 49.99 10 Z`
        : `M 50 50 L ${x1} ${y1} A 40 40 0 ${large} 1 ${x2} ${y2} Z`;
    return { ...item, path, color };
  });

  return (
    <div className="flex flex-wrap items-start gap-4 p-4">
      <div className="shrink-0 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: palette.textMuted }}>
          Total
        </p>
        <p className="text-xl font-bold" style={{ color: palette.text }}>
          5.57K
        </p>
        <hr className="my-2" style={{ borderColor: palette.cardBorder }} />
      </div>
      <svg viewBox="0 0 100 100" className="h-40 w-40 shrink-0">
        {slices.map((s) => (
          <path
            key={s.id}
            d={s.path}
            fill={s.color}
            stroke={palette.cardBorder}
            strokeWidth="1"
          />
        ))}
        <text x="58" y="56" fontSize="8" fontWeight="bold" fill={palette.cream}>
          Other
        </text>
      </svg>
      <div className="min-w-[140px] flex-1 overflow-hidden rounded-sm border" style={{ borderColor: palette.cardBorder }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ backgroundColor: palette.chart.legendRow }}>
              <th className="px-2 py-1.5 text-left font-semibold" style={{ color: palette.textMuted }}>
                {' '}
              </th>
              <th className="px-2 py-1.5 text-left font-semibold" style={{ color: palette.text }}>
                SKU
              </th>
              <th className="px-2 py-1.5 text-right font-semibold" style={{ color: palette.text }}>
                %
              </th>
            </tr>
          </thead>
          <tbody>
            {topSkusPie.map((row, i) => {
              const sliceColor = getPieSliceColor(row, i);
              return (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: i % 2 === 0 ? palette.chart.legendRowAlt : palette.chart.legendRow,
                  }}
                >
                  <td className="px-2 py-1">
                    <span
                      className="inline-block h-3 w-3 rounded-sm border"
                      style={{
                        backgroundColor: sliceColor,
                        borderColor: palette.cardBorder,
                      }}
                    />
                  </td>
                  <td className="px-2 py-1 font-medium" style={{ color: palette.text }}>
                    {row.id}
                  </td>
                  <td className="px-2 py-1 text-right font-bold" style={{ color: palette.textMuted }}>
                    {row.pct}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PalletStorageDashboardDarkTheme() {
  const [selectedFg, setSelectedFg] = useState('TOOTHPASTE');
  const [selectedOther, setSelectedOther] = useState('PM');

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: palette.canvas }}>
      <div className="mx-auto max-w-[1400px] space-y-4">
        {/* Filter chip */}
        <div className="flex justify-center">
          <span
            className="rounded border px-3 py-1 text-xs font-semibold shadow-sm"
            style={{ backgroundColor: palette.cardRaised, borderColor: palette.cardBorder, color: palette.textMuted }}
          >
            1 MORE FILTERS
          </span>
        </div>

        {/* VN50 / VN51 KPI grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <SectionHeader label="VN50" backgroundColor={palette.vn50.header} />
            <div className="grid grid-cols-2 gap-3">
              <KpiCard title="MTD Pallet Cost" value={vn50Metrics.mtdCost} featured valueColor={palette.cream} />
              <KpiCard title="YTD Pallet Cost" value={vn50Metrics.ytdCost} valueColor={palette.cream} />
              <KpiCard
                title="MTD Number of Pallet"
                hint={`${vn50Metrics.minPallet} Min Pallet`}
                value={vn50Metrics.mtdPallets}
                valueColor={palette.cream}
              />
              <KpiCard
                title="YTD Number of Pallet"
                hint={`${vn50Metrics.maxPallet} Max Pallet`}
                value={vn50Metrics.ytdPallets}
                valueColor={palette.cream}
              />
              <KpiCard title="Current Pallet Capacity" hint={`${vn50Metrics.avgPallet} Average Pallet`}>
                <SemiGauge
                  value={vn50Metrics.capacity}
                  max={vn50Metrics.capacityMax}
                  markers={[
                    { label: '3.43K', x: 25, y: 48, color: palette.textMuted },
                  ]}
                />
              </KpiCard>
              <KpiCard title="Current SAP Pallet Storage">
                <p className="mt-auto pt-4 text-center text-3xl font-bold" style={{ color: palette.peach }}>
                  {vn50Metrics.sapStorage}
                </p>
                <p className="pb-2 text-center text-sm font-semibold" style={{ color: palette.negative }}>
                  ↓ {vn50Metrics.sapChange}
                </p>
              </KpiCard>
            </div>
          </div>

          <div className="space-y-3">
            <SectionHeader label="VN51" backgroundColor={palette.vn51.header} textColor={palette.vn51.headerText} />
            <div className="grid grid-cols-2 gap-3">
              <KpiCard light title="MTD Pallet Cost" value={vn51Metrics.mtdCost} />
              <KpiCard light title="YTD Pallet Cost" value={vn51Metrics.ytdCost} />
              <KpiCard
                light
                title="MTD Number of Pallet"
                hint={`${vn51Metrics.minPallet} Min Pallet`}
                value={vn51Metrics.mtdPallets}
              />
              <KpiCard
                light
                title="YTD Number of Pallet"
                hint={`${vn51Metrics.maxPallet} Max Pallet`}
                value={vn51Metrics.ytdPallets}
              />
              <KpiCard light title="Current Pallet Capacity" hint={`${vn51Metrics.avgPallet} Average MTD Pallet`}>
                <SemiGauge light value={vn51Metrics.capacity} max={vn51Metrics.capacityMax} />
              </KpiCard>
              <KpiCard light title="Current SAP Pallet Storage">
                <DonutGauge light value={vn51Metrics.sapStorage} pct={vn51Metrics.sapPct} />
              </KpiCard>
            </div>
          </div>
        </div>

        {/* Overview + Master charts */}
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold" style={{ color: palette.text }}>
              Overview Pallet Storage by
            </h3>
            <div className="flex gap-2" style={{ color: palette.textMuted }}>
              <Maximize2 size={14} />
              <Settings size={14} />
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            <div className="min-w-0 flex-1">
              <StackedBars
                barCount={17}
                totals={overviewTotals}
                yMax={6000}
                yTicks={['0', '2K', '4K', '6K']}
                segmentCount={2}
                colors={[palette.barPrimary, palette.barSecondary]}
              />
            </div>
            <ChartLegend items={['VN50', 'VN51']} colors={[palette.barPrimary, palette.barSecondary]} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-1">
            <h3 className="text-sm font-semibold" style={{ color: palette.text }}>
              Master Pallet Storage VN
            </h3>
            <p className="text-xs" style={{ color: palette.textMuted }}>
              by Day
            </p>
          </div>
          <div className="relative flex gap-4 overflow-x-auto">
            <svg viewBox="0 0 400 260" className="min-w-[360px] flex-1">
              {['0', '2K', '4K', '6K'].map((tick, i) => (
                <g key={tick}>
                  <text x="40" y={40 + i * 70} fontSize="10" fill={palette.textMuted} textAnchor="end">
                    {tick}
                  </text>
                  <line x1="48" y1={40 + i * 70} x2="380" y2={40 + i * 70} stroke={palette.grid} />
                </g>
              ))}
              {[
                { day: '19', pallet: 175, sap: 168 },
                { day: '20', pallet: 182, sap: 174 },
                { day: '21', pallet: 188, sap: 178 },
              ].map((d, i) => {
                const x = 120 + i * 90;
                return (
                  <g key={d.day}>
                    <rect
                      x={x - 22}
                      y={250 - d.pallet}
                      width={18}
                      height={d.pallet}
                      fill={palette.barPrimary}
                      stroke={palette.barOutline}
                      strokeWidth="0.5"
                    />
                    <rect
                      x={x + 4}
                      y={250 - d.sap}
                      width={18}
                      height={d.sap}
                      fill={palette.barSecondary}
                      stroke={palette.barOutline}
                      strokeWidth="0.5"
                    />
                    <text x={x} y="268" fontSize="10" fill={palette.textMuted} textAnchor="middle">
                      {d.day}
                    </text>
                  </g>
                );
              })}
            </svg>
            <ChartLegend items={['Pallet', 'SAP Pallet']} colors={[palette.barPrimary, palette.barSecondary]} />
            <div className="absolute bottom-6 right-4 flex flex-col gap-1">
              <button type="button" className="rounded border p-0.5" style={{ borderColor: palette.cardBorder }}>
                <Plus size={12} style={{ color: palette.textMuted }} />
              </button>
              <button type="button" className="rounded border p-0.5" style={{ borderColor: palette.cardBorder }}>
                <Minus size={12} style={{ color: palette.textMuted }} />
              </button>
            </div>
          </div>
        </Card>

        {/* FG Sub-Cat + Other SKU rows */}
        <Card className="overflow-hidden">
          <div className="flex">
            <SidebarList
              title="FG Sub-Cat"
              items={fgSubCats}
              selected={selectedFg}
              onSelect={setSelectedFg}
            />
            <div className="min-w-0 flex-1 p-4">
              <h3 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>
                Pallet Storage by Finished Goods by Sub-Cat
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                <StackedBars
                  barCount={17}
                  totals={overviewTotals}
                  yTicks={['0', '2K', '4K', '6K']}
                  segmentCount={9}
                  colors={palette.categories}
                />
                <ChartLegend items={fgLegend} colors={palette.categories} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex">
            <SidebarList
              title="Other SKU Types"
              items={otherSkuTypes}
              selected={selectedOther}
              onSelect={setSelectedOther}
            />
            <div className="min-w-0 flex-1 p-4">
              <h3 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>
                Pallet Storage by Other SKUs
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                <StackedBars
                  barCount={17}
                  totals={[
                    '141', '146', '138', '152', '149', '155', '148', '151', '147',
                    '153', '150', '156', '149', '154', '151', '157', '160',
                  ]}
                  yTicks={['0', '50', '100', '150', '200']}
                  maxHeight={160}
                  segmentCount={8}
                  colors={palette.categories}
                />
                <ChartLegend items={otherSkuTypes} colors={palette.categories} />
              </div>
            </div>
          </div>
        </Card>

        {/* Top 10 SKUs */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="border-b px-4 py-3 text-sm font-semibold" style={{ borderColor: palette.cardBorder, color: palette.text }}>
              Top 10 SKUs by by Number of Pallet
            </h3>
            <HorizontalBarChart />
          </Card>
          <Card>
            <h3 className="border-b px-4 py-3 text-sm font-semibold" style={{ borderColor: palette.cardBorder, color: palette.text }}>
              Top 10 SKUs by by Percentage Occupancy
            </h3>
            <PieChartPanel />
          </Card>
        </div>
      </div>
    </div>
  );
}
