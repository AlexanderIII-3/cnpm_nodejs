'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ListDishes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },



            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            decription: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            dishId: {
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
        await queryInterface.dropTable('ListDishes');
    }
};