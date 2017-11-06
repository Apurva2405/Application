import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as fileupload from "express-fileupload";
// import * as compression from "compression";

import UserRouter from "./router/UserRouter";

//server class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use('/', express.static(__dirname + '/public'));
        
    }

    public config() {
        const MONGO_URI = 'mongodb://localhost/myDB';
        mongoose.connect(MONGO_URI);
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.json({limit: "1gb"}));
        this.app.use(bodyParser.urlencoded({limit: "1gb", extended: true, parameterLimit:50000}));
        this.app.use(fileupload());
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();
        this.app.use('/api/v1/users', UserRouter);
    }
}

export default new Server().app;