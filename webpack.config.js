const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: {
        'index': './index.ts'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        publicPath: '/' //omit trailing comma
    },
    target: 'node',
    module: {
        rules:[ //what kind of files are going to be transpiled
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx', '.ts', '.js'
        ]
    },
    externals: [nodeExternals()]

}