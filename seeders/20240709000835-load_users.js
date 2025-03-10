'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const saltRounds = 10;
    const generatePassword = await bcrypt.hash('12345678', saltRounds);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Julio Rocha',
        username: 'Julio_profe',
        password: generatePassword,
        role: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juan Mercado',
        username: 'Juan_estudiante',
        password: generatePassword,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    // Ejecutar TRUNCATE TABLE en lugar de bulkDelete
    // await queryInterface.sequelize.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;', {
    //   type: queryInterface.sequelize.QueryTypes.RAW
    // });
  }
};