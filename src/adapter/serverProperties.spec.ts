const { initSeed } = require("./serverProperties")
const fs = require("fs")

describe("ServerProperties", () => {
	beforeEach(() => {
		jest.resetAllMocks()
		fs.promises.writeFile = jest.fn()
		fs.promises.readFile = jest.fn()
	})
	const configuration = { MIN_RAM: 4, MAX_RAM: 8, OP: [], WHITELIST: [], DATA_PACK: false, SEEDS: [] }

	it("should set the seed", async () => {
		fs.promises.readFile = jest.fn().mockReturnValue("online-mode=true\nlevel-seed=\nuse-native-transport=true")
		const expected = "online-mode=true\n" + "level-seed=1234\n" + "use-native-transport=true"

		await initSeed(["1234", "5678"], configuration)

		expect(fs.promises.writeFile).toHaveBeenNthCalledWith(1, "server.properties", expected, "utf-8")
	})

	it("should reset the seed", async () => {
		fs.promises.readFile = jest.fn().mockReturnValue("online-mode=true\nlevel-seed=1234\nuse-native-transport=true")
		const expected = "online-mode=true\n" + "level-seed=\n" + "use-native-transport=true"

		await initSeed([], configuration)

		expect(fs.promises.writeFile).toHaveBeenNthCalledWith(1, "server.properties", expected, "utf-8")
	})
})
