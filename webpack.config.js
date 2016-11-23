/**
 * Created by cashsun on 2016/10/19.
 */
var path = require('path');
var argv = require('yargs').argv;
var os = require('os');
var webpack = require('webpack');
var tmpdir = os.tmpdir();
console.log('tmpdir', tmpdir);
var workingDir = process.cwd();
var configPath = argv.config || 'rehearse.config.js';
var config = require(path.join(workingDir, configPath));
var VIEWER = 'rehearse-viewer';
var webpackOverride = config.webpack || {};
var overrideLoaders = webpackOverride.overrideLoaders;
var overridePlugins = webpackOverride.overridePlugins;
var additionalWebpackLoaders = webpackOverride.loaders || [];
var additionalWebpackPlugins = webpackOverride.plugins || [];
var modulesDirectories = webpackOverride.modulesDirectories;
var additionalEntry = webpackOverride.entry || [];
var additionalAlias = webpackOverride.alias || {};

var webpackConfig = {
    cache: true,
    resolve: {
        alias: Object.assign({
            rehearse: __dirname
        }, additionalAlias),
        root: [
            path.join(__dirname, 'node_modules'),
            path.join(workingDir, 'node_modules'),
            path.resolve(__dirname)
        ],
        modulesDirectories
    },
    entry: [
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(workingDir, `${VIEWER}.js`),
    ].concat(additionalEntry),
    module: {
        loaders: overrideLoaders ? additionalWebpackLoaders : [
            {
                test: /\.js$/,
                exclude: /(node_modules)(?!.{1}rehearse)/,
                loaders: [ 'babel-loader', 'react-hot-loader/webpack']
            },
        ].concat(additionalWebpackLoaders)
    },
    devtool: webpackOverride.devtool || 'eval',
    output: {
        filename: `${VIEWER}.build.js`,
        publicPath: '/viewer',
        path: path.resolve(tmpdir)
    },
    plugins: overridePlugins ? additionalWebpackPlugins : [
        new webpack.HotModuleReplacementPlugin()
    ].concat(additionalWebpackPlugins)
};

module.exports = webpackConfig;