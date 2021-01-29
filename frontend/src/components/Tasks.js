import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Task from './Task'
import Error from './Notification'
import { InfoText } from '../styles/textStyles'
import { loader } from 'graphql.macro'
import { Column, Page, StyledTask, Row } from '../styles/div'
import AddTask from './AddTask'
import 'semantic-ui-css/semantic.min.css'

const ALL_TASKS = loader('../graphql/queries/allTasks.graphql')

const Tasks = (props) => {
    const allTasks/* { data, error, loading } */ = useQuery(ALL_TASKS)
    const [ tasks, setTasks] = useState(null)

    useEffect(() => {
        if (allTasks.data) {
            setTasks(allTasks.data.allTasks)
        }
        if (allTasks.error) {
            props.showNotification(`Tapahtui virhe: ${allTasks.error.message}`)
        } 
    }, [allTasks]); 
      
    if (props.notification) {
        return null
    }

    if (allTasks.loading) {
        <InfoText>Työpäiväkirjaa haetaan</InfoText>
    }

    if (!tasks) {
        return <InfoText>Työpäiväkirjan hakeminen ei onnistunut. Oletko kirjautunut sisään?</InfoText>
    }
    
    return (
        <Page flexDirection='row' justifyContent='space-around'>
           
        <Column>
            {tasks.map(t =>  
            
            <Task showNotification={props.showNotification} key={t.id} task={t}/>
            
            )}
        </Column>
        
        <AddTask showNotification={props.showNotification}/>

    </Page>
    )

}
export default Tasks