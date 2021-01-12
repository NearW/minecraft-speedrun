# Minecraft Speedrun Server

This project provides a better startup for a speedrun server as it automatically:

-   Deletes the world folder after stopping the server
-   Restarts the server
-   Turns off auto-save to prevent the lag every 5 minutes
-   Moves datapacks to the world folder **(optional)**
-   Sets the seed from a list of seeds sequentially **(optional)**

## Prerequisites

-   JRE 8 installed https://www.java.com/download/
-   Node LTS installed https://nodejs.org/en/download/
-   Working Vanilla Minecraft Server
-   `speedrun.json`, `Server.bat` and `server.js` downloaded https://github.com/NearW/minecraft-speedrun/releases/latest

## Usage

-   Put `speedrun.json`, `Server.bat` and `server.js` in the root folder of your minecraft server
-   Edit your `server.properties` and set the following entries:
    -   spawn-protection=0
    -   allow-flight=true
    -   level-name=world
    -   view-distance=16

_Note: Enabling flight will prevent random disconnects when traveling too fast via boat, riding a horse or other activities._

-   Edit `speedrun.json` with your desired settings. This is the only downloaded file you should change.

```ts
{
    "MIN_RAM": 8, // Minimum allocated RAM in GB, -Xms
    "MAX_RAM": 10, // Maximum allocated RAM in GB, -Xmx
    "OP": ["Thasio"], // List of operators
    "WHITELIST": ["Thasio"], // List of whitelisted players
    "DATA_PACK": false, // set to true, if datapacks should be copied into the world
    "SEEDS": [12345, 6789] // List of set seeds that are played one by one, set [] to disable this option
}
```

_Note: OP and WHITELIST is required in order to set an initial operator. The server console won't be interactive anymore when using this script.
Please add people to the whitelist via ingame commands, e.g /whitelist add <PLAYER>_

### Datapacks

In order to automatically add datapacks to your world on each restart, add a folder named `datapacks` to the root of your
minecraft server and put the unzipped datapacks inside and enable it in the `speedrun.json` config.

### Set Seeds

Add seeds to the `SEEDS` list, if you want to restart the world with set seeds. On each restart, the first seed of the list will be loaded and removed from the list.
This is really helpful, if you want to do some speedrun battles with a pool of set seeds.

## Disclaimer

This only works on Windows servers.

With this setup entering commands directly to the terminal is not possible anymore.
Please set the operators name in the configuration, so that one player can use the in-game
commands to add all players to the whitelist.
