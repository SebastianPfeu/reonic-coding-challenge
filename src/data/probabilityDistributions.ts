type ArrivalProbability = {
  startTime: number
  endTime: number
  probability: number
}

type ChargingDemandProbability = {
  range: number
  probability: number
}

export const arrivalProbabilities: ArrivalProbability[] = [
  { startTime: 0, endTime: 1, probability: 0.0094 },
  { startTime: 1, endTime: 2, probability: 0.0094 },
  { startTime: 2, endTime: 3, probability: 0.0094 },
  { startTime: 3, endTime: 4, probability: 0.0094 },
  { startTime: 4, endTime: 5, probability: 0.0094 },
  { startTime: 5, endTime: 6, probability: 0.0094 },
  { startTime: 6, endTime: 7, probability: 0.0094 },
  { startTime: 7, endTime: 8, probability: 0.0094 },
  { startTime: 8, endTime: 9, probability: 0.0283 },
  { startTime: 9, endTime: 10, probability: 0.0283 },
  { startTime: 10, endTime: 11, probability: 0.0566 },
  { startTime: 11, endTime: 12, probability: 0.0566 },
  { startTime: 12, endTime: 13, probability: 0.0566 },
  { startTime: 13, endTime: 14, probability: 0.0755 },
  { startTime: 14, endTime: 15, probability: 0.0755 },
  { startTime: 15, endTime: 16, probability: 0.0755 },
  { startTime: 16, endTime: 17, probability: 0.1038 },
  { startTime: 17, endTime: 18, probability: 0.1038 },
  { startTime: 18, endTime: 19, probability: 0.1038 },
  { startTime: 19, endTime: 20, probability: 0.0472 },
  { startTime: 20, endTime: 21, probability: 0.0472 },
  { startTime: 21, endTime: 22, probability: 0.0472 },
  { startTime: 22, endTime: 23, probability: 0.0094 },
  { startTime: 23, endTime: 24, probability: 0.0094 },
]

export const chargingDemandProbabilities: ChargingDemandProbability[] = [
  { range: 0.0, probability: 0.3431 },
  { range: 5.0, probability: 0.0490 },
  { range: 10.0, probability: 0.0980 },
  { range: 10.0, probability: 0.0980 },
  { range: 20.0, probability: 0.1176 },
  { range: 30.0, probability: 0.0882 },
  { range: 50.0, probability: 0.1176 },
  { range: 100.0, probability: 0.1078 },
  { range: 200.0, probability: 0.0490 },
  { range: 300.0, probability: 0.0294 }
]
