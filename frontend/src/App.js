import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import { Switch, Route, BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { Page, Navigation, Margin, AccountInfo } from './styles/div'
import Notification from './components/Notification'
import { TextPrimary, LinkText, InfoText } from './styles/textStyles'

import useSignIn from './hooks/useSignIn'
import Posts from './components/Posts'
import Tasks from './components/Tasks'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import User from './components/User'
import Reservations from './components/Reservations'


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
        : <Margin> </Margin>}
      
      <User showNotification={showNotification}/>

        <Switch>
          <Route path='/rekisteroidy'>
            <SignUp showNotification={showNotification}/>
          </Route>
          <Route path='/kirjaudu'>
            <SignIn showNotification={showNotification}/>
          </Route>
          <Route path='/kirjaudu-ulos'>
            <SignOut showNotification={showNotification}/>
          </Route>
          <Route path='/tyopaivakirja'>
            <Tasks showNotification={showNotification}/>
          </Route>
          <Route path='/vieraskirja/:id'>
            <Posts showNotification={showNotification}/>
          </Route>
          <Route path='/vieraskirja'>
            <Posts showNotification={showNotification}/>
          </Route>
          <Route path='/varaukset'>
            <Reservations showNotification={showNotification}/>
          </Route>
        
            <Page>
              
            </Page>
        </Switch>
      
      <Navigation>

      </Navigation>
      {notification
        ? <Notification notification={notification}/>
        : <Margin> </Margin>}
    </Router>
  )
}

export default App
