import rimraf from "rimraf"

export function deleteWorldFolder() {
	console.log("Deleting world folder ...")
	rimraf.sync("world")
}
