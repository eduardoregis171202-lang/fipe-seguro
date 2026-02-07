import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface PriceChartProps {
  labels: string[];
  data: number[];
}

const PriceChart = ({ labels, data }: PriceChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Preço FIPE",
        data,
        borderColor: "hsl(12, 90%, 52%)",
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return "hsla(12, 90%, 52%, 0.1)";
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "hsla(12, 90%, 52%, 0.25)");
          gradient.addColorStop(1, "hsla(12, 90%, 52%, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: "hsl(25, 95%, 53%)",
        pointBorderColor: "hsl(0, 0%, 8%)",
        pointBorderWidth: 2,
        borderWidth: 2.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "hsl(0, 0%, 8%)",
        titleColor: "hsl(0, 0%, 95%)",
        bodyColor: "hsl(25, 95%, 58%)",
        borderColor: "hsl(12, 90%, 52%)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        titleFont: { family: "Space Grotesk", weight: "bold" as const, size: 11 },
        bodyFont: { family: "Space Grotesk", weight: "bold" as const, size: 13 },
        callbacks: {
          label: (ctx: any) => `R$ ${ctx.parsed.y.toLocaleString("pt-BR")}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "hsla(0, 0%, 14%, 0.6)" },
        ticks: { color: "hsl(0, 0%, 45%)", font: { size: 10, family: "Inter" } },
      },
      y: {
        grid: { color: "hsla(0, 0%, 14%, 0.6)" },
        ticks: {
          color: "hsl(0, 0%, 45%)",
          font: { size: 10, family: "Inter" },
          callback: (v: any) => `R$ ${(v / 1000).toFixed(0)}k`,
        },
      },
    },
  };

  return (
    <div className="w-full h-52">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;
