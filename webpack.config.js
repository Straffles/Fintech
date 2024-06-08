const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = {
    target: 'node',
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { tls: false };
    
        return config;
      },
    watch: true
}

module.exports = {
    mode: 'development',
    plugins: [
        new NodePolyfillPlugin()
    ]
}

