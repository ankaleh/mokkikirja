import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { Page, Navigation, Top } from './styles/div'
import { TextPrimary, LinkText, InfoText } from './styles/textStyles'
import { Button } from 'semantic-ui-react'
import useSignIn from './hooks/useSignIn'
import Posts from './components/Posts'
import Tasks from './components/Tasks'
import SignIn from './components/SignIn'
const ME = loader('./graphql/queries/me.graphql')

const App = () => {

  const  { data, error, loading } = useQuery(ME);
  const [user, setUser] = useState(null);
  const client = useApolloClient()
  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
    else if (error) {
      console.log(error.message);
    } else {
    }
  }, [data]); 

  if (loading) {
    return (
      <div><p>loading</p></div>
    );
  }
  
  return (
    <Router>
      <Top>
        {/* {isSignedIn()
        ? <Button onClick={() => {
          client.resetStore()
          localStorage.clear()
        }}>Kirjaudu ulos</Button>
        : null} */}
      </Top>
      <Navigation>
        {user
        ? <Button onClick={() => {
          client.resetStore()
          localStorage.clear()
        }}>Kirjaudu ulos</Button>
        : <LinkText to='/kirjaudu'>Kirjaudu sisään</LinkText>}
        
        <LinkText to='/tyopaivakirja'>Työpäiväkirja</LinkText>
        <LinkText to='/vieraskirja'>Vieraskirja</LinkText> 
        
      </Navigation>

      <Page>
        <Switch>
          <Route path='/kirjaudu'>
            <SignIn/>
          </Route>
          <Route path='/tyopaivakirja'>
            <Tasks />
          </Route>
          <Route path='/vieraskirja'>
            <Posts />
          </Route>
        </Switch>
      </Page>
    </Router>
  )
}

export default App
