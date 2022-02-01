import { FC, useState } from "react"
import styles from '../styles/components/Comment.module.scss'
import {DateTime} from "luxon"
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import StyledMenu from "./StyledMenu"
import EditIcon from '@mui/icons-material/Edit'
import CommentType from "../types/CommentType"
import IComment from '../interfaces/IComment'

import api from '../api/axios'

const Comment: FC<IComment> = ({ data, currentUser, deleteSelf }) => {

    const { id, user, createdAt, text } = data
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/comments/${id}`, {
                headers: {
                    "authorization": localStorage.getItem("token") || ""
                }
            })
            setAnchorEl(null)
            deleteSelf(id)
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
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
            { currentUser.id === user.id && 
                <>
                    <div onClick={handleClick} className={styles.more}>
                        <MoreVertIcon/>
                    </div>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem disableRipple>
                            <EditIcon />
                            Modifier (en construction)
                        </MenuItem>
                        <MenuItem onClick={handleDelete} disableRipple>
                            <DeleteIcon />
                            Supprimer
                        </MenuItem>
                    </StyledMenu>
                </>
            } 
        </div>
    )
}

export default Comment
  