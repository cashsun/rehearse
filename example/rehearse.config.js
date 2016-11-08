/**
 * Created by cashsun on 2016/10/19.
 */
const path = require('path');
console.log('using custom rehearse config path!!');
const config = {
    webpack: {
        //loaders: [], default: []
        //plugins: [], default: []
        //entry: [], additonal entry. default: []
        //devtool: 'source-map',  default:'cheap-module-eval-source-map'
        //port: 3001,  default:3000
        //modulesDirectories: [], default: undefined,
        //overrideLoaders,  default:false
        //overridePlugins, default: false

        //example
        loaders: [
            {
                test: /\.less$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
            }
        ],
        entry: [path.join(__dirname, 'css/theme2.less')],
        port: 3001
    },
    props: path.join(__dirname, 'props/props.js'),//path of the props file, mandatory

    componentsPath: path.join(__dirname, 'components'),//absolute path of components, mandatory

    statics: [
        'css/theme.css',
        'js/lib.js'
    ],//list of strings to be included in the header of rehearse page,
    // e.g. css/bootstrap.css etc, they should be direct children of appPath

    appPath: path.resolve(__dirname), //absolute path of client folder, mandatory if statics is not empty
    port: 9001,  //port of the rehearse server
    open: true //auto open browser?
};

module.exports = config;