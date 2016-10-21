/**
 * Created by cashsun on 2016/10/19.
 */
const myButton = {
    text: 'hello world!',
    onClick:  (evt) => {
        console.log(evt)
        console.log("I was clicked!")
    }
};

export {myButton};