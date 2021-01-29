import React from 'react'
import { Formik, useField } from 'formik'
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useApolloClient, useMutation } from '@apollo/client'

import { Button } from '../styles/button'
import { Input } from '../styles/input'
import { Column, Page } from '../styles/div'
import { BlackText, InfoText } from '../styles/textStyles'

import FormikInput from './FormikInput'

const ADD_POST = loader('../graphql/mutations/addPost.graphql')
const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')

const PostForm = ({ onSubmit }) => {

  return (
    <div>
        <form onSubmit={onSubmit}>
            <Column>
                <BlackText>Kirjoita vieraskirjaan</BlackText>
                <FormikInput name='date' border='2px solid lightgrey' placeholder='Ajankohta' height='50px' width='500px'/>
                <FormikInput name='text' border='2px solid lightgrey' placeholder='Teksti' height='500px' width='500px'/>
                <FormikInput name='guests' border='2px solid lightgrey' placeholder='Vieraat. Erota nimet pilkulla toisistaan.' height='50px' width='500px'/>
                <Button type='submit' background='lightgrey' height='40px' width='500px'>Lähetä</Button>
            </Column>
        </form>
    </div>
  );
        
};

const AddPost = (props) => {

    const [addPost /* , result */ ] = useMutation(ADD_POST, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
        refetchQueries: [ { query: ALL_POSTS }] //tätä voisi optimoida vielä lisää päivittämällä välimuisti itse (ks. FS 8.d: 5)
    })
    const history = useHistory();

    const onSubmit = async (values, { resetForm }) => {
        const { date, text, guests } = values;
        console.log('Tekstikenttiin kirjoitettiin: ', values); //values on olio, jolla kentät date, text, guests
        const guestsOnArray = guests.split(',')
        try {
            await addPost({ variables: {
                date,
                text,
                guests: guestsOnArray, //Formik!
            }});
            resetForm({})
            props.showNotification('Vieraskirjamerkintäsi on nyt tallennettu!')
        } catch (e) {
            console.log(e);
        }
    }

    const validationSchema = yup.object().shape({
        date: yup
            .string()    
            .required('Ajankohta vaaditaan.'),
        text: yup
            .string()    
            .required('Teksti vaaditaan.'),
        guests: yup
            .string()
            .required('Vieraiden nimet vaaditaan.')
            
    })

    return (
        <Formik initialValues={{date: '', text: '', guests: ''}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>

                {({handleSubmit}) => <PostForm onSubmit={handleSubmit} />} 
            
        </Formik>
        
    )
}
export default AddPost