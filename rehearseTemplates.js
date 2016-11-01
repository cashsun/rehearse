var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var viewerTemplate = require('./viewerTemplate');
const template = _.template(fs.readFileSync(path.join(__dirname, 'indexTemplate.html'), { encoding: 'utf8' }));

module.exports = {
    getIndex: function (statics, componentName, componentKey, scenario) {

        statics = statics || [];
        componentKey = componentKey || 'All Components';
        scenario = scenario || '';
        componentName = componentName || 'All Components';

        return template({
            statics,
            componentName,
            componentKey,
            scenario
        });
    },

    buildViewerPage: function (output, components, props) {
        fs.writeFileSync(output, viewerTemplate.build(components, props.replace(/\\/g, '/')));
    }

};