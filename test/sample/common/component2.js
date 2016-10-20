/**
 * Created by cashsun on 2016/10/19.
 */
import React, { PureComponent } from "react";

class MyButton extends PureComponent {
    render() {
        const { text } = this.props;
        return (
            <button>{text}</button>
        )
    }
}

export default MyButton;