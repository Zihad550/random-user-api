const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

/**
* @api {get} /api/v1/user/random
* @apiDescription Get a random user
* @apiPermission any
*
* @apiSuccess (200) {type: 'Success', message: 'Successfully got data', data: a_random_user_data } 
*
* @apiError (400) {type: 'Error', message: 'Failed to get data'}
*/
router.get('/random', userController.getRandomUser);


/**
* @api {all} /api/v1/user/all
* @apiDescription Get all users
* @apiPermission any
*
* @apiQuery {limit}   any positive number    
*
* @apiSuccess (200) {type: 'Success', message: 'Successfully got data', data: all users } 
*
* @apiError (400) {type: 'Error', message: 'Failed to get data'}
*/
router.get('/all', userController.getAllUsers);



/**
* @api {post} /api/v1/user/save
* @apiDescription Save a user
* @apiPermission any
*
* @apiBody {id: string, gender: string, name: string, contact: string, address: string, photoUrl: string}
*
* @apiSuccess (200) {type: 'Success', message: 'User saved successfully' } 
*
* @apiError (400) {type: 'Error', message: 'Failed to save user'}
* @apiError (400) {type: 'Error', message: '___ not provided'}   '___' = the user field names
*/
router.post('/save', userController.saveAnUser);


/**
* @api {patch} /api/v1/user/update
* @apiDescription Update a user
* @apiPermission any
*
* @apiBody {id: string, name: string} => you can pass any field you want to update,
*
* @apiSuccess (200) {type: 'Success', message: 'User updated successfully' } 
*
* @apiError (400) 'Invalid id'
* @apiError (400) 'User not found'
* @apiError (400) {type: 'Error', message: 'Unable to update user'}
*/
router.patch('/update', userController.updateAnUser);



/**
* @api {patch} /api/v1/user/bulk-update
* @apiDescription Update a list of users
* @apiPermission any

* @apiBody {userIds: [id_of_users], field: any_field_name, value: field_value}
*
* @apiSuccess (200) {type: 'Success', message: 'Users updated successfully' } 
*
* @apiError (400) {type: 'Error', message: 'Failed to update multiple users'}
*/
router.patch('/bulk-update', userController.updateMultipleUsers);



/**
* @api {delete} /api/v1/user/delete
* @apiDescription Delete a user
* @apiPermission any
*
* @apiBody {id: a_user_id }
*
* @apiSuccess (200) {type: 'Success', message: 'User Deleted successfully' } 
*
* @apiError (400) 'User id is invalid!'
* @apiError (400) 'NO user exists with the given id!!'
* @apiError (400) {type: 'Error', message: 'Failed to delete the user'}
*/
router.delete('/delete', userController.deleteAnUser);

module.exports = router;