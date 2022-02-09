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
import api from '../api/axios'
import IPost from "../interfaces/IPost"
import PostType from "../types/PostType"
import CommentType from "../types/CommentType"
import WriteComment from "./WriteComment"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import StyledMenu from "./StyledMenu"
import Modal from './Modal'
import EditPost from "./EditPost"

const Post: FC<IPost> = ({ data, currentUser, deletePost, updatePost }) => {

    const { id, text, imageUrl, user, comments, reactions, createdAt } = data
    const quantityOfLikes = reactions.filter(reaction => reaction.type === 'like').length
    const quantityOfDislikes = reactions.filter(reaction => reaction.type === 'dislike').length
    const currentUserReaction = currentUser ? reactions.filter(reaction => reaction.userId === currentUser.id)[0]?.type : null
    const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const open = Boolean(anchorEl)

    const reactToPost = async (reactionType:string) => {
        if (currentUser) {
            const newReaction = { userId:currentUser.id, type:reactionType, postId:id }
            try {
                const response = await api.post(`/reactions`, newReaction, {
                    headers: {
                        "authorization": localStorage.getItem("token") || ""
                    }
                })
                const updatedPost:PostType = {...data}
                updatedPost.reactions = [...reactions, response.data]
                updatePost(updatedPost)
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
            const reactionId = reactions.filter(reaction => reaction.userId === currentUser.id)[0]?.id
            try {
                const response = await api.delete(`/reactions/${reactionId}`, {
                    headers: {
                        "authorization": localStorage.getItem("token") || ""
                    }
                })
                const allReactions = reactions.filter(reaction => reaction.userId !== currentUser.id)
                const updatedPost:PostType = {...data}
                updatedPost.reactions = [...allReactions]
                updatePost(updatedPost)
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
            const reactionId = reactions.filter(reaction => reaction.userId === currentUser.id)[0]?.id
            const newReaction = { type:reactionType }
            try {
                const response = await api.patch(`/reactions/${reactionId}`, newReaction, {
                    headers: {
                        "authorization": localStorage.getItem("token") || ""
                    }
                })
                let allReactions = [...reactions]
                const index = allReactions.findIndex(reaction => reaction.userId === currentUser.id)
                allReactions[index].type = reactionType
                const updatedPost:PostType = {...data}
                updatedPost.reactions = [...allReactions]
                updatePost(updatedPost)
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

    const deleteComment = (commentId: Number) => {
        const newComments = comments.filter(comment => comment.id !== commentId)
        const updatedPost:PostType = {...data}
        updatedPost.comments = [...newComments]
        updatePost(updatedPost)
    }

    const writeComment = (comment:CommentType) => {
        const newComments = [...comments, comment]
        const updatedPost:PostType = {...data}
        updatedPost.comments = [...newComments]
        updatePost(updatedPost)
    }

    const updateComment = (updatedComment:CommentType) => {
        const index:number = comments.findIndex(comment => comment.id === updatedComment.id)
        const newComments = [...comments]
        newComments[index] = updatedComment 
        const updatedPost:PostType = {...data}
        updatedPost.comments = [...newComments]
        updatePost(updatedPost)
    }

    const handleDotsMenuClose = () => {
        setAnchorEl(null)
    }

    const handleDotsMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/posts/${id}`, {
                headers: {
                    "authorization": localStorage.getItem("token") || ""
                }
            })
            setAnchorEl(null)
            deletePost(id)
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
            }
        }
    }

    const openModal = () => {
        setAnchorEl(null)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <article className={styles.container}>
            { modalOpen && 
                <Modal closeModal={closeModal}>
                    <EditPost post={data} closeModal={closeModal} updateSelf={updatePost}/>
                </Modal>
            }
            <div className={styles.header}>
                <div className={styles.main}>
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
                { currentUser && ( currentUser.id === user.id || currentUser.isAdmin ) && 
                    <>
                        <div onClick={handleDotsMenuClick} className={styles.more}>
                            <MoreVertIcon/>
                        </div>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleDotsMenuClose}
                        >
                            <MenuItem  onClick={openModal} disableRipple>
                                <EditIcon/>
                                Modifier
                            </MenuItem>
                            <MenuItem onClick={handleDelete} disableRipple>
                                <DeleteIcon />
                                Supprimer
                            </MenuItem>
                        </StyledMenu>
                    </>
                }
            </div>
            <div className={styles.text}>
                <Typography>
                    { text }
                </Typography>
            </div>
            { imageUrl && 
                <div className={styles.image}>
                    <Image src={imageUrl} layout="fill" objectFit="cover" /> 
                </div>
            }
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
                            { currentUser && comments.map((comment, index) => 
                                <Comment key={index} data={comment} currentUser={currentUser} deleteSelf={deleteComment} updateSelf={updateComment}/>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion> : <></>
            }
            { currentUser &&
                <WriteComment postId={id} writeComment={writeComment} currentUser={currentUser}/>
            }
        </article>
    )
}

export default Post
  