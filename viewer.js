import _ from 'lodash';
import React from 'react';
import styles from './viewer.less';

export default function (props) {
    const { allComponents, allProps, component, scenario } = props;

    const componentLinks = (
        <div>
            {_.map(allComponents, (componentClass, componentName) => (
                <a key={componentName} className={styles.scenario} href={`/view/${componentName}`}>{componentName}</a>
            ))}
        </div>
    );


    const availableComponents = (
        <div className={styles.scenarios}>
            <h6>List of components available:</h6>
            {componentLinks}
        </div>
    );


    function scenariosLinks(componentName) {
        const regex = new RegExp('^' + componentName + '(\\$.*)?$');
        const match = RegExp.prototype.test.bind(regex);
        const propsKeys = _.keys(allProps);
        return (
            <div>
                {propsKeys.filter(match).map((scenarioPropKey, key)=> {
                    const scenario = scenarioPropKey.replace(componentName, '').replace('$', '');
                    const scenarioDisplay = scenario || 'default';
                    return (
                        <span key={key} className={styles.scenario}>
                            <a href={'/view/' + componentName + '/' + scenario}>{componentName + ' (' + scenarioDisplay + ')'}</a>
                            <br/>
                        </span>
                    );
                }).concat([
                    (<span key="how-to" className={styles.scenario}>
                        <a target="_blank"
                           href='https://github.com/cashsun/rehearse/blob/master/example/props/props.js'>
                        How to setup scenarios?
                        </a>
                    </span>),
                    (<span key="back-to-all" className={styles.scenario}>
                        <a href='/all'>
                        {'<< '}back to list
                        </a>
                    </span>)
                ])}
            </div>
        );
    }

    let targetComponent = allComponents[component];
    if (!targetComponent) {
        return (
            <div className={styles.base}>
                {availableComponents}
            </div>
        )
    }

    let targetProps = allProps[component + ((scenario && ('$' + scenario)) || '')];

    if (!targetProps) {
        return (
            <div className={styles.base}>
                <strong>Error: you have not given props for the
                    component {component} in your props file</strong>
                {availableComponents}
            </div>
        )
    }

    const comp = React.createElement(targetComponent, targetProps);

    return (
        <div className={styles.base}>
            <div className={styles.frame}>
                {comp}
            </div>
            <div className={styles.scenarios}>
                <h6>scenarios:</h6>
                {scenariosLinks(component)}
            </div>
        </div>
    )

};



