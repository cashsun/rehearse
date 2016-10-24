/**
 * Created by cashsun on 2016/10/19.
 */
import React, { PureComponent } from 'react';
import styles from './myButton.less';

class MyButton extends PureComponent {
    render() {
        const { text, onClick } = this.props;
        return (
            <button
                className={styles.base}
                onClick={onClick}>{text}</button>
        )
    }
}

export default MyButton;