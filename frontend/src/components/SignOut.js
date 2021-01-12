import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const SignOut = (props) => {
    const client = useApolloClient()
    const history = useHistory()
    const handleClick = () => {
        localStorage.clear()
        client.resetStore()
        props.showNotification('Kirjauduit ulos!')
        history.push('/')
    }
    

    return (
      <div>
        <p>Haluatko varmasti kirjautua ulos? </p>
        
            <button type='submit' onClick={handleClick}>Kyllä</button>
            <button type='submit' onClick={()=> history.goBack()}>En</button>
        
      </div>
    )
}

export default SignOut