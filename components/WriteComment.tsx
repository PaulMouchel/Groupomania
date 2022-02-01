import { FC, useState, ChangeEvent } from "react"
import styles from '../styles/components/WriteComment.module.scss'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import api from '../api/axios'
import IWriteComment from "../interfaces/IWriteComment"

const WriteComment: FC<IWriteComment> = ({ postId, writeComment, currentUser }) => {

    const [ text , setText ] = useState<string>("")

    const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        if (text !== "") {
            const newComment = { userId:currentUser.id, postId:postId, text:text }
            try {
                const response = await api.post('/comments', newComment, {
                    headers: {
                        "authorization": localStorage.getItem("token") ||""
                    }
                })
                writeComment(response.data)
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
            <div className={styles.add_comment}>
                <Avatar alt={ currentUser.name } src={ currentUser.imageUrl }/>
                <TextField
                    id="standard-textarea"
                    label="Commenter"
                    placeholder="Mon commentaire"
                    multiline
                    variant="standard"
                    fullWidth
                    onChange={handleTextChange}
                    value = {text}
                />
            </div>
            <div className={styles.actions}>
                <Button variant="contained" type="submit" >Publier</Button>
            </div>
        </form>
    )
}

export default WriteComment
  