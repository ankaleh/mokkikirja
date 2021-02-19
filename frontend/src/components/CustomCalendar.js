import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, InfoText, TextPrimary, TextSecondary } from '../styles/textStyles'

import format from 'date-fns/format'
import Calendar from 'react-calendar';
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import '../styles/calendar.css'
import 'react-calendar/dist/Calendar.css'

const CustomCalendar = ({ checkDayRange, reservedDayRanges, selectedDayRange, datesNotAdded }) => { 

    const tileClassName = ({date, view}) => {
        /* const eachDayOfIntervals = reservedDayRanges.map(datesArray => eachDayOfInterval({
            start: new Date(datesArray[0]),
            end: new Date(datesArray[1])
        })) 
        const disabledDays = eachDayOfIntervals.flat()

        if (selectedDayRange.length > 1) { */

           /*  var focusedDays = eachDayOfInterval({
                start: new Date(selectedDayRange[0]),
                end: new Date(selectedDayRange[1])
            }) */
     
            /* if (focusedDays.find(dDate => { //jos päivä on valittujen päivien listassa
                const d = format(dDate, 'yyyy-MM-dd')
                const dd = format(date, 'yyyy-MM-dd')
                return d === dd
                }) && !(disabledDays.find(dDate => { //eikä se ei ole varattujen päivien listassa,
                    const d = format(dDate, 'yyyy-MM-dd')
                    const dd = format(date, 'yyyy-MM-dd')
                    return d === dd
                    }))
                
                ) {
                    return 'selectedDays' //tyylinä on selectedDays
                } */
            //} else 
            /* if (disabledDays.find(dDate => { //jos päivä on valittujen päivien listassa,
                const d = format(dDate, 'yyyy-MM-dd')
                const dd = format(date, 'yyyy-MM-dd')
                return d === dd
                })) {
                    return 'reservedDay' //tyylinä on reservedDay
            } */
        //}
    
            //return ['focusDay', 'day'] 
            
    }

     const tileDisabled = ({ date, view }) => {
        if (reservedDayRanges.length>0) {
            //taulukon intervals sisällä on jokaisen varauksen päivämääräintervalli taulukossa
            const intervals = reservedDayRanges.map(datesArray => eachDayOfInterval({
                start: new Date(datesArray[0]),
                end: new Date(datesArray[1])
            })) 
            const disabledDays = intervals.flat() //kaikki varatut päivät tässä taulukossa
        
            return disabledDays.find(dDate => {
                const d = format(dDate, 'yyyy-MM-dd')
                const dd = format(date, 'yyyy-MM-dd')
                //console.log('d: ',d, 'dd: ', dd)
                return d === dd
                }
            )
        }
    }
    
    return (
        <>
        <Calendar
            /* className={['calendar']} */
            onChange={(dayRange) => checkDayRange(dayRange)}
            tileClassName={tileClassName}
            selectRange={true}
            onClickDay={(value) => checkDayRange([value])}
            tileDisabled={tileDisabled}
        />
      {/*  {selectedDayRange.length>0 
        ? <button className='calendarButton' height='10px' width='200px' onClick={()=> checkDayRange([])}>Tyhjennä valinnat</button>
        : null}  */}
        {selectedDayRange.length<2
        ? null
        : <InfoText>{`Valitsemasi päivät ${format(selectedDayRange[0], 'dd.MM.yyyy')}-${format(selectedDayRange[1], 'dd.MM.yyyy')}`}</InfoText>}
        {datesNotAdded && selectedDayRange.length===0 
        ? <InfoText>Päivämäärät vaaditaan.</InfoText>
        : null} 
    </>
    )   

}
export default CustomCalendar