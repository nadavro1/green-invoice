import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const  Navbar  = () => {
    // for signed in user
    const Links = (
        <ul>
            <li>
                <Link to='/'>
                    <i className='fas fa-user' />{' '}
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to='/add-employee'>
                    <i className='fas fa-envelope-square' />{' '}
                    <span>Add Employee</span>
                </Link>
            </li>
            <li>
                <Link to='/assign-employee'>
                    <i className='fas fa-envelope-square' />{' '}
                    <span>Assign Employee</span>
                </Link>
            </li>
            <li>
                <Link to='/add-manager'>
                    <i className='fas fa-envelope-square' />{' '}
                    <span>Add Manager</span>
                </Link>
            </li>
            <li>
                <Link to='/assign-manager'>
                    <i className='fas fa-envelope-square' />{' '}
                    <span>Assign Manager</span>
                </Link>
            </li>
            <li>
                <Link to='/add-department'>
                    <i className='fas fa-envelope-square' />{' '}
                    <span>Add Department</span>
                </Link>
            </li>
        </ul>
    )
   
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className=""></i>Green Invoice</Link>
            </h1>
            {<Fragment>{Links}</Fragment>}
        </nav>
    )
}



export default connect(null,{})(Navbar)
