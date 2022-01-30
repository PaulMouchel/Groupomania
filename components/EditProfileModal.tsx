import { FC } from 'react'
import styles from '../styles/components/EditProfileModal.module.scss'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import { useState, useEffect, useRef } from 'react'
import api from '../api/axios'
import EditModalProfileType from '../types/EditProfileModal'

const EditProfileModal: FC<EditModalProfileType> = ({ user, closeModal }) => {

    const descriptionRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (descriptionRef && descriptionRef.current) {
            descriptionRef.current.value = user.description
        }
    }, [])

    const changeDescription = async (e:React.FormEvent) => {
        e.preventDefault()
        // if (currentUser) {
            const userId = user.id
            const description = descriptionRef?.current?.value
            if (description !== "") {
                console.log(description)
                const userUpdate = { description:description }
                try {
                    const response = await api.patch(`/users/${userId}`, userUpdate, {
                        headers: {
                            "authorization": localStorage.getItem("token") ||""
                        }
                    })
                    localStorage.setItem("user", JSON.stringify(response.data))
                } catch (error:unknown) {
                    if (typeof error === "string") {
                        console.log(`Error: ${error}`)
                    } else if (error instanceof Error) {
                        console.log(`Error: ${(error as Error).message}`)
                    }
                }
            }
        // }
    }

    return (
        <div className={styles.view}>
            <ClickAwayListener onClickAway={closeModal}>
                <div className={styles.container}>

                    <div className={styles.header}>
                        <div className={styles.userpic}>
                            <Avatar alt={user ? user.name : "user pic"} src={user ? user.imageUrl : ""} sx={{ width: 250, height: 250 }} />
                        </div>
                        <span className={styles.username}>{user && user.name}</span>
                    </div>
                    
                    <div className={styles.description}>

                        <form onSubmit={(e:React.FormEvent) => changeDescription(e)}>
                            <TextField
                                id="description"
                                label="Description"
                                placeholder="Un mot sur vous ?"
                                multiline
                                variant="standard"
                                fullWidth
                                inputRef={descriptionRef}
                            />
                            <div className={styles.actions}>
                                <Button variant="contained" type="submit" >Modifier</Button>
                                <Button variant="outlined">Annuler</Button>
                            </div>
                        </form>

                    </div>

                    
                </div>
            </ClickAwayListener>
        </div>
    )
}
  
export default EditProfileModal
  