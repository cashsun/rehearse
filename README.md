# rehearse
>live react components development in zen mode.

[Home Page](http://cashsun.github.io/rehearse/)

![alt tag](https://raw.githubusercontent.com/cashsun/rehearse/master/demo.gif)

React live editing (a.k.a hot reload) made easy -> Let Rehearse do the compiling and browser refreshing for you.

★ Hot reload on css/less change

★ Hot reload on react component change

★ Hot reload on props/scenario change

★ Auto Refresh on functional/pure component change

★ Scenario supported

★ Isolated or interdependent props

★ Babel React + Es6

★ Auto find all components in configured folder

★ Customise addtional loaders and plugins and more



1. Install as a [npm module](https://www.npmjs.com/package/rehearse)

```bash
npm i rehearse -D

```

2. Configure: create a `rehearse.config.js` at your root folder (working dir).

```javascript
const path = require('path');
const config = {
    webpack: {
        //loaders: [], default: [] (rehearse already has babel-loader that reads .babelrc at your working directory)
        //plugins: [], default: []
        //entry: [], additonal entry. default: []
        //devtool: 'source-map',  default:'cheap-module-eval-source-map'
        //port: 3001,  default:3000
        //overrideLoaders,  default:false
        //overridePlugins,  default: false
        port: 3001
    },
    props: path.join(__dirname, 'example/props/props.js'),//path of the props file, mandatory

    componentsPath: path.join(__dirname, 'example/components'),//absolute path of components, mandatory

    statics: [
        'css/theme.css',
        'css/theme2.less',
        'js/lib.js'
    ],//list of strings to be included in the header of rehearse page,
    // e.g. css/bootstrap.css etc, they should be direct children of appPath

    appPath: path.join(__dirname, 'example'), //absolute path of client folder, mandatory if statics is not empty
    port: 9001,  //port of the rehearse server
    open: true //auto open browser?
};

module.exports = config;

```


3. Create a `.babelrc` at your root folder (working dir). e.g.

```javascript
{
  "presets": [
    "react",
    "es2015"
  ]
}

```


4. Customise component [props and scenarios](https://github.com/cashsun/rehearse/blob/master/example/props/props.js)


5. Run

Add rehearse to your `package.json` npm scripts
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
