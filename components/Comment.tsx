import { FC } from "react"
import styles from '../styles/components/Comment.module.scss'
import {DateTime} from "luxon"
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'

import CommentType from "../types/Comment"

const Comment: FC<CommentType> = ({ text }) => {

    const test = DateTime.local().setLocale('fr').minus({days:8}).toRelative()

    return (
        <div className={styles.container}>

            <Link href="/users/2">
                <a>
                    <Avatar alt="John Doe" src="/images/users/man1.jpg" />
                </a>
            </Link>
            <div className={styles.comment}>
                <div className={styles.infos}>
                    <Link href="/users/2">
                        <a>
                            <div className={styles.sender}>John Doe</div>
                        </a>
                    </Link>
                    <div className={styles.when}>{test}</div>
                </div>
                <p className={styles.text}>
                    { text }
                </p>
            </div>
         
            
        </div>
    )
}

export default Comment
  