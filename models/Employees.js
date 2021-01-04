const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    manager:{
        type: Schema.Types.ObjectId,
        ref: 'manager'
    }
    
})

module.exports= Employee= mongoose.model('employee',EmployeeSchema);