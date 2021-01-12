import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Task from './Task'
import Error from './Notification'
import { TextPrimary, InfoText } from '../styles/textStyles'
import { loader } from 'graphql.macro'
const ALL_TASKS = loader('../graphql/queries/allTasks.graphql')

const Tasks = (props) => {
    const allTasks/* { data, error, loading } */ = useQuery(ALL_TASKS)
    const [ tasks, setTasks] = useState(null)

    useEffect(() => {
        if (allTasks.data) {
            setTasks(allTasks.data.allTasks)
        }
        if (allTasks.error) {
            console.log('Virheviesti palvelimelta: ', allTasks.error.message);
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
        <div> 
            <TextPrimary><h1>Työpäiväkirja</h1></TextPrimary>
            {tasks.map(t => <Task key={t.id} task={t}/>)}
        </div>
    )

}
export default Tasks