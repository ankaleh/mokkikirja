import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Page, StyledTextContainer, Space } from '../styles/div'
import { BlackText, TextPrimary, TextSecondary } from '../styles/textStyles'
import { Button } from '../styles/button'

import Calendar from 'react-calendar'
import format from 'date-fns/format'
import '../styles/calendar.css'

import { parseISO } from 'date-fns'

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
    const tileContent = ({ date, view }) => {
        
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
            
        <Calendar
            onChange={setSelectedDayRange}
            tileDisabled={tileDisabled}
            tileContent={tileContent}
            tileClassName={({date, view}) => {
                return 'calendar'
            }
            }
            onClickDay={(value, event) => {
                setSelectedDay(value)
                console.log(value)
            }
            }
            selectRange={true}
        />

        <BlackText>Valintasi {selectedDayRange.length!==0
        ? `${format(selectedDayRange[0], 'yyyy-MM-dd')} - ${format(selectedDayRange[1],'yyyy-MM-dd')}`
        : `${format(selectedDay, 'yyyy-MM-dd')}`} </BlackText>
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
