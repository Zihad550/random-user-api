const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

router.get('/random', userController.getRandomUser);

router.get('/all', userController.getAllUsers);

router.post('/save', userController.saveAnUser);

router.patch('/update', userController.updateAnUser);

router.patch('/bulk-update', userController.updateMultipleUsers);

router.delete('/delete', userController.deleteAnUser);

module.exports = router;