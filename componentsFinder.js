/**
 * Created by cashsun on 2016/10/19.
 */
var fs = require('fs');
var path = require('path');
var jsRegex = /\.js$/;
function findComponentsFrom(componentPath, memo, isPureOnly) {
    var files = fs.readdirSync(componentPath);
    files.forEach(fileOrDir => {
        var completePath = path.join(componentPath, fileOrDir);
        var stats = fs.statSync(completePath);
        if (stats.isDirectory()) {
            findComponentsFrom(completePath, memo, isPureOnly);
        } else {

            if (jsRegex.test(fileOrDir)) {
                var content = fs.readFileSync(completePath, 'utf8');

                if (!isPureOnly) {
                    if (/\<.*\>/.test(content)) {
                        console.log(`Found component: ${fileOrDir}`);
                        memo[fileOrDir.replace(jsRegex, '')] = completePath.replace(/\\/g, '/');
                    }
                } else if ((/\<.*\>/.test(content)) && (/(extends)|(createClass)/.test(content) !== true)) {
                    console.log(`Found pure component: ${fileOrDir}`);
                    memo[fileOrDir.replace(jsRegex, '')] = completePath.replace(/\\/g, '/');
                }

            }
        }
    });
}

module.exports = {
    find: function (startPath) {
        var memo = {};
        findComponentsFrom(startPath, memo);
        return memo;
    },

    findPureComponents: function (startPath) {
        var memo = {};
        findComponentsFrom(startPath, memo, true);
        return memo;
    }
};