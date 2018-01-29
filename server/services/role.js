'use strict';

const Model = require('./../models/role');
const RoleService = {};


RoleService.getAll = function () {
    return Model.Roles.forge().fetch();

};

RoleService.getRole = function (id) {
    return Model.Role.forge({'id': id}).fetch();

};

RoleService.create = function (input) {
    return Model.Role.forge(input).save(null, {require: true});

};

RoleService.update = function (id, input) {
    return Model.Role.forge({'id': id}).save(input);

};

RoleService.destroy = function (id) {
    return Model.Role.forge({'id': id}).destroy();

};


module.exports = RoleService;