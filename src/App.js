import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import Home from 'pages/Home'
import Layout from 'components/Layout'
import Auth from 'pages/Auth'

function App() {
  return (
    <Router>
      <Layout>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/auth/:email/:accessGuid" component={Auth} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
