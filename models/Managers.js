const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type: Schema.Types.ObjectId,
        ref: 'department'
    }
    
})

module.exports= Manager= mongoose.model('manager',ManagerSchema);