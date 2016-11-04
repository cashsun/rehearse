/**
 * Created by cashsun on 2016/10/19.
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var jsRegex = /\.js$/;
var shorid = require('shortid');
const htmlTagRegex = /<[a-zA-Z0-9]+/;

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
                const displayName = fileOrDir.replace(jsRegex, '');
                const path = completePath.replace(/\\/g, '/');
                const id = shorid.generate().replace(/-/g, '_');

                if (!isPureOnly) {
                    if (htmlTagRegex.test(content)) {
                        console.log(`Found component: ${fileOrDir}`);
                        memo[id] = {
                            path,
                            displayName
                        };
                    }
                } else if ((htmlTagRegex.test(content)) && (/(extends|createClass)/.test(content) !== true)) {
                    console.log(`Found functional component: ${fileOrDir}`);
                    memo[id] = {
                        path,
                        displayName
                    };
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
        return _.reduce(memo, (next, componentInfo, key)=>{
            next[key] = componentInfo.path;
            return next;
        }, {});
    }
};