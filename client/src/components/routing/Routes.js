import React from 'react'
import {Route,Switch} from 'react-router-dom';
import Alert from '../layout/Alert';
import AddEmployee from '../dashboard/AddEmployee';
import AssignEmployee from '../dashboard/AssignEmployee';
import AddDepartment from '../dashboard/AddDepartment';
import AssignManager from '../dashboard/AssignManager';
import AddManager from '../dashboard/AddManager';

const Routes = props => {
    return (
        <section className='container'>
        <Alert/>
          <Switch>
            <Route exact  path='/add-employee' component={AddEmployee}/>
            <Route exact  path='/assign-employee' component={AssignEmployee}/>
            <Route exact  path='/add-manager' component={AddManager}/>
            <Route exact  path='/assign-manager' component={AssignManager}/>
            <Route exact  path='/add-department' component={AddDepartment}/>
          </Switch>
        </section>

    )
}

export default Routes
