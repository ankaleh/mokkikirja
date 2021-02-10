import React, { useState } from 'react'
import { Formik, useField } from 'formik'
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useApolloClient, useMutation } from '@apollo/client'

import { Button } from '../styles/button'
import { Input } from '../styles/input'
import { Column, Page, Row } from '../styles/div'
import { BlackText, InfoText } from '../styles/textStyles'

import FormikInput from './FormikInput'
import CustomCalendar from './CustomCalendar'
//import Calendar from 'react-calendar';
import format from 'date-fns/format'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import '../styles/calendar.css'

const ADD_POST = loader('../graphql/mutations/addPost.graphql')
const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')

const PostForm = ({ onSubmit }) => {
    
const [calendarVisible, setCalendarVisible] = useState(false)
const [selectedDayRange, setSelectedDayRange] = useState([])
const showWhenCalendarVisible = {display: calendarVisible ? '' : 'none'}

  return (
        <form onSubmit={onSubmit}>
            <Column>
                <BlackText>Kirjoita vieraskirjaan</BlackText>
                <div style={showWhenCalendarVisible}>
                    <CustomCalendar selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
                    <Row>
                    <FormikInput name='startDate' type='input' value={selectedDayRange.length!==0 ? format(selectedDayRange[0], 'dd.MM.yyyy') : ''} border='2px solid lightgrey' placeholder='Vierailu alkoi' height='30px' width='130px'/>
                    <FormikInput name='endDate' type='input' value={selectedDayRange.length===2 ? format(selectedDayRange[1], 'dd.MM.yyyy') : ''} border='2px solid lightgrey' placeholder='Vierailu päättyi' height='30px' width='130px'/>
                </Row>
                </div>
                
                
                <Button type='submit' background='lightgrey' onClick={() => {
                    setCalendarVisible(!calendarVisible)
                    }}>{calendarVisible
                        ? 'Piilota kalenteri'
                        : 'Näytä kalenteri lisätäksesi vierailun ajankohdan'
                    }
                </Button>
                <FormikInput name='text' border='2px solid lightgrey' placeholder='Teksti' height='500px' width='500px'/>
                <FormikInput name='guests' border='2px solid lightgrey' placeholder='Vieraat. Erota nimet pilkulla toisistaan.' height='50px' width='500px'/>
                <Button type='submit' background='lightgrey' height='40px' width='500px'>Lähetä</Button>
            </Column>
        </form>
    
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
        const { startDate, endDate, text, guests } = values;
        console.log('Tekstikenttiin kirjoitettiin: ', values); //values on olio, jolla kentät date, text, guests
        const guestsOnArray = guests.split(',')
        /* const formattedStartDate = format(startDate, 'dd-MM-yyyy')
        const formattedEndDate = format(endDate, 'dd-MM-yyyy') */
        try {
            await addPost({ variables: {
                startDate, 
                endDate,
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
        startDate: yup
            .string()
            .required('Vierailun alkamisajankohta vaaditaan.'),
        endDate: yup
            .string()
            .required('Vierailun päättymisajankohta vaaditaan.'),
        text: yup
            .string()    
            .required('Teksti vaaditaan.'),
        guests: yup
            .string()
            .required('Vieraiden nimet vaaditaan.')
            
    })

    return (
        <Formik initialValues={{startDate: new Date, endDate: new Date, text: '', guests: ''}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>

                {({handleSubmit}) => <PostForm onSubmit={handleSubmit}/>} 
            
        </Formik>
        
    )
}
export default AddPost