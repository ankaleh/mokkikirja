import React, { useState, useEffect } from 'react'
import { Formik, useField } from 'formik'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import { Button } from '../styles/button'
import { loader } from 'graphql.macro'
import { useApolloClient, useMutation, gql, useQuery } from '@apollo/client'

import format from 'date-fns/format'
import { areIntervalsOverlapping } from 'date-fns'
import CustomCalendar from './CustomCalendar'

const ADD_RESERVATION = loader('../graphql/mutations/addReservation.graphql')
const ALL_RESERVATIONS = loader('../graphql/queries/allReservations.graphql')

const Reservations = (props) => {

    const [selectedDayRange, setSelectedDayRange] = useState([])
    const [reservedDayRanges, setReservedDayRanges] = useState([]) //taulukko, jossa taulukkoalkioina kunkin varauksen päivämäärät

    const allReservations/* { data, error, loading } */ = useQuery(ALL_RESERVATIONS)
    const [addReservation /* , result */ ] = useMutation(ADD_RESERVATION, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
        refetchQueries: [ { query: ALL_RESERVATIONS }], 
    })

    useEffect(() => {
        if (allReservations.data) {
            setReservedDayRanges(allReservations.data.allReservations.map(r => [ r.startDate, r.endDate ]))
        }
        if (allReservations.error) {
            props.showNotification(`Tapahtui virhe: ${allReservations.error.message}`)
        } 
    }, [allReservations]); 

    const handleClick = async () => {
        console.log('startDate: ', selectedDayRange[0], 'endDate: ', selectedDayRange[1])
        try {
            await addReservation({ 
                variables: { 
                    startDate: format(selectedDayRange[0], 'yyyy-MM-dd'),
                    endDate: format(selectedDayRange[1], 'yyyy-MM-dd')
                }
            })
            props.showNotification('Varaus on nyt tehty! Voit perua varauksen omalla sivullasi.')
            
        } catch(e) {
            props.showNotification(`Tapahtui virhe: ${e}`)
        }
    }

    //tarkistaa, sisältääkö kalenterista valittu ajanjakso varattuja päiviä
    const checkDayRange = (dayRange) => {
        if (dayRange.length===2) {
            const a =  reservedDayRanges.map(array => {
                return areIntervalsOverlapping(
                    { start: new Date(array[0]), end: new Date(array[1]) },
                    { start: new Date(dayRange[0]), end: new Date(dayRange[1]) }
                )
            })
            if (a.find(b => b===true)) {
                alert('Valitsemiesi päivämäärien välissä on varattuja päiviä!')
            } else {
                setSelectedDayRange(dayRange)
            }
        } else {
            setSelectedDayRange(dayRange)
        }
        
    }

    return (
        <Page flexDirection='column' alignItems='center'>
            <BlackText>Varaukset</BlackText>
            
            <CustomCalendar checkDayRange={checkDayRange} reservedDayRanges={reservedDayRanges} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
        
        <Button width='50' height='30' background='#bc5a45'
            onClick={() => handleClick()}>Tee varaus</Button>

        {/* <Button width='50' height='30' background='#bc5a45'
            onClick={() => {
                setSelectedDay(new Date())
                setSelectedDayRange([])
                }}>Peruuta</Button> */}
            </Page> 
        
    )   

}
export default Reservations
