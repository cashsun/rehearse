# rehearse
react components development in zen mode.

[Home Page](http://cashsun.github.io/rehearse/)

![alt tag](https://raw.githubusercontent.com/cashsun/rehearse/master/demo.gif)

We believe developers should purely focus on typing code.

Mouse-clicking is distracting.

Terminal window is distracting.

Let Rehearse do the compiling and browser refreshing for you.

Currently, integrated with css-modules (less also supported), babel-react + es6 and webpack by default.
You can also add additional loaders and webpack pluigins.



Install as a [NPM module](https://www.npmjs.com/package/rehearse)

```bash
npm i rehearse -D

```

Quick start: create a rehearse.config.js at your root folder (working dir).

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

Add rehearse to your package.json npm scripts

```json
{
    "scripts": {
        "rehearse": "rehearse"
    }
}
```

```bash
npm run rehearse
```
