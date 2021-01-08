import React from 'react'
import { StyledTask } from '../styles/div'
import { TextPrimary } from '../styles/textStyles'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'

const Task = ({task}) => {
    
    return (
        <StyledTask>
            <p><TextPrimary>{task.description}</TextPrimary></p>
            {task.done
            ? <Icon name='lock' color='green'/>
            : <Icon name='lock open' color='red'/>}
            
        </StyledTask>
    )   

}
export default Task