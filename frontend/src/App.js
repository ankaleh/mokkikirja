import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { loader } from 'graphql.macro'
import { Page, Navigation, Top } from './styles/div'
import { TextPrimary, LinkText, InfoText } from './styles/textStyles'
import Posts from './components/Posts'
import Tasks from './components/Tasks'
const allPosts = loader('./graphql/queries/allPosts.graphql')
const allTasks = loader('./graphql/queries/allTasks.graphql')

const App = () => {
  const postsResult = useQuery(allPosts)
  const tasksResult = useQuery(allTasks)

  if (postsResult.loading || tasksResult.loading) {
    return <InfoText>Vieraskirjaa haetaan</InfoText>
  }
  
  return (
    <div>
      <Top>
      </Top>
      <Navigation>
        <LinkText>Kirjaudu ulos</LinkText>
      </Navigation>
      <Page>
        <TextPrimary>
          <h2>Tervetuloa Mökkikirjaan</h2>
          <h3>Vieraskirja</h3>
        </TextPrimary>
        <Posts posts={postsResult.data.allPosts}/>
        <Tasks tasks={tasksResult.data.allTasks}/>
      </Page>
    </div>
  )
}

export default App
