'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const saltRounds = 10;
    const generatePassword = await bcrypt.hash('12345678', saltRounds);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Alex Rodriguez',
        username: 'Estudiante01',
        password: generatePassword,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        username: 'Moderador02',
        password: generatePassword,
        role: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};