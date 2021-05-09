import { Configuration } from "../model/configuration"
import { removeSeed } from "./configuration"
import { promises } from "fs"

const FILE_NAME = "server.properties"

export async function initSeed(seeds: string[], configuration: Configuration) {
	if (seeds?.length === 0 && (await seedExists())) {
		await resetSeed()
		return
	}

	if (seeds?.length > 0) {
		await setSeed(seeds[0])
		await removeSeed(configuration)
	}
}

export async function setWorld(world: string) {
	console.log(`Setting world ${world} ...`)
	const serverProperties = await promises.readFile(FILE_NAME, "utf-8")
	await setProperty(serverProperties, "level-name", world)
}

async function setSeed(seed) {
	console.log(`Setting seed ${seed} ...`)
	const serverProperties = await promises.readFile(FILE_NAME, "utf-8")
	await setProperty(serverProperties, "level-seed", seed)
}

async function resetSeed() {
	console.log("Resetting seed ...")
	const serverProperties = await promises.readFile(FILE_NAME, "utf-8")
	await setProperty(serverProperties, "level-seed")
}

async function seedExists() {
	const serverProperties = await promises.readFile(FILE_NAME, "utf-8")
	const key = "level-seed="
	const start = serverProperties.indexOf(key) + key.length
	const end = serverProperties.indexOf("\n", start)

	return end - start > 1
}

async function setProperty(serverProperties: string, key: string, value: string = "") {
	const start = serverProperties.indexOf(key) + key.length + 1
	const end = serverProperties.indexOf("\n", start)
	const updated = serverProperties.substring(0, start) + value + serverProperties.substring(end)
	await promises.writeFile(FILE_NAME, updated, "utf-8")
}
