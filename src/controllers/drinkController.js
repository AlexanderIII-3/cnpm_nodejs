
import drinkService from '../service/drinkService'
let handleCreateNewDrink = async (req, res) => {
    try {
        let dataInput = req.body;
        let drink = await drinkService.handleCreateNewDrinkService(dataInput)
        return res.status(200).json(drink);

    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server1"
        })
    }
};
let getAllListDrinks = async (req, res) => {
    try {
        let dataInput = req.body;

        let ListDrink = await drinkService.getAllListDrinksService(dataInput)
        return res.status(200).json(ListDrink);

    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server"
        })
    }
}
let handleDeleteDrink = async (req, res) => {
    try {

        let data = await drinkService.handleDeleteDrinkService(req.body.id);
        return res.status(200).json(
            data
        )

    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
}
let handleGetDetailDrink = async (req, res) => {
    try {
        let data = await drinkService.handleGetDetailDrinkService(req.query.id)
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
}
let handleGetAllDrinkByListId = async (req, res) => {
    try {
        let dataInput = req.body.data;
        let data = await drinkService.handleGetAllDrinkByListIdService(dataInput)
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
}
let handleGetDetailDrinkById = async (req, res) => {
    try {
        console.log('check data id ', req.query)

        let data = await drinkService.handleGetDetailDrinkByIdService(req.query.id)
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
};
// cart


let handleAddToCart = async (req, res) => {
    try {
        let dataInput = req.body;
        let data = await drinkService.handleAddToCartService(dataInput)
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
}
let handleGetInfoCartById = async (req, res) => {
    try {
        let data = await drinkService.handleGetInfoCartByIdService(req.query.id, req.query.date)
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
}
let handleDeleteOder = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await drinkService.handleDeleteOderService(id);
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
};
let handleSaveBill = async (req, res) => {
    try {
        let dataInput = req.body;
        let data = await drinkService.handleSaveBillService(dataInput);
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
};
let handleGetBill = async (req, res) => {
    try {

        let data = await drinkService.handleGetBillService(req.query.id, req.query.date);
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
};
let handleClearBill = async (req, res) => {
    try {
        let data = await drinkService.handleClearBillService(req.body);
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
};
let handleGetBillCus = async (req, res) => {
    try {
        let data = await drinkService.handleGetBillCusService(req.query.id, req.query.date);
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log('Error', error)
        return res.status(200).json({
            errorCode: 1,
            errorMess: "Error From server!"
        })
    }
};
module.exports = {
    handleCreateNewDrink,
    getAllListDrinks,
    handleDeleteDrink,
    handleGetDetailDrink,
    handleGetAllDrinkByListId,
    handleGetDetailDrinkById,
    handleAddToCart,
    handleGetInfoCartById,
    handleDeleteOder, handleSaveBill,
    handleGetBill, handleClearBill,
    handleGetBillCus
}