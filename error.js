/*!
 * sb-error
 * Copyright(c) 2019 Shawn Lin (LIN KU-SHEN)
 */

'use strict';

const config = require('./config/errors-config');

/**
 * A custom error function.
 *
 * function SbError()
 * @param {string} message
 * @return {function}
 * @public
 */
module.exports = function SbError(message) {
    this.name = 'ShopBack Error';
    this.message = message || config.ERR_DEFAULT;
    this.stack = (new Error()).stack;
};