const express = require('express');

const UserController = require('./user');

const router = new express.Router();


router.get('/api/users', UserController.getAll);
router.get('/api/userbyid', UserController.getUser);
router.post('/api/users', UserController.create);
router.put('/api/users', UserController.update);
router.delete('/api/users', UserController.destroy);

module.exports = router;