'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Messages', [
      {
        content: '¡Hola soy un estudiante!',
        userId: 1, // ID del estudiante
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: '¡Hola soy el moderador!',
        userId: 2, // ID del moderador
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
