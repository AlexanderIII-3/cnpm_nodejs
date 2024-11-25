'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.ListDish, { foreignKey: 'price', as: 'priceTypeData' })
            Allcode.hasMany(models.ListDish, { foreignKey: 'dishId', as: 'dishTypeData' })
            Allcode.hasMany(models.Cart, { foreignKey: 'price', as: 'priceTypeData1' })
            Allcode.hasMany(models.Bill, { foreignKey: 'price', as: 'priceTypeDataBill' })
            Allcode.hasMany(models.Bill_Cus, { foreignKey: 'price', as: 'priceTypeDataBillCus' })
            Allcode.hasMany(models.Bill, { foreignKey: 'payment', as: 'paymentData' })

        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Allcode',
    }
    );
    return Allcode;
};