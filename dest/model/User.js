"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let UserSchema = new mongoose_1.Schema({
    createat: Date,
    updateAt: Date,
    emailid: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    salary: {
        type: Number,
        default: '',
        required: true
    },
    phone: {
        type: Number,
        default: ''
    },
    image_name: {
        type: String,
        default: ''
    },
    deleted: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.model('User', UserSchema);
