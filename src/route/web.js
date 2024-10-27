import express, { Route } from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController";
import drinkController from "../controllers/drinkController";
import { name } from "ejs";
let Router = express.Router();
let initWebRoute = (app) => {
    Router.get('/', homeController.getHomeController);
    Router.get('/crud', homeController.getCRUD);
    Router.post('/post-crud', homeController.postCRUD);
    Router.post('/edit-crud', homeController.editCRUD);
    Router.get('/get-crud', homeController.getDisPlayCRUD);
    Router.get('/getEdit-crud', homeController.getEditCRUD);
    Router.post('/postEdit-crud', homeController.postEditCRUD);
    Router.post('/delete-crud', homeController.getDeleteCRUD);

    Router.post('/api/login', userController.handleLogin);
    Router.get('/api/getAllUser-crud', userController.handleGetAllUser)
    Router.post('/api/create-new-user', userController.handleCreateNewUser)
    Router.get('/api/allcodes', userController.getAllCodes)
    Router.delete('/api/delete-user', userController.handleDeleteUser)
    Router.put('/api/edit-user', userController.handleEditUser)
    Router.post('/api/save-drink', drinkController.handleCreateNewDrink)
    Router.get('/api/get-all-list-drinks', drinkController.getAllListDrinks)
    Router.delete('/api/delete-drink', drinkController.handleDeleteDrink)
    Router.get('/api/detail-drink', drinkController.handleGetDetailDrink)
    Router.post('/api/get-all-list-drinks-byDishID', drinkController.handleGetAllDrinkByListId)
    Router.post('/api/handle-add-to-cart', drinkController.handleAddToCart)
    // Router.get('/api/get-detail-drinks-by-Id', drinkController.handleGetDetailDrinkById)
    Router.get('/api/get-info-cart-by-Id', drinkController.handleGetInfoCartById)
    Router.post('/api/handle-delete-oder', drinkController.handleDeleteOder)
    Router.post('/api/handle-save-bill', drinkController.handleSaveBill);
    Router.get('/api/handle-get-all-bill', drinkController.handleGetBill);
    return app.use('/', Router);

};
module.exports = initWebRoute;