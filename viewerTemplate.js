/**
 * Created by cashsun on 2016/10/19.
 */
const _ = require('lodash');
const current = __dirname.replace(/\\/g, '/');
module.exports = {
    build: function (components, props) {
        const componentImports = _.map(components, function(path, componentName){
            return `import ${componentName} from '${path}';
                    allComponents['${componentName}'] = ${componentName}`
        }).join(';\n');


        const componentLinks = _.map(components, function(path, componentName){
            return `<a href="/view/${componentName}">${componentName}</a>`
        }).join('<br/>');

        return `
            import React, {PureComponent} from 'react';
            import ReactDom from 'react-dom';
            const allComponents = {};
            ${componentImports};
            import styles from '${current}/viewer.less';
            import * as componentProps from '${props}';
            
            

            class Viewer extends PureComponent {
            
                render(){
                    let targetComponent = allComponents[window.target];
                    if(!targetComponent){
                        return (
                            <div>
                                <h6>List of components available:</h6>
                                <br/>
                                ${componentLinks}
                            </div>
                        )
                    }
                    
                    let targetProps = componentProps[window.target];
                    if(!targetProps) {
                        return (
                            <div>
                                <strong>Error: you have not given props for the 
                                component {window.target} in ${props}</strong>
                                <h6>List of components available:</h6>
                                <br/>
                                ${componentLinks}
                            </div>
                        )
                    }
                    
                    const comp = React.createElement(targetComponent, targetProps)
                    
                    return (<div className={styles.base}>
                        {comp}
                    </div>)
                    
                }
            
            }
            
            ReactDom.render(<Viewer />, document.getElementById('viewer'));


            `;
    }
};



