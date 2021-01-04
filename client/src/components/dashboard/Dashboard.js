import React,{useEffect, Fragment, useState} from 'react'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner.js'
// import Msg from './Msg.js'
import axios from 'axios'
import faker from 'faker';

const Dashboard= ()=> {
  const [results, setResults] = useState([]);//set the results of the data
  const [max, setMax] = useState({})
  const [loading,setLoading]= useState(true);
  useEffect(() => {
    const getData = async ()=>{
      const {data}= await axios.get('/api/employees',{
      params:{ //the params will be added in the url
        action:'query',
        origin:'*',
        formant:'json'
      }
      })
      const maxVal= await axios.get('/api/employees/max',{
        params:{ //the params will be added in the url
          action:'query',
          origin:'*',
          formant:'json'
        }
      })
      setResults(data);
      setMax(maxVal.data)
      setLoading(false);
    }
    getData();
  }, []);
  return(
  <Fragment>
    <section className='container'>
        <h1 className="large text-primary" >Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome
      </p>
      {loading?<Spinner/>:<Fragment>
        {results.map(result=>(
        <div className="ui divided items" key={result._id}>
            <div></div>
          <div className="item">
            <div className="image">
                <img className="round-img my-1" src={faker.image.people()} alt="avatar"/>
            </div>
            <div className="content" style={{marginTop: 10}}>
              <a className="header">{result.name}</a>
              <div className="meta">
                <span className="cinema">Manager: {result.manager.name}</span>
              </div>
              <div className="description">
                <p>Department: {result.manager.department.name}</p>
              </div>
              <div className="extra">
                <div className="ui label"><i className="phone icon"></i><a href={`tel:0526541111`}>0526541111</a></div>
                <div className="ui label"><i className="globe icon"></i><a href={`mailto:${result.email}`}>{result.email}</a></div>
              </div>
            </div>
          </div>
        </div>
        ))}
        <div>
          <p>Department with max employees: {max.max}</p>
        </div>
        </Fragment>}
      </section>
  </Fragment>
  )
}



export default Dashboard
