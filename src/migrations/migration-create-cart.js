'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Carts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },




            userId: {
                type: Sequelize.INTEGER
            },
            nameUser: {
                type: Sequelize.STRING
            },
            nameDrink: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },

            size: {
                type: Sequelize.STRING
            },
            amount: {
                type: Sequelize.INTEGER
            },
            drinkId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },









            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Carts');
    }
};