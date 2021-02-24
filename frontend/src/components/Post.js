import React from 'react'
import { useApolloClient, useMutation, gql } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import { Button } from '../styles/button'

import format from 'date-fns/format'
import { loader } from 'graphql.macro'

const ME = loader('../graphql/queries/me.graphql')
const REMOVE_POST = loader('../graphql/mutations/removePost.graphql')
const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')

const Post = ({ post, showNotification }) => { 

    const [ removePost ] = useMutation(REMOVE_POST, {
        onError: (error) => {
            showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
        update: (store, response) => {
            const dataInStore = store.readQuery({ query: ALL_POSTS })
            //console.log('dataInStore, dataInStore.allPosts: ', dataInStore, dataInStore.allPosts)
            //console.log('poistettu: ', response.data.removePost)
            if (dataInStore) {
                store.writeQuery({ //tästä tulee varoitus, ks.mahd. ratkaisu: https://blog.efounders.co/optimising-list-item-deletion-with-apollos-client-directive-and-fragments-dc2affc3c3ef
                    query: ALL_POSTS,
                    data: {
                        allPosts: dataInStore.allPosts.filter(p => p.id !== response.data.removePost.id)
                    }
                })
            }
    }})
    

    const client = useApolloClient()
    const data = client.readQuery({ query: ME })
    const history = useHistory()
    console.log(data.me.name)

    const handleClickRemove = async (event, id) => {
        try {
            removePost({ 
                variables: { id }
            })
            history.push('/vieraskirja')
            showNotification('Merkintä on nyt poistettu!')
        } catch(e) {
            console.log(e)
            showNotification(`Tapahtui virhe: ${e}`)
        }
    }
    
    return (
        
        <Page flexDirection='column' alignItems='center'>
            <BlackText>{post.writtenBy.name} kirjoitti:</BlackText>
            <TextPrimary>{`${format(new Date(post.startDate), 'dd.MM.yyyy')} - ${format(new Date(post.endDate), 'dd.MM.yyyy')}`}</TextPrimary>
            
            <StyledTextContainer>
                <TextSecondary>{post.text}</TextSecondary>
            </StyledTextContainer>
            
            <Row><TextPrimary>{post.unidentifiedGuests.reduce((prev, curr) => `${prev}, ${curr}`)}</TextPrimary></Row>
            {data.me.id === post.writtenBy.id
            ? <Button background='lightgrey' height='40px' width='500px' onClick={(e) => handleClickRemove(e, post.id)}>Poista merkintä</Button>
            : null}
            
        </Page>
    )   

}
export default Post
