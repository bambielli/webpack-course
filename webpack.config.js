const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: ['./static-content/index.js'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash:5].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/public/index.html"),
            chunks: ["vendor", "main", "manifest"] // bundles injected to template
        }),
        new ExtractTextPlugin('[name].[contenthash:5].css')
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 3000,
        publicPath: '/',
        setup: function (app) {
            app.get('/api/data', function(req, res) {
                res.json({some: 'data'});
            });
        },
        stats: {
            chunks: false // gets rid of noisy chunks output
        }
    },
    devtool: 'cheap-eval-source-map'
};