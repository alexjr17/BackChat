'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener IDs de los usuarios
    const users = await queryInterface.sequelize.query(
      'SELECT id, username FROM Users',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Insertar mensajes usando los IDs de los usuarios
    await queryInterface.bulkInsert('Messages', [
      {
        content: 'Hello everyone!',
        userId: users.find(user => user.username === 'Estudiante01').id, // ID del usuario estudiante
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Welcome to the class.',
        userId: users.find(user => user.username === 'Moderador01').id, // ID del moderador
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
