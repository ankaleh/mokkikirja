import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Button } from '../styles/button'
import { Info, Page, Row } from '../styles/div'
import { TextPrimary, InfoText } from '../styles/textStyles'

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
      <Page>
        <Info>
          <InfoText>Haluatko varmasti kirjautua ulos?</InfoText>
            <Row>
              <Button type='submit' onClick={handleClick} background='#bc5a45'>Kyllä</Button>
              <Button type='submit' onClick={()=> history.goBack()} background='#bc5a45'>En</Button>
            </Row>
        </Info>
      </Page>
    )
}

export default SignOut