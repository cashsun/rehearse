/**
 * Created by cashsun on 2016/10/19.
 */
const _ = require('lodash');
const current = __dirname.replace(/\\/g, '/');
module.exports = {
    build: function (components, props) {
        const componentImports = _.map(components, function (path, componentName) {
            return `import $${componentName} from '${path}';
                    allComponents['${componentName}'] = $${componentName}`
        }).join(';\n');

        return `
            import React from 'react';
            import _ from 'lodash';
            import ReactDom from 'react-dom';
            import Viewer from 'rehearse/viewer'
            const allComponents = {};
            ${componentImports};
            import * as componentProps from '${props}';
            
            const viewerProps = {
                allComponents:allComponents, 
                allProps:componentProps, 
                component:window.target, 
                scenario:window.scenario
            };
            
            ReactDom.render(<Viewer 
                    {...viewerProps}
                />, document.getElementById('viewer'));


            export default Viewer;
            export {viewerProps}

            `;
    }
};



