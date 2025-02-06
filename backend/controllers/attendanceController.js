const { Attendance, User } = require('../models');

const createAttendance = async (req, res) => {
  try {
    const { userId, checkInTime, type, location } = req.body;
    const attendance = await Attendance.create({
      userId,
      checkInTime,
      type,
      location
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkOutTime, status } = req.body;
    const attendance = await Attendance.findByPk(id);
    
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    await attendance.update({ checkOutTime, status });
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;
    const where = {};
    
    if (userId) where.userId = userId;
    if (startDate && endDate) {
      where.checkInTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    
    const attendance = await Attendance.findAll({
      where,
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAttendance,
  updateAttendance,
  getAttendance
};