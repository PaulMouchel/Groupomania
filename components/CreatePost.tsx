import { FC } from "react"
import styles from '../styles/components/CreatePost.module.scss'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'

const CreatePost: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <Avatar alt="John Doe" src="/images/users/man1.jpg" sx={{ width: 56, height: 56 }}/>
                <TextField
                    id="standard-textarea"
                    label="Quelque chose à dire ?"
                    placeholder="Salut à tous !"
                    multiline
                    variant="standard"
                    fullWidth
                />
            </div>
            <div className={styles.actions}>
                
            </div>
        </div>
    )
}

export default CreatePost
  