const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Attendance extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Attendance.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    checkInTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkOutTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'late', 'early_leave'),
      defaultValue: 'present'
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('class', 'extracurricular'),
      defaultValue: 'class'
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendances',
    timestamps: true
  });

  return Attendance;
};