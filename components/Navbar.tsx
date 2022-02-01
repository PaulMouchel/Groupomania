import { useRouter } from "next/router"
import { FC, useState, useEffect } from "react"
import styles from '../styles/components/Navbar.module.scss'
import Image from 'next/image'
import icon from '../public/images/logos/icon-left-font-monochrome-white.svg'
import FaSolidHome from './icons/FaSolidHome'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { useCurrentUser } from './context/context'


const Navbar: FC = () => {

    const router = useRouter()
    const context = useCurrentUser()

    useEffect(() => {
        const currentUserStr = localStorage.getItem("user")
        if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr)
            context?.setCurrentUser(currentUser)
        } else {
            router.push("/login")
        } 
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        context?.setCurrentUser(null)
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
                { context && context.currentUser && 
                    <Link href={`/users/${context.currentUser.id}`}>
                        <a>
                            <div className={styles.profile}>
                                <Avatar alt={context.currentUser.name} src={context.currentUser.imageUrl} sx={{ width: 35, height: 35 }} />
                                <span className={styles.username}>{context.currentUser && context.currentUser.name}</span>
                            </div>
                        </a>
                    </Link>
                }
                <div className={styles.logout} onClick={handleLogout}>
                    <PowerSettingsNewIcon/>
                </div>
                
            </div>
            
        </nav>
    )
}

export default Navbar
  