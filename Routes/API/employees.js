const express= require('express');
const route = express.Router();
const {check, validationResult}=require('express-validator');
const Employee=require('../../models/Employees')

// add employee
route.post('/',
[
    check('name','Please add name').not().isEmpty(),
    check('manager','Please add manager').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
],
async(req,res)=>{
    const errors= validationResult(req);//check all the validation above
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, manager}= req.body;
    try {
        let employee= await Employee.findOne({email});//check if employee already exists
        if (employee) {
            return res.status(400).json({errors: [{msg: "Employee already exists"}]})
        }
        let CheckManager= await Manager.findOne({email:manager});//check if the Manager exist
        if (CheckManager=== null) {
            return res.status(400).json({errors: [{msg: "Manager was not found"}]})
        }
        const newEmployee= new Employee({
            name:req.body.name,
            email: req.body.email,
            manager:CheckManager._id
        });
        const savedEmployee = await newEmployee.save();//saving the manager on DB
        res.send(savedEmployee);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error'); 
    }
}
)

// assign employee to manager
route.put('/',
[
    check('email','Please include a valid email').isEmail(),
    check('manager','Please add manager').not().isEmpty()
],
async(req,res)=>{
    const errors= validationResult(req);//check all the validation above
    const {email, manager}= req.body;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let employee= await Employee.findOne({email});//check if employee exists
    if (!employee) {
        return res.status(400).json({errors: [{msg: "Employee not exists"}]})
    }
    let CheckManager= await Manager.findOne({email:manager});//check if the Manager exist
    if (CheckManager=== null) {
        return res.status(400).json({errors: [{msg: "Manager was not found"}]})
    }
    if(String(employee.manager)===String(CheckManager._id)){//check if employee is already assigned to this manager
        return res.status(400).json({errors: [{msg: "The employee is already assigned to this manager"}]});
    }
    const test= await Employee.findOneAndUpdate({email:email}, { manager:CheckManager._id});//update the employee with new manager id
    employee= await Employee.findOne({email});
    res.send(employee);
}
)

//get all employees with managers and departments
route.get('/',async(req,res)=>{
    try {
        const employees= await Employee.find().populate({
            path : 'manager',
            populate : {
              path : 'department'
            }
          });
        if(!employees) res.send('Employees not found')
        return res.send(employees)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
    
}
)
// get the department with the max employees
route.get('/max',async(req,res)=>{
    try {
        const employees= await Employee.find().populate({
            path : 'manager',
            populate : {
              path : 'department'
            }
          });
        if(!employees) res.send('Employees not found')
        let list=[];
        employees.map(employee=>{
            if(list[employee.manager.department.name]){
                list[employee.manager.department.name]++;
            }else list[employee.manager.department.name]=1;
            
        })
        // get what department has the most employees
        let max=0,maxDep=null;
        Object.keys(list).map(function(key, index) {
            if(max<list[key]){
                max=list[key];
                maxDep=key
            }
        });
        return res.send({"max":maxDep})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
    
}
)
module.exports = route;
