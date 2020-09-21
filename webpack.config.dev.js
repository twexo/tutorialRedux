const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'cheap-module-source-map', // let us see the original code in the borwser
    entry: './src/index', //putem omite  .js
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        stats: 'minimal',
        overlay: true,
        historyApiFallback: true, //  all request will be sent to index.html si vor fi handleuite de ReactRouter,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://localhost:3001") //webpack require this stringify for values 
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",  // unde sa gaseasca index.html
            favicon: "src/favicon.ico"
        })
    ],
    module: { //what files do we want to handle
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"]

            }
        ]
    }
}