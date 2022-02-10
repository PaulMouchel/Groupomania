import { FC, useState } from 'react'
import styles from '../styles/components/UserSettings.module.scss'
import Button from '@mui/material/Button'
import Modal from './Modal'
import DeleteProfile from './DeleteProfile'
import IUserSettings from '../interfaces/IUserSettings'

const UserSettings: FC<IUserSettings> = ({ user }) => {

    const [ modalOpen, setModalOpen ] = useState<boolean>(false)

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.container}>
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
  