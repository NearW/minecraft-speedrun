import { Configuration } from "../model/configuration"
import { promises } from "fs"

export async function parseConfiguration(): Promise<Configuration> {
	console.log("Parsing speedrun.json ...")
	const json = await promises.readFile("speedrun.json", "utf-8")
	const configuration: Configuration = JSON.parse(json)
	return useFallbacks(configuration)
}

export async function removeSeed(configuration: Configuration) {
	console.log("Seed is loaded. Removing it from the speedrun.json ...")
	configuration.SEEDS.shift()
	await promises.writeFile("speedrun.json", JSON.stringify(configuration), "utf8")
}

async function useFallbacks(configuration: Configuration): Promise<Configuration> {
	return {
		MIN_RAM: configuration.MIN_RAM,
		MAX_RAM: configuration.MAX_RAM,
		OP: configuration.OP ?? [],
		WHITELIST: configuration.WHITELIST ?? [],
		DATA_PACK: configuration.DATA_PACK ?? false,
		SEEDS: configuration.SEEDS ?? [],
		AUTO_SAVE: configuration.AUTO_SAVE ?? false,
		KEEP_WORLDS: configuration.KEEP_WORLDS ?? false,
		LOAD_WORLD: configuration.LOAD_WORLD ?? ""
	}
}
