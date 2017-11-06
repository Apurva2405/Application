"use strict";
exports.__esModule = true;
var express_1 = require("express");
var serverData_1 = require("../serverdata/serverData");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.GetUsers = function (req, res) {
        serverData_1["default"].getAllUsers(req.query.search).then(function (data) {
            res.json({
                status: 200,
                data: data
            });
        })["catch"](function (err) {
            res.json({
                status: 500,
                data: err
            });
        });
    };
    UserRouter.prototype.SaveUser = function (req, res) {
        serverData_1["default"].saveUser(req.body).then(function (data) {
            res.json({
                status: 200,
                message: 'User saved successfully  !!!!!',
                data: data
            });
        })["catch"](function (err) {
            res.json({
                status: 500,
                message: err
            });
        });
    };
    UserRouter.prototype.routes = function () {
        this.router.get('/', this.GetUsers);
        this.router.post('/', this.SaveUser);
    };
    return UserRouter;
}());
//export
var userRoutes = new UserRouter();
userRoutes.routes();
exports["default"] = userRoutes.router;
