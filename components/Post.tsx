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
import api from '../api/axios'
import ReactionType from "../types/Reaction"

import PostType from "../types/Post"

const Post: FC<PostType> = ({ id, text, user, comments, reactions, createdAt, currentUser }) => {

    const quantityOfLikes = reactions.filter(reaction => reaction.type === 'like').length
    const quantityOfDislikes = reactions.filter(reaction => reaction.type === 'dislike').length
    const currentUserReaction = currentUser ? reactions.filter(reaction => reaction.userId === currentUser.id)[0]?.type : null

    console.log(currentUserReaction)

    const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()

    const reactToPost = async (reactionType:string) => {
        if (currentUser) {
            try {
                const response = await api.get(`/posts/${id}/reactions`, {
                    headers: {
                        "authorization": localStorage.getItem("token") ||""
                    }
                })
                const reactions:ReactionType[] = response.data
                const likes = reactions.filter(reaction => reaction.type === 'like')
                const dislikes = reactions.filter(reaction => reaction.type === 'dislike')
                console.log(likes)
            } catch (error) {
                
            }



            // const newPost = { userId:currentUser.id, text:text }
            // try {
            //     const response = await api.post('/posts', newPost, {
            //         headers: {
            //             "authorization": localStorage.getItem("token") ||""
            //         }
            //     })
            //     const allPosts = [...posts, response.data]
            //     setPosts(allPosts)
            //     setText("")
            // } catch (error:unknown) {
            //     if (typeof error === "string") {
            //         console.log(`Error: ${error}`)
            //     } else if (error instanceof Error) {
            //         console.log(`Error: ${(error as Error).message}`)
            //     }
            // }
        }
    }

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
                <div className={`${styles.like} ${currentUserReaction === 'like' && styles.active}`} onClick={() => reactToPost("like")}>
                    <ThumbUpIcon/>{ quantityOfLikes }
                </div>
                <div className={`${styles.dislike} ${currentUserReaction === 'dislike' && styles.active}`} onClick={() => reactToPost("dislike")}>
                    <ThumbDownIcon/>{ quantityOfDislikes }
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
  