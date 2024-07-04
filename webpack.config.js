const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "dist"),
    },
    watch: false,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },                     
                    {
                        loader: 'css-loader',
                        options : {
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ],
                                ],
                            },
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            //publicPath: '../'
        }),
        new HtmlWebpackPlugin({
            title: "My App",
            filename: "index.html",
            template: "src/index.html"
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        watchFiles: ['src/index.html'], // Watch the HTML file for changes
      },
}