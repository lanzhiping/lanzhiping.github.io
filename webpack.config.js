const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathRes = p => path.resolve(__dirname, p);

module.exports = {
    mode: process.env.NODE_ENV || 'development',

    entry: './app/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),

        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                },
            },

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ template: pathRes('index.html'), favicon: 'favicon.ico' }),
    ],

    devServer: {
        compress: true,
        port: 9000,
    }
};
