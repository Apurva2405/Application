"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serverData_1 = require("../serverdata/serverData");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetUsers(req, res) {
        serverData_1.default.getAllUsers(req.query.search).then((data) => {
            res.json({
                status: 200,
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                data: err
            });
        });
    }
    SaveUser(req, res) {
        serverData_1.default.saveUser(req.body).then((data) => {
            res.json({
                status: 200,
                message: 'User saved successfully  !!!!!',
                data: data
            });
        }).catch((err) => {
            if (err == 'exist') {
                res.json({
                    status: 500,
                    message: err,
                    data: {}
                });
            }
            else {
                res.json({
                    status: 500,
                    message: 'Internal error',
                    data: err
                });
            }
        });
    }
    UpdateUser(req, res) {
        serverData_1.default.updateUser(req.params.id, req.body).then((data) => {
            res.json({
                status: 200,
                message: 'User updated successfully',
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                message: err
            });
        });
    }
    GetUserById(req, res) {
        serverData_1.default.getUserById(req.params.id).then((data) => {
            res.json({
                status: 200,
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                message: err
            });
        });
    }
    DeleteUser(req, res) {
        serverData_1.default.deleteUser(req.params.id).then((data) => {
            res.json({
                status: 200,
                message: 'User deleted successfully',
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                message: err
            });
        });
    }
    UplaodUserImage(req, res) {
        console.log(req, '+++++++', req.body);
    }
    routes() {
        this.router.get('/', this.GetUsers);
        this.router.post('/', this.SaveUser);
        this.router.put('/:id', this.UpdateUser);
        this.router.delete('/:id', this.DeleteUser);
        this.router.get('/byId/:id', this.GetUserById);
        this.router.post('/UplaodUserImage/:id', this.UplaodUserImage);
    }
}
//export
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
