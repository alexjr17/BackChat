'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener IDs de los usuarios
    const users = await queryInterface.sequelize.query(
      'SELECT id, username FROM Users',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // tomar id de usaurios existentes
    await queryInterface.bulkInsert('Messages', [
      {
        content: '¡Hola soy el profesor!',
        userId: users.find(user => user.username === 'Julio_profe').id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: '¡Hola soy el estudiante!',
        userId: users.find(user => user.username === 'Juan_estudiante').id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
