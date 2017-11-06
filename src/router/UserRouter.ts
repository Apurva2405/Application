import { Router, Request, Response , NextFunction} from 'express';

import User from '../model/User';

import ServerData from '../serverdata/serverData';

import * as formidable from "formidable";
class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    public GetUsers (req: Request, res: Response): void {
        ServerData.getAllUsers(req.query.search).then((data) => {
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

    public SaveUser (req: Request, res: Response): void {
    ServerData.saveUser(req.body).then((data) => {
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
            } else {
                res.json({
                    status: 500,
                    message: 'Internal error',
                    data: err
                });
            }

        });
    }

    
        public UpdateUser (req: Request, res: Response): void {
        ServerData.updateUser(req.params.id, req.body).then((data) => {
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
    
        
        public GetUserById (req: Request, res: Response): void {
        ServerData.getUserById(req.params.id).then((data) => {
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
        public DeleteUser (req: Request, res: Response): void {
            ServerData.deleteUser(req.params.id).then((data) => {
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

            public UplaodUserImage(req: Request, res: Response): void {
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
export default userRoutes.router;