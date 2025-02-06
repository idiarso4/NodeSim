const { Permission, User } = require('../models');

const createPermission = async (req, res) => {
  try {
    const { reason, startTime, endTime } = req.body;
    const permission = await Permission.create({
      userId: req.user.id,
      reason,
      startTime,
      endTime
    });
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePermissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const permission = await Permission.findByPk(id);
    
    if (!permission) {
      return res.status(404).json({ error: 'Permission request not found' });
    }
    
    await permission.update({ 
      status,
      approvedBy: req.user.id
    });
    res.json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPermissions = async (req, res) => {
  try {
    const where = req.user.role === 'student' ? 
      { userId: req.user.id } : {};
    
    const permissions = await Permission.findAll({
      where,
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json(permissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPermission,
  updatePermissionStatus,
  getPermissions
};