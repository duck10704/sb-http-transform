const SB_AGENT_KEY = 'X-SHOPBACK-AGENT';
const SB_AGENT_VAL = 'AGENT_1';
const SB_TIMESTAMP_KEY = 'X-SHOPBACK-TIMESTAMP';
const CONTENT_TYPE_KEY = 'Content-Type';
const SUPPORTED_FILE_EXTENSION = ['json', 'yaml', 'yml'];
const CHECK_AGENT = true;
const CHECK_CONTENT_TYPE = true;

const config = {
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
    getSupportedExtensions() {
        return SUPPORTED_FILE_EXTENSION;
    }
};

module.exports = config;