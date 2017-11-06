"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// import * as compression from "compression";
var UserRouter_1 = require("./router/UserRouter");
//server class
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use('/', express.static(__dirname + '/public'));
    }
    Server.prototype.config = function () {
        var MONGO_URI = 'mongodb://localhost/myDB';
        mongoose.connect(MONGO_URI);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use('/api/v1/users', UserRouter_1["default"]);
    };
    return Server;
}());
exports["default"] = new Server().app;
