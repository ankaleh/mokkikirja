import React from 'react'
import { Formik, useField } from 'formik'
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useApolloClient, useMutation } from '@apollo/client'

import { Button } from '../styles/button'
import { Input } from '../styles/input'
import { Column, Page, StyledTask, Row } from '../styles/div'
import { BlackText, InfoText } from '../styles/textStyles'

import FormikInput from './FormikInput'

const ADD_TASK = loader('../graphql/mutations/addTask.graphql')
const ALL_TASKS = loader('../graphql/queries/allTasks.graphql')

const TaskForm = ({ onSubmit }) => {

  return (
    <div>
        <form onSubmit={onSubmit}>
            <Column>
                <BlackText>Lisää työ</BlackText>
                <FormikInput name='description' border='2px solid lightgrey' placeholder='Työn kuvaus' height='60px' width='500px'/>
                <Button type='submit' background='lightgrey' height='40px' width='500px'>Tallenna</Button>
            </Column>
        </form>
    </div>
  );
        
};

const AddTask = (props) => {

    const [addTask /* , result */ ] = useMutation(ADD_TASK, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
        refetchQueries: [ { query: ALL_TASKS }] //tätä voisi optimoida vielä lisää päivittämällä välimuisti itse (ks. FS 8.d: 5)
    })
    const history = useHistory();

    const onSubmit = async (values, { resetForm }) => {
        const { description } = values;
        console.log('Tekstikenttiin kirjoitettiin: ', values); //values on olio, jolla kentät date, text, guests
        
        try {
            await addTask({ variables: {
                description
            }});
            resetForm({})
            props.showNotification('Työ on nyt tallennettu!')
        } catch (e) {
            console.log(e);
        }
    }

    const validationSchema = yup.object().shape({
        description: yup
            .string()    
            .required('Kuvaus vaaditaan.')
    })

    return (
        <Formik initialValues={{date: '', text: '', guests: ''}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>

                {({handleSubmit}) => <TaskForm onSubmit={handleSubmit} />} 
            
        </Formik>
        
    )
}
export default AddTask