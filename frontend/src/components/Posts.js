import React from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import Post from './Post'
import { TextPrimary, InfoText } from '../styles/textStyles'
const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')


const Posts = () => {
    const postsResult = useQuery(ALL_POSTS)

    if (postsResult.loading ) {
        return <InfoText>Vieraskirjaa haetaan</InfoText>
    }

    return (
        <div>
            {/* {console.log('kukkuu Posts: ', posts)} */}
            <TextPrimary><h1>Vieraskirja</h1></TextPrimary>
            {postsResult.data.allPosts.map(p => <Post key={p.id} post={p}/>)}
        </div>
        )

}
export default Posts