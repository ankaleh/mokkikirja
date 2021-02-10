import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'
import format from 'date-fns/format'
import Calendar from 'react-calendar';
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import '../styles/calendar.css'
import FormikInput from './FormikInput'
import { Input } from '../styles/input'
import { Button } from '../styles/button'

const CustomCalendar = ({selectedDayRange, setSelectedDayRange}) => { 
    //const [selectedDayRange, setSelectedDayRange] = useState([])

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
            onClickDay={(value) => setSelectedDayRange([value])}
        />
        {selectedDayRange.length!==0
        ? <button className='calendarButton' height='10px' width='200px' onClick={()=> setSelectedDayRange([])}>Tyhjennä valinnat</button>
        : null}
       
        <p>Valitsemasi ajanjakso: {selectedDayRange.length!==0 ? format(selectedDayRange[0], 'dd.MM.yyyy') : ''} - {selectedDayRange.length===2 ? format(selectedDayRange[1], 'dd.MM.yyyy') : ''}</p>
    </>
    )   

}
export default CustomCalendar