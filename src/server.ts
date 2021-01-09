import { spawn, exec } from "child_process"
import { promises } from "fs"
import { Configuration } from "./config/Configuration"

async function startServer() {
	const json = await promises.readFile("speedrun.json", "utf-8")
	const configuration = JSON.parse(json) as Configuration
	const { MIN_RAM, MAX_RAM, OP, WHITELIST, DATA_PACK, SEEDS } = configuration

	exec("rmdir /s /q world")

	await initSeed(SEEDS, configuration)

	const server = spawn("java", ["-d64", `-Xms${MIN_RAM}G`, `-Xmx${MAX_RAM}G`, "-jar", "server.jar", "nogui"])

	server.stdout.on("data", data => {
		// Redirect stdout
		console.log(`${data}`)

		if (data.includes('For help, type "help"')) {
			for (let player of WHITELIST) {
				console.log(`Adding ${player} to whitelist.`)
				server.stdin.write(`/whitelist add ${player}\n`)
			}

			for (let op of OP) {
				console.log(`Making ${op} an operator.`)
				server.stdin.write(`/op ${op}\n`)
			}
			server.stdin.write("/save-off\n")

			if (DATA_PACK) {
				exec("Xcopy /E /I datapacks world\\datapacks")
				server.stdin.write("/reload\n")
			}
		}
	})

	server.on("exit", async () => {
		server.kill()
		await startServer()
	})
}

async function initSeed(seeds: number[], configuration: Configuration) {
	if (seeds?.length > 0) {
		await setSeed(seeds[0])
		await removeSeed(configuration)
	} else {
		await setSeed("")
	}
}

async function setSeed(seed) {
	const serverProperties = await promises.readFile("server.properties", "utf-8")
	const key = "level-seed="
	const start = serverProperties.indexOf("level-seed") + key.length
	let end = start

	while (!isNaN(+serverProperties[end])) {
		end++
	}

	const updated = serverProperties.substring(0, start) + seed + "\n" + serverProperties.substring(end)

	await promises.writeFile("server.properties", updated, "utf8")
}

async function removeSeed(configuration: Configuration) {
	configuration.SEEDS.shift()
	await promises.writeFile("speedrun.json", JSON.stringify(configuration), "utf8")
}

startServer()
