'use strict';

const Bookshelf = require('./../helpers/db/pg-model');


const RoleModels = require('./role');

const User = Bookshelf.Model.extend({
    tableName: 'usertable',
});

exports.User = User;

var Users = Bookshelf.Collection.extend({
    model: User
});

exports.Users = Users;


