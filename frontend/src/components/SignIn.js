import React from 'react'
import { Formik, useField } from 'formik'
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import { Button, Input } from 'semantic-ui-react'

const SignInForm = ({ onSubmit }) => {
    const [field1, meta1, helpers1] = useField('username');
    const [field2, meta2, helpers2] = useField('password');
    //const showError = meta1.touched && meta1.error; 

  return (
    <div>
        <form onSubmit={onSubmit}>
        <Input
            focus placeholder='Käyttäjätunnus'
            value={field1.value}
            onChange={({target}) => helpers1.setValue(target.value)}
            /> 
        <Input
            focus placeholder='Salasana'
            value={field2.value}
            onChange={({target}) => helpers2.setValue(target.value)}
            /> 
        <Button type='submit'>Kirjaudu sisään</Button>
        </form>
    </div>
  );
        
};

const SignIn = () => {

    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;
        console.log('Tekstikenttiin kirjoitettiin: ', username, password); //values on olio, jolla kentät username ja password
        try {
            await signIn(username, password); // kirjaudutaan
        } catch (e) {
            console.log(e);
        }
        history.push('/vieraskirja');
    }

    return (
        <Formik initialValues={{username: '', password: ''}} 
            onSubmit={onSubmit} /* validationSchema={validationSchema} */>

                {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />} 
            
        </Formik>
       
    )
}
export default SignIn