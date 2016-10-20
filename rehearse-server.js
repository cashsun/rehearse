/**
 * Created by cashsun on 2016/10/19.
 */
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const viewerTemplte = require('./viewerTemplate');
const browserSync = require('browser-sync').create();
const componentsFinder = require('./componentsFinder');
const workingDir = process.cwd();
const config = require(path.join(workingDir, 'rehearse.config.js'));

//--------------------config init-------
const statics = config.statics || [];
const appPath = config.appPath;
const autoOpen = config.open;
const componentsPath = config.componentsPath;
const props = config.props;
const port = config.port || 9001;

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
const components = componentsFinder.find(componentsPath);
fs.writeFileSync(path.join(__dirname, 'viewer.js'), viewerTemplte.build(components, props));



browserSync.init({
    proxy: "localhost:" + port,
    open: autoOpen
});

const server = express();

if (statics.length) {
    server.use('/app', express.static(appPath));
}

let counter = 0;
webpack(webpackConfig, function (err, stat) {
    if(err){
        console.error(err);
    }
    console.log(`webpack compile finished --> No.${++counter} ${new Date()}`);
    browserSync.reload();
});

server.use('/viewer', express.static(__dirname));

server.use(function (err, req, res, next) {
    res.status(500).send(err);
    next(err)
});


function getIndexTemplate(){
    return _.template(fs.readFileSync(path.join(__dirname, 'index.html') ,{encoding: 'utf8'}));
}

server.use('/view/:component', function (req, res, next) {
    const component = req.params.component;
    console.warn(`requesting ${component}`);
    const resourceList = statics.map(s =>{
       if(/\.js$/.test(s)){
           return {type: 'js', href: s}
       }else if(/\.css$/.test(s)){
           return {type: 'css', href: s}
       }else {
           throw new Error(`unsupported statics ${s}, please note rehearse currently 
           only support css and js as statics`);
       }
    });

    const indexTemplate = getIndexTemplate();

    res.send(indexTemplate({
        statics: resourceList,
        component
    }))
});

server.use('*', function (req, res, next) {

    var indexTemplate = getIndexTemplate();

    const viewerPage = indexTemplate({
        statics: [],
        component: ''
    });
    res.send(viewerPage)
});


module.exports = {
    start: function () {
        console.log('starting Rehearse server......');
        server.listen(port);
    }
};
