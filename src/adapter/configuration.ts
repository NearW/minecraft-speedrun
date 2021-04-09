import { Configuration } from "../model/configuration"
import { promises } from "fs"

export async function parseConfiguration(): Promise<Configuration> {
	console.log("Parsing speedrun.json ...")
	const json = await promises.readFile("speedrun.json", "utf-8")
	return JSON.parse(json)
}

export async function removeSeed(configuration: Configuration) {
	console.log("Seed is loaded. Removing it from the speedrun.json ...")
	configuration.SEEDS.shift()
	await promises.writeFile("speedrun.json", JSON.stringify(configuration), "utf8")
}
