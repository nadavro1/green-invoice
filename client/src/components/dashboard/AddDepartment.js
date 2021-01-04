import axios from 'axios'
import React,{useState} from 'react'
import {connect} from 'react-redux'
import { addDepartment } from '../../actions'
import { setAlert } from '../../actions/alert'

const AddDepartment = ({addDepartment}) => {
    const [formData,setFormData]= useState({
        name:'',
    });
    const {name} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3 style={{marginTop: '2%'}}>Add Department</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                addDepartment(formData);
            }}>
                <input type="text" placeholder="Name..." name="name"  value={name} onChange={e => onChange(e)}/>
                <input type="submit" className="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}




export default connect(null,{setAlert,addDepartment})(AddDepartment)
