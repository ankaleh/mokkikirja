import React, { useState } from 'react'
import { Formik, useField } from 'formik'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import { Button } from '../styles/button'
import { loader } from 'graphql.macro'
import { useApolloClient, useMutation, gql } from '@apollo/client'

import Calendar from 'react-calendar'
import format from 'date-fns/format'
import '../styles/calendar.css'

import { parseISO } from 'date-fns'
import CustomCalendar from './CustomCalendar'

const ADD_RESERVATION = loader('../graphql/mutations/addReservation.graphql')

const Reservations = (props) => { 
    const [selectedDayRange, setSelectedDayRange] = useState([])
    const [selectedDay, setSelectedDay] = useState(new Date());
    
    const [addReservation /* , result */ ] = useMutation(ADD_RESERVATION, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        }
    })
    
    const disabledDays = [ //tähän haku varatuista päivistä
        new Date(2021, 1, 5),
        new Date(2021, 1, 7)
    ];
 
    const tileDisabled = ({ date, view }) => {
        //if (view === 'month') 
            return disabledDays.find(dDate => {
                const d = format(dDate, 'yyyy-MM-dd')
                const dd = format(date, 'yyyy-MM-dd')
                //console.log('d: ',d, 'dd: ', dd)
                return d === dd
                }
                )
        
    }
    const tileClassName = ({ date, view }) => {
       
    }

    /* const handleClick = () => {
        //event.preventDefault()
        if (selectedDayRange.length===2) {
            console.log(selectedDayRange)
        }
        console.log(selectedDay)
    } */

    const handleClick = async () => {
        console.log('startDate: ', selectedDayRange[0], 'endDate: ', selectedDayRange[1])
        try {
            await addReservation({ 
                variables: { 
                    startDate: format(selectedDayRange[0], 'yyyy-MM-dd'),
                    endDate: format(selectedDayRange[1], 'yyyy-MM-dd')
                }
            })
            props.showNotification('Varaus on nyt tehty!')
            
        } catch(e) {
            props.showNotification(`Tapahtui virhe: ${e}`)
        }
        
    }

    return (
        <Page flexDirection='column' alignItems='center'>
            <BlackText>Varaukset</BlackText>
            
            <CustomCalendar selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
        
        <Button width='50' height='30' background='#bc5a45'
            onClick={() => handleClick()}>Tee varaus</Button>

        <Button width='50' height='30' background='#bc5a45'
            onClick={() => {
                setSelectedDay(new Date())
                setSelectedDayRange([])
                }}>Peruuta</Button>
        </Page>
        
    )   

}
export default Reservations
