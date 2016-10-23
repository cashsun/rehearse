/**
 * Created by cashsun on 2016/10/19.
 */
var path = require('path');
var os = require('os');
var webpack = require('webpack');
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
    entry: [
        'webpack/hot/only-dev-server',
        path.join(workingDir, `${VIEWER}.js`)
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loaders: ['react-hot', 'babel-loader?cacheDirectory=true']
            },
            {
                test: /\.less$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
            }
        ].concat(additionalWebpackLoaders)
    },
    devtool: 'source-map',
    output: {
        filename: `${VIEWER}.build.js`,
        publicPath: '/viewer',
        path: path.resolve(tmpdir)
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ].concat(additionalWebpackPlugins)
};

module.exports = webpackConfig;