const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const { createAttendance, updateAttendance, getAttendance } = require('../controllers/attendanceController');

router.post('/', auth, createAttendance);
router.put('/:id', auth, updateAttendance);
router.get('/', auth, getAttendance);

module.exports = router;