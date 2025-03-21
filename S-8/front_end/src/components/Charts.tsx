import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useMapContext } from "../mapContext/MapContext";

// Register ALL required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts: React.FC = () => {
  const { mapsData } = useMapContext();

  // Calculate events by month
  const monthlyData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    
    mapsData.forEach((event) => {
      const date = new Date(event.start);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      counts[monthKey] = (counts[monthKey] || 0) + 1;
    });
    
    // Sort the months chronologically
    const sortedMonths = Object.keys(counts).sort();
    
    return {
      labels: sortedMonths,
      values: sortedMonths.map(month => counts[month])
    };
  }, [mapsData]);

  // Calculate cumulative events
  const cumulativeData = React.useMemo(() => {
    if (!mapsData.length) return { labels: [], values: [] };
    
    const sortedEvents = [...mapsData].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    
    const labels: string[] = [];
    const values: number[] = [];
    let cumulative = 0;
    
    sortedEvents.forEach(event => {
      const dateStr = new Date(event.start).toISOString().split('T')[0];
      cumulative += 1;
      
      // If the date is the same as the last one, update the last count
      if (labels.length > 0 && labels[labels.length - 1] === dateStr) {
        values[values.length - 1] = cumulative;
      } else {
        labels.push(dateStr);
        values.push(cumulative);
      }
    });
    
    return { labels, values };
  }, [mapsData]);

  // Common chart options
  const commonOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // If no data, show a message
  if (!mapsData || mapsData.length === 0) {
    return <p className="text-center p-4">No hay eventos todavía.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">Gráficos de Eventos</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-center mb-2">Eventos por Mes</h3>
        {monthlyData.labels.length > 0 ? (
          <div style={{ height: '300px' }}>
            <Bar
              data={{
                labels: monthlyData.labels,
                datasets: [
                  {
                    label: 'Número de Eventos',
                    data: monthlyData.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={commonOptions}
            />
          </div>
        ) : (
          <p className="text-center">No hay suficientes datos para mostrar eventos mensuales.</p>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-center mb-2">Eventos Acumulados</h3>
        {cumulativeData.labels.length > 0 ? (
          <div style={{ height: '300px' }}>
            <Line
              data={{
                labels: cumulativeData.labels,
                datasets: [
                  {
                    label: 'Total de Eventos',
                    data: cumulativeData.values,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 3,
                  },
                ],
              }}
              options={commonOptions}
            />
          </div>
        ) : (
          <p className="text-center">No hay suficientes datos para mostrar eventos acumulados.</p>
        )}
      </div>
    </div>
  );
};

export default Charts;
