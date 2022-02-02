import React, { FC } from 'react'
import styles from '../styles/components/EditComment.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import { useEffect, useRef, useState } from 'react'
import api from '../api/axios'
import IEditComment from '../interfaces/IEditComment'
import { useCurrentUser } from './context/context'

const EditComment: FC<IEditComment> = ({ comment, closeModal, updateSelf }) => {

    const textRef = useRef<HTMLInputElement>(null)
    const context = useCurrentUser()

    useEffect(() => {
        if (textRef && textRef.current && comment) {
            textRef.current.value = comment.text
        }
    }, [])

    const changeData = async (e:React.FormEvent) => {
        e.preventDefault()
        const commentId = comment.id
        const text = textRef?.current?.value || ""
        if (text !== "") {
            const newData = { text:text }
            try {
                const response = await api.patch(`/comments/${commentId}`, newData, {
                    headers: {
                        "authorization": localStorage.getItem("token") ||""
                    }
                })
                updateSelf(response.data)
                closeModal()
            } catch (error:unknown) {
                if (typeof error === "string") {
                    console.log(`Error: ${error}`)
                } else if (error instanceof Error) {
                    console.log(`Error: ${(error as Error).message}`)
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e:React.FormEvent) => changeData(e)}>
                <TextField
                    id="comment"
                    label="Commentaire"
                    placeholder="Votre commentaire"
                    variant="standard"
                    fullWidth
                    inputRef={textRef}
                />
                <div className={styles.actions}>
                    <Button variant="contained" type="submit" >Modifier</Button>
                    <Button variant="outlined" onClick={() => closeModal()}>Annuler</Button>
                </div>
            </form>         
        </div>
    )
}
  
export default EditComment
  