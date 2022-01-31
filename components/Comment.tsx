import { FC } from "react"
import styles from '../styles/components/Comment.module.scss'
import {DateTime} from "luxon"
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'

import CommentType from "../types/Comment"

const Comment: FC<CommentType> = ({ user, createdAt, text }) => {

    const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()

    return (
        <div className={styles.container}>

            <Link href={`/users/${user.id}`}>
                <a>
                    <Avatar alt={user.name} src={user.imageUrl} />
                </a>
            </Link>
            <div className={styles.comment}>
                <div className={styles.infos}>
                    <Link href={`/users/${user.id}`}>
                        <a>
                            <div className={styles.sender}>{user.name}</div>
                        </a>
                    </Link>
                    <div className={styles.when}>{when}</div>
                </div>
                <p className={styles.text}>
                    { text }
                </p>
            </div>
         
            
        </div>
    )
}

export default Comment
  