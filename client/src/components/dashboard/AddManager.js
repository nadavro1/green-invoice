import React,{useState} from 'react'
import {connect} from 'react-redux'
import { addManager } from '../../actions'
import { setAlert } from '../../actions/alert'

const AddManager = ({addManager}) => {
    const [formData,setFormData]= useState({
        name:'',
        department:'',
        email:''
    });
    const {name,department,email} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3 style={{marginTop: '2%'}}>Add Manager</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                addManager(formData);
            }}>
                <input type="text" placeholder="Name..." name="name"  value={name} onChange={e => onChange(e)}/>
                <input type="email" name="email" placeholder="Email..."  value={email} onChange={e => onChange(e)}/>
                <input type="text" name="department" placeholder="Department..."  value={department} onChange={e => onChange(e)}/>
                <input type="submit" className="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}




export default connect(null,{setAlert,addManager})(AddManager)
