/**
 * Created by cashsun on 2016/10/19.
 */
var path = require('path');
var fs = require('fs');
var express = require('express');
var rehearseSync = require('./rehearseBrowserSync');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var rehearseTemplates = require('./rehearseTemplates');
var componentsFinder = require('./componentsFinder');
var workingDir = process.cwd();
var config = require(path.join(workingDir, 'rehearse.config.js'));
//--------------------config init-------
var statics = config.statics || [];
var appPath = config.appPath;
var autoOpen = config.open;
var componentsPath = config.componentsPath;
var props = config.props;
var port = config.port || 9001;
var devServerPort = (config.webpack && config.webpack.port) || 3000;
var localhost = `http://localhost:${devServerPort}/`;
const appPrefix = '/app';
webpackConfig.entry.unshift(`webpack-dev-server/client?${localhost}`);

if (!Array.isArray(statics)) {
    throw new Error('rehearseConfig.statics has to be an array or leave it undefined');
} else if (statics.length > 0 && !appPath) {
    throw new Error('rehearseConfig.appPath has to be defined if statics is defined. ' +
        'appPath is the direct parent folder of statics.');
}

if (!componentsPath) {
    throw new Error('rehearseConfig.componentsPath, where your react components sit, is mandatory.');
}

if (!props) {
    throw new Error('rehearseConfig.props, whichever file your react components props are defined, is mandatory.');
}

//------------------------------------------
var entryFile = webpackConfig.entry[2];
var components = componentsFinder.find(componentsPath);
rehearseTemplates.buildViewerPage(entryFile, components, props);

var resourceList = statics.map(s => {
    if (/\.js$/.test(s)) {
        return { type: 'js', href: appPrefix + '/' + s };
    } else if (/\.css$/.test(s)) {
        return { type: 'css', href: appPrefix + '/' + s };
    } else {
        throw new Error(`unsupported statics ${s}, please note rehearse currently 
           only support css, less and js as statics`);
    }
});

const syncOpts = {
    proxy: localhost,
    open: autoOpen,
    port
};

var compiler = webpack(webpackConfig);
var pureComponents = componentsFinder.findPureComponents(componentsPath);

var syncServer = new rehearseSync(compiler, syncOpts, Object.assign({ $props: props }, pureComponents), statics.map(s => path.join(appPath, s)));
var devServer = new webpackDevServer(compiler, {
    hot: true,
    stats: { colors: true },
    contentBase: __dirname,
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
        poll: 500
    },
    reporter: function (stats) {
        console.log('compile finished.');
    },
    setup: function (server) {
        console.log('setting up dev server APIs and middlewares...');

        server.use('/rehearse', express.static(__dirname));

        if (statics.length) {
            server.use(appPrefix, express.static(appPath));
        }

        server.use(function (err, req, res, next) {
            res.status(500).send(err);
            next(err)
        });


        server.use('/view/:componentKey/:scenario?', function (req, res, next) {
            var componentKey = req.params.componentKey;
            var scenario = req.params.scenario || '';
            var componentName = components[componentKey] && components[componentKey].displayName || 'undefined';
            console.warn(`requesting ${componentName} (${scenario || 'default'})`);
            res.send(rehearseTemplates.getIndex(resourceList, componentName, componentKey, scenario));
        });

        server.use('/targetframe/:componentKey/:scenario?', function (req, res, next) {
            var componentKey = req.params.componentKey;
            var scenario = req.params.scenario || '';
            var componentName = components[componentKey] && components[componentKey].displayName || 'undefined';
            console.warn(`requesting frame for ${componentName} (${scenario || 'default'})`);
            res.send(rehearseTemplates.getIndex(resourceList, componentName, componentKey, scenario, true));
        });


        server.use('/all', function (req, res, next) {
            res.send(rehearseTemplates.getIndex(resourceList))
        });
    }
});

function handleError() {
    devServer.close();
    syncServer.cleanup();
    console.log('app closed');
    fs.unlinkSync(entryFile);
    console.log('temp file removed.');

}

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
    handleError();
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    process.exit();
});

process.on('SIGINT', () => {
    console.error(`manual termination`);
    process.exit();
});


module.exports = {
    start: function () {
        console.log(`starting Rehearse server at port: ${devServerPort}......`);
        devServer.listen(devServerPort);
        syncServer.run();
    }
};
