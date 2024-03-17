import { arrivalProbabilities, chargingDemandProbabilities } from "../data/probabilityDistributions"

export const NUMBER_OF_CHARGE_POINTS = 20 // in #
export const POWER_PER_CHARGE_POINT = 11 // in kW
export const ENERGY_PER_100KM = 18 // in kWh
const TOTAL_TICKS = 4 * 24 * 365 // in # (intervals of 15 minutes, 365 days per year)
const ARRIVAL_PROBABILITY_MULTIPLIER = 100
const DAYS_IN_YEAR = 365;

export type SimulationInput = {
  numberOfChargePoints: number
  arrivalProbabilityMultiplier: number
  consumptionOfCars: number
  chargingPowerPerChargePoint: number
}

export type SimulationResult = {
  totalEnergyConsumed: number
  theoreticalMaxPowerDemand: number
  actualMaxPowerDemand: number
  concurrencyFactor: number
  chargePointData: Array<{ // chargePointData is only being used for task 2a to display data per charge point per day
    chargePointNumber: number,
    days: number[]
    totalEnergyConsumedPerDay: number[]
  }>
}

export function simulateEvCharging(
  numberOfChargePoints: number = NUMBER_OF_CHARGE_POINTS,
  arrivalProbabilityMultiplier: number = ARRIVAL_PROBABILITY_MULTIPLIER,
  consumptionOfCars: number = ENERGY_PER_100KM,
  chargingPowerPerChargePoint: number = POWER_PER_CHARGE_POINT
): SimulationResult {
  let totalEnergyConsumed = 0
  let actualMaxPowerDemand = 0

  // chargePointData is only being used for task 2a to display data per charge point per day
  const chargePointData = new Array(numberOfChargePoints).fill(null).map((_, cpIndex) => ({
    chargePointNumber: cpIndex,
    days: Array.from({ length: DAYS_IN_YEAR }, (_, i) => i + 1),
    totalEnergyConsumedPerDay: Array(DAYS_IN_YEAR).fill(0),
  }))

  for (let tick = 0; tick < TOTAL_TICKS; tick++) {
    let intervalPowerDemand = 0;
    const dayIndex = Math.floor(tick / (4 * 24)) // dayIndex is only required for chargePointData

    for (let cp = 0; cp < numberOfChargePoints; cp++) {
      if (doesEvArrive(tick, arrivalProbabilityMultiplier)) {
        const chargingDemandKWh = (getRandomChargingDemand() / 100) * consumptionOfCars
        totalEnergyConsumed += chargingDemandKWh
        intervalPowerDemand += chargingPowerPerChargePoint

        chargePointData[cp].totalEnergyConsumedPerDay[dayIndex] += chargingDemandKWh
      }
    }
    actualMaxPowerDemand = Math.max(actualMaxPowerDemand, intervalPowerDemand)
  }

  const theoreticalMaxPowerDemand = numberOfChargePoints * chargingPowerPerChargePoint
  const concurrencyFactor = actualMaxPowerDemand / theoreticalMaxPowerDemand

  return {
    totalEnergyConsumed,
    theoreticalMaxPowerDemand,
    actualMaxPowerDemand,
    concurrencyFactor,
    chargePointData
  };
}

// Bonus #1
// Result of running simulatEvChargingFor1To30ChargePoints: The more charge points, the lower the concurrency factor
export function simulateEvChargingFor1To30ChargePoints() {
  for (let cp = 1; cp <= 30; cp++) {
    const result = simulateEvCharging(cp)
    console.log(`Concurrency Factor: ${result.concurrencyFactor}`)
  }
}

// Supporting function #1: Determine if an EV arrives based on a given time of day
function doesEvArrive(timeOfDay: number, arrivalProbabilityMultiplier: number): boolean {
  const hour = timeOfDay % 24
  const probability = arrivalProbabilities.find(p => hour >= p.startTime && hour < p.endTime)?.probability ?? 0
  const adjustedProbability = probability * (arrivalProbabilityMultiplier / 100)
  return Math.random() < adjustedProbability
}

// Supporting function #2: Get a random charging demand based on probabilities
function getRandomChargingDemand(): number {
  let randomValue = Math.random()
  for (const demand of chargingDemandProbabilities) {
    randomValue -= demand.probability
    if (randomValue < 0) {
      return demand.range
    }
  }
  return 0
}
