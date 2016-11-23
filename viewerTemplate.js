/**
 * Created by cashsun on 2016/10/19.
 */
const _ = require('lodash');
module.exports = {
    build: function (componentsMetadata, props) {
        const componentImports = _.map(componentsMetadata, (info, componentKey) => {
            return `import $${componentKey} from '${info.path}';
                    allComponents['${componentKey}'] = {component: $${componentKey}, displayName:'${info.displayName}'}`
        }).join(';\n');

        return `
            import { AppContainer } from 'react-hot-loader';
            import React from 'react';
            import {render} from 'react-dom';
            import Viewer from 'rehearse/viewer';
            import ComponentFrame from 'rehearse/componentFrame';
            const allComponents = {};
            ${componentImports};
            import componentProps from '${props}';
            
            const viewerProps = {
                allComponents,
                allProps: componentProps, 
                target: window.target, 
                scenario: window.scenario
            };
       
            const subView = window.isFrame?<ComponentFrame {...viewerProps}/>:<Viewer {...viewerProps}/>;
            const container = <AppContainer>{subView}</AppContainer>;
            
            render(container, document.getElementById('viewer'));


            if (module.hot&&window.isFrame) {
                module.hot.accept();
            }

            export default window.isFrame?ComponentFrame:Viewer;
            export {viewerProps}

            `;
    }
};



