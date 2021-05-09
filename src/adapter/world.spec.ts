import { renameWorldFolder } from "./world"
const shell = require("shelljs")

describe("World", () => {
	beforeEach(() => {
		Object.assign(shell, {
			mv: jest.fn()
		})
		Date.now = jest.fn().mockReturnValue(new Date(Date.UTC(2021, 4, 21, 15, 31, 24)).valueOf())
	})

	describe("renameWorldFolder", () => {
		it("should rename a world and postfix it with a time", () => {
			renameWorldFolder()

			expect(shell.mv).toHaveBeenCalledWith("world", "world_2021-05-21_15-31-24")
		})
	})
})
