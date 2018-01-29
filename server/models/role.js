'use strict';

const Bookshelf = require('./../helpers/db/pg-model');

const Role = Bookshelf.Model.extend({
    tableName: 'role'
});

exports.Role = Role;

const Roles = Bookshelf.Collection.extend({
    model: Role
});

exports.Roles = Roles;