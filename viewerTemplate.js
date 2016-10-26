/**
 * Created by cashsun on 2016/10/19.
 */
const _ = require('lodash');
const current = __dirname.replace(/\\/g, '/');
module.exports = {
    build: function (components, props) {
        const componentImports = _.map(components, function (path, componentName) {
            return `import ${componentName} from '${path}';
                    allComponents['${componentName}'] = ${componentName}`
        }).join(';\n');


        const componentLinks = _.map(components, function (path, componentName) {
            return `<a className={styles.scenario} href="/view/${componentName}">${componentName}</a>`
        }).join('<br/>');

        return `
            import React, {PureComponent} from 'react';
            import _ from 'lodash';
            import ReactDom from 'react-dom';
            const allComponents = {};
            ${componentImports};
            import styles from '${current}/viewer.less';
            import * as componentProps from '${props}';
            const allProps = _.keys(componentProps);
            
            function scenariosLinks(componentName){
                const regex = new RegExp('^'+componentName)
                const match = RegExp.prototype.test.bind(regex);
                return allProps.filter(match).map((scenarioProp, key )=> {
                    const scenario = scenarioProp.replace(regex, '');
                    const scenarioDisplay = scenario || 'default';
                    return (<span key={key} className={styles.scenario}>
                        <a href={'/view/'+componentName+'/'+scenario} >{componentName + ' ('+scenarioDisplay+')'}</a>
                        <br/>
                    </span>);
                }).concat([
                    (<span key="how-to" className={styles.scenario}>
                        <a target="_blank" href='https://github.com/cashsun/rehearse/blob/master/example/props/props.js' >
                        How to setup scenarios?
                        </a>
                    </span>),
                    (<span key="back-to-all" className={styles.scenario}>
                        <a target="_blank" href='/all' >
                        {'<< '}back to list
                        </a>
                    </span>)
                ]);
            }

            class Viewer extends PureComponent {
            
                render(){
                    let targetComponent = allComponents[window.target];
                    if(!targetComponent){
                        return (
                            <div className={styles.base}>
                                <div className={styles.scenarios}>
                                    <h6>List of components available:</h6>
                                    ${componentLinks}
                                </div>
                            </div>
                        )
                    }
                    
                    let targetProps = componentProps[window.target + window.scenario];
                    if(!targetProps) {
                        return (
                            <div>
                                <strong>Error: you have not given props for the 
                                component {window.target} in ${props}</strong>
                                <h6>List of components available:</h6>
                                <br/>
                                <div>
                                    ${componentLinks}
                                </div>
                            </div>
                        )
                    }
                    
                    const comp = React.createElement(targetComponent, targetProps)
                    
                    return (
                        <div className={styles.base}>
                            <div className={styles.frame}>
                                {comp}
                            </div>
                            <div className={styles.scenarios}>
                                <h6>scenarios:</h6>
                                {scenariosLinks(window.target)}
                            </div>
                        </div>
                    )
                    
                }
            
            }
            
            ReactDom.render(<Viewer />, document.getElementById('viewer'));


            `;
    }
};



