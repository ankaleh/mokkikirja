import React, { useState, useEffect } from 'react'
import { Formik, Field, FieldArray } from 'formik'
import * as yup from 'yup';
import { loader } from 'graphql.macro'
import { useMutation, useApolloClient, useQuery } from '@apollo/client'

import { Button } from '../styles/button'
//import { Input } from '../styles/input'
import { Column, Page, Row } from '../styles/div'
import { BlackText, InfoText, TextPrimary, HeadingSecondary, TextSecondary } from '../styles/textStyles'



import FormikInput from './FormikInput'
import CustomCalendar from './CustomCalendar'
import format from 'date-fns/format'
import '../styles/calendar.css'
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import InputLabel from '@material-ui/core/InputLabel'
//import Input from '@material-ui/core/Input'

const ADD_POST = loader('../graphql/mutations/addPost.graphql')
const ALL_POSTS = loader('../graphql/queries/allPosts.graphql')
const All_USERS = loader('../graphql/queries/allUsers.graphql')

const AddPost = (props) => {

    const allUsers = useQuery(All_USERS)
    const [users, setUsers] = useState([])
    const [addPost /* , result */ ] = useMutation(ADD_POST, {
        onError: (error) => {
            props.showNotification(`Tapahtui virhe: ${error&&error.graphQLErrors[0]?error.graphQLErrors[0].extensions.exception.errors:{}}`)
        },
        refetchQueries: [ { query: ALL_POSTS }], 
        
    })

    const [calendarVisible, setCalendarVisible] = useState(false)
    const [selectedDayRange, setSelectedDayRange] = useState([])
    const [datesNotAdded, setDatesNotAdded] = useState(false)
    const showWhenCalendarVisible = {display: calendarVisible ? '' : 'none'}

    /* haetaan kaikki käyttäjät vierasvalikkoa varten: */
    useEffect(() => {
        if (allUsers.data) {
            setUsers(allUsers.data.allUsers)
        }
        if (allUsers.error) {
            console.log('Virheviesti palvelimelta: ', allUsers.error.message);
            props.showNotification(`Tapahtui virhe: ${allUsers.error.message}`)
        } 
    }, [allUsers]); 


    const onSubmit = async (values, { resetForm }) => {
        const { text, unidentifiedGuests, guests } = values;
        console.log('Tekstikenttiin kirjoitettiin: ', values); //values on olio, jolla kentät date, text, guests
        const unidentifiedGuestsOnArray = unidentifiedGuests.split(',')
        if (selectedDayRange.length<2) {
            props.showNotification('Tapahtui virhe: Lisää päivämäärät!') 
            return
        }
        try {
            await addPost({ variables: {
                startDate: format(selectedDayRange[0], 'yyyy-MM-dd'),
                endDate: format(selectedDayRange[1], 'yyyy-MM-dd'),
                text,
                unidentifiedGuests: unidentifiedGuestsOnArray, //Formik!
                guests: guests.map(u => u.id)
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
        unidentifiedGuests: yup
            .string()
            .required('Vieraiden nimet vaaditaan.')
    })

    const checkDayRange = (dayRange) => {
        setSelectedDayRange(dayRange)
    }

    if (allUsers.loading) {
        return <InfoText>Tietoja haetaan.</InfoText>
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
                    }</Button>
            
            {selectedDayRange.length === 2 
                        ? <BlackText>{format(selectedDayRange[0], 'dd.MM.yyyy')} - {format(selectedDayRange[1], 'dd.MM.yyyy')}</BlackText>
                        : null }
        <Formik initialValues={{text: '', unidentifiedGuests:[] /* '' */, guests: []}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>
                {({handleSubmit, values, handleChange}) => 
                    <form onSubmit={handleSubmit}>
                        <Column>
                        <FormikInput name='text' border='2px solid lightgrey' placeholder='Teksti' height='500px' width='500px'/>
                        
                        <InputLabel id='select-guests'>Valitse vieraita mökin jäsenistä</InputLabel>
                        <Select 
                            labelId='select-guests'
                            displayEmpty
                            name='guests' 
                            value={values.guests}
                            onChange={handleChange}//* ({target}) => setSelectedUsers(target.value) 
                            multiple
                           /*  input={<Input />}  */
                            renderValue={(selectedList) => {//selectedList on lista users-olioita,
                                if (selectedList.length===0) {
                                   return <TextSecondary>Valitse</TextSecondary>
                               }
                               return (
                                <div >
                                    {selectedList.map((user) => (
                                        <Chip key={user.id} label={user.name} />//jotka renderöidään Chipeinä täällä
                                    )
                                    )}
                                </div>
                                )
                            }}
                        >
                         {users.map(u => <MenuItem key={u.id} value={u}>{u.name}</MenuItem>)/* palvelimelta haetuista käyttäjistä MenuItemeja, joita voi klikata */} 
                        </Select>

                        <FormikInput name='unidentifiedGuests' border='2px solid lightgrey' placeholder='Vieraat' height='50px' width='500px'/>
                        
                        {/* <Select 
                            labelId='select-unidentifiedGuests'
                            displayEmpty
                            name='unidentifiedGuests' 
                            value={values.unidentifiedGuests}
                            onChange={handleChange}
                            
                            multiple

                            renderValue={(selectedList) => {
                                
                                if (selectedList.length===0) {
                                   return <TextSecondary>Valitse</TextSecondary>
                               }
                               return (
                                <div >
                                    {selectedList.map((user) => (
                                        <Chip key={user.id} label={user.name} />
                                    )
                                    )}
                                </div>
                                )
                            }}
                        >
                         <MenuItem value={values.unidentifiedGuests}><FormikInput name='unidentifiedGuests' border='2px solid lightgrey' placeholder='Vieraat' height='50px' width='500px'/></MenuItem>) 
                        </Select> */}

                        <Button type='submit' background='lightgrey' height='40px' width='500px'>Lähetä</Button>
                        </Column>
                    </form>}
        </Formik>    
        </Column>
        
    )
}
export default AddPost