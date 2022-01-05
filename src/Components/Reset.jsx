import React, { useState } from 'react'
import { useCallback } from 'react/cjs/react.development'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

const Reset = (props) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const procesarDatos = (e) => {
        e.preventDefault()

        if (!email.trim()) {
            setError('Ingrese email')
            return
        }

        setError(null)
        recuperarPassword()
    }

    const recuperarPassword = useCallback(async () => {
        try {
           await auth.sendPasswordResetEmail(email)
           props.history.push('/login')
           console.log('correo enviado');
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }, [email, props.history])

    return (
        <div className="me-5">
        <h3 className="text-center mt-3">
            Reiniciar Contraseña
        </h3>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={procesarDatos}>
                    {
                        error && (<div className="alert alert-danger" role="alert">
                            {error}
                        </div>)
                    }
                    <input type="email"
                        className="form-control mb-2"
                        placeholder='email@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <div className="d-grid mb-2">
                        <button className="btn btn-dark btn-lg" type='submit'>
                            Reiniciar Contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default withRouter(Reset)
