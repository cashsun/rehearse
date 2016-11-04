import _ from 'lodash';
import React, { PureComponent } from 'react';

class ComponentFrame extends PureComponent {

    render() {
        const { allComponents, allProps, target, scenario } = this.props;


        let targetComponent = allComponents[target];

        let targetProps = allProps[targetComponent.displayName + ((scenario && ('$' + scenario)) || '')];

        const comp = React.createElement(targetComponent.component, targetProps);

        return (
                <div className='frame'>
                    {comp}
                </div>
        )
    }
}


export default ComponentFrame;
