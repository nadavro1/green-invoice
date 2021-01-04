import axios from 'axios'
import React,{useState} from 'react'
import {connect} from 'react-redux'
import { addEmployee } from '../../actions'
import { setAlert } from '../../actions/alert'

const AddEmployee = ({addEmployee}) => {
    const [formData,setFormData]= useState({
        name:'',
        manager:'',
        email:''
    });
    const {name,manager,email} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3 style={{marginTop: '2%'}}>Add Employee</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                addEmployee(formData);
            }}>
                <input type="text" placeholder="Name..." name="name"  value={name} onChange={e => onChange(e)}/>
                <input type="text" name="manager" placeholder="manager email..."  value={manager} onChange={e => onChange(e)}/>
                <input type="email" name="email" placeholder="Email..."  value={email} onChange={e => onChange(e)}/>
                <input type="submit" className="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}




export default connect(null,{setAlert,addEmployee})(AddEmployee)
