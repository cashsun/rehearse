import _ from 'lodash';
import React, { PureComponent } from 'react';

class Viewer extends PureComponent {

    render() {
        const { allComponents, allProps, target, scenario } = this.props;

        const componentLinks = (
            <div>
                {_.map(allComponents, (componentInfo, componentKey) => (
                    <a key={componentKey}
                       className='scenario'
                       href={`/view/${componentKey}`}
                    >{componentInfo.displayName}</a>
                ))}
            </div>
        );


        const availableComponents = (
            <div className='scenarios'>
                <h6>List of components available:</h6>
                {componentLinks}
            </div>
        );


        function scenariosLinks(component, target) {
            const regex = new RegExp('^' + component.displayName + '(\\$.*)?$');
            const match = RegExp.prototype.test.bind(regex);
            const propsKeys = _.keys(allProps);
            return (
                <div>
                    {propsKeys.filter(match).map((scenarioPropKey, key)=> {
                        const scenario = scenarioPropKey.replace(component.displayName, '').replace('$', '');
                        const scenarioDisplay = scenario || 'default';
                        return (
                            <span key={key} className='scenario'>
                            <a href={'/view/' + target + '/' + scenario}>{component.displayName + ' (' + scenarioDisplay + ')'}</a>
                            <br/>
                        </span>
                        );
                    }).concat([
                        (<span key="how-to" className='scenario'>
                        <a target="_blank"
                           href='https://github.com/cashsun/rehearse/blob/master/example/props/props.js'>
                        How to setup scenarios?
                        </a>
                    </span>),
                        (<span key="back-to-all" className='scenario'>
                        <a href='/all'>
                        {'<< '}back to list
                        </a>
                    </span>)
                    ])}
                </div>
            );
        }

        let targetComponent = allComponents[target];
        if (!targetComponent) {
            return (
                <div className='rehearse-viewer'>
                    {availableComponents}
                </div>
            )
        }


        let targetProps = allProps[targetComponent.displayName + ((scenario && ('$' + scenario)) || '')];

        if (!targetProps) {
            return (
                <div className='rehearse-viewer'>
                    <strong>Error: you have not given props for the
                        component {targetComponent.displayName} in your props file</strong>
                    {availableComponents}
                </div>
            )
        }

        console.log('viewing: ', targetComponent.displayName, `(${scenario || 'default'})`);

        return (
            <div className='rehearse-viewer'>
                <iframe src={`http://${window.location.host}/targetframe/${target}/${scenario}`} ></iframe>
                <div className='scenarios'>
                    <h6>scenarios:</h6>
                    {scenariosLinks(targetComponent, target)}
                </div>
            </div>
        )
    }
}


export default Viewer;
