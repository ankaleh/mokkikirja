import React from 'react'
import Task from './Task'

const Tasks = ({tasks}) => {


    return (
        <div>
            {tasks.map(t => <Task key={t.id} task={t}/>)}
        </div>
        )

}
export default Tasks