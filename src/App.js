import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import Home from 'pages/Home'
import Dashboard from 'pages/Dashboard'

import Layout from 'components/Layout'
import Auth from 'pages/Auth'
import PrivateRoute from 'PrivateRoute'
import jwtDecode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from 'redux/actions/authAction'
import { setAuthorizationToken } from 'helpers/setAuthorizationToken'
import CreateDashboard from 'pages/CreateDashboard'

function App() {
  const user = useSelector((state) => state['auth'].user)

  const dispatch = useDispatch()
  const jwtToken = localStorage.getItem('jwtToken')
  useEffect(() => {
    console.log(jwtToken)
    const userInfo = (state) => {
      setAuthorizationToken(jwtToken)
      return jwtDecode(jwtToken)
    }

    dispatch(jwtToken ? setUser(userInfo(user)) : logout())
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
          <PrivateRoute path="/create-dashboard" component={CreateDashboard} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
