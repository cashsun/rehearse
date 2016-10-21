/**
 * Created by cashsun on 2016/10/19.
 */
var path = require('path');
var os = require('os');
var tmpdir = os.tmpdir();
console.log('tmpdir', tmpdir);
var workingDir = process.cwd();
var config = require(path.join(workingDir, 'rehearse.config.js'));
var VIEWER = 'rehearse-viewer';
var webpackOverride = config.webpack || {};
var additionalWebpackLoaders = webpackOverride.loaders || [];
var additionalWebpackPlugins = webpackOverride.plugins || [];

var webpackConfig = {
    cache: true,
    entry: path.join(workingDir, `${VIEWER}.js`),
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
            }
        ].concat(additionalWebpackLoaders)
    },
    watch: true,
    debug: true,
    devtool: 'source-map',
    output: {
        filename: VIEWER + '.build.js',
        path: path.resolve(tmpdir),
        publicPath: '/viewer'
    },
    plugins: [].concat(additionalWebpackPlugins)
};

module.exports = webpackConfig;