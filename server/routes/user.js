'use strict';

const _pick = require('lodash/pick');

const Exception = require('./../helpers/exception');
const UserService = require('./../services/user');
const UserController = {};
const mailer   = require('./../services/mailer');


UserController.getAll = function (req, res) {
    UserService.getAll()
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err);
        });
};

UserController.getUser = function (req, res) {
    const id = req.query.id;
    UserService.getUser(id)
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

UserController.create = function (req, res) {
    const input = Object.assign({}, _pick(req.body, ['name', 'email','password']));
    mailer.sendmail('jeanjofi@gmail.com','User Created',JSON.stringify(input));
    UserService.create(input)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err);
        });
};

UserController.update = function (req, res) {
    const input = Object.assign(_pick(req.body, ['name', 'email','password']));
    const id = req.query.id;
    UserService.update(id, input)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err)
        });
};

UserController.destroy = function (req, res) {
    const id = req.query.id;
    UserService.destroy(id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            Exception.failWith(res, err)
        });
};


module.exports = UserController;