'use strict';

const Async = require('async');
const _ = require('lodash');

const Schema = require('./pg-schema.js');
const Bookshelf = require('./pg-model');


const createTable = function (tableName) {
    return Bookshelf.knex.schema.createTable(tableName, function (table) {
        var column;
        var columnKeys = _.keys(Schema[tableName]);

        columnKeys.forEach(function (key) {

            if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
            } else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
            } else {
                column = table[Schema[tableName][key].type](key);
            }

            if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
                column.nullable();
            } else {
                column.notNullable();
            }

            if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
                column.primary();
            }

            if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique === true) {
                column.unique();
            }

            if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned === true) {
                column.unsigned();
            }

            if (Schema[tableName][key].hasOwnProperty('references')) {
                column.references(Schema[tableName][key].references);
            }

            if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
                column.defaultTo(Schema[tableName][key].defaultTo);
            }
        });
    });
};

const doesTableExist = function (tableName) {
    return Bookshelf.knex.schema.hasTable(tableName);
};

const initDb = function () {
    var calls = [];
    var tableNames = _.keys(Schema);

    tableNames.forEach(function (tableName) {

        var f = function (callback) {
            doesTableExist(tableName)
                .then(function (exists) {
                    if (!exists) {
                        createTable(tableName)
                            .then(function (result) {
                                callback(null, result);
                                return null;
                            })
                            .catch(function (err) {
                                callback(err, null);
                                return null;
                            });

                    } else {
                        callback(null, exists);
                        return null;
                    }

                })
                .catch(function (error) {
                    callback(error, null)
                });
        };

        calls.push(f);
    });

    Async.series(calls, function (err, result) {
        if (!err) {
        } else {
        }
        return result;
    });
};

exports.initialisation = initDb;