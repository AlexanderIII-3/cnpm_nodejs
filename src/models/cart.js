'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cart.belongsTo(models.Allcode, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceTypeData1' })
            Cart.belongsTo(models.ListDish, { foreignKey: 'drinkId', targetKey: 'id', })

        }
    };
    Cart.init({
        userId: DataTypes.INTEGER,
        nameUser: DataTypes.STRING,

        nameDrink: DataTypes.STRING,
        price: DataTypes.STRING,
        size: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        drinkId: DataTypes.INTEGER,
        date: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};