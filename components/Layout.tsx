import Navbar from "./Navbar"
import Footer from "./Footer"
import { FC } from 'react'
import { useRouter } from "next/router"
import styles from '../styles/components/Layout.module.scss'

const Layout:FC = ({ children }) => {
    const router = useRouter()
    const showHeader = router.pathname !== '/login' && router.pathname !== '/signup'

    return (
        <div className={styles.bg}>
            <div className={styles.content}>
                { showHeader && <Navbar />}
                {children}
                { showHeader && <Footer />}
            </div>
        </div>
    )
}

export default Layout