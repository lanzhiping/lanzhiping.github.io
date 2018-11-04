const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pathRes = p => path.resolve(__dirname, p);
const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

module.exports = {
    entry: ['./app/index.js'],

    output: {
        path: path.resolve(__dirname, 'dist'),

        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                },
            },

            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })
            }
        ]
    },

    plugins: [
        extractSass,
        new HtmlWebpackPlugin({ template: pathRes('index.html') }),
    ],

    devServer: {
        contentBase: pathRes('dist'),
        compress: true,
        port: 9000
    }
};
