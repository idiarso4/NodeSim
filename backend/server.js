const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const permissionRoutes = require('./routes/permission');
const teacherJournalRoutes = require('./routes/teacherJournal');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/teacher-journals', teacherJournalRoutes);

module.exports = app;