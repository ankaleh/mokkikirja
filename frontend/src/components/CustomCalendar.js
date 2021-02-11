import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, InfoText, TextPrimary, TextSecondary } from '../styles/textStyles'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'
import format from 'date-fns/format'
import Calendar from 'react-calendar';
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import '../styles/calendar.css'
import FormikInput from './FormikInput'
import { Input } from '../styles/input'
import { Button } from '../styles/button'

const CustomCalendar = ({selectedDayRange, setSelectedDayRange, datesNotAdded}) => { 

    const tileClassName = ({date, view}) => {

        if (selectedDayRange.length > 1) {
         var reservedDays = eachDayOfInterval({
             start: new Date(selectedDayRange[0]),
             end: new Date(selectedDayRange[1])
         })
     
         if (reservedDays.find(dDate => {
             const d = format(dDate, 'yyyy-MM-dd')
             const dd = format(date, 'yyyy-MM-dd')
             return d === dd
         })) {
             return 'selectedDays'
         }
        }
         return ['focusDay', 'day']
           
     }
    
    return (
        <>
        <Calendar
            className={['calendar']}
            onChange={setSelectedDayRange}
            tileClassName={tileClassName}
            selectRange={true}
            onClickDay={(value) => setSelectedDayRange([value/* .toISOString() */])}
        />
       {selectedDayRange.length>0 
        ? <button className='calendarButton' height='10px' width='200px' onClick={()=> setSelectedDayRange([])}>Tyhjennä valinnat</button>
        : null /* <InfoText>Päivämäärät vaaditaan.</InfoText> */} 
        {datesNotAdded && selectedDayRange.length===0 
        ? <InfoText>Päivämäärät vaaditaan.</InfoText>
        : null} 
    </>
    )   

}
export default CustomCalendar