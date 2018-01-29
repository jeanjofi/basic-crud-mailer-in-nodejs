'use strict';

const Model = require('./../models/user');
const UserService = {};


UserService.getAll = function () {
    return Model.Users.forge().fetch();

};

UserService.getUser = function (id) {
    return Model.User.forge({'id': id}).fetch();

};

UserService.create = function (input) {
    return Model.User.forge(input).save(null, {require: true});

};

UserService.update = function (id, input) {
    return Model.User.forge({'id': id}).save(input);

};

UserService.destroy = function (id) {
    return Model.User.forge({'id': id}).destroy();

};


module.exports = UserService;