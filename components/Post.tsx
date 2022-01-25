import { FC } from "react"
import styles from '../styles/components/Post.module.scss'
import Image from 'next/image'
import man from '../public/images/users/man1.jpg'

const Post: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image className={styles['sender-pic']}src={man} height={35} width={35}/>
                <span className={styles.sender}>John Doe</span>
            </div>
            <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={styles.pics}>
                
            </div>
        </div>
    )
}

export default Post
  