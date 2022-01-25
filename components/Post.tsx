import { FC } from "react"
import styles from '../styles/components/Post.module.scss'
import Image from 'next/image'
import {DateTime} from "luxon"
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import IcRoundThumbUp from "./icons/IcRoundThumbUp"
import IcBaselineComment from "./icons/IcBaselineComment"

const Post: FC = () => {

    const test = DateTime.local().setLocale('fr').minus({days:8}).toRelative()

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/users/2">
                    <a>
                        <Avatar alt="John Doe" src="/images/users/man1.jpg" />
                    </a>
                </Link>
                <div>
                    <Link href="/users/2">
                        <a>
                            <div className={styles.sender}>John Doe</div>
                        </a>
                    </Link>
                    <div className={styles.when}>{test}</div>
                </div>
            </div>
            <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={styles.pics}>
                
            </div>
            <div className={styles.stats}>
                <div className={styles.likers}></div>
                <div className={styles.commenters}>commentaires</div>
            </div>
            <div className={styles.action}>
                <div className={styles.like}>
                    <IcRoundThumbUp/>
                </div>
                <div className={styles.comment}>
                    <IcBaselineComment/>
                </div>
            </div>
        </div>
    )
}

export default Post
  