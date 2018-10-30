const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require("path");
const webpack = require("webpack");
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

const CSSApp = new ExtractTextPlugin('css/app.css');
const CSSAppExtract = CSSApp.extract({fallback: 'style-loader',use: ['css-loader', 'sass-loader']});

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js",
        publicPath: '/'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js'],
        alias: {
            assets: path.join(__dirname, 'assets/')
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015','react', 'stage-0']
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                use: CSSAppExtract
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(gif|png|jpe?g|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./html/index.html", to: "index.html" },
            { from: "./html/img/", to: "img"},
            { from: "./html/assets/", to: "assets"},
            { from: "./html/resource/", to: "resource"},
            { from: "./node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2", to: "fonts/glyphicons-halflings-regular.woff2"}
        ]),
        new MergeIntoSingleFilePlugin({
            "js/vendor.js":[
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'vendor/datepicker/moment.js',
                'vendor/datepicker/bootstrap-datetimepicker.js'
            ],
            "css/vendor.css":[
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/react-select/dist/react-select.css',
                'node_modules/react-datepicker/dist/react-datepicker.css',
                'vendor/datepicker/bootstrap-datetimepicker.css'
            ]
        }),
        CSSApp
    ],
    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        compress: true,
        port: 8000,
        host: "0.0.0.0",
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        },
        historyApiFallback: true
    }
};
