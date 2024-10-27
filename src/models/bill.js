'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Bill.belongsTo(models.Allcode, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceTypeDataBill' })
            Bill.belongsTo(models.Allcode, { foreignKey: 'payment', targetKey: 'keyMap', as: 'paymentData' })


        }
    };


    Bill.init({
        cusId: DataTypes.INTEGER,
        nameCus: DataTypes.STRING,
        price: DataTypes.STRING,
        date: DataTypes.STRING,
        address: DataTypes.STRING,
        size: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        nameDrink: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        payment: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Bill',
    });
    return Bill;
};