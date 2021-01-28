import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'

const Post = ({ post }) => { 
    
    return (
        
        <Page flexDirection='column' alignItems='center'>
            <BlackText>{post.writtenBy.name} kirjoitti:</BlackText>
            <TextPrimary>{post.date}</TextPrimary>
            <Space></Space>
            <StyledTextContainer>
                <TextSecondary>{post.text}</TextSecondary>
            </StyledTextContainer>
            <Space></Space>
            <Row><TextPrimary>{post.guests.reduce((prev, curr) => `${prev}, ${curr}`)}</TextPrimary></Row>
        </Page>
    )   

}
export default Post
