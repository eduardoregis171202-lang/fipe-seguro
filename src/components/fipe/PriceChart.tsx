import { useEffect, useRef } from "react";
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
        borderColor: "hsl(270, 70%, 55%)",
        backgroundColor: "hsla(270, 70%, 55%, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: "hsl(270, 70%, 55%)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "hsl(240, 6%, 10%)",
        titleColor: "hsl(0, 0%, 98%)",
        bodyColor: "hsl(0, 0%, 98%)",
        borderColor: "hsl(270, 70%, 55%)",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx: any) => {
            return `R$ ${ctx.parsed.y.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "hsla(240, 4%, 16%, 0.5)" },
        ticks: { color: "hsl(240, 5%, 64.9%)", font: { size: 10 } },
      },
      y: {
        grid: { color: "hsla(240, 4%, 16%, 0.5)" },
        ticks: {
          color: "hsl(240, 5%, 64.9%)",
          font: { size: 10 },
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
