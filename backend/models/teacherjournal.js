const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TeacherJournal extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  TeacherJournal.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lessonTopic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    teachingMaterials: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    activities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'TeacherJournal',
    tableName: 'teacher_journals',
    timestamps: true
  });

  return TeacherJournal;
};