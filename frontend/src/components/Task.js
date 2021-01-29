import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'
import { TextPrimary, InfoText, BlackText } from '../styles/textStyles'
import { Button } from '../styles/button'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { Column, Page, StyledTask, Row, Space } from '../styles/div'

const MARK_AS_DONE = loader('../graphql/mutations/markAsDone.graphql')

const Task = (props) => {

    const [ markAsDone ] = useMutation(MARK_AS_DONE, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },

    })

    const handleClick = async (event, description) => {
        event.preventDefault()
        try {
            markAsDone({ variables:
                {
                    description
            }})
            props.showNotification('Työ on merkitty tehdyksi!')
        
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
       
        <StyledTask>
                    {props.task.done
                    ? <Icon name='lock' color='green' size='large'/>
                    : <Icon name='lock open' color='red' size='large'/>}
                    <p></p>
                    <Column>
                        <BlackText>{props.task.addedBy.name}</BlackText>
                        <BlackText>lisäsi työn:</BlackText>
                    </Column>
                        <TextPrimary>{props.task.description}</TextPrimary>
                    {props.task.done
                    ? <Column><BlackText>{props.task.doneBy.name}</BlackText> 
                        <BlackText>merkitsi työn tehdyksi</BlackText>
                        </Column>
                    : <Button width='50' height='30' background='#bc5a45' onClick={(e) => handleClick(e, props.task.description)}>Merkitse työ tehdyksi</Button>}
                </StyledTask>
       
    )   

}
export default Task