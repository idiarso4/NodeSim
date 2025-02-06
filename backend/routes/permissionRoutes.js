const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const { createPermission, updatePermissionStatus, getPermissions } = require('../controllers/permissionController');

router.post('/', auth, createPermission);
router.put('/:id', auth, checkRole('admin', 'teacher'), updatePermissionStatus);
router.get('/', auth, getPermissions);

module.exports = router;