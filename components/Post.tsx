import { FC, useState } from "react"
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
import WriteComment from "./WriteComment"

const Post: FC<PostType> = ({ id, text, user, comments, reactions, createdAt, currentUser }) => {

    const [ postReactions, setPostReactions ] = useState<ReactionType[]>(reactions)
    const quantityOfLikes = postReactions.filter(reaction => reaction.type === 'like').length
    const quantityOfDislikes = postReactions.filter(reaction => reaction.type === 'dislike').length
    const currentUserReaction = currentUser ? postReactions.filter(reaction => reaction.userId === currentUser.id)[0]?.type : null
    const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()

    const reactToPost = async (reactionType:string) => {
        if (currentUser) {
            const newReaction = { userId:currentUser.id, type:reactionType, postId:id }
            try {
                const response = await api.post(`/reactions`, newReaction, {
                    headers: {
                        "authorization": localStorage.getItem("token") || ""
                    }
                })
                const allReactions = [...postReactions, response.data]
                setPostReactions(allReactions)
            } catch (error:unknown) {
                if (typeof error === "string") {
                    console.log(`Error: ${error}`)
                } else if (error instanceof Error) {
                    console.log(`Error: ${(error as Error).message}`)
                }
            }
        }
    }

    const cancelReaction = async () => {
        if (currentUser) {
            const reactionId = postReactions.filter(reaction => reaction.userId === currentUser.id)[0]?.id
            try {
                const response = await api.delete(`/reactions/${reactionId}`, {
                    headers: {
                        "authorization": localStorage.getItem("token") || ""
                    }
                })
                const allReactions = postReactions.filter(reaction => reaction.userId !== currentUser.id)
                setPostReactions(allReactions)
            } catch (error:unknown) {
                if (typeof error === "string") {
                    console.log(`Error: ${error}`)
                } else if (error instanceof Error) {
                    console.log(`Error: ${(error as Error).message}`)
                }
            }
        }
    }

    const changeReaction = async (reactionType:string) => {
        if (currentUser) {
            const reactionId = postReactions.filter(reaction => reaction.userId === currentUser.id)[0]?.id
            const newReaction = { type:reactionType }
            try {
                const response = await api.patch(`/reactions/${reactionId}`, newReaction, {
                    headers: {
                        "authorization": localStorage.getItem("token") || ""
                    }
                })
                let allReactions = [...postReactions]
                const index = allReactions.findIndex(reaction => reaction.userId === currentUser.id)
                allReactions[index].type = reactionType
                setPostReactions(allReactions)
            } catch (error:unknown) {
                if (typeof error === "string") {
                    console.log(`Error: ${error}`)
                } else if (error instanceof Error) {
                    console.log(`Error: ${(error as Error).message}`)
                }
            }
        }
    }

    const handleReact = (reactionType:string) => {
        if (currentUser) {

            if (!currentUserReaction) {
                reactToPost(reactionType)
            } else if (currentUserReaction === reactionType) {
                cancelReaction()
            } else {
                changeReaction(reactionType)
            }
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
                <div className={`${styles.reaction} ${currentUserReaction === 'like' && styles.active}`} onClick={() => handleReact("like")}>
                    <ThumbUpIcon/>{ quantityOfLikes > 0 && <span className={styles.quantity}>{ quantityOfLikes }</span>}
                </div>
                <div className={`${styles.reaction} ${currentUserReaction === 'dislike' && styles.active}`} onClick={() => handleReact("dislike")}>
                    <ThumbDownIcon/>{ quantityOfDislikes > 0 && <span className={styles.quantity}>{ quantityOfDislikes }</span>}
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
                <WriteComment postId={id} comments={comments} currentUser={currentUser}/>
            }
        </div>
    )
}

export default Post
  