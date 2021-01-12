import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import { Switch, Route, BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { Page, Navigation, Top, AccountInfo } from './styles/div'
import Notification from './components/Notification'
import { TextPrimary, LinkText, InfoText } from './styles/textStyles'
import { Button } from 'semantic-ui-react'
import useSignIn from './hooks/useSignIn'
import Posts from './components/Posts'
import Tasks from './components/Tasks'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import User from './components/User'
import Home from './components/Home'

const App = () => {
  const [ notification, setNotification ] = useState('')

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <Router>
      {notification
        ? <Notification notification={notification}/>
        : <Top> </Top>}
      
      <User showNotification={showNotification}/>

      <Page>
        <Switch>
          <Route path='/kirjaudu'>
            <SignIn showNotification={showNotification}/>
          </Route>
          <Route path='/kirjaudu-ulos'>
            <SignOut showNotification={showNotification}/>
          </Route>
          <Route path='/tyopaivakirja'>
            <Tasks notification={notification} showNotification={showNotification}/>
          </Route>
          <Route path='/vieraskirja'>
            <Posts notification={notification} showNotification={showNotification}/>
          </Route>
          <Route path='/etusivu'>
            <Home/>
          </Route>
        </Switch>
      </Page>
    </Router>
  )
}

export default App
