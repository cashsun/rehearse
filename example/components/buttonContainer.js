/**
 * Created by cashsun on 2016/10/19.
 */
import React, { PureComponent } from 'react';
import MyButton from './myButton';

class ButtonContainer extends PureComponent {
    render() {
        return (<div>
            <h2>Please dont click the button:</h2>
            <MyButton {...this.props} />
                <MyButton {...this.props} />
            </div>
        )
    }
}

export default ButtonContainer;