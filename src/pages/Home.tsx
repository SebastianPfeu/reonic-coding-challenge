import { useState } from 'react'
import EvChargingSimulationForm from '../components/Forms/EvChargingSimulationForm'
import EvChargingSimulationResult from '../components/DataOutput/EvChargingSimulationResult'
import ChargePointLineChart from '../components/DataOutput/ChargePointLineChart'
import { SimulationInput, SimulationResult, simulateEvCharging } from "../services/chargingSimulation"

function Home() {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>()

  const handleFormSubmission = (formData: SimulationInput) => {
    const result = simulateEvCharging(
      formData.numberOfChargePoints,
      formData.arrivalProbabilityMultiplier,
      formData.consumptionOfCars,
      formData.chargingPowerPerChargePoint
    )
    setSimulationResult(result)
  }

  return (
    <div className="bg-gray-50 min-h-screen p-5">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
            EV Charging Simulation
          </h1>
          <EvChargingSimulationForm onSubmit={handleFormSubmission} />
          {simulationResult ?
            <>
              <EvChargingSimulationResult
                totalEnergyConsumed={simulationResult.totalEnergyConsumed}
                theoreticalMaxPowerDemand={simulationResult.theoreticalMaxPowerDemand}
                actualMaxPowerDemand={simulationResult.actualMaxPowerDemand}
                concurrencyFactor={simulationResult.concurrencyFactor}
              />
              <ChargePointLineChart
                chargePointData={simulationResult.chargePointData}
              />
            </> :
            <div className="text-center">
              <span className="text-gray-400">Run the simulation to see a result.</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home
