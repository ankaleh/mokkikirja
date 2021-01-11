import React from 'react'
import { useQuery } from '@apollo/client'
import Task from './Task'
import { TextPrimary, InfoText } from '../styles/textStyles'
import { loader } from 'graphql.macro'
const ALL_TASKS = loader('../graphql/queries/allTasks.graphql')

const Tasks = () => {
    const tasksResult = useQuery(ALL_TASKS)

    if (tasksResult.loading) {
        return <InfoText>Työpäiväkirjaa haetaan</InfoText>
    }

    return (
        <div>
            <TextPrimary><h1>Työpäiväkirja</h1></TextPrimary>
            {/* {console.log('Tasks: ', tasks)} */}
            {tasksResult.data.allTasks.map(t => <Task key={t.id} task={t}/>)}
        </div>
    )

}
export default Tasks