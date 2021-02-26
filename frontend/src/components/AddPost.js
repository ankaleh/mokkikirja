import React, { useState, useEffect } from 'react'
import { Formik, Field, FieldArray } from 'formik'
import * as yup from 'yup';
import { loader } from 'graphql.macro'
import { useMutation, useApolloClient, useQuery } from '@apollo/client'

import { Button } from '../styles/button'
//import { Input } from '../styles/input'
import { Column, Page, Row, StyledTextContainer, StyledPost, GuestsContainer } from '../styles/div'
import { BlackText, InfoText, TextPrimary, HeadingSecondary, TextSecondary, ErrorText } from '../styles/textStyles'



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

    /* fetch all users for the form field guests: */
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
        if (selectedDayRange.length<2) {
            props.showNotification('Tapahtui virhe: Lisää päivämäärät!') 
            return
        }

        try {
            await addPost({ variables: {
                startDate: format(selectedDayRange[0], 'yyyy-MM-dd'),
                endDate: format(selectedDayRange[1], 'yyyy-MM-dd'),
                text,
                unidentifiedGuests, 
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
        guests: yup
            .array()
            .when('unidentifiedGuests', {
                is: unidentifiedGuests => unidentifiedGuests.length === 0,
                then: yup.array().min(1, 'Lisää vähintään yksi vieras!')
            }),
        unidentifiedGuests: yup
            .array()
            .of(
                yup.string()
                .required('Lisää nimi tai paina Poista.') 
                .min(2, 'Nimessä on oltava vähintään kaksi kirjainta.')
            )
                    
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

        <Formik initialValues={{text: '', unidentifiedGuests:[], guests: []}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>
                {({handleSubmit, values, handleChange, handleBlur, errors, touched}) => 
                    <form onSubmit={handleSubmit}>
                        <Column>
                        <FormikInput name='text' border='2px solid lightgrey' placeholder='Teksti' height='500px' width='500px'/>
                        
                        {/* <InputLabel id='select-guests'>Lisää vieraiden nimet</InputLabel>  */}
                        <GuestsContainer labelId='select-guests'>
                        <Select 
                            displayEmpty
                            name='guests' 
                            value={values.guests}
                            onChange={handleChange}//* ({target}) => setSelectedUsers(target.value) 
                            onBlur={handleBlur}
                            multiple
                           /*  input={<Input />}  */
                            renderValue={(selectedList) => {//selectedList on lista users-olioita,
                                if (selectedList.length===0) {
                                   return <TextSecondary>Valitse vieraita mökin jäsenistä</TextSecondary>
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
                        {errors.guests &&
                    touched.guests &&
                        <ErrorText>
                            {errors.guests}
                        </ErrorText>}
                        <FieldArray
                            onBlur={handleBlur}
                            name='unidentifiedGuests' //tämä yhdistää lomakkeen values-kenttään unidentifiedGuests
                            render={arrayHelpers => (
                            <div>
                            {values.unidentifiedGuests && values.unidentifiedGuests.length > 0 
                            ? (values.unidentifiedGuests.map((guest, index) => (
                                <div key={index}>
                                <FormikInput type='input' name={`unidentifiedGuests.${index}`} />
                                    <Button
                                        background='lightgrey'
                                        type='button'
                                        onClick={() => {
                                            props.showNotification(`Vieraslistasta on nyt poistettu ${guest}`)
                                            arrayHelpers.remove(index)}} // remove a guest from the unidentifiedGuests list
                                     >
                                        Poista
                                    </Button>
                                    
                                    <Button
                                        background='lightgrey'
                                        type='button'
                                        onClick={() => {
                                            props.showNotification(`Vieraslistaan on nyt lisätty ${guest}`)
                                            arrayHelpers.insert(index, '')}} // insert an empty string at a position
                                    >
                                    Lisää seuraava
                                    </Button>
                                </div>
                            ))
                            ) 
                            : /* show this button when unidentifiedGuests list is empty: */
                            (
                                <Button background='lightgrey' type="button" onClick={() => arrayHelpers.push('')}>
                                 Lisää muita vieraita
                                </Button>
                            )}
                 <div>
                   <Button background='lightgrey' type="submit" onClick={() => {
                       if (values.guests.length!=0 && values.unidentifiedGuests.length!=0) {
                        props.showNotification(`${values.guests.map(g => g.name)
                            .reduce((prev, curr) => `${prev}, ${curr}`)}, ${values.unidentifiedGuests.reduce((prev, curr) => `${prev}, ${curr}`)}`)
                        } else if (values.unidentifiedGuests.length!=0) {
                            props.showNotification(`${values.unidentifiedGuests
                                .reduce((prev, curr) => `${prev}, ${curr}`)}`)
                        } else if (values.guests.length!=0) {
                            props.showNotification(`${values.guests.map(g => g.name)
                                .reduce((prev, curr) => `${prev}, ${curr}`)}`)
                        }
                    }}
                       
                    >
                       Näytä lisäämäsi vieraat
                   </Button>
                 </div>
               </div>
             )} 
           /> 
           </GuestsContainer>

                        <Button type='submit' background='lightgrey' height='40px' width='500px'>Lähetä</Button>
                        </Column>
                    </form>}
        </Formik>    
        </Column>
        
    )
}
export default AddPost