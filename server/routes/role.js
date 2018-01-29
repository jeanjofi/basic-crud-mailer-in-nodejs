'use strict';

const _pick = require('lodash/pick');

const Exception = require('./../helpers/exception');
const RoleService = require('./../services/role');
const RoleController = {};


RoleController.getAll = function (req, res) {
    RoleService.getAll()
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err);
        });
};

RoleController.getRole = function (req, res) {
    const id = req.params.id;
    RoleService.getUser(id)
        .then(function (result) {
            if (result) {
                res.status(200).json(result)
            } else {
                throw new Error(Exception.MODEL_NOT_FOUND_EXCEPTION);
            }
        })
        .catch(function (err) {
            Exception.failWith(res, err);
        });
};

RoleController.create = function (req, res) {
    const input = {'rolename': req.body.rolename};
    RoleService.create(input)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err);
        });
};

RoleController.update = function (req, res) {
    const input = Object.assign({}, req.body.rolename, {'modifiedby': req.session.user.id});
    const id = req.params.id;

    RoleService.update(id, input)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err)
        });
};

RoleController.destroy = function (req, res) {
    const id = req.params.id;
    RoleService.destroy(id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err)
        });
};


module.exports = RoleController;