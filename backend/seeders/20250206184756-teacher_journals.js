'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get teacher's ID
    const teacher = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'teacher@school.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const teacherId = teacher[0]?.id;

    return queryInterface.bulkInsert('teacher_journals', [
      {
        id: uuidv4(),
        userId: teacherId,
        date: new Date(),
        subject: 'Mathematics',
        class: 'X-IPA-1',
        lessonTopic: 'Linear Algebra',
        teachingMaterials: 'Textbook Chapter 3, Worksheets',
        activities: 'Lecture, Problem-solving exercises, Group discussion',
        notes: 'Students showed good understanding of basic concepts',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userId: teacherId,
        date: new Date(),
        subject: 'Physics',
        class: 'X-IPA-2',
        lessonTopic: 'Kinematics',
        teachingMaterials: 'Physics Lab Equipment, Motion Sensors',
        activities: 'Interactive demonstration, Laboratory work, Class discussion',
        notes: 'Practical session was particularly effective',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teacher_journals', null, {});
  }
};