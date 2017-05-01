const path = require('path')

module.exports = {
    entry: {
        bundle: ['./static-content/index.js']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: '[name].js'
    }
}