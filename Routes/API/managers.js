const express= require('express');
const route = express.Router();
const {check, validationResult}=require('express-validator');
const Department = require('../../models/Departments');
const Employees = require('../../models/Employees');
const Manager=require('../../models/Managers');

// add manager
route.post('/',
[
    check('name','Please add name').not().isEmpty(),
    check('department','Please add department').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
],
async(req,res)=>{
    const errors= validationResult(req);//check all the validation above
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, department}= req.body;
    try {
        let manager= await Manager.findOne({email});//check if manager already exists
        if (manager) {
            return res.status(400).json({errors: [{msg: "Manager already exists"}]})
        }
        let CheckDepartment= await Department.findOne({name:department});//check if the department exist
        if (CheckDepartment=== null) {
            return res.status(400).json({errors: [{msg: "Department was not found"}]})
        }
        let CheckExistManager= await Manager.find({department:CheckDepartment._id});//check if there is already a manager for the dep
        if(CheckExistManager.length !== 0){
            return res.status(400).json({errors: [{msg: "This department already has a manager"}]});
        }
        const newManager= new Manager({
            name:req.body.name,
            email: req.body.email,
            department:CheckDepartment._id
        });
        const savedManager = await newManager.save();//saving the manager on DB
        res.send(savedManager);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error'); 
    }
}
)

//get all managers
route.get('/',async(req,res)=>{
    try {
        const managers= await Manager.find();
        if(!managers) res.send('Managers not found')
        return res.send(managers)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
    
}
)
// assign manager to department
route.put('/',[
    check('department','Please add department').not().isEmpty(),
    check('email','Please include a valid email').isEmail()
],
async(req,res)=>{
    const errors= validationResult(req);//check all the validation above
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, department}= req.body;
    try {
        let manager= await Manager.findOne({email});//check if the manager exists
        if (!manager) {
            return res.status(400).json({errors: [{msg: "Manager not exists"}]})
        }
        let CheckDepartment= await Department.findOne({name:department});//check if the department exist
        if (CheckDepartment=== null) {
            return res.status(400).json({errors: [{msg: "Department was not found"}]})
        }
        if(String(manager.department)===String(CheckDepartment._id)){//check if the manager is already assigned to this department
            return res.status(400).json({errors: [{msg: "The manager is already assigned to this department"}]});
        }
        let oldManager= await Manager.findOne({department:CheckDepartment._id});//get the old manager
        if(oldManager){
            await Employees.updateMany({manager:oldManager._id},{manager:manager._id});//update all the employees the be assigned to the new manager;
            await Manager.updateOne({_id:oldManager._id},{department:null});//unassigned old manager from the department
        }
        await Manager.updateOne({_id:manager._id},{department:CheckDepartment._id});//update the manager to be assigned to the new dep
        manager= await Manager.findOne({email});
        res.send(manager);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
})
module.exports = route;
