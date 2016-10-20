/**
 * Created by cashsun on 2016/10/19.
 */
const fs = require('fs');
const path = require('path');
const jsRegex = /\.js$/;
function findComponentsFrom(componentPath, memo) {
    const files = fs.readdirSync(componentPath);
    files.forEach(fileOrDir => {
        var completePath = path.join(componentPath, fileOrDir);
        const stats = fs.statSync(completePath);
        if (stats.isDirectory()) {
            findComponentsFrom(completePath, memo);
        } else {

            if (jsRegex.test(fileOrDir)) {
                const content = fs.readFileSync(completePath, 'utf8');
                if (/['"]react['"]/.test(content)) {
                    console.log(`Found component: ${fileOrDir}`);
                    memo[fileOrDir.replace(jsRegex, '')] = completePath;
                }

            }
        }
    });

}

module.exports = {
    find: function (startPath) {
        const memo = {};
        findComponentsFrom(startPath, memo);
        return memo;
    }
};