'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill_Cus extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Bill_Cus.belongsTo(models.Allcode, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceTypeDataBillCus' })


        }
    };


    Bill_Cus.init({
        cusId: DataTypes.INTEGER,
        nameCus: DataTypes.STRING,
        price: DataTypes.STRING,
        date: DataTypes.STRING,
        size: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        nameDrink: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Bill_Cus',
    });
    return Bill_Cus;
};