import { FC, useState } from 'react'
import styles from '../styles/components/UserSettings.module.scss'
import Button from '@mui/material/Button'
import Modal from './Modal'
import DeleteProfile from './DeleteProfile'
import IUserSettings from '../interfaces/IUserSettings'
import { DateTime } from "luxon"
import Typography from '@mui/material/Typography'

const UserSettings: FC<IUserSettings> = ({ user }) => {

    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const when = DateTime.fromISO(user.createdAt.toString()).setLocale('fr').toLocaleString(DateTime.DATE_FULL)

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.container}>
            <Typography>Utilisateur depuis le {when}</Typography>
            <Button variant="contained" onClick={() => setModalOpen(true)} >Supprimer le compte</Button> 
            { modalOpen && 
                <Modal closeModal={closeModal}>
                    <DeleteProfile user={user} closeModal={closeModal}/> 
                </Modal>
            }
        </div>
    )
}
  
export default UserSettings
  