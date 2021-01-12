import React, { useEffect, useState } from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import Post from './Post'
import Error from './Notification'
import { TextPrimary, InfoText } from '../styles/textStyles'
const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')


const Posts = (props) => {
    const allPosts = useQuery(ALL_POSTS)

    const [ posts, setPosts] = useState(null)

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

    return (
        <div>
            <TextPrimary><h1>Vieraskirja</h1></TextPrimary>
            {posts.map(p => <Post key={p.id} post={p}/>)}
        </div>
    )

}
export default Posts