import { ChildProcess, spawn } from "child_process"
import shell from "shelljs"
import { parseConfiguration } from "./adapter/configuration"
import { initSeed, setWorld } from "./adapter/serverProperties"
import { deleteWorldFolder, renameWorldFolder } from "./adapter/world"

async function startServer() {
	setupErrorListeners()

	const configuration = await parseConfiguration()
	const { MIN_RAM, MAX_RAM, OP, WHITELIST, DATA_PACK, SEEDS, AUTO_SAVE, KEEP_WORLDS, LOAD_WORLD } = configuration

	if (LOAD_WORLD) {
		await setWorld(LOAD_WORLD)
	} else {
		if (KEEP_WORLDS) {
			renameWorldFolder()
		} else {
			deleteWorldFolder()
		}
		await initSeed(SEEDS, configuration)
	}

	const server = spawn("java", [`-Xms${MIN_RAM}G`, `-Xmx${MAX_RAM}G`, "-jar", "server.jar", "nogui"])
	redirectStdio(server)
	setupExitListener(server)

	server.stdout.on("data", data => {
		if (data.includes('For help, type "help"')) {
			for (let player of WHITELIST) {
				console.log(`Adding ${player} to whitelist.`)
				server.stdin.write(`/whitelist add ${player}\n`)
			}

			for (let op of OP) {
				console.log(`Making ${op} an operator.`)
				server.stdin.write(`/op ${op}\n`)
			}

			if (!AUTO_SAVE) {
				console.log(`Turning auto-save off.`)
				server.stdin.write("/save-off\n")
			}

			if (DATA_PACK) {
				shell.cp("-Rf", "datapacks/.", "world/datapacks")
				server.stdin.write("/reload\n")
			}
		}
	})

	server.on("exit", async () => {
		server.kill()
		await startServer()
	})
}

function setupErrorListeners() {
	process.on("uncaughtException", exception => {
		console.log(exception)
		process.exit(1)
	})

	process.on("unhandledRejection", rejection => {
		console.log(rejection)
		process.exit(1)
	})
}

function setupExitListener(server) {
	process.stdin.on("data", data => {
		if (data.includes("/exit")) {
			server.kill()
			process.exit(0)
		}
	})
}

function redirectStdio(childProcess: ChildProcess) {
	childProcess.stdout.pipe(process.stdout)
	childProcess.stderr.pipe(process.stderr)
	process.stdin.pipe(childProcess.stdin)
}

startServer()
