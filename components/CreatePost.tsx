import { FC, useState, ChangeEvent } from "react"
import styles from '../styles/components/CreatePost.module.scss'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import api from '../api/axios'
import ICreatePost from "../interfaces/ICreatePost"
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import IconButton from '@mui/material/IconButton'

const CreatePost: FC<ICreatePost> = ({ posts, setPosts, currentUser, sendSnack }) => {

    const [ text , setText ] = useState<string>("")
    const [ file, setFile ] = useState<File>()
    const [ imageUrl, setImageUrl ] = useState<string>("")

    const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const changeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = Array.from(e.target.files!)
            const selectedFile = files[0]
            const url = URL.createObjectURL(selectedFile);
            setImageUrl(url)
            setFile(selectedFile)
        } catch (error) {
            setImageUrl("")
        }
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        if (currentUser && text !== "") {
            const userId = currentUser.id
            const newPost = new FormData()
            newPost.append("userId", userId.toString())
            newPost.append("text", text)
            if (file) {
                newPost.append("image", file)
            }
            try {
                const response = await api.post('/posts', newPost, {
                    headers: {
                        "authorization": localStorage.getItem("token") ||""
                    }
                })
                const allPosts = [...posts, response.data]
                setPosts(allPosts)
                setText("")
                setFile(undefined)
                setImageUrl("")
                sendSnack("Le post a ??t?? publi?? avec succ??s", "success")
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
    }

    return (
        <form className={styles.container} onSubmit={(e:React.FormEvent) => handleSubmit(e)}>
            <div className={styles.text}>
                <Avatar alt={currentUser?.name} src={currentUser ? currentUser.imageUrl : ""} sx={{ width: 56, height: 56 }}/>
                <TextField
                    id="create-post"
                    label="Quelque chose ?? dire ?"
                    placeholder="Salut ?? tous !"
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
                <label htmlFor="icon-button-file">
                    <input className={styles['upload-button']} accept="image/*" id="icon-button-file" type="file" onChange={changeImage}/>
                    <IconButton color="primary" aria-label="upload picture" component="span" >
                        <PhotoCamera />
                    </IconButton>
                </label>
                <Button variant="contained" type="submit" >Publier</Button>
            </div>
        </form>
    )
}

export default CreatePost
  