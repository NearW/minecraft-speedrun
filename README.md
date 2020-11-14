# Minecraft Speedrun Server

This project provides a better startup for a speedrun server as it automatically:
- Deletes the world folder after stopping the server
- Restarts the server
- Turns off auto-save to prevent the lag every 5 minutes

## Prerequisites

- JRE 8 installed https://www.java.com/download/
- Node LTS installed https://nodejs.org/en/download/

## Usage

- Move files to the server folder
- Update the `speedrun.json` with the desired settings
- Execute `Server.bat` to launch your server

## Disclaimer

This only works on Windows servers.

With this setup entering commands directly to the terminal is not possible anymore.
Please set the operators name in the configuration, so that one player can use the in-game
commands to add all players to the whitelist.