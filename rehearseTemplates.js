var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var viewerTemplate = require('./viewerTemplate');

module.exports = {
    getIndex: function (statics = [], component = 'un-defined', scenario = '') {
        return _.template(fs.readFileSync(path.join(__dirname, 'indexTemplate.html'), { encoding: 'utf8' }))({
            statics,
            component,
            scenario
        });
    },

    buildViewerPage: function (output, components, props) {
        fs.writeFileSync(output, viewerTemplate.build(components, props.replace(/\\/g, '/')));
    }

};