import { Schema, model } from 'mongoose';


let UserSchema : Schema = new Schema({
    createat : Date,
    updateAt : Date,
    emailid : {
        type: String,
        default : '',
        required: true,
        unique : true
    },   
    name : {
        type: String,
        default : '',
        required : true
    },
    salary :{
        type : Number,
        default : '',
        required:true
    },
    phone: {
        type: Number,
        default : ''
    },
    image_name:{
        type : String,
        default : ''
    }
    deleted:{
        type : Boolean,
        default: false
    }
});


export default model('User',UserSchema);

