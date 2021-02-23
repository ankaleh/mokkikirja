import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, BrowserRouter as Router, useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import Post from './Post'
import { Page, Column } from '../styles/div'
import { TextPrimary, InfoText, BlackText, HeadingSecondary, LinkTextColored } from '../styles/textStyles'
import { Button } from '../styles/button'
import { Text } from '../styles/input'
import AddPost from './AddPost'
import { StyledPost, Row, Borderline } from '../styles/div'
import format from 'date-fns/format'

const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')

const Posts = (props) => {
    const allPosts = useQuery(ALL_POSTS)
    const [ posts, setPosts ] = useState(null)
    const id = useParams().id

    useEffect(() => {
        if (allPosts.data) {
            //console.log(allPosts.data.allPosts)
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
            <Post post={post} showNotification={props.showNotification}/>
        )
    }

    return (
        <Page flexDirection='row' justifyContent='space-around'>
           
            <Column>
            <HeadingSecondary>Vieraskirja</HeadingSecondary>
            {posts.map(p => 
                <LinkTextColored key={p.id} to={`/vieraskirja/${p.id}`}>
                    <StyledPost>
                        <TextPrimary>{`${format(new Date(p.startDate), 'dd.MM.yyyy')} - ${format(new Date(p.endDate), 'dd.MM.yyyy')}`}</TextPrimary>
                        
                        <Row>
                            <TextPrimary>
                                {p.guests.length > 2 || p.guests[0].length > 9 || p.guests[1] > 9
                                ? `${p.guests[0]}, ${p.guests[1]}...`
                                : p.guests.reduce((prev, curr) => `${prev} ja ${curr}`)}
                            </TextPrimary>
                        </Row>
                    </StyledPost>
                </LinkTextColored>
                )}
            </Column>
            <Borderline></Borderline>
            <AddPost showNotification={props.showNotification}/>

        </Page>
    )

}
export default Posts