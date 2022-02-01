import React, { FC } from 'react'
import styles from '../styles/components/EditProfileModal.module.scss'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import { useEffect, useRef, useState } from 'react'
import api from '../api/axios'
import EditModalProfileType from '../interfaces/IEditProfileModal'
import { useCurrentUser } from './context/context'

const EditProfileModal: FC<EditModalProfileType> = ({ user, closeModal }) => {

    const descriptionRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const [ imageUrl, setImageUrl ] = useState<string>(user.imageUrl || "")
    const context = useCurrentUser()

    useEffect(() => {
        if (descriptionRef && descriptionRef.current && nameRef && nameRef.current && user) {
            nameRef.current.value = user.name
            descriptionRef.current.value = user.description || ""
        }
    }, [])

    
    const changeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const selectedFile = files[0]
            const url = URL.createObjectURL(selectedFile);
            setImageUrl(url)
        } else {
            setImageUrl("")
        }
        
    }

    const changeData = async (e:React.FormEvent) => {
        e.preventDefault()

        const userId = user.id
        const description = descriptionRef?.current?.value
        const name = nameRef?.current?.value

        const userUpdate = { description:description, name:name }
        try {
            const response = await api.patch(`/users/${userId}`, userUpdate, {
                headers: {
                    "authorization": localStorage.getItem("token") ||""
                }
            })
            localStorage.setItem("user", JSON.stringify(response.data))
            context?.setCurrentUser(response.data)
            closeModal()
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
            }
        }
    }

    return (
        <div className={styles.view}>
            <ClickAwayListener onClickAway={() => closeModal()}>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={(e:React.FormEvent) => changeData(e)}>
                        <div className={styles.image}>
                            <label className={styles.label}>
                                <input className={styles['image-input']} type="file" accept="image/png, image/jpeg" multiple={false} onChange={changeImage} />
                                <Avatar alt={user.name} src={imageUrl} sx={{ width: 250, height: 250 }} />
                            </label>
                        </div>
                        <TextField
                            id="name"
                            label="Nom"
                            placeholder="Votre nom"
                            variant="standard"
                            fullWidth
                            inputRef={nameRef}
                        />
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
                            <Button variant="outlined" onClick={() => closeModal()}>Annuler</Button>
                        </div>
                    </form>         
                </div>
            </ClickAwayListener>
        </div>
    )
}
  
export default EditProfileModal
  