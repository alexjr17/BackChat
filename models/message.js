'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // El nombre de la tabla en la base de datos
        key: 'id'
      }
    }
  }, {});
  
  Message.associate = function(models) {
    // Un mensaje pertenece a un usuario
    Message.belongsTo(models.User, { foreignKey: 'userId' });
  };
  
  return Message;
};