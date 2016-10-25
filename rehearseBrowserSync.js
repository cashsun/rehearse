var webpack = require('webpack');
var browserSync = require('browser-sync').create();
var webpackConfig = require('./webpack.config');

module.exports = function (compiler, config, props, statics) {
    return {
        run: function () {
            browserSync.init(config);

            var propsCompiler = webpack(Object.assign({}, webpackConfig, {
                entry: props
            }));


            statics.map(s =>{
                browserSync.watch(s).on('change', browserSync.reload);
            });



            propsCompiler.watch({
                    poll: 500
                },
                (err, stats)=> {
                    if (err) {
                        return console.log(err);
                    }
                    compiler.run(()=> {
                        browserSync.reload();
                    })
                });

            return browserSync;
        }
    }
};