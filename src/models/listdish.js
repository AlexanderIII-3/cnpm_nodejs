'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ListDish extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ListDish.belongsTo(models.Allcode, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceTypeData' })
            ListDish.belongsTo(models.Allcode, { foreignKey: 'dishId', targetKey: 'keyMap', as: 'dishTypeData' })
            ListDish.hasOne(models.Cart, { foreignKey: 'id', })
        }
    };
    ListDish.init({
        name: DataTypes.STRING,
        price: DataTypes.STRING,
        decription: DataTypes.TEXT,
        image: DataTypes.BLOB,
        dishId: DataTypes.STRING,
        limitOder: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'ListDish',
    });
    return ListDish;
};