import Navbar from "./Navbar"
import Footer from "./Footer"
import { FC } from 'react'
import { useRouter } from "next/router"

const Layout:FC = ({ children }) => {
    const router = useRouter()
    const showHeader = router.pathname !== '/login' && router.pathname !== '/signup'
  return (
    <>
        { showHeader && <Navbar />}
        {children}
        { showHeader && <Footer />}
    </>
  )
}

export default Layout