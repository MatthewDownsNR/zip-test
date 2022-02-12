const { join } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    target: 'web',
    entry: join(__dirname, './src/index.tsx'),
    output: {
        filename: '[name].[chunkhash].js',
        path: join(__dirname, './dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            }
        ]
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlPlugin({
            template: join(__dirname, './src/index.html')
        })
    ],
    resolve: {
        extensions: [ '.js', '.json', '.ts', '.tsx']
    },
    devtool: 'source-map',
    devServer: {
        port: 8080
    }
};
