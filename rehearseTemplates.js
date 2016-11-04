var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var viewerTemplate = require('./viewerTemplate');
const indexTemplate = _.template(fs.readFileSync(path.join(__dirname, 'indexTemplate.html'), { encoding: 'utf8' }));
const frameTemplate = _.template(fs.readFileSync(path.join(__dirname, 'frameTemplate.html'), { encoding: 'utf8' }));

module.exports = {
    getIndex: function (statics, componentName, componentKey, scenario, isFrame) {
        statics = statics || [];
        componentKey = componentKey || 'All Components';
        scenario = scenario || '';
        componentName = componentName || 'All Components';

        const data = {
            statics,
            componentName,
            componentKey,
            scenario
        };
        return isFrame? frameTemplate(data): indexTemplate(data);

    },

    buildViewerPage: function (output, components, props) {
        fs.writeFileSync(output, viewerTemplate.build(components, props.replace(/\\/g, '/')));
    }

};