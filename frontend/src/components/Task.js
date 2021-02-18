import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'
import { TextPrimary, InfoText, BlackText } from '../styles/textStyles'
import { Button } from '../styles/button'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { Column, Page, StyledTask, Row, Space } from '../styles/div'

const MARK_AS_DONE = loader('../graphql/mutations/markAsDone.graphql')
const REMOVE_TASK = loader('../graphql/mutations/removeTask.graphql')
const ALL_TASKS = loader('../graphql/queries/allTasks.graphql')

const Task = (props) => {

    const [ markAsDone ] = useMutation(MARK_AS_DONE, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
    })

    const [ removeTask ] = useMutation(REMOVE_TASK, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
        update: (store, response) => {
            const dataInStore = store.readQuery({ query: ALL_TASKS })
            console.log('dataInStore, dataInStore.allPosts: ', dataInStore, dataInStore.allTasks)
            console.log('poistettu: ', response.data.removeTask)
            if (dataInStore) {
                store.writeQuery({ //tästä tulee varoitus, ks.mahd. ratkaisu: https://blog.efounders.co/optimising-list-item-deletion-with-apollos-client-directive-and-fragments-dc2affc3c3ef
                    query: ALL_TASKS,
                    data: {
                        allTasks: dataInStore.allTasks.filter(p => p.id !== response.data.removeTask.id)
                    }
                })
            }
    }})

    const handleClickMarkAsDone = async (event, description) => {
        event.preventDefault()
        try {
            markAsDone({ variables:
                {
                    description
            }})
            props.showNotification('Työ on merkitty tehdyksi!')
        
        } catch (e) {
            console.log(e)
            props.showNotification(`Tapahtui virhe: ${e}`)
        }
    }

    const handleClickRemove = async (event, id) => {
        event.preventDefault()
        try {
            removeTask({ 
                variables: { id }
            })
            props.showNotification('Työ on nyt poistettu!')

        } catch (e) {
            props.showNotification(`Tapahtui virhe: ${e}`)
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
                    : <Button height='30' background='#bc5a45' onClick={(e) => handleClickMarkAsDone(e, props.task.description)}>Merkitse työ tehdyksi</Button>}
                    <Button height='30' background='#bc5a45' onClick={(e) => handleClickRemove(e, props.task.id)}>Poista työ</Button>
                </StyledTask>
       
    )   

}
export default Task