import { validateConfiguration } from "./configuration"
import { ConfigurationApi } from "../model/configurationApi"

describe("Configuration", () => {
	function testShouldFail() {
		expect(true).toBeFalsy()
	}

	describe("validateConfiguration", () => {
		it("should throw an error if mandatory property is missing", () => {
			const message = "Error during validation. Missing configuration properties: MIN_RAM,MAX_RAM."

			const configuration: any = {}

			try {
				validateConfiguration(configuration)
				testShouldFail()
			} catch (error) {
				expect(error.message).toEqual(message)
			}
		})

		it("should throw an error if mandatory value is missing", () => {
			const message = "Error during validation. Missing configuration values for: MAX_RAM."
			const configuration = { MIN_RAM: 4, MAX_RAM: undefined }

			try {
				validateConfiguration(configuration)
				testShouldFail()
			} catch (error) {
				expect(error.message).toEqual(message)
			}
		})

		it("should not throw an error if configuration is valid", () => {
			const configuration: ConfigurationApi = { MIN_RAM: 4, MAX_RAM: 8 }

			validateConfiguration(configuration)
		})

		it("should not throw an error if optional property exists without a value", () => {
			const configuration: ConfigurationApi = { MIN_RAM: 4, MAX_RAM: 8, DATA_PACK: undefined }

			validateConfiguration(configuration)
		})
	})
})
