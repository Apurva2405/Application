"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
// import * as compression from "compression";
const UserRouter_1 = require("./router/UserRouter");
//server class
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use('/', express.static(__dirname + '/public'));
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/myDB';
        mongoose.connect(MONGO_URI);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.json({ limit: "1gb" }));
        this.app.use(bodyParser.urlencoded({ limit: "1gb", extended: true, parameterLimit: 50000 }));
        this.app.use(fileupload());
    }
    routes() {
        let router;
        router = express.Router();
        this.app.use('/api/v1/users', UserRouter_1.default);
    }
}
exports.default = new Server().app;
