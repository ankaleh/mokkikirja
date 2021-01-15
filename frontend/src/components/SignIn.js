import React from 'react'
import { Formik, useField } from 'formik'
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router-dom'

import { Button } from '../styles/button'
import { Input } from '../styles/input'
import { Column, Page } from '../styles/div'
import { BlackText, InfoText } from '../styles/textStyles'

import FormikInput from './FormikInput'

const SignInForm = ({ onSubmit }) => {

  return (
    <div>
        <form onSubmit={onSubmit}>
            <Column>
                <BlackText>Kirjoita käyttäjätunnuksesi ja salasanasi alla oleviin kenttiin.</BlackText>
                <FormikInput name='username' border='2px solid lightgrey' placeholder='Käyttäjätunnus'/>
                <FormikInput name='password' border='2px solid lightgrey' placeholder='Salasana'/>
                <Button type='submit' background='lightgrey'>Kirjaudu sisään</Button>
            </Column>
        </form>
    </div>
  );
        
};

const SignIn = (props) => {

    const [signIn, result ] = useSignIn(props.showNotification);
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;
        //console.log('Tekstikenttiin kirjoitettiin: ', username, password); //values on olio, jolla kentät username ja password
        try {
            await signIn(username, password); // kirjaudutaan
        } catch (e) {
            console.log(e);
        }
    }

    const validationSchema = yup.object().shape({
        password: yup
            .string()    
            .required('Salasana vaaditaan.'),
        username: yup
            .string()
            .required('Käyttäjänimi vaaditaan.')
    })
    
    if (result.loading) {
        return <div>Kirjaudutaan</div>
    }

    return (
        <Page>
        <Formik initialValues={{username: '', password: ''}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>

                {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />} 
            
        </Formik>
        </Page>
    )
}
export default SignIn