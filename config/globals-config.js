const SB_AGENT_KEY = 'X-SHOPBACK-AGENT';
const SB_AGENT_VAL = ['AGENT_1'];

const SB_TIMESTAMP_KEY = 'X-SHOPBACK-TIMESTAMP';
const CONTENT_TYPE_KEY = 'Content-Type';
const CONTENT_TYPE_VAL = ['application/json'];

const SUPPORTED_FILE_EXTENSION = ['json', 'yaml', 'yml'];
const SUPPORTED_DOMAIN = ['www.shopback.com'];

const OUTPUT_FILE_PATH = './output';

const REGEX_URL_REPLACE_FROM = ['/shopback/resource'];
const REGEX_URL_REPLACE_TO = '/shopback/static/assets';
const REGEX_URL_CHECK_COOKIE = ['/shopback/me'];
const REGEX_URL_ALLOW_COOKIE = ['sbcookie'];
const REGEX_URL_ALLOW_REFERER = ['www.shopback.com'];
const REGEX_URL_ADD_FROM = ['/shopback/api', '/shopback/api/'];
const REGEX_URL_ADD_FROM_VAL = 'hello@shopback.com';

const CHECK_AGENT = true;
const CHECK_DOMAIN = true;
const CHECK_CONTENT_TYPE = true;
const OUTPUT_FILE = true;

const config = {
    isOutputFile: function () {
        return OUTPUT_FILE;
    },
    isCheckAgent: function () {
        return CHECK_AGENT;
    },
    isCheckDomain: function () {
        return CHECK_DOMAIN;
    },
    isCheckContentType: function () {
        return CHECK_CONTENT_TYPE;
    },
    getSbAgentKey: function () {
        return SB_AGENT_KEY;
    },
    getSbAgentVal: function () {
        return SB_AGENT_VAL;
    },
    getSbTimestampKey: function () {
        return SB_TIMESTAMP_KEY;
    },
    getContentTypeKey: function () {
        return CONTENT_TYPE_KEY;
    },
    getContentTypeVal: function () {
        return CONTENT_TYPE_VAL;
    },
    getSupportedExtensions: function () {
        return SUPPORTED_FILE_EXTENSION;
    },
    getSupportedDomains: function () {
        return SUPPORTED_DOMAIN;
    },
    getOutputFilePath: function () {
        return OUTPUT_FILE_PATH;
    },
    getRegexUrlReplaceFrom: function () {
        return REGEX_URL_REPLACE_FROM;
    },
    getRegexUrlReplaceTo: function () {
        return REGEX_URL_REPLACE_TO;
    },
    getRegexUrlCheckCookie: function () {
        return REGEX_URL_CHECK_COOKIE;
    },
    getRegexUrlAllowCookie: function () {
        return REGEX_URL_ALLOW_COOKIE;
    },
    getRegexUrlAllowReferer: function () {
        return REGEX_URL_ALLOW_REFERER;
    },
    getRegexUrlAddFrom: function () {
        return REGEX_URL_ADD_FROM;
    },
    getRegexUrlAddFromVal: function () {
        return REGEX_URL_ADD_FROM_VAL;
    }
};

module.exports = config;