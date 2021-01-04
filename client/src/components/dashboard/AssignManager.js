import axios from 'axios'
import React,{useState} from 'react'
import {connect} from 'react-redux'
import { assignManager } from '../../actions'
import { setAlert } from '../../actions/alert'

const AssignManager = ({assignManager}) => {
    const [formData,setFormData]= useState({
        department:'',
        email:''
    });
    const {department,email} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3 style={{marginTop: '2%'}}>Assign Manager</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                assignManager(formData);
            }}>
                <input type="text" name="department" placeholder="Department..."  value={department} onChange={e => onChange(e)}/>
                <input type="email" name="email" placeholder="Manager email..."  value={email} onChange={e => onChange(e)}/>
                <input type="submit" className="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}




export default connect(null,{setAlert,assignManager})(AssignManager)
