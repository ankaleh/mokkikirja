import React, { useState } from 'react'
import { Formik, useField } from 'formik'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import { Button } from '../styles/button'

import Calendar from 'react-calendar'
import format from 'date-fns/format'
import '../styles/calendar.css'

import { parseISO } from 'date-fns'
import CustomCalendar from './CustomCalendar'

const Reservations = (props) => { 
    const [selectedDayRange, setSelectedDayRange] = useState([])
    const [selectedDay, setSelectedDay] = useState(new Date());
    
    
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

    const handleClick = () => {
        //event.preventDefault()
        if (selectedDayRange.length!==0) {
            console.log(selectedDayRange)
        }
        console.log(selectedDay)
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
