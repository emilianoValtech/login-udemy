import React, { useEffect, useState } from 'react'
import { auth  } from '../firebase'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Firestore from './Firestore'


const Admin = (props) => {
    const [user, setUser] = useState(null)


    useEffect(()=>{
        if(auth.currentUser){
            setUser(auth.currentUser)
        } else {
            props.history.push('/login');
        }
    }, [props.history])
    return (
        <div>
            <h2 className='mt-5'>
                {
                    user && (
                        <Firestore user={user}/>
                    )
                }
            </h2>
        </div>
    )
}

export default withRouter(Admin)
