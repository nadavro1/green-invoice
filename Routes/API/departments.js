const express= require('express');
const route = express.Router();
const {check, validationResult}=require('express-validator');
const Department=require('../../models/Departments')

// adding new department
route.post('/',
[
    check('name','Name is required').not().isEmpty(),
],
async(req,res)=>{
    const errors= validationResult(req);//check all the validation above
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name}= req.body;
    try {
        let newDep= await Department.findOne({name});//check if department name already exists
        if (newDep) {
            return res.status(400).json({errors: [{msg: "Department already exists"}]})
        }
        newDep = new Department({
            name
        });
        const dep= await newDep.save();
        res.send(dep);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error'); 
    }
}
)

// get all the departments
route.get('/',async (req,res)=>{
    try {
        const departments = await Department.find();
        if(departments=== undefined || departments.length == 0){
            return res.status(404).json({msg:'Departments were not found'})
        }
        res.json(departments); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
    
})

module.exports = route;
