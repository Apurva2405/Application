"use strict";
exports.__esModule = true;
var User_1 = require("../model/User");
var ServerData = /** @class */ (function () {
    function ServerData() {
    }
    ServerData.getAllUsers = function (search) {
        return new Promise(function (resolve, reject) {
            var condition = {
                deleted: false
            };
            if (search && search !== 'undefined') {
                condition.emailid = new RegExp(search, 'ig');
            }
            console.log("getAllUSer::condition :" + condition + " search :" + search);
            User_1["default"].find(condition).then(function (data) {
                resolve(data);
            })["catch"](function (err) {
                reject('Internal Error');
            });
        });
    };
    ServerData.saveUser = function (body) {
        return new Promise(function (resolve, reject) {
            User_1["default"].findOne({ email: new RegExp(body.emailid, 'i'), deleted: false })
                .then(function (data) {
                return data;
            })
                .then(function (exist) {
                if (exist) {
                    reject('Email already exist, Please try again');
                }
                else {
                    var options = {
                        path: '/images/logos/ps_logo2.png'
                    };
                    var date = new Date();
                    console.log(date);
                    console.log(body.image_base64);
                    new User_1["default"]({
                        emailid: body.emailid,
                        salary: body.salary,
                        name: body.name,
                        phone: body.phone,
                        image_name: body.image_base64
                    }).save(function (err, data) {
                        if (!err)
                            resolve(data);
                        else
                            reject('Internal Error');
                    });
                }
            })["catch"](function (err) {
                reject('Internal Error');
            });
        });
    };
    ServerData.updateUser = function (id, body) {
        return new Promise(function (resolve, reject) {
            User_1["default"].findOne({ _id: { $ne: id }, email: new RegExp(body.email, 'i'), deleted: false })
                .then(function (data) {
                return data;
            })
                .then(function (exist) {
                if (exist) {
                    reject('Email already exist, Please try again');
                }
                else {
                    return User_1["default"].findOne({ _id: id, deleted: false });
                }
            })
                .then(function (userData) {
                if (!userData) {
                    reject('User not found');
                    return;
                }
                userData.name = body.name;
                userData.email = body.email;
                userData.phone = body.phone;
                userData.salary = body.salary;
                userData.save(function (err, data) {
                    if (!err)
                        resolve(data);
                    else
                        reject('Internal Error');
                });
            })["catch"](function (err) {
                console.log(err, 'error');
                reject('Internal Error');
            });
        });
    };
    ServerData.getUserById = function (id) {
        return new Promise(function (resolve, reject) {
            User_1["default"].findOne({ _id: id }).then(function (data) {
                resolve(data);
            })["catch"](function (err) {
                reject('Internal Error');
            });
        });
    };
    ServerData.deleteUser = function (id) {
        return new Promise(function (resolve, reject) {
            User_1["default"].findOne({ _id: id })
                .then(function (data) {
                if (!data) {
                    reject('User not found');
                }
                else {
                    data.deleted = true;
                    data.save(function (err, savedUser) {
                        if (!err)
                            resolve(savedUser);
                        else
                            reject('Internal Error');
                    });
                }
            })["catch"](function (err) {
                reject('Internal Error');
            });
        });
    };
    return ServerData;
}());
exports["default"] = ServerData;
