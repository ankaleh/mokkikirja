/* import React, { useEffect, useState } from 'react'
import { useApolloClient, useMutation, gql } from '@apollo/client'
import { Link, Route, Switch, BrowserRouter as Router, useParams } from 'react-router-dom'
import { Page, Column, StyledPost, Row } from '../styles/div'
import { TextPrimary } from '../styles/textStyles'
import { loader } from 'graphql.macro'
import Posts from './Posts'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'

const ME = loader('../graphql/queries/me.graphql') */

const Home = (props) => {
    /* const client = useApolloClient()

   const [ user, setUser ] = useState(null)
   const me = client.readQuery({
    query: ME
})
   useEffect(() => {
    
    console.log('user', user)
    setUser(me)
   }, [user])

   if (!user) {
       return <div>tietoja haetaan</div>
   }
   
    return (
        <Page flexDirection='row' justifyContent='space-around'>
           
            <Column>{user.me.posts.map(p =>  
                <Link key={p.id} to={`/vieraskirja/${p.id}`}>
                    <StyledPost>
                        <p><TextPrimary>{p.date}</TextPrimary></p>
                        <Icon name='users' color='grey'/>
                        <Row>
                            <TextPrimary>
                                {p.guests.reduce((prev, curr) => `${prev}, ${curr}`)}
                            </TextPrimary>
                        </Row>
                    </StyledPost>
                </Link>
                )}
            </Column>
        </Page>
         */
    //)
}
export default Home