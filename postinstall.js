#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var DELETE_MODULES = [
    'node_modules/gulp-flowtype/node_modules/flow-bin'
];

function rmdirRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + '/' + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                rmdirRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

DELETE_MODULES.forEach(function(dir) {
    dir = path.join(__dirname, dir);

    if (fs.existsSync(dir)) {
        console.log('Deleting ' + dir);
        rmdirRecursive(dir);
    }
});
