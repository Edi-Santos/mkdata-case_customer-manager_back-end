'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      'CPF/CNPJ': {
        allowNull: false,
        type: Sequelize.STRING,
      },
      RG: {
        type: Sequelize.STRING,
      },
      data_cadastro: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      grupo: {
        type: Sequelize.STRING,
      },
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};