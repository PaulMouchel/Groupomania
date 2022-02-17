import React, { FC } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/components/DeleteProfile.module.scss'
import Button from '@mui/material/Button'
import api from '../api/axios'
import IDeleteProfile from '../interfaces/IDeleteProfile'
import { useCurrentUser } from './context/context'
import Typography from '@mui/material/Typography'

const DeleteProfile: FC<IDeleteProfile> = ({ user, closeModal }) => {
    const router = useRouter()
    const context = useCurrentUser()

    const deleteAccount = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.delete(`/users/${user.id}`, {
                headers: {
                    "authorization": localStorage.getItem("token") ||""
                }
            })
            if ( context?.currentUser?.id === user.id) {
                localStorage.setItem("user", "")
                context?.setCurrentUser(null)
                router.push("/login")
            } else {
                router.push("/")
            }
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
            }
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e:React.FormEvent) => deleteAccount(e)}>
                <Typography>Êtes-vous vraiment sur de vouloir supprimer ce compte ?</Typography> 
                <div className={styles.actions}>
                    <Button variant="contained" type="submit">Confirmer</Button>
                    <Button variant="outlined" onClick={() => closeModal()}>Annuler</Button>
                </div>
            </form>         
        </div>
    )
}
  
export default DeleteProfile
  