'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'School Admin',
        email: 'admin@school.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'John Doe',
        email: 'teacher@school.com',
        password: await bcrypt.hash('password123', 10),
        role: 'teacher',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Staff Member',
        email: 'staff@school.com',
        password: await bcrypt.hash('password123', 10),
        role: 'staff',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Student One',
        email: 'student@school.com',
        password: await bcrypt.hash('password123', 10),
        role: 'student',
        class: 'X-IPA-1',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};