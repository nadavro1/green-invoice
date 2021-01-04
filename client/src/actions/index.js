import axios from 'axios'
import {setAlert} from './alert'

export const addEmployee= (formData)=>async (dispatch)=>{
    try {
      const config={
         header:{
            'Content-Type':'application/json'
         }
      }
      const res = await axios.post('/api/employees',formData,config);
      dispatch(setAlert('Employee added', 'success'));
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}

export const assignEmployee= (formData)=>async (dispatch)=>{
    try {
      const config={
         header:{
            'Content-Type':'application/json'
         }
      }
      const res = await axios.put('/api/employees',formData,config);
      dispatch(setAlert('Employee assigned', 'success'));
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}

export const addDepartment= (formData)=>async (dispatch)=>{
    try {
      const config={
         header:{
            'Content-Type':'application/json'
         }
      }
      const res = await axios.post('/api/departments',formData,config);
      dispatch(setAlert('Department added', 'success'));
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}


export const addManager= (formData)=>async (dispatch)=>{
    try {
      const config={
         header:{
            'Content-Type':'application/json'
         }
      }
      const res = await axios.post('/api/managers',formData,config);
      dispatch(setAlert('Manager added', 'success'));
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}


export const assignManager= (formData)=>async (dispatch)=>{
    try {
      const config={
         header:{
            'Content-Type':'application/json'
         }
      }
      const res = await axios.put('/api/managers',formData,config);
      dispatch(setAlert('Manager assigned', 'success'));
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}