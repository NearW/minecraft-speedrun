export interface ConfigurationApi {
	MIN_RAM: number
	MAX_RAM: number
	OP?: string[]
	WHITELIST?: string[]
	DATA_PACK?: boolean
	SEEDS?: string[]
	AUTO_SAVE?: boolean
	KEEP_WORLDS?: boolean
	LOAD_WORLD?: string
	JAR_NAME?: string
}
