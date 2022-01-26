import { FC } from "react"
import styles from '../styles/components/Post.module.scss'
import Image from 'next/image'
import {DateTime} from "luxon"
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import Comment from "./Comment"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

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
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </p>
            <div className={styles.pics}>
                
            </div>
            <div className={styles.stats}>
                <div className={styles.likers}></div>
            </div>
            <div className={styles.action}>
                <div className={styles.like}>
                    <ThumbUpIcon/>
                </div>
                <div className={styles.comment}>
                    <CommentIcon/>
                </div>
            </div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>3 commentaires</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.comments}>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                    </div>
                </AccordionDetails>
            </Accordion>
      
      
            
        </div>
    )
}

export default Post
  