'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://localhost/"'
  BASE_URL: '"http://localhost/scm/api/web/"'
});
