import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }


    return (
        <div className='navbar navbar-dark bg-dark'>
            <Link className='navbar-brand ms-2' to='/'>OAuth</Link>
            <div>
                <div className="d-flex">
                    <NavLink className='btn btn-dark me-3' to='/' exact>Inicio</NavLink>
                    {
                        props.firebaseUser !== null ? (
                        <NavLink className='btn btn-dark me-3' to='/admin'>Admin</NavLink>
                        ) : null
                    }

                    {
                        props.firebaseUser !== null ? 
                        ( 
                        <button className="btn btn-dark" onClick={() => cerrarSesion()}>Cerrar sesion</button> 
                        ) : 
                        (
                        <NavLink className='btn btn-dark me-3' to='/Login'>Login</NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
