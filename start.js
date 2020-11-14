const { spawn, exec } = require("child_process")
const fs = require("fs")

function startServer() {
    const { MIN_RAM, MAX_RAM, OP } = JSON.parse(fs.readFileSync("speedrun.json"))
    exec("rmdir /s /q world")
    const mc = spawn("java", ["-d64", `-Xms${MIN_RAM}G`, `-Xmx${MAX_RAM}G`, "-jar", "server.jar", "nogui"])

    mc.stdout.on("data", (data) => {
        // Redirect stdout
        console.log(`${data}`)

        if (data.includes('For help, type "help"')) {
            mc.stdin.write(`/whitelist add ${OP}\n`)
            mc.stdin.write(`/op ${OP}\n`)
            mc.stdin.write("/save-off\n")
        }
    });

    mc.on("exit", () => {
        startServer()
    })
}

startServer()