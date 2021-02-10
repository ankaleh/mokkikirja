import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'
import format from 'date-fns/format'

const Post = ({ post }) => { 
    
    return (
        
        <Page flexDirection='column' alignItems='center'>
            <BlackText>{post.writtenBy.name} kirjoitti:</BlackText>
            <TextPrimary>{`${format(new Date(post.startDate), 'dd.MM.yyyy')} - ${format(new Date(post.endDate), 'dd.MM.yyyy')}`}</TextPrimary>
            
            <StyledTextContainer>
                <TextSecondary>{post.text}</TextSecondary>
            </StyledTextContainer>
            
            <Row><TextPrimary>{post.guests.reduce((prev, curr) => `${prev}, ${curr}`)}</TextPrimary></Row>
        </Page>
    )   

}
export default Post
