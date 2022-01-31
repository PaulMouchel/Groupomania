import { FC } from 'react'
import styles from '../styles/components/UserActivities.module.scss'
import Post from './Post'
import UserActivitiesType from '../types/UserActivities'
import PostType from '../types/Post'

const UserActivities: FC<UserActivitiesType> = ({ user, currentUser }) => {

    const sortPostsByDate = (a:PostType, b:PostType) => {
        if (a.createdAt > b.createdAt)
            return -1
        if (a.createdAt < b.createdAt)
            return 1
        return 0
    }

    return (
        <div className={styles.container}>
            { user.posts.sort(sortPostsByDate).map((post, index) => 
                <Post key={index} {...post} user={user} userId={user.id} currentUser={currentUser}/>
            )}
        </div>
    )
}
  
export default UserActivities
  