const config = require('../config/globals-config');

const utils = {
    isSupportExtensions: function (file) {
        const extension = file.split('.').pop();
        return config.getSupportedExtensions().indexOf(extension) !== -1;
    },
    getExtensions: function (file) {
        return file.split('.').pop();
    }
};

module.exports = utils;