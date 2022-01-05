import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase';
import Admin from './Components/Admin';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Reset from './Components/Reset'
import { useState, useEffect } from 'react';



function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])


  return firebaseUser !== false ? (
    <Router>
      <div className="container"> 
        <Navbar firebaseUser={firebaseUser}/>
        <Switch>
          <Route path='/login'>
              <Login />
          </Route>
          <Route path='/admin'>
              <Admin />
          </Route>
          <Route path='/reset'>
              <Reset />
          </Route>
          <Route path='/'>
              Inicio
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Loading...</p>
  )
}

export default App;
