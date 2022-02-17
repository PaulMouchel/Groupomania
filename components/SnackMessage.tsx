import React, { FC } from 'react'
import Snackbar from '@mui/material/Snackbar';
import ISnackMessage from '../interfaces/ISnackMessage'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props, ref ) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const SnackMessage: FC<ISnackMessage> = ({ message, setMessage, severity }) => {

    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
        setMessage('')
    }

    return (
        <Snackbar open={message.length > 0} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>         
    )
}
  
export default SnackMessage
  