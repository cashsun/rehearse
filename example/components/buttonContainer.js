/**
 * Created by cashsun on 2016/10/19.
 */
import React, { PureComponent } from 'react';
import MyButton from './myButton';

class ButtonContainer extends PureComponent {
    render() {
        const { title, text, onClick } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <MyButton {...{ text, onClick }} />
                <MyButton {...{ text, onClick }} />
            </div>
        )
    }
}

export default ButtonContainer;