const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const { createJournal, updateJournal, getJournals } = require('../controllers/teacherJournalController');

router.post('/', auth, checkRole('teacher'), createJournal);
router.put('/:id', auth, checkRole('teacher'), updateJournal);
router.get('/', auth, checkRole('teacher'), getJournals);

module.exports = router;