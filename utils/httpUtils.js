'use strict';

const fs = require('fs');
const config = require('../config/globals-config');

const utils = {
    isSupportExtensions: function (file) {
        const extension = file.split('.').pop();
        return config.getSupportedExtensions().indexOf(extension) !== -1;
    },
    getFileExtension: function (file) {
        return file.split('.').pop();
    },
    createOutputFolder: function (dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    },
    outputFile: function (content, extension, callback) {
        const dir = config.getOutputFilePath() + '/' + extension;
        utils.createOutputFolder(dir);
        extension === 'json' ?
            fs.writeFile(`${dir}/output_${new Date().getTime()}.json`, content, 'utf8', callback) :
            fs.writeFile(`${dir}/output_${new Date().getTime()}.yaml`, content, 'utf8', callback);
    }
};

module.exports = utils;