import myButton from './myButtonProps';
import myButton$FooBar from './myButtonFooBarProps';
import buttonContainer from './buttonContainerProps';


const buttonContainer$AllowClick = Object.assign({}, buttonContainer, {title: 'ok, fine you can click..'});
const myButtonPlain = Object.assign({}, myButton, {text: 'plain'});

export {
    myButton, // props for myButton (default scenario), notice "myButtom" matches the component FILE name.

    myButton$FooBar, // a prop with scenario (e.g. "FooBar") appended at the end of component file name after $ sign.
                    // scenarios are helpful when you want to test complex different
                    // props which are tedious to manually change.
                    // that's it! your scenario will show automatically in the component viewing page

    myButtonPlain,

    buttonContainer, // props for buttonContainer (default scenario)
    buttonContainer$AllowClick // props for buttonContainer ('AllowClick' scenario)
};