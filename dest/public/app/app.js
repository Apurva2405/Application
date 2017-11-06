var MyApp;
(function (MyApp) {
    var myController = /** @class */ (function () {
        function myController($scope, $http, $window) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            $scope.vm = this;
        }
        myController.prototype.getUsers = function () {
            var _this = this;
            this.$http.get('api/v1/users?search=' + this.searchText).then(function (data) {
                if (data.status == 200) {
                    _this.users = data.data;
                }
                else {
                    alert('Error');
                }
            })["catch"](function (err) {
                console.log('Error');
            });
        };
        myController.prototype.deleteUser = function (id) {
            var _this = this;
            bootbox.confirm('Are you sure you want to delete this user', function (r) {
                if (r) {
                    _this.$http["delete"]('api/v1/users/' + id).then(function (data) {
                        if (data.data.status == 200) {
                            _this.getUsers();
                        }
                        else {
                            toastr['error'](data.data.message);
                        }
                    })["catch"](function (err) {
                        console.log('Error', err);
                        toastr['error']('Internal Error');
                    });
                }
            });
        };
        myController.prototype.search = function (id) {
            var _this = this;
            this.$http.get('api/v1/users').then(function (data) {
                if (data.status == 200) {
                    _this.users = data.data;
                }
                else {
                    alert('Error');
                }
            })["catch"](function (err) {
                console.log('Error');
            });
        };
        return myController;
    }());
    var UserController = /** @class */ (function () {
        function UserController($scope, $http, $state, $stateParams) {
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.userObj = {};
            this.profile_pic = '/upload/default-user.png';
            $scope.vm = this;
        }
        UserController.prototype.showImage = function () {
            console.log('++++++++++');
            this.uploadFile(stateparam_id, function (err, base64) {
                this.profile_pic = base64;
                console.log('**********', base64);
            });
        };
        UserController.prototype.uploadFile = function (stateparam_id, callback) {
            var filePathInput = $("#filePath");
            if (filePathInput[0].files.length !== 0) {
                if (filePathInput[0].files.length === 1) {
                    var ext = ("." + filePathInput[0].files[0].name.split('.')[1]).toLowerCase();
                    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
                        if (filePathInput[0].files[0].size <= 40, 960) {
                            var file = filePathInput[0].files[0];
                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            this.userObj.ext = ext;
                            reader.onload = function () {
                                callback(null, reader.result);
                            };
                            reader.onerror = function (error) {
                                console.log('Error: ', error);
                                callback(error, null);
                            };
                        }
                        else {
                            toastr['error']('Upload small size Image');
                        }
                    }
                    else {
                        toastr['error']('Upload only Image');
                    }
                }
                else {
                    toastr['error']('Upload only one file');
                }
            }
            else {
                if (!stateparam_id) {
                    toastr['error']('Attach atleats one image!!');
                }
                else {
                    callback(null, null);
                }
            }
        };
        // uploadFile(data,callback){
        //     var file= data.$$element.context[4].files[0].name;
        //     var date = new Date();
        //     var fname="upload_"+file
        //             +"_"+date.toString().split(' ')[0]
        //             +"_"+date.toString().split(' ')[1]
        //             +"_"+date.toString().split(' ')[2]
        //             +"_"+date.toString().split(' ')[3]
        //             +"_"+date.toString().split(' ')[4].split(':')[0]
        //             +"_"+date.toString().split(' ')[4].split(':')[1]
        //             +"_"+date.toString().split(' ')[4].split(':')[2];
        //     console.log(fname);
        //     callback(null, fname,file);
        // }
        UserController.prototype.addUser = function (form) {
            var _this = this;
            this.uploadFile(this.$stateParams.id, function (err, base64) {
                if (err) {
                    console.log("Error++++++");
                    toastr['error']();
                }
                else {
                    if (base64) {
                        _this.userObj.image_base64 = base64;
                    }
                    if (_this.$stateParams.id) {
                        _this.$http.put('api/v1/users/' + _this.$stateParams.id, _this.userObj).then(function (data) {
                            if (data.data.status == 200) {
                                _this.$state.go('userList');
                                toastr['success'](data.data.message);
                            }
                            else {
                                toastr['error'](data.data.message);
                            }
                        })["catch"](function (err) {
                            console.log('Error');
                            toastr['error']('Internal Error');
                        });
                    }
                    else {
                        //  $('#show_image').attr('style','dispaly: ""');
                        _this.$http.post('api/v1/users', _this.userObj).then(function (data) {
                            if (data.data.status == 200) {
                                _this.$state.go('userList');
                                toastr['success'](data.data.message);
                            }
                            else {
                                toastr['error'](data.data.message);
                            }
                        })["catch"](function (err) {
                            console.log('Error');
                            toastr['error']('Internal Error');
                        });
                    }
                }
            });
            // this.uploadFile((err, file) => {
            //     if (err) {
            //         console.log("Error++++++")
            //         toastr['error'](data.data.message);
            //     } else {
            //         // console.log(file, 'file');
            //         // var extension = "."+file.split('.')[1];
            //         // console.log(extension, 'extension');
            //         // console.log(image_url, 'URL');
            //         // this.userObj.image_base64 = image_url;
            //         // console.log(this.userObj);
            //         if (this.$stateParams.id) {
            //             this.$http.put('api/v1/users/' + this.$stateParams.id, this.userObj).then((data) => {
            //                 if (data.data.status == 200) {
            //                     this.$state.go('userList');
            //                     toastr['success'](data.data.message);
            //                 } else {
            //                     toastr['error'](data.data.message);
            //                 }
            //             }).catch((err) => {
            //                 console.log('Error');
            //                 toastr['error']('Internal Error');
            //             });
            //         } else {
            //             this.$http.post('api/v1/users', this.userObj).then((data) => {
            //                 if (data.data.status == 200) {
            //                     // this.$state.go('userList');
            //                     console.log(data, '+++++++++');
            //                     var formData = new FormData();
            //                         formData.append('file', file);
            //                     this.$http.post('api/v1/users/UplaodUserImage/'+ data.data.data._id, formData).then((data) => {
            //                         if (data.data.status == 200) {
            //                             this.$state.go('userList');
            //                             toastr['success'](data.data.message);
            //                         } else {
            //                             toastr['error'](data.data.message);
            //                         }
            //                     }).catch((err) => {
            //                         console.log('Error');
            //                         toastr['error']('Internal Error');
            //                     });
            //                 } else {
            //                     toastr['error'](data.data.message);
            //                 }
            //             }).catch((err) => {
            //                 console.log('Error');
            //                 toastr['error']('Internal Error');
            //             });
            //         }
            //     }
            // });
            /*if (form.$valid) {
                if (this.$stateParams.id) {
                    this.$http.put('api/v1/users/'+ this.$stateParams.id, this.userObj).then((data) => {
                        if (data.data.status == 200) {
                            this.$state.go('userList');
                            toastr['success'](data.data.message);
                        } else {
                            toastr['error'](data.data.message);
                        }
                    }).catch((err) => {
                        console.log('Error');
                        toastr['error']('Internal Error');
                    });
                } else {
                    this.$http.post('api/v1/users', this.userObj).then((data) => {
                        if (data.data.status == 200) {
                            this.$state.go('userList');
                            toastr['success'](data.data.message);
                        } else {
                            toastr['error'](data.data.message);
                        }
                    }).catch((err) => {
                        console.log('Error');
                        toastr['error']('Internal Error');
                    });
                }
            }*/
            // this.uploadFile(form,(err, image_url,file_name) => {
            //     if (err) {
            //         console.log("Error++++++")
            //         toastr['error'](data.data.message);
            //     } else {
            //         console.log(image_url, 'URL');
            //         console.log(file_name, 'file_name');
            //         this.userObj.image_base64 = image_url;
            //         var extension = path.extension(file_name);
            //         console.log("ext",extension);
            //         if (this.$stateParams.id) {
            //             this.$http.put('api/v1/users/' + this.$stateParams.id, this.userObj).then((data) => {
            //                 if (data.data.status == 200) {
            //                     this.$state.go('userList');
            //                     toastr['success'](data.data.message);
            //                 } else {
            //                     toastr['error'](data.data.message);
            //                 }
            //             }).catch((err) => {
            //                 console.log('Error');
            //                 toastr['error']('Internal Error');
            //             });
            //         } else {
            //             this.$http.post('api/v1/users', this.userObj).then((data) => {
            //                 if (data.data.status == 200) {
            //                     this.$state.go('userList');
            //                     toastr['success'](data.data.message);
            //                 } else {
            //                     toastr['error'](data.data.message);
            //                 }
            //             }).catch((err) => {
            //                 console.log('Error');
            //                 toastr['error']('Internal Error');
            //             });
            //         }
            //     }
            // });
        };
        UserController.prototype.getUserById = function () {
            var _this = this;
            console.log(this.userObj, '++++++++++');
            if (this.$stateParams.id) {
                this.$http.get('api/v1/users/byId/' + this.$stateParams.id).then(function (data) {
                    if (data.data.status == 200) {
                        _this.userObj = data.data.data;
                        _this.profile_pic = '/upload/' + _this.userObj.image_name;
                    }
                    else {
                        toastr['error'](data.data.message);
                    }
                })["catch"](function (err) {
                    console.log('Error', err);
                    toastr['error']('Internal Error');
                });
            }
        };
        return UserController;
    }());
    var myApp = angular.module('MyApp', ['ngRoute', 'ui.router']).config(config);
    myApp.controller('myController', myController)
        .controller('UserController', UserController);
    config.$inject = [
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider'
    ];
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        //angular-ui-router for multiple views
        $stateProvider
            .state('userList', {
            url: "/",
            views: {
                "myHeader": {
                    templateUrl: "/app/main/views/header.html"
                },
                "myContent": {
                    templateUrl: "/app/users/views/user_list.html"
                }
            }
        })
            .state('addUser', {
            url: "/add-user",
            views: {
                "myHeader": {
                    templateUrl: "/app/main/views/header.html"
                },
                "myContent": {
                    templateUrl: "/app/users/views/add-user.html",
                    controller: 'UserController'
                }
            }
        })
            .state('editUser', {
            url: "/edit-user/:id",
            views: {
                "myHeader": {
                    templateUrl: "/app/main/views/header.html"
                },
                "myContent": {
                    templateUrl: "/app/users/views/add-user.html",
                    controller: 'UserController'
                }
            }
        });
        //more states here.
    }
})(MyApp || (MyApp = {}));
