import { useState, ChangeEvent, FormEvent } from "react"
import { SimulationInput } from '../../services/chargingSimulation'

type FormProps = {
  onSubmit: (formData: SimulationInput) => void
}

function EvChargingSimulationForm({ onSubmit }: FormProps) {
  const [formState, setFormState] = useState<SimulationInput>({
    numberOfChargePoints: 20,
    arrivalProbabilityMultiplier: 100,
    consumptionOfCars: 18,
    chargingPowerPerChargePoint: 11
  })

  const handleIncrement = (field: keyof SimulationInput, max?: number) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: max ? Math.min((prevState[field] || 0) + 1, max) : (prevState[field] || 0) + 1,
    }))
  }

  const handleDecrement = (field: keyof SimulationInput, min: number) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: Math.max((prevState[field] || 0) - 1, min),
    }))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const numericValue = value === '' ? 0 : parseFloat(value)
    setFormState(prevState => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(formState)
  }

  const resetToInitialValues = () => {
    setFormState({
      numberOfChargePoints: 20,
      arrivalProbabilityMultiplier: 100,
      consumptionOfCars: 18,
      chargingPowerPerChargePoint: 11
    })
  }

  const formFields: { label: string, name: keyof SimulationInput, value: number, min: number, max: number }[] = [
    { label: "Number of charge points:", name: "numberOfChargePoints", value: formState.numberOfChargePoints, min: 1, max: 100 },
    { label: "Arrival probability multiplier (in %):", name: "arrivalProbabilityMultiplier", value: formState.arrivalProbabilityMultiplier, min: 20, max: 200 },
    { label: "Consumption of cars (in kWh):", name: "consumptionOfCars", value: formState.consumptionOfCars, min: 1, max: 100 },
    { label: "Charging power of charge points (in kW):", name: "chargingPowerPerChargePoint", value: formState.chargingPowerPerChargePoint, min: 1, max: 100 },
  ]

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Simulation Input Values</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <div key={field.name} className="mb-4 grid grid-cols-7 gap-4 items-center">
            <label
              className="text-gray-700 text-sm font-bold col-span-3"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <div className="flex col-span-4 justify-end items-center">
              <button
                type="button"
                onClick={() => handleDecrement(field.name, field.min)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mx-2"
              >
                -
              </button>
              <input
                className="w-24 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                id={field.name}
                type="text"
                name={field.name}
                pattern="\d*"
                value={field.value}
                onChange={handleChange}
                min={field.min}
                max={field.max}
              />
              <button
                type="button"
                onClick={() => handleIncrement(field.name, field.max)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mx-2"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <span className="text-gray-700 text-sm font-bold">Note: </span>
          <span className="text-gray-400">Leave values unchanged or click on reset values to use values from task 1.</span>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out m-2"
            type="button"
            onClick={resetToInitialValues}
          >
            Reset values
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out m-2"
            type="submit"
          >
            Run Simulation
          </button>
        </div>
      </form>
    </div>
  )
}

export default EvChargingSimulationForm
