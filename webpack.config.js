var webpack = require('webpack');
const path = require("path");
var nodeExternals = require('webpack-node-externals');

var DEV_PATH = path.resolve(__dirname, 'out/modules');
var BUILD_PATH = path.resolve(__dirname, 'out');
'use strict'
module.exports = (env = {}) => {
    const config = {
        devtool: "source-map",
        entry: "./src/main.ts",
        output: {
            path: BUILD_PATH,
            filename: "server.js",
        },
        target: "node",
        watch: false,
        resolve: {
            extensions: ['.js', '.ts']
        },
        module: {
            rules: [
                //{ loader: 'babel-loader', },
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    include: path.resolve(__dirname, 'src')
                }
            ]
        },
        externals: [nodeExternals()],
        plugins: [
            //new webpack.BannerPlugin(libraryName),
            new webpack.ProvidePlugin({
                '__extends': [path.resolve(__dirname, './src/dependence/extends.js'), '__extends'],
                '__importDefault': [path.resolve(__dirname, './src/dependence/importdefault.js'), '__importDefault'],
                '__awaiter': [path.resolve(__dirname, './src/dependence/awaiter.js'), '__awaiter'],
            })
        ]
    }
    return config;
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: false
        })
    ]);
}