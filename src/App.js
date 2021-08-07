import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useLayoutEffect } from 'react'
import Home from 'pages/Home'
import Dashboard from 'pages/Dashboard'

import Layout from 'components/Layout'
import Auth from 'pages/Auth'
import PrivateRoute from 'PrivateRoute'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { logout, authSuccess } from 'rtk/auth/authSlice'
import { setAuthorizationToken } from 'helpers/setAuthorizationToken'

function App() {
  const dispatch = useDispatch()

  const jwtToken = localStorage.getItem('jwtToken')

  useLayoutEffect(() => {
    const userInfo = () => {
      setAuthorizationToken(jwtToken)
      return jwtDecode(jwtToken)
    }

    dispatch(jwtToken ? authSuccess(userInfo()) : logout())
  }, [])

  return (
    <Router>
      <Layout>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/auth/:email/:accessGuid" component={Auth} />
          <PrivateRoute path="/dash" component={Dashboard} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
