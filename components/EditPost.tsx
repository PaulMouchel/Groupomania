import React, { FC } from 'react'
import styles from '../styles/components/EditPost.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import { useState, ChangeEvent } from 'react'
import api from '../api/axios'
import IEditPost from '../interfaces/IEditPost'
import { useCurrentUser } from './context/context'
import Image from 'next/image'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import IconButton from '@mui/material/IconButton'

const EditPost: FC<IEditPost> = ({ post, closeModal, updateSelf }) => {

    const [ text , setText ] = useState<string>(post.text)
    const [ file, setFile ] = useState<File>()
    const [ imageUrl, setImageUrl ] = useState<string>(post.imageUrl || "")
    const context = useCurrentUser()
    
    const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const changeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const selectedFile = files[0]
            const url = URL.createObjectURL(selectedFile);
            setImageUrl(url)
            setFile(selectedFile)
        } else {
            setImageUrl("")
        }
    }

    const changeData = async (e:React.FormEvent) => {
        e.preventDefault()
        if (text !== "") {
            const postId = post.id
            const newPost = new FormData()
            newPost.append("text", text)
            file && newPost.append("image", file)
            try {
                const response = await api.patch(`/posts/${postId}`, newPost, {
                    headers: {
                        "authorization": localStorage.getItem("token") ||""
                    }
                })
                updateSelf(response.data)
                closeModal()
            } catch (error:unknown) {
                if (typeof error === "string") {
                    console.log(`Error: ${error}`)
                } else if (error instanceof Error) {
                    console.log(`Error: ${(error as Error).message}`)
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e:React.FormEvent) => changeData(e)}>

                <div className={styles.text}>
                    <Avatar alt="John Doe" src={context && context.currentUser ? context.currentUser.imageUrl : ""} sx={{ width: 56, height: 56 }}/>
                    <TextField
                        id="create-post"
                        label="Quelque chose à dire ?"
                        placeholder="Salut à tous !"
                        multiline
                        variant="standard"
                        fullWidth
                        onChange={handleTextChange}
                        value={text}
                    />
                </div>
                { imageUrl && 
                    <div className={styles.image}>
                        <Image src={imageUrl} layout="fill" objectFit="cover" /> 
                    </div>
                }
                <div className={styles.actions}>
                    <label htmlFor="edit-post-file">
                        <input className={styles['upload-button']} accept="image/*" id="edit-post-file" type="file" onChange={changeImage}/>
                        <IconButton color="primary" aria-label="upload picture" component="span" >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Button variant="contained" type="submit" >Modifier</Button>
                    <Button variant="outlined" onClick={() => closeModal()}>Annuler</Button>
                </div>
            </form>         
        </div>
    )
}
  
export default EditPost
  