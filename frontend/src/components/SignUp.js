import React from 'react'
import { Formik, useField } from 'formik'
import * as yup from 'yup';
import { useHistory } from 'react-router-dom'
import { useApolloClient, useMutation } from '@apollo/client'

import { Button } from '../styles/button'
import { Input } from '../styles/input'
import { Column, Page, Row } from '../styles/div'
import { BlackText, InfoText } from '../styles/textStyles'
import useSignIn from '../hooks/useSignIn'

import FormikInput from './FormikInput'
import { loader } from 'graphql.macro'

const CREATE_USER = loader('../graphql/mutations/createUser.graphql')

const SignUpForm = ({onSubmit}) => {

    return (
        <div>
        <form onSubmit={onSubmit}>
            <Column>
                <BlackText>Rekisteröidy antamalla nimesi ja valitsemalla käyttäjätunnus ja salasana.</BlackText>
                <FormikInput name='name' placeholder='Nimi' border='2px solid lightgrey'/>
                <FormikInput name='username' placeholder='Käyttäjätunnus' border='2px solid lightgrey'/>
                <FormikInput name='password' placeholder='Salasana' border='2px solid lightgrey'/>
                <FormikInput name='passwordConf' placeholder='Salasana uudestaan' border='2px solid lightgrey'/>
                <Button type='submit' background='lightgrey'>Rekisteröidy</Button>
            </Column>
        </form>
        </div>
    )
}

const SignUp = (props) => {

    const [signIn] = useSignIn(props.showNotification)
    const history = useHistory()
    const [createUser /* , result */ ] = useMutation(CREATE_USER, {
        onError: (error) => {
            showNotification(`Tapahtui virhe: ${error.graphQLErrors[0].message}`)
        }
    })

    const onSubmit = async (values) => {
        const { name, username, password, passwordConf } = values;
        
        try {
            //rekisteröidytään:
            const result = await createUser({ variables: {
                name,
                username,
                password,
                
            }});
            //kirjataan käyttäjä sisään:
            await signIn(username, password);

        } catch (e) {
            console.log(e);
        }
        
    };
    
    const validationSchema = yup.object().shape({
        name: yup
            .string(),
        username: yup
            .string()
            .min(6).max(30)
            .required('Käyttäjänimi vaaditaan.'),
        password: yup
            .string()
            .min(7).max(50)
            .required('Salasana vaaditaan.'),
        passwordConf: yup
            .string()
            .oneOf([yup.ref('password'), null])
            .required('Salasanan varmistus vaaditaan.'),
    });
    //Formikin sisällä (lapsena) on funktio, joka saa parametrikseen Formikin funktion, joka puolestaan annetaan 
    //kirjautumislomakkeelle propsina.
    return (
        <Page>
            <Formik initialValues={{name: '', username: '', password: '', passwordConf: ''}} 
                onSubmit={onSubmit} validationSchema={validationSchema}>

                    {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />} 
            
            </Formik>
        </Page>
    )
  
}

export default SignUp