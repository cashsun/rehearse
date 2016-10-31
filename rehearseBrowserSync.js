var webpack = require('webpack');
var browserSync = require('browser-sync').create();
var webpackConfig = require('./webpack.config');

module.exports = function (compiler, config, reloadOnChange, statics) {
    return {
        run: function () {
            browserSync.init(config);

            var propsCompiler = webpack(Object.assign({}, webpackConfig, {
                entry: reloadOnChange
            }));


            statics.map(s =>{
                browserSync.watch(s).on('change', browserSync.reload);
            });


            var running = false;
            propsCompiler.watch({
                    poll: 500
                },
                (err, stats)=> {

                    if (err) {
                        return console.log(err);
                    }

                    if(running){
                        compiler.run(()=> {
                            browserSync.reload();
                        })
                    }
                    running = true;
                });

            return browserSync;
        }
    }
};