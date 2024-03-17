import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

type ChargePointDataPoint = {
  chargePointNumber: number,
  days: number[]
  totalEnergyConsumedPerDay: number[]
}

type ChargePointLineChartProps = {
  chargePointData: ChargePointDataPoint[]
}

function ChargePointLineChart({ chargePointData }: ChargePointLineChartProps) {
  const [selectedChargePoint, setSelectedChargePoint] = useState(0)

  const handleChargePointChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChargePoint(parseInt(event.target.value))
  }

  const chartData = {
    labels: chargePointData[selectedChargePoint]?.days,
    datasets: [
      {
        label: `Total Energy Consumed at Charge Point ${selectedChargePoint + 1} Per Day (in kWh)`,
        data: chargePointData[selectedChargePoint].totalEnergyConsumedPerDay,
        borderColor: "#3C82F6",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        backgroundColor: "#E1ECFD",
        tension: 0.4
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Total Energy Consumed Per Charge Point Per Day</h2>
      <div className="mb-8">
        <form className="max-w-sm">
          <select
            id="countries"
            onChange={handleChargePointChange}
            className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {chargePointData.map(chargePoint => {
              return (
                <option
                  key={chargePoint.chargePointNumber}
                  value={chargePoint.chargePointNumber}
                >
                  Charge point {chargePoint.chargePointNumber + 1}
                </option>
              )
            })}
          </select>
        </form>
      </div>
      <div style={{ position: "relative", height: "40vh" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ChargePointLineChart
