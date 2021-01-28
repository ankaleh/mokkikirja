import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, BrowserRouter as Router, useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import Post from './Post'
import { Page, Column } from '../styles/div'
import { TextPrimary, InfoText } from '../styles/textStyles'
import { Button } from '../styles/button'
import { Text } from '../styles/input'
import AddPost from './AddPost'
import { StyledPost, Row } from '../styles/div'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'

const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')

const Posts = (props) => {
    const allPosts = useQuery(ALL_POSTS)
    const [ posts, setPosts ] = useState(null)
    const id = useParams().id

    useEffect(() => {
        if (allPosts.data) {
            setPosts(allPosts.data.allPosts)
        }
        if (allPosts.error) {
            console.log('Virheviesti palvelimelta: ', allPosts.error.message);
            props.showNotification(`Tapahtui virhe: ${allPosts.error.message}`)
        } 
    }, [allPosts]); 
      
    if (props.notification) {
        return  null
    }

    if (allPosts.loading) {
        return <InfoText>Vieraskirjaa haetaan.</InfoText>
    }
    
    if (!posts) {
        return <InfoText>Vieraskirjan hakeminen ei onnistunut. Oletko kirjautunut sisään?</InfoText>
    }

    if (id) {
        const post = posts.find(p => p.id === id)
        return (
            <Post post={post}/>
        )
    }

    return (
        <Page flexDirection='row' justifyContent='space-around'>
           
            <Column>{posts.map(p =>  
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
            
            <AddPost showNotification={props.showNotification}/>

        </Page>
    )

}
export default Posts