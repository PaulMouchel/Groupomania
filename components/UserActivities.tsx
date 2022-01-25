import { FC } from 'react'
import styles from '../styles/components/UserActivities.module.scss'
import Post from './Post'

const UserActivities: FC = () => {

    return (
        <div className={styles.container}>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}
  
export default UserActivities
  