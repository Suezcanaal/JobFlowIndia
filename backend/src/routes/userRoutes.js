const express = require('express');
const { updateUserProfile, deleteUserAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile')
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserAccount);

module.exports = router;