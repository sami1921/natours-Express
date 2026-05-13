const express = require('express');
const userControler = require('../controlers/userControler');
const authController = require('../controlers/authController');
const router = express.Router();
router.post('/signup', authController.signup);
router.route('/').get(userControler.getAllUsers).post(userControler.createUser);
router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);
module.exports = router;
