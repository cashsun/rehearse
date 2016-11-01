/**
 * Created by cashsun on 2016/10/19.
 */
const _ = require('lodash');
module.exports = {
    build: function (componentsMetadata, props) {
        const componentImports = _.map(componentsMetadata, function (info, componentKey) {
            return `import $${componentKey} from '${info.path}';
                    allComponents['${componentKey}'] = {component: $${componentKey}, displayName:'${info.displayName}'}`
        }).join(';\n');

        return `
            import React from 'react';
            import ReactDom from 'react-dom';
            import Viewer from 'rehearse/viewer'
            const allComponents = {};
            ${componentImports};
            import componentProps from '${props}';
            
            const viewerProps = {
                allComponents,
                allProps: componentProps, 
                target: window.target, 
                scenario: window.scenario
            };
            
            ReactDom.render(<Viewer 
                    {...viewerProps}
                />, document.getElementById('viewer'));


            export default Viewer;
            export {viewerProps}

            `;
    }
};



