import { FC } from "react"
import styles from '../styles/components/Post.module.scss'
import Image from 'next/image'
import {DateTime} from "luxon"
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import Comment from "./Comment"
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import TextField from '@mui/material/TextField'

import PostType from "../types/Post"

const Post: FC<PostType> = ({ text, user, comments, createdAt, currentUser }) => {

    const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href={`/users/${user.id}`}>
                    <a>
                        <Avatar alt={ user.name } src={ user.imageUrl} />
                    </a>
                </Link>
                <div>
                    <Link href={`/users/${user.id}`}>
                        <a>
                            <div className={styles.sender}>{ user.name }</div>
                        </a>
                    </Link>
                    <div className={styles.when}>{when}</div>
                </div>
            </div>
            <div className={styles.text}>
                <Typography>
                    { text }
                </Typography>
            </div>
            <div className={styles.pics}>
                
            </div>
            <div className={styles.stats}>
                <div className={styles.likers}></div>
            </div>
            <div className={styles.action}>
                <div className={styles.like}>
                    <ThumbUpIcon/>
                </div>
                <div className={styles.dislike}>
                    <ThumbDownIcon/>
                </div>
            </div>
            { comments.length ? 
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>{ comments.length } commentaire{comments.length > 1 && "s"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.comments}>
                            { comments.map((comment, index) => 
                                <Comment key={index} {...comment}/>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion> : <></>
            }
            { currentUser &&
                <div className={styles.add_comment}>
                    <Avatar alt={ currentUser.name } src={ currentUser.imageUrl }/>
                    <TextField
                        id="standard-textarea"
                        label="Commenter"
                        placeholder="Mon commentaire"
                        multiline
                        variant="standard"
                        fullWidth
                    />
                </div>
            }
        </div>
    )
}

export default Post
  