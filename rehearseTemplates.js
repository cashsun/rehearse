var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var viewerTemplate = require('./viewerTemplate');
const template = _.template(fs.readFileSync(path.join(__dirname, 'indexTemplate.html'), { encoding: 'utf8' }));

module.exports = {
    getIndex: function (statics, component, scenario) {

        statics = statics || [];
        component = component || 'un-defined';
        scenario = scenario || '';

        return template({
            statics,
            component,
            scenario
        });
    },

    buildViewerPage: function (output, components, props) {
        fs.writeFileSync(output, viewerTemplate.build(components, props.replace(/\\/g, '/')));
    }

};