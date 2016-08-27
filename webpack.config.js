"use strict";

const path = require("path");
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = 'commonjs ' + mod);

module.exports = [
    {
        name: 'Client Build',
        entry : {
            app: path.resolve(__dirname, "src/app-client.jsx"),
        },
        output: {
            path    : path.join(__dirname, "build", "public", "js"),
            filename: "[name].bundle.js"
        },
        target: 'web',
        module: {
            loaders: [
                {
                    test          : /\.jsx$/,
                    exclude       : /(node_modules)/,
                    loader        : "babel",
                    cacheDirectory: true,
                    query         : {
                        presets: [
                            "es2015",
                            "react"
                        ]
                    }
                }
            ]
        },
        devtool: "source-map"
    },
    {
        name: 'Server Build',
        entry : path.resolve(__dirname, "src/app-server.js"),
        output: {
            path    : path.join(__dirname, "build"),
            filename: "app-server.js"
        },
        externals: nodeModules,
        target: 'node',
        module: {
            loaders: [
                {
                    test          : /\.jsx?$/,
                    exclude       : /(node_modules)/,
                    loader        : "babel",
                    cacheDirectory: true,
                    query         : {
                        presets: [
                            "es2015",
                            "react"
                        ]
                    }
                }
            ]
        },
        node: {
            console: true,
            global: true,
            process: true,
            Buffer: true,
            __filename: false,
            __dirname: false
        },
        devtool: "source-map"
    }
];
