'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get user IDs
    const admin = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'admin@school.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const teacher = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'teacher@school.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    return queryInterface.bulkInsert('permissions', [
      {
        id: uuidv4(),
        userId: teacher[0]?.id,
        reason: 'Professional development workshop',
        startTime: new Date('2025-02-10T09:00:00'),
        endTime: new Date('2025-02-10T17:00:00'),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};