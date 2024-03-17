type EvChargingSimulationResultProps = {
  totalEnergyConsumed: number
  theoreticalMaxPowerDemand: number
  actualMaxPowerDemand: number
  concurrencyFactor: number
}

function EvChargingSimulationResult({ totalEnergyConsumed, theoreticalMaxPowerDemand, actualMaxPowerDemand, concurrencyFactor }: EvChargingSimulationResultProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Simulation Result</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="font-semibold">Total Energy Consumed:</div>
        <div className="text-gray-400">{totalEnergyConsumed.toFixed(2)} kWh</div>

        <div className="font-semibold">Theoretical Max Power Demand:</div>
        <div className="text-gray-400">{theoreticalMaxPowerDemand.toFixed(2)} kW</div>

        <div className="font-semibold">Actual Max Power Demand:</div>
        <div className="text-gray-400">{actualMaxPowerDemand.toFixed(2)} kW</div>

        <div className="font-semibold">Concurrency Factor:</div>
        <div className="text-gray-400">{(concurrencyFactor * 100).toFixed(2)} %</div>
      </div>
    </div>
  )
}

export default EvChargingSimulationResult
