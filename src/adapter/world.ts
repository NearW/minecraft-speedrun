import rimraf from "rimraf"
import shell from "shelljs"

export function deleteWorldFolder() {
	console.log("Deleting world folder ...")
	rimraf.sync("world")
}

export function renameWorldFolder() {
	const isoString = new Date(Date.now()).toISOString()
	const end = isoString.lastIndexOf(".")
	const timeString = isoString.replace(/:/g, "-").replace("T", "_").slice(0, end)
	const renamedWorldFolder = `world_${timeString}`
	console.log(`Renaming world folder to ${renamedWorldFolder}`)
	shell.mv("world", renamedWorldFolder)
}
