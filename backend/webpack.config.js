require("dotenv-defaults").config();
const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: process.env.NODE_ENV || "production",
    target: "node",
    entry: {
        app: ["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "index.js"
    },
    module: {
        rules: []
    },
    stats: "errors-only",
    externals: [nodeExternals()],
    plugins: [new NodemonPlugin({ watch: path.resolve("./build") })]
};
