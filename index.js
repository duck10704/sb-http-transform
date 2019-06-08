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
        if (!file || !httpUtils.isSupportExtensions(file))
            throw new sbError(error.ERR_INVALID_FILE);

        const fileContent = fs.readFileSync(file, 'utf8');
        const extension = httpUtils.getFileExtension(file);
        return utils.transform(
            extension === 'json' ?
                JSON.parse(fileContent) : yaml.safeLoad(fileContent), extension
        );
    },
    transform: function (jsonObj, extension) {
        if (!jsonObj)
            throw new sbError(error.ERR_INVALID_CONTENT);

        if (global.isCheckDomain()) {
            const regex = new RegExp(global.getSupportedDomains().join('|'), 'i');
            if (!regex.test(jsonObj.url))
                throw new sbError(error.ERR_INVALID_DOMAIN);
        }

        const obj = handleTransform(jsonObj);
        if (global.isOutputFile()) {
            httpUtils.outputFile(
                extension === 'json' ?
                    JSON.stringify(obj) : yaml.safeDump(obj, {skipInvalid: true}), extension, writeFileCallback);
        }

        return obj;
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
        const regex1 = new RegExp(global.getRegexUrlReplaceFrom().join('|'), 'i');
        if (regex1.test(content.url)) {
            output = {
                ...output,
                url: content.url.replace(regex1, global.getRegexUrlReplaceTo())
            }
        }

        const regex2 = new RegExp(global.getRegexUrlCheckCookie().join('|'), 'i');
        if (regex2.test(content.url)) {
            if (content.headers && content.headers.Cookie) {
                const cookies = cookie.parse(content.headers.Cookie);
                const regex3 = new RegExp(global.getRegexUrlAllowCookie().join('|'), 'i');
                let cookieExists = false;
                Object.keys(cookies).forEach(function (key) {
                    if (regex3.test(key))
                        cookieExists = true;
                });
                if (!cookieExists)
                    throw new sbError(error.ERR_INVALID_COOKIE);
            }
        }

        const regex4 = new RegExp(global.getRegexUrlAllowReferer().join('|'), 'i');
        if (content.headers && content.headers.Referer) {
            if (!regex4.test(content.headers.Referer))
                throw new sbError(error.ERR_INVALID_REFERER);
        }

        const regex5 = new RegExp(global.getRegexUrlAddFrom().join('|'), 'i');
        if (regex5.test(content.url)) {
            output = {
                ...output,
                headers: {
                    ...output.headers,
                    From: global.getRegexUrlAddFromVal()
                }
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
            if (!content.headers || !content.headers[global.getSbAgentKey()])
                throw new sbError(error.ERR_AGENT_NOT_EXIST);
        }
        if (global.isCheckContentType()) {
            if (!content.headers || !content.headers[global.getContentTypeKey()]) {
                throw new sbError(error.ERR_INVALID_CONTENT_TYPE);
            }

            const regex6 = new RegExp(global.getContentTypeVal().join('|'), 'i');
            if (!regex6.test(content.headers[global.getContentTypeKey()]))
                throw new sbError(error.ERR_INVALID_CONTENT_TYPE);
        }

        return genOutput(output);
    }

    function transformByDelete(content) {
        let output = {...content};
        if (global.isCheckAgent()) {
            if (!content.headers || !content.headers[global.getSbAgentKey()]) {
                throw new sbError(error.ERR_AGENT_NOT_EXIST);
            }

            const regex7 = new RegExp(global.getSbAgentVal().join('|'), 'i');
            if (!regex7.test(content.headers[global.getSbAgentKey()])) {
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
                [global.getSbTimestampKey()]: httpUtils.genTimestamp()
            }
        };
    }
}

/**
 * handle write file callback function
 *
 * @param {error} err
 * @param {object} res
 * @private
 */
function writeFileCallback(err, res) {
    if (err) {
        throw new sbError(error.ERR_OUTPUT_FILE);
    } else {
        console.log('write file callback:', res);
    }
}

module.exports = utils;