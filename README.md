# rehearse
One stop shop for quick start react components development (in fury mode!).
hands free recompile/browser sync.

Already integrated with css-modules, babel-react + es6 and webpack.
Start writing react components by creating a rehearse.congig.js at your root folder.

```javascript
const path = require('path');
const config = {
    webpack: {
        //currently only support additional loaders, i.e. loaders: []
        //or plugins , i.e. plugins: []
    },
    props: path.join(__dirname, 'example/props.js'),//path of the props file, mandatory

    componentsPath: path.join(__dirname, 'example/components'),//absolute path of components, mandatory

    statics: [
        'css/theme.css',
        'js/lib.js'
    ],//list of strings to be included in the header of rehearse page,
                // e.g. css/bootstrap.css etc, they should be direct children of appPath

    appPath: path.join(__dirname, 'example'), //absolute path of client folder, mandatory if statics is not empty
    port: 9001,  //port of the rehearse server
    open: true //auto open browser?
};

module.exports = config;

```

to start the server, add rehearse in your npm scripts

```json
{
    "scripts": {
        "rehearse": "rehearse"
    }
}
```