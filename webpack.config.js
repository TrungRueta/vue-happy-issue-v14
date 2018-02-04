/**
 * Created by rueta on 2/4/18.
 */
const webpack = require('webpack')
const path = require('path')
const HappyPack = require('happypack')

module.exports = {
    bail: true,
    cache: true,
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].bundle.js"
    },
    devtool: 'eval-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.scss', '.sass', '.css', '.html', '.vue', '.js'],
        modules: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "src")
        ],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                /**
                 * ***vue-loader ^14.1.1
                 * - if use direct (no happypack) everything work.
                 * - if use happypack loader it will broken
                 * error:
                 * ERROR in ./src/test.vue
                 * Module build failed: TypeError: Object.defineProperty called on non-object
                 *
                 * ****vue-loader 13.7.1
                 * - use direct work fine
                 * - use happypack work fine
                 *
                 * - switch loader lines below to test.
                 */
                // loader: 'vue-loader',
                loader: 'happypack/loader?id=vue',
                include: [
                    path.resolve(__dirname, 'src'),
                ],
            }
        ]
    },

    /// happypack setup
    plugins: [
        /// happy pack
        new HappyPack({
            id: 'vue',
            threads: 5,
            loaders: [
                {
                    loader: 'vue-loader'
                }
            ],
        }),
    ]
}