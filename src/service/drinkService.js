
import raw from "body-parser/lib/types/raw";
import db from "../models";
import { where } from "sequelize";
import { size } from "lodash";
import _, { includes } from "lodash";

let handleCreateNewDrinkService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.action || !dataInput.name || !dataInput.description || !dataInput.selectedPrice
                || !dataInput.selectedTypeDish) {
                resolve({
                    errorCode: 1,
                    errorMess: "Missing required parameter!"
                })
            }
            else {
                if (dataInput.action === "CREATE") {

                    let data = await db.ListDish.findOne({
                        where: {
                            name: dataInput.name
                        }
                    })
                    if (data) {
                        resolve({
                            errorCode: 1,
                            errorMess: "This dirnk current has in the system!"
                        })
                    } else {
                        await db.ListDish.create({
                            name: dataInput.name,
                            price: dataInput.selectedPrice,
                            decription: dataInput.description,
                            image: dataInput.image,
                            dishId: dataInput.selectedTypeDish

                        })
                    }

                }
                if (dataInput.action === 'EDIT') {

                    if (!dataInput.id) {
                        resolve({
                            errorCode: 1,
                            errorMess: "Not found this drink in system!"
                        })
                    } else {
                        let data = await db.ListDish.findOne({
                            where: { id: dataInput.id }
                        })
                        if (data) {
                            data.name = dataInput.name;
                            data.price = dataInput.selectedPrice;
                            data.decription = dataInput.description;
                            data.image = dataInput.image;
                            data.dishId = dataInput.selectedTypeDish;
                            await data.save();
                        }
                    }

                }




            }
            resolve({
                errorCode: 0,
                errorMess: "Ô Kê"
            })


        } catch (error) {
            console.log('check error', error)
            reject({
                errorCode: 1,
                errorMess: 'Create falled'
            })
        }

    });
};
let getAllListDrinksService = () => {
    return new Promise(async (resolve, reject) => {

        try {
            let res = await db.ListDish.findAll({

                include: [
                    { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'dishTypeData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,







            });

            if (!res) res = {};
            if (res && res.length > 0) {
                res.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    return item;

                })


            }
            resolve({
                errorCode: 0,
                errorMess: "O ke!",
                data: res

            })

        } catch (error) {
            reject(error);
        }
    });
};
let handleDeleteDrinkService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.ListDish.findOne({
                where: {
                    id: id,
                }
            })
            if (!data) {
                resolve({
                    errorCode: 1,
                    errorMess: "This drink is not included in the data!"

                })
            }
            else {
                await db.ListDish.destroy({
                    where: {
                        id: id
                    }
                })
            }

            resolve({
                errorCode: 0,
                errorMess: "Delete successfully!"
            })
        } catch (error) {
            console.log(error)
            reject({
                errorCode: 1,
                errorMess: 'Delete falled!'
            })
        }
    });
};
let handleGetDetailDrinkService = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!id) {
                resolve({
                    errorCode: 1,
                    errorMess: "Not found this drink  in the data!"

                })
            }
            let res = await db.ListDish.findOne({
                where: { id: id },

                include: [
                    { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'dishTypeData', attributes: ['valueEn', 'valueVi'] },
                ],
                nest: true,







            });

            if (!res) res = {};
            if (res && res.image) {

                let dataImage = new Buffer.from(res.image, 'base64').toString('binary')
                res.image = dataImage





            }
            resolve({
                errorCode: 0,
                errorMess: "O ke!",
                data: res

            })

        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
};
let handleGetAllDrinkByListIdService = (dataInput) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!dataInput) {
                resolve({
                    errorCode: 1,
                    errorMess: "Missing Parameter!"

                })
            }
            let res = await db.ListDish.findAll({
                where: { dishId: dataInput },
                // attributes: { exclude: ['image'] },

                include: [
                    { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'dishTypeData', attributes: ['valueEn', 'valueVi'] },
                ],
                nest: true,







            });

            if (!res || res.length === 0) res = {};
            if (res && res.length > 0) {
                res.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    return item;

                })


            }
            resolve({
                errorCode: 0,
                errorMess: "O ke!",
                data: res

            })

        } catch (error) {
            console.log(error)
            reject(error);
        }
    });


};
let handleGetDetailDrinkByIdService = (dataId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.ListDish.findOne({
                where: {
                    id: dataId,
                },
                include: [
                    { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'dishTypeData', attributes: ['valueEn', 'valueVi'] },
                ],
                nest: true,

            })
            if (!data) {
                resolve({
                    errorCode: 1,
                    errorMess: "This drink is not included in the data!"

                })
            }


            resolve({
                errorCode: 0,
                errorMess: "O ke!",
                data: data
            })
        } catch (error) {
            console.log(error)
            reject({
                errorCode: 1,
                errorMess: 'Fetch detail drink falled!'
            })
        }
    });
};

// Cart


let handleAddToCartService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {



            if (!dataInput.amount || !dataInput.size || !dataInput.price
                || !dataInput.nameUser || !dataInput.name || !dataInput.idUser || !dataInput.date) {
                resolve({
                    errorCode: 1,
                    errorMess: "Missing required parameter!"
                })
            } else {

                let existing = await db.Cart.findOne(
                    {
                        where: {
                            userId: dataInput.idUser,
                            date: dataInput.date, drinkId: dataInput.drinkId,
                            size: dataInput.size

                        },
                        // attributes: ['nameDrink', 'date', 'size', 'userId'],
                        raw: false
                    }

                );
                if (existing) {
                    existing.amount = (+existing.amount + dataInput.amount);
                    await existing.save()
                } else {
                    await db.Cart.create({
                        nameDrink: dataInput.name,
                        price: dataInput.price,
                        nameUser: dataInput.nameUser,
                        size: dataInput.size,
                        userId: dataInput.idUser,
                        amount: dataInput.amount,
                        drinkId: dataInput.drinkId,
                        date: dataInput.date,
                    })
                }



            }








            resolve({
                errorCode: 0,
                errorMess: "Ô Kê"
            })


        } catch (error) {
            console.log(error)
            reject({
                errorCode: 1,
                errorMess: 'Create falled'
            })
        }

    });
};
let handleGetInfoCartByIdService = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {


            if (!id || !date) {
                resolve({
                    errorCode: 1,
                    errorMess: "Missing parameter"
                })
            } else {

                if (date === 'ALL') {
                    let res = await db.Cart.findAll({
                        where: {
                            userId: id,
                        },
                        include: [
                            { model: db.Allcode, as: 'priceTypeData1', attributes: ['valueEn', 'valueVi',] },
                            { model: db.ListDish, attributes: ['image'] },
                        ],
                        nest: true,
                    })

                    if (!res) {

                        res = [];

                    }
                    resolve({
                        errorCode: 0,
                        errorMess: "Ô Kê bay be",
                        data: res
                    })
                }
                if (date !== 'ALL') {
                    let res = await db.Cart.findAll({
                        where: {
                            userId: id,
                            date: date
                        },
                        include: [
                            { model: db.Allcode, as: 'priceTypeData1', attributes: ['valueEn', 'valueVi',] },
                            { model: db.ListDish, attributes: ['image'] },
                        ],
                        nest: true,
                    })
                    if (!res) {

                        res = [];

                    }
                    resolve({
                        errorCode: 0,
                        errorMess: "Ô Kê bay be",
                        data: res
                    })
                }



            }






        } catch (error) {
            console.log(error)
            reject({
                errorCode: 1,
                errorMess: 'Create falled'
            })
        }

    });
};
let handleDeleteOderService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Cart.findOne({
                where: {
                    id: id,
                }
            })
            if (!data) {
                resolve({
                    errorCode: 1,
                    errorMess: "This drink is not included in the data!"

                })
            }
            else {
                await db.Cart.destroy({
                    where: {
                        id: id
                    }
                })
            }

            resolve({
                errorCode: 0,
                errorMess: "Delete successfully!"
            })
        } catch (error) {
            console.log(error)
            reject({
                errorCode: 1,
                errorMess: 'Delete falled!'
            })
        }
    });
};
let handleSaveBillService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrDrink || !data.cusId || !data.date || !data.nameCus) {
                resolve({
                    errorCode: 1,
                    errorMess: "Missing required parameter!"
                })
            }
            else {
                let arrDrink = data.arrDrink;
                let existing = await db.Bill.findAll({
                    where: {
                        cusId: data.cusId,
                        date: data.date,
                    },
                    attributes: ['nameDrink', 'date', 'size', 'amount']
                })

                let toCreate = _.differenceWith(arrDrink, existing, (a, b) => {
                    return a.nameDrink === b.nameDrink && +a.date === +b.date && a.size === b.size
                        && a.payment === b.payment
                        && +a.amount === +b.amount;

                });
                // create data
                if (toCreate && toCreate.length > 0) {
                    await db.Bill.bulkCreate(toCreate);

                    await db.Cart.destroy({
                        where: {
                            userId: data.cusId
                        }
                    })

                }
                resolve({
                    errorCode: 0,
                    errorMess: "O Ke!",

                })

            }
        } catch (error) {
            console.log(error)
            reject({
                errorCode: 1,
                errorMess: 'Delete falled!'
            })
        }
    });

};
let handleGetBillService = async (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {


            if (!id || !date) {
                resolve({
                    errorCode: 1,
                    errorMess: "Missing parameter"
                })
            } else {
                let res = await db.Bill.findAll({
                    where: {
                        cusId: id,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeDataBill', attributes: ['valueEn', 'valueVi',] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi',] },
                    ],
                    nest: true,
                })
                if (!res) {

                    res = [];

                }
                resolve({
                    errorCode: 0,
                    errorMess: "Ô Kê bay be",
                    data: res
                })
            }






        } catch (error) {
            console.log(error)
            reject({
                errorCode: 1,
                errorMess: 'Create falled'
            })
        }

    });
};
module.exports = {
    handleCreateNewDrinkService: handleCreateNewDrinkService,
    getAllListDrinksService: getAllListDrinksService,
    handleDeleteDrinkService: handleDeleteDrinkService,
    handleGetAllDrinkByListIdService: handleGetAllDrinkByListIdService,
    handleGetDetailDrinkService: handleGetDetailDrinkService,
    handleAddToCartService: handleAddToCartService,
    handleGetInfoCartByIdService: handleGetInfoCartByIdService,
    handleDeleteOderService: handleDeleteOderService,
    handleSaveBillService: handleSaveBillService,
    handleGetBillService: handleGetBillService
}