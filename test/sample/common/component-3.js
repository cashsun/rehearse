/**
 * Created by cashsun on 2016/10/19.
 */
import React, { PureComponent } from "react";

class MyBox extends PureComponent {
    render() {
        const { text } = this.props;
        return (
            <div>{text}</div>
        )
    }
}

export default MyBox;