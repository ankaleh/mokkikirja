import { ErrorMessage, NotificationMessage } from '../styles/div'
import React from 'react'

const Notification = ({ notification }) => {
    
    if (!notification) {
        return null
    }

    if (notification.includes('Tapahtui virhe')) {
        return (
            <ErrorMessage>
            {notification}
            </ErrorMessage>
    
        )
    }

    return (
        <NotificationMessage>{notification}</NotificationMessage>
    )
}
    
export default Notification
    