import React, { FC, useEffect, useRef, useState } from 'react'
import styles from '../styles/components/EditProfile.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import api from '../api/axios'
import IEditProfile from '../interfaces/IEditProfile'
import { useCurrentUser } from './context/context'

const EditProfile: FC<IEditProfile> = ({ user, closeModal, sendSnack }) => {

    const descriptionRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
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
        const description = descriptionRef?.current?.value || ""
        const name = nameRef?.current?.value || ""
        const files = fileRef?.current?.files || ""
        const file = files && files[0]
        const post = new FormData()
        post.append("name", name)
        post.append("description", description)
        post.append("image", file)
        
        try {
            const response = await api.patch(`/users/${userId}`, post, {
                headers: {
                    "authorization": localStorage.getItem("token") ||""
                }
            })
            localStorage.setItem("user", JSON.stringify(response.data))
            context?.setCurrentUser(response.data)
            sendSnack("Informations modifiées avec succès", "success")
            closeModal()
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
                sendSnack(`Error: ${error}`, "error")
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
                sendSnack(`Error: ${(error as Error).message}`, "error")
            }
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e:React.FormEvent) => changeData(e)}>
                <div className={styles.image}>
                    <label className={styles.label}>
                        <input className={styles['image-input']} type="file" accept="image/png, image/jpeg" multiple={false} onChange={changeImage} ref={fileRef} />
                        <Image alt={user.name} src={imageUrl} layout='fill' objectFit='cover'/>
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
    )
}
  
export default EditProfile
  