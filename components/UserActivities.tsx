import { FC } from 'react'
import styles from '../styles/components/UserActivities.module.scss'
import Post from './Post'
import IUserActivities from '../interfaces/IUserActivities'
import PostType from '../types/PostType'
import UserType from '../types/UserType'
import { Typography } from '@mui/material'

const UserActivities: FC<IUserActivities> = ({ user, currentUser, setUser, sendSnack }) => {

    const sortPostsByDate = (a:PostType, b:PostType) => {
        if (a.createdAt > b.createdAt)
            return -1
        if (a.createdAt < b.createdAt)
            return 1
        return 0
    }

    const deletePost = (postId: Number) => {
        const newPosts:PostType[] = user.posts.filter(post => post.id !== postId)
        const newUser:UserType = user
        newUser.posts = [...newPosts]
        setUser({...newUser})
    }

    const updatePost = (post:PostType) => {
        const newPosts:PostType[] = [...user.posts]
        const index:number = newPosts.findIndex(existingPost => existingPost.id === post.id)
        newPosts[index] = post
        const newUser:UserType = user
        newUser.posts = [...newPosts]
        setUser({...newUser})
    }

    return (
        <div className={styles.container}>
            { user.posts.length ? 
                user.posts.sort(sortPostsByDate).map((post, index) => 
                    <Post key={index} data={post} currentUser={currentUser} deletePost={deletePost} updatePost={updatePost} sendSnack={sendSnack}/>
                ) : <Typography>Aucune activité pour le moment</Typography>}
        </div>
    )
}
  
export default UserActivities
  