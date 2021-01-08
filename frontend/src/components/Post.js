import React from 'react'
import { StyledBlog } from '../styles/div'
import { TextPrimary } from '../styles/textStyles'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'

const Post = ({post}) => {

    return (
        <StyledBlog>
            <p><TextPrimary>{post.date}</TextPrimary></p>
            <Icon name='users' color='grey'/>
            {post.guests.map(g => 
                <TextPrimary key={g}>{g}</TextPrimary>)
                .reduce((prev, curr) => [prev, ', ', curr])}
        </StyledBlog>
    )   

}
export default Post
