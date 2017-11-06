"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const fs = require("fs");
const path = require("path");
class ServerData {
    static getAllUsers(search) {
        return new Promise((resolve, reject) => {
            let condition = {
                deleted: false
            };
            if (search && search !== 'undefined') {
                condition.emailid = new RegExp(search, 'ig');
            }
            console.log("getAllUSer::condition :" + condition + " search :" + search);
            User_1.default.find(condition).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject('Internal Error');
            });
        });
    }
    static saveUser(body) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ email: new RegExp(body.emailid, 'i'), deleted: false })
                .then((data) => {
                return data;
            })
                .then((exist) => {
                if (exist) {
                    reject('exist');
                }
                else {
                    var timestamp = Number(new Date());
                    var filePath = "./dest/public/upload/" + timestamp + "" + body.ext;
                    // to convert base64 format into random filename
                    var base64Data = body.image_base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                    fs.writeFile(path.resolve(filePath), base64Data, 'base64', (err) => {
                        if (err) {
                            console.log(err, "error");
                            reject(err);
                        }
                        else {
                            new User_1.default({
                                emailid: body.emailid,
                                salary: body.salary,
                                name: body.name,
                                phone: body.phone,
                                image_name: timestamp + "" + body.ext
                            }).save((err, data) => {
                                if (!err)
                                    resolve(data);
                                else {
                                    console.log(err, 'Erro');
                                    reject(err);
                                }
                            });
                        }
                    });
                }
            }).catch((err) => {
                console.log(err, 'Erro');
                reject(err);
            });
        });
    }
    static updateUser(id, body) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ _id: { $ne: id }, email: new RegExp(body.email, 'i'), deleted: false })
                .then((data) => {
                return data;
            })
                .then((exist) => {
                if (exist) {
                    reject('Email already exist, Please try again');
                }
                else {
                    return User_1.default.findOne({ _id: id, deleted: false });
                }
            })
                .then((userData) => {
                if (!userData) {
                    reject('User not found');
                    return;
                }
                userData.name = body.name;
                userData.email = body.email;
                userData.phone = body.phone;
                userData.salary = body.salary;
                if (body.image_base64) {
                    var timestamp = Number(new Date());
                    var filePath = "./dest/public/upload/" + timestamp + "" + body.ext;
                    // to convert base64 format into random filename
                    var base64Data = body.image_base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                    fs.writeFile(path.resolve(filePath), base64Data, 'base64', (err) => {
                        if (err) {
                            console.log(err, "error");
                            reject(err);
                        }
                        else {
                            userData.image_name = timestamp + "" + body.ext;
                            userData.save((err, data) => {
                                if (!err)
                                    resolve(data);
                                else
                                    reject('Internal Error');
                            });
                        }
                    });
                }
                else {
                    userData.save((err, data) => {
                        if (!err)
                            resolve(data);
                        else
                            reject('Internal Error');
                    });
                }
            }).catch((err) => {
                console.log(err, 'error');
                reject('Internal Error');
            });
        });
    }
    static getUserById(id) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ _id: id }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject('Internal Error');
            });
        });
    }
    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ _id: id })
                .then((data) => {
                if (!data) {
                    reject('User not found');
                }
                else {
                    data.deleted = true;
                    data.save((err, savedUser) => {
                        if (!err)
                            resolve(savedUser);
                        else
                            reject('Internal Error');
                    });
                }
            }).catch((err) => {
                reject('Internal Error');
            });
        });
    }
}
exports.default = ServerData;
