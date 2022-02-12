const { join } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (env) => {
    return {
        target: 'web',
        entry: join(__dirname, './src/index.tsx'),
        output: {
            filename: '[name].js',
            path: join(__dirname, './dist')
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
                template: join(__dirname, './src/index.ejs'),
                templateParameters: {
                    base: env.base || '/'
                }
            })
        ],
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx']
        },
        devtool: 'source-map',
        devServer: {
            port: 8080
        }
    };
};
