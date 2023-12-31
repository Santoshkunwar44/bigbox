const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    user:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    text:{
        type:String,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model("Notification",notificationSchema)




