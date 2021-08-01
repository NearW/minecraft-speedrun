import { ConfigurationApi } from "../model/configurationApi"

export function validateConfiguration(configuration: ConfigurationApi) {
	const mandatoryFields = new Set(["MIN_RAM", "MAX_RAM"])
	const missingValues = []

	const keys = Object.keys(configuration)
	for (const key of keys) {
		const value = configuration[key]
		if (mandatoryFields.has(key)) {
			mandatoryFields.delete(key)
			if (!value) {
				missingValues.push(key)
			}
		}
	}

	let errorMessage = "Error during validation."
	let hasErrors = false
	if (mandatoryFields.size > 0) {
		errorMessage += ` Missing configuration properties: ${Array.from(mandatoryFields)}.`
		hasErrors = true
	}

	if (missingValues.length > 0) {
		errorMessage += ` Missing configuration values for: ${missingValues}.`
		hasErrors = true
	}

	if (hasErrors) throw Error(errorMessage)
}
