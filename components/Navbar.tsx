import { FC } from "react"
import styles from '../styles/components/Navbar.module.scss'
import Image from 'next/image'
import icon from '../public/images/logos/icon-left-font-monochrome-white.svg'
import FaSolidHome from './icons/FaSolidHome'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <Image src={icon} width={150} height={50}></Image>
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
                            <span className={styles.username}>Paul Mouchel</span>
                        </div>
                    </a>
                </Link>
                <div className={styles.logout}>
                    <PowerSettingsNewIcon/>
                </div>
                
            </div>
            
        </nav>
    )
}

export default Navbar
  