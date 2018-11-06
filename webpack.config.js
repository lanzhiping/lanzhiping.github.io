const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathRes = p => path.resolve(__dirname, p);
const extractSass = new ExtractTextPlugin({
    filename: "[name].[hash:5].css"
});

module.exports = {
    entry: './app/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),

        filename: 'bundle.[hash:5].js'
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
                use: extractSass.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: pathRes('app/index.html'),
            favicon: 'favicon.ico',
            filename: pathRes('index.html')
        }),
        new UglifyJsPlugin()
    ],

    devServer: {
        compress: true,
        port: 9000,
    }
};
