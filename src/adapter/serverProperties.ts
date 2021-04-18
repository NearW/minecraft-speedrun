import { Configuration } from "../model/configuration"
import { removeSeed } from "./configuration"
import { promises } from "fs"

const FILE_NAME = "server.properties"

export async function initSeed(seeds: string[], configuration: Configuration) {
	if (seeds?.length > 0) {
		await setSeed(seeds[0])
		await removeSeed(configuration)
	} else {
		await setSeed("")
	}
}

async function setSeed(seed) {
	console.log(`Setting seed ${seed} ...`)
	const serverProperties = await promises.readFile(FILE_NAME, "utf-8")
	const key = "level-seed="
	const start = serverProperties.indexOf(key) + key.length
	const end = serverProperties.indexOf("\n", start)

	const updated = serverProperties.substring(0, start) + seed + serverProperties.substring(end)

	await promises.writeFile(FILE_NAME, updated, "utf-8")
}
