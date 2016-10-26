import myButton from './myButtonProps';
import myButtonFooBar from './myButtonFooBarProps';
import buttonContainer from './buttonContainerProps';

const buttonContainerAllowClick = Object.assign({}, buttonContainer, {title: 'ok, fine you can click..'});

export {
    myButton, // props for myButton (default scenario), notice "myButtom" matches the component FILE name.

    myButtonFooBar, // a prop with scenario (e.g. "FooBar") appended at the end of component file name.
                    // scenarios are helpful when you want to test complex different
                    // props which are tedious to manually change.
                    // that's it! your scenario will show automatically in the component viewing page

    buttonContainer, // props for buttonContainer (default scenario)
    buttonContainerAllowClick // props for buttonContainer ('AllowClick' scenario)
};