import { FC } from 'react'
import styles from '../styles/components/EditProfileModal.module.scss'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import { useEffect, useRef } from 'react'
import api from '../api/axios'
import EditModalProfileType from '../types/EditProfileModal'

const EditProfileModal: FC<EditModalProfileType> = ({ user, closeModal }) => {

    const descriptionRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (descriptionRef && descriptionRef.current && nameRef && nameRef.current && user) {
            nameRef.current.value = user.name
            descriptionRef.current.value = user.description || ""
        }
    }, [])

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

                    <div className={styles.header}>
                        <div className={styles.userpic}>
                            <Avatar alt={user.name} src={user.imageUrl} sx={{ width: 250, height: 250 }} />
                        </div>

                        
                    </div>
                    

                    <form className={styles.form} onSubmit={(e:React.FormEvent) => changeData(e)}>
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
  