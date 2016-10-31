/**
 * Created by cashsun on 2016/10/19.
 */
var fs = require('fs');
var path = require('path');
var jsRegex = /\.js$/;
function findComponentsFrom(componentPath, memo) {
    var files = fs.readdirSync(componentPath);
    files.forEach(fileOrDir => {
        var completePath = path.join(componentPath, fileOrDir);
        var stats = fs.statSync(completePath);
        if (stats.isDirectory()) {
            findComponentsFrom(completePath, memo);
        } else {

            if (jsRegex.test(fileOrDir)) {
                var content = fs.readFileSync(completePath, 'utf8');
                if (/\<.*\>/.test(content)) {
                    console.log(`Found component: ${fileOrDir}`);
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
    }
};