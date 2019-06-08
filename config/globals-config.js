const SB_AGENT_KEY = 'X-SHOPBACK-AGENT';
const SB_AGENT_VAL = 'AGENT_1';
const SB_TIMESTAMP_KEY = 'X-SHOPBACK-TIMESTAMP';
const CONTENT_TYPE_KEY = 'Content-Type';
const SUPPORTED_FILE_EXTENSION = ['json', 'yaml', 'yml'];
const OUTPUT_FILE_PATH = './output';
const CHECK_AGENT = true;
const CHECK_CONTENT_TYPE = true;
const OUTPUT_FILE = true;

const config = {
    isOutputFile: function () {
        return OUTPUT_FILE;
    },
    isCheckAgent: function () {
        return CHECK_AGENT;
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
    getSupportedExtensions: function () {
        return SUPPORTED_FILE_EXTENSION;
    },
    getOutputFilePath: function () {
        return OUTPUT_FILE_PATH;
    }
};

module.exports = config;