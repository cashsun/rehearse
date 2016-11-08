var browserSync = require('browser-sync').create();

module.exports = function (compiler, config, statics) {
    return {
        run: function () {
            browserSync.init(config);

            statics.map(s =>{
                browserSync.watch(s).on('change', browserSync.reload);
            });

            return browserSync;
        },

        cleanup: function () {
            browserSync.cleanup();
        }
    }
};