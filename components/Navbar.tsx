import { useRouter } from "next/router"
import { FC, useState, useEffect } from "react"
import styles from '../styles/components/Navbar.module.scss'
import Image from 'next/image'
import icon from '../public/images/logos/icon-left-font-monochrome-white.svg'
import FaSolidHome from './icons/FaSolidHome'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import api from '../api/axios'
import UserType from "../types/User"

const Navbar: FC = () => {

    const router = useRouter()

    const [ user , setUser ] = useState<UserType | null>(null)

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const fetchPosts = () => {
            api.get(`/users/${userId}`, {
                headers: {
                    "authorization": localStorage.getItem("token") ||""
                }
            })
            .then((response) => {
                setUser(response.data)
            })
            .catch((error:unknown) => {
                console.log(error)
            })
        }
        fetchPosts()
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        router.push("/login")
    }

    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <a className={styles.logo}>
                    <Image src={icon} width={150} height={50}></Image>
                </a>
            </Link>
            <div className={styles.actions}>
                <Link href="/">
                    <a>
                        <div className={styles.home}>
                            <FaSolidHome/>
                        </div>
                    </a>
                </Link>
                <Link href="/users/1">
                    <a>
                        <div className={styles.profile}>
                            <Avatar alt="John Doe" src="/images/users/man1.jpg" sx={{ width: 35, height: 35 }} />
                            <span className={styles.username}>{user && user.name}</span>
                        </div>
                    </a>
                </Link>
                <div className={styles.logout} onClick={handleLogout}>
                    <PowerSettingsNewIcon/>
                </div>
                
            </div>
            
        </nav>
    )
}

export default Navbar
  