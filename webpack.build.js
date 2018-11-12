'use strict';
import path from 'path';



const webpackConfig = {
    debug: true,
    devtool: 'source-map',
    entry: './src/webpages/index.js',
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader'
            },{
                test: /\.(css|scss)$/,
                exclude: /node_module/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },{
                test: /\.less$/,
                exclude: /node_module/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_module/,
                loader: 'url-loader?limit=1000&name=images/[name]_[hash].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                // loader: 'url-loader?limit=10240'
                loader: 'url-loader?limit=10240&name=fonts/[name].[ext]'
            },{
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                // loader: 'url-loader?limit=10240'
                loader: 'url-loader?limit=10240&name=fonts/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};


export default webpackConfig;
