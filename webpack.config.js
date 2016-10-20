/**
 * Created by cashsun on 2016/10/19.
 */
const path = require('path');
const webpack = require('webpack');
const workingDir = process.cwd();
const config = require(path.join(workingDir, 'rehearse.config.js'));

const webpackOverride = config.webpack || {};
const additionalWebpackLoaders = webpackOverride.loaders || [];
const additionalWebpackPlugins = webpackOverride.plugins || [];

const webpackConfig = {
    cache: true,
    entry: path.join(__dirname, 'viewer.js'),
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|test)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ].concat(additionalWebpackLoaders)
    },
    watch: true,
    debug: true,
    devtool: 'source-map',
    output: {
        filename: 'viewer.build.js',
        path: __dirname,
        publicPath: '/viewer'
    },
    plugins: [].concat(additionalWebpackPlugins)
};

module.exports = webpackConfig;