'use strict';

var Knex = require('./pg-knex');

var Bookshelf = require('bookshelf')(Knex);
Bookshelf.plugin(['visibility', 'virtuals']);

module.exports = Bookshelf;