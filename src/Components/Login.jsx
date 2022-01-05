import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { useCallback } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
const Login = (props) => {
    const [email, setEmail] = useState('testing@testing.com')
    const [password, setPassword] = useState('123123')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(false)

    const procesarDatos = (e) => {
        e.preventDefault()

        if (!email.trim()) {
            setError('Ingrese email')
            return
        }

        if (!password.trim()) {
            setError('Ingrese contraseña')
            return
        }

        if (password.length < 6) {
            setError('Password debe ser mayor a 6 caracteres')
            return
        }

        setError(null)

        if (esRegistro) {
            registrar()
        }

        if (!esRegistro) {
            login()
        }
    }

    const login = useCallback(async () => {
        try {
            const response = await auth.signInWithEmailAndPassword(email, password)
            setEmail('')
            setPassword('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setError('Contraseña equivocada')
            }
            if (error.code === 'auth/user-not-found') {
                setError('El usuario no existe')
            }
        }
    }, [email, password, props.history])

    const registrar = useCallback(async () => {
        try {
            const response = await auth.createUserWithEmailAndPassword(email, password)
            await db.collection('usuarios').doc(response.user.email).set({
                email: response.user.email,
                uid: response.user.uid,
            })
            await db.collection(response.user.uid).add({
                name: 'Tarea de ejemplo',
                fecha: Date.now()
            })
            setEmail('')
            setPassword('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            if (error.code === 'auth/argument-error') {
                setError('Email no es valido')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email en uso')
            }
        }
    }, [email, password, props.history])




    return (
        <div className="me-5">
            <h3 className="text-center mt-3">
                {
                    esRegistro ? ('Registro de usuarios') : ('Login de accesso')
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && 
                            (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )
                        }
                        <input type="email"
                            className="form-control mb-2"
                            placeholder='email@example.com'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <input type="password"
                            className="form-control mb-2"
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <div className="d-grid mb-2">
                            <button className="btn btn-dark btn-lg" type='submit'>
                                {
                                    esRegistro ? ('Registrarse') : ('Acceder')
                                }
                            </button>
                        </div>
                        <div className="d-grid">
                            <button
                                className="btn btn-info btn-sm text-white mb-2"
                                onClick={() => setEsRegistro(!esRegistro)}
                                type='button'
                            >
                                {
                                    esRegistro ? ('Ya estas registrado?') : ('No tiene cuenta?')
                                }
                            </button>
                            {
                                !esRegistro ? (

                                    <button 
                                    className="btn btn-dark btn-sm" 
                                    type='button'
                                    onClick={()=> props.history.push('/reset')}
                                    >
                                        Recuperar Contraseña
                                    </button>
                                ) : null
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
