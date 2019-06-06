/*!
 * sb-http-transform
 * Copyright(c) 2019 Shawn Lin (LIN KU-SHEN)
 */

'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const cookie = require('cookie');
const sbError = require('./error');
const global = require('./config/globals-config');
const error = require('./config/errors-config');
const httpUtils = require('./utils/httpUtils');

/**
 * Parse a json/yaml file and transform it by some conditions.
 * And output a new json/yaml file.
 *
 * function load()
 * @param {stream} file
 * @return file
 * @public
 *
 * function transform()
 * @param {object} jsonObj
 * @return {string}
 * @public
 */
const utils = {
    load: function (file) {
        if (!file || !httpUtils.isSupportExtensions(file)) {
            throw new sbError(error.ERR_INVALID_FILE);
        }

        const fileContent = fs.readFileSync(file, 'utf8');
        return httpUtils.getExtensions(file) === 'json' ?
            utils.transform(JSON.parse(fileContent)) :
            utils.transform(yaml.safeLoad(fileContent));
    },
    transform: function (jsonObj) {
        if (!jsonObj) {
            throw new sbError(error.ERR_INVALID_CONTENT);
        }

        return handleTransform(jsonObj);
    }
};

/**
 * handle input content's transforming
 *
 * @param {string} content
 * @return {string}
 * @private
 */
function handleTransform(content) {
    if (!content.method) {
        return content;
    }

    switch (content.method.toUpperCase()) {
        case 'GET':
            return transformByGet(content);
        case 'POST':
        case 'PUT':
            return transformByPostAndPut(content);
        case 'DELETE':
            return transformByDelete(content);
        default:
            return content;
    }

    function transformByGet(content) {
        let output = {...content};
        if (/\/shopback\/resource/i.test(content.url)) {
            output = {
                ...output,
                url: content.url.replace(/\/shopback\/resource/i, '/shopback/static/assets')
            }
        }
        if (/\/shopback\/me/i.test(content.url)) {
            if (content.headers && content.headers.Cookie) {
                const cookies = cookie.parse(content.headers.Cookie);
                let cookieExists = false;
                Object.keys(cookies).forEach(function (key) {
                    if (/sbcookie/i.test(key))
                        cookieExists = true;
                });
                if (!cookieExists)
                    throw new sbError(error.ERR_INVALID_COOKIE);
            }
        }
        if (content.headers && content.headers.Referer) {
            if (!/www.shopback.com/i.test(content.headers.Referer))
                throw new sbError(error.ERR_INVALID_REFERER);
        }
        if (/\/shopback\/api/i.test(content.url)) {
            output = {
                ...output,
                From: 'hello@shopback.com'
            }
        }

        return genOutput(output);
    }

    function transformByPostAndPut(content) {
        let output = {
            ...content,
            url: content.url.replace(/\?.*/i, '')
        };
        if (global.isCheckAgent()) {
            if (!(content.headers && content.headers[global.getSbAgentKey()]))
                throw new sbError(error.ERR_INVALID_AGENT);
        }
        if (global.isCheckContentType()) {
            if (content.headers && content.headers[global.getContentTypeKey()]) {
                if (!/application\/json/i.test(content.headers[global.getContentTypeKey()]))
                    throw new sbError(error.ERR_INVALID_CONTENT_TYPE);
            } else {
                throw new sbError(error.ERR_INVALID_CONTENT_TYPE);
            }
        }

        return genOutput(output);
    }

    function transformByDelete(content) {
        let output = {...content};
        if (global.isCheckAgent()) {
            if (content.headers && content.headers[global.getSbAgentKey()]) {
                if (content.headers[global.getSbAgentKey()] !== global.getSbAgentVal())
                    throw new sbError(error.ERR_INVALID_AGENT);
            } else {
                throw new sbError(error.ERR_INVALID_AGENT);
            }

        }

        return genOutput(output);
    }

    function genOutput(output) {
        return {
            ...output,
            headers: {
                ...output.headers,
                [global.getSbTimestampKey()]: new Date().getTime()
            }
        };
    }
}

module.exports = utils;