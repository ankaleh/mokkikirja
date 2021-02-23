import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup';
import { loader } from 'graphql.macro'
import { useMutation, useApolloClient } from '@apollo/client'

import { Button } from '../styles/button'
import { Input } from '../styles/input'
import { Column, Page, Row } from '../styles/div'
import { BlackText, InfoText, TextPrimary, HeadingSecondary } from '../styles/textStyles'

import FormikInput from './FormikInput'
import CustomCalendar from './CustomCalendar'
import format from 'date-fns/format'
import '../styles/calendar.css'

const ADD_POST = loader('../graphql/mutations/addPost.graphql')
const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')

const AddPost = (props) => {

    const [calendarVisible, setCalendarVisible] = useState(false)
    const [selectedDayRange, setSelectedDayRange] = useState([])
    const [datesNotAdded, setDatesNotAdded] = useState(false)
    const showWhenCalendarVisible = {display: calendarVisible ? '' : 'none'}

    const client = useApolloClient()

    const [addPost /* , result */ ] = useMutation(ADD_POST, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
        refetchQueries: [ { query: ALL_POSTS }], 
        
    })

    const onSubmit = async (values, { resetForm }) => {
        const { text, guests } = values;
        console.log('Tekstikenttiin kirjoitettiin: ', values); //values on olio, jolla kentät date, text, guests
        const guestsOnArray = guests.split(',')
        if (selectedDayRange.length<2) {
            props.showNotification('Tapahtui virhe: Lisää päivämäärät!') 
            return
        }
        try {
            await addPost({ variables: {
                startDate: format(selectedDayRange[0], 'yyyy-MM-dd'),
                endDate: format(selectedDayRange[1], 'yyyy-MM-dd'),
                text,
                guests: guestsOnArray, //Formik!
            }});
            resetForm({})
            props.showNotification('Vieraskirjamerkintäsi on nyt tallennettu!')
            setSelectedDayRange([])
            setCalendarVisible(false)
        } catch (e) {
            console.log(e);
        }
    }

    const validationSchema = yup.object().shape({
        text: yup
            .string()    
            .required('Teksti vaaditaan.'),
        guests: yup
            .string()
            .required('Vieraiden nimet vaaditaan.')
            
    })

    const checkDayRange = (dayRange) => {
        setSelectedDayRange(dayRange)
    }
    return (
        <Column>
        <HeadingSecondary>Kirjoita vieraskirjaan</HeadingSecondary>
            <div style={showWhenCalendarVisible}>
                <CustomCalendar datesNotAdded={datesNotAdded} checkDayRange={checkDayRange} reservedDayRanges={[]} selectedDayRange={selectedDayRange}/>
            </div> 
            <Button type='submit' background='lightgrey' onClick={() => {
                    if (selectedDayRange.length<2 && calendarVisible) {
                        setDatesNotAdded(true)
                        return
                    }
                    setCalendarVisible(!calendarVisible)
                    }}>{calendarVisible
                        ? 'Piilota kalenteri'
                        : 'Näytä kalenteri lisätäksesi vierailun ajankohdan'
                    }
            </Button>
            {selectedDayRange.length === 2 
                        ? <BlackText>{format(selectedDayRange[0], 'dd.MM.yyyy')} - {format(selectedDayRange[1], 'dd.MM.yyyy')}</BlackText>
                        : null }
        <Formik initialValues={{text: '', guests: ''}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>
                {({handleSubmit}) => 
                    <form onSubmit={handleSubmit}>
                        <Column>
                        <FormikInput name='text' border='2px solid lightgrey' placeholder='Teksti' height='500px' width='500px'/>
                        <FormikInput name='guests' border='2px solid lightgrey' placeholder='Vieraat. Erota nimet pilkulla toisistaan.' height='50px' width='500px'/>
                        <Button type='submit' background='lightgrey' height='40px' width='500px'>Lähetä</Button>
                        </Column>
                    </form>}
        </Formik>    
        </Column>
        
    )
}
export default AddPost