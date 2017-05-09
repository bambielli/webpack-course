const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // entry defines where webpack should start to create its dependency graph
    entry: {
        main: ['./static-content/index.js'],
        vendor: ['react', 'react-dom']
    },
    // output defines where webpack should put the bundled code
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash:5].bundle.js',
        publicPath: '/'
    },
    // module defines loaders (rules) for transpiling and transforming files
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
    // plugines define the plugins required for additional processing of bundles and chunks
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
    // webpack dev server is an express server to serve your application
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
    devtool: 'cheap-eval-source-map',
    // resolve defines aliases for frequently accessed paths
    resolve: {
      extensions: ['.js', '.css'],
      alias: {
        mainCSS$: path.resolve(__dirname, 'static-content/css/deep/down/in/folders/main.css')
      }
    }
};