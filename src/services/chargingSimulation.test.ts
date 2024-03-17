import { describe, test, expect } from 'vitest'
import { simulateEvCharging } from "./chargingSimulation";

describe("Test EV Charging Simulation", () => {
  test("Calculates the theoretical maximum power demand correctly", () => {
    const result = simulateEvCharging(30, 100, 20, 15)
    expect(result.theoreticalMaxPowerDemand).toBe(450)
  })

  test("Calculates the actual maximum power demand correctly", () => {
    const result = simulateEvCharging(20, 100, 18, 11)
    expect(result.actualMaxPowerDemand).toBeGreaterThanOrEqual(77)
    expect(result.actualMaxPowerDemand).toBeLessThanOrEqual(121)
  })

  test("Calculates the concurrency factor correctly", () => {
    const result = simulateEvCharging(20, 100, 18, 11)
    console.log(result.concurrencyFactor)
    expect(result.concurrencyFactor).toBeGreaterThanOrEqual(0.35)
    expect(result.concurrencyFactor).toBeLessThanOrEqual(0.55)
  })
})
