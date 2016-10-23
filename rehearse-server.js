/**
 * Created by cashsun on 2016/10/19.
 */
var path = require('path');
var os = require('os');
var fs = require('fs');
var _ = require('lodash');
var express = require('express');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var viewerTemplte = require('./viewerTemplate');
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
var localhost = `http://localhost:${port}/`;
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
fs.writeFileSync(entryFile, viewerTemplte.build(components, props.replace(/\\/g, '/')));

var resourceList = statics.map(s => {
    if (/\.js$/.test(s)) {
        return { type: 'js', href: s }
    } else if (/\.css$/.test(s)) {
        return { type: 'css', href: s }
    } else {
        throw new Error(`unsupported statics ${s}, please note rehearse currently 
           only support css and js as statics`);
    }
});
var indexTemplate = _.template(fs.readFileSync(path.join(__dirname, 'indexTemplate.html'), { encoding: 'utf8' }));

browserSync.init({
    proxy: localhost,
    open: autoOpen
});

browserSync.watch(config.props).on('change', browserSync.reload);

var compiler = webpack(webpackConfig);

var devServer = new webpackDevServer(compiler, {
    hot: true,
    stats: { colors: true },
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    watchOptions: {
        poll: 500
    },
    setup: function (server) {
        console.log('setting up................');

        if (statics.length) {
            server.use('/app', express.static(appPath));
        }

        server.use(function (err, req, res, next) {
            res.status(500).send(err);
            next(err)
        });


        server.use('/view/:component', function (req, res, next) {
            var component = req.params.component;
            console.warn(`requesting ${component}`);


            res.send(indexTemplate({
                statics: resourceList,
                component
            }))
        });

        server.use('/all', function (req, res, next) {
            var viewerPage = indexTemplate({
                statics: resourceList,
                component: 'un-defined'
            });
            res.send(viewerPage)
        });
    }
});
function handleError() {
    devServer.close();
    console.log('app closed');

    fs.unlinkSync(entryFile);
    console.log('temp file removed.');
    browserSync.cleanup();

}

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
    handleError();
});

process.on('uncaughtException', (err) => {
    console.error(`UnCaught exception: ${err}`);
    process.exit();
});

process.on('SIGINT', () => {
    console.error(`manual termination`);
    process.exit();
});


module.exports = {
    start: function () {
        console.log('starting Rehearse server......');
        devServer.listen(port);
    }
};
