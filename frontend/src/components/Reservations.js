import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import DatePicker from 'react-modern-calendar-datepicker'
import { Calendar } from 'react-modern-calendar-datepicker'
import { Button } from '../styles/button'

const Reservations = (props) => { 
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      })

    const disabledDays = [ //tähän haku varatuista päivistä
        {
          year: 2021,
          month: 1,
          day: 22,
        },
        {
          year: 2021,
          month: 3,
          day: 25,
        },
        {
          year: 2021,
          month: 2,
          day: 6,
        }
    ];
    
    const handleDisabledSelect = (disabledDay) => {
        
        console.log('Yritit valita varattuja päiviä!', disabledDay);
    }
 
    const handleClick = (e) => {
        
        console.log('valitut päivät: ', selectedDayRange)
        /* setSelectedDayRange({
            from: null,
            to: null
          }) */
    }

    return (
        
        <Page flexDirection='column' alignItems='center'>
            <BlackText>Varaukset</BlackText>
            
  
        <Calendar
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            disabledDays={disabledDays} // here we pass them
            onDisabledDayError={handleDisabledSelect} // handle error
            shouldHighlightWeekends
            
        />
        <Button width='50' height='30' background='#bc5a45'
                    onClick={() => handleClick()}>Tee varaus</Button>
  
        </Page>
    )   

}
export default Reservations
