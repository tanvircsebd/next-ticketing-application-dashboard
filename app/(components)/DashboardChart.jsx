import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = ({ stats }) => {
  const data = {
    labels: Object.keys(stats.categoryCounts || {}),
    datasets: [
      {
        label: "Tickets by Category",
        data: Object.values(stats.categoryCounts || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return <Bar data={data} />;
};

export default DashboardChart;
