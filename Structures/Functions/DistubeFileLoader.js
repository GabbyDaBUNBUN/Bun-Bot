const { glob } = require("glob")
const { promisify } = require("util")
const globPromise = promisify(glob)

module.exports = async (client) => {

    const eventFiles = await globPromise(`${process.cwd()}/Distube_Events/*.js`)
    eventFiles.map((value) => require(value))

}