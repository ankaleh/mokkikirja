import { useApolloClient, useMutation } from '@apollo/client'
import { loader } from 'graphql.macro'

const LOGIN = loader('../graphql/mutations/login.graphql')

const useSignIn = () => {
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
        }
    })
    const client = useApolloClient()

    const signIn = async (username, password) => {
        const result = await login({ variables: {
            username, password
        }})
        //console.log('useSignIn-hookin signIn-funktion result.data', result.data)
        localStorage.setItem('mokkikirja-token', result.data.login.value)
        client.resetStore()

        return result
    }
    console.log(result)
    return [signIn, result]

}
export default useSignIn