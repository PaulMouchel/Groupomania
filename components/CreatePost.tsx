import { FC, useState, ChangeEvent } from "react"
import styles from '../styles/components/CreatePost.module.scss'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import api from '../api/posts'
import CreatePostType from "../types/CreatePost"

const CreatePost: FC<CreatePostType> = ({ posts, setPosts}) => {

    const [ text , setText ] = useState<string>("")

    const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        if (text !== "") {
            const newPost = { userId:1, text:text }
            try {
                const response = await api.post('/posts', newPost)
                const allPosts = [...posts, response.data]
                setPosts(allPosts)
                setText("")
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
        <form className={styles.container} onSubmit={(e:React.FormEvent) => handleSubmit(e)}>
            <div className={styles.text}>
                <Avatar alt="John Doe" src="/images/users/man1.jpg" sx={{ width: 56, height: 56 }}/>
                <TextField
                    id="standard-textarea"
                    label="Quelque chose à dire ?"
                    placeholder="Salut à tous !"
                    multiline
                    variant="standard"
                    fullWidth
                    onChange={handleTextChange}
                    value={text}
                />
            </div>
            <div className={styles.actions}>
                <Button variant="contained" type="submit" >Publier</Button>
            </div>
        </form>
    )
}

export default CreatePost
  