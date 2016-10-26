# rehearse
live react components development in zen mode.

[Home Page](http://cashsun.github.io/rehearse/)

![alt tag](https://raw.githubusercontent.com/cashsun/rehearse/master/demo.gif)

React live editing (a.k.a hot reload) made easy -> Let Rehearse do the compiling and browser refreshing for you.

★ Hot reload on css/less change

★ Hot reload on react component change

★ Hot reload on props/scenario change

★ Scenario supported

★ Isolated or interdependent props

★ Babel React + Es6

★ Auto find all components in configured folder

★ Customise addtional loaders and plugins and more



Install as a [npm module](https://www.npmjs.com/package/rehearse)

```bash
npm i rehearse -D

```

Configure: create a rehearse.config.js at your root folder (working dir).

```javascript
const path = require('path');
const config = {
    webpack: {
        //currently only support additional loaders, i.e. loaders: []
        //or additional plugins , i.e. plugins: []
        //or devtool i.e. devtool: 'source-map',  default:'eval'
    },
    props: path.join(__dirname, 'example/props.js'),//path of the props file, mandatory

    componentsPath: path.join(__dirname, 'example/components'),//absolute path of components, mandatory

    statics: [
        'css/theme.css',
        'js/lib.js'
    ],//list of strings to be included in the header of rehearse page,
                // e.g. css/bootstrap.css etc, they should be direct children of appPath

    appPath: path.join(__dirname, 'example'), //absolute path of client folder, mandatory if statics is not empty
    port: 9001,  //port of the rehearse server, please pay attention that the page you should visit should be browser-synced one, 
                //usually localhost:3000 (shown in console)
                
    open: true //auto open browser on start?
};

module.exports = config;

```

Run

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
Ready to go!


Q&A:

**How to setup props and scenarios?**

This [example](https://github.com/cashsun/rehearse/blob/master/example/props/props.js) demos how to setup default props and scenarios.


**No auto refresh when change props.js?**

Please pay attention that the page you should visit is browser-synced one, usually localhost:3000 as logged in your console(root level config port).


**No props found even though I have added them in props.js?**

Please make sure props are named export, names of which are the same as the component **FILE** name.
