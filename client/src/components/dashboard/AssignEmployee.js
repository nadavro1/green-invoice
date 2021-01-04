import axios from 'axios'
import React,{useState} from 'react'
import {connect} from 'react-redux'
import { assignEmployee } from '../../actions'
import { setAlert } from '../../actions/alert'

const AssignEmployee = ({assignEmployee}) => {
    const [formData,setFormData]= useState({
        email:'',
        manager:''
    });
    const {name,manager,email} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3 style={{marginTop: '2%'}}>Assign Employee</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                assignEmployee(formData);
            }}>
                <input type="text" name="manager" placeholder="Manager email..."  value={manager} onChange={e => onChange(e)}/>
                <input type="email" name="email" placeholder="Employee email..."  value={email} onChange={e => onChange(e)}/>
                <input type="submit" className="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}




export default connect(null,{setAlert,assignEmployee})(AssignEmployee)
