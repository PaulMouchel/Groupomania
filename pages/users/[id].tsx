import { NextPage } from "next"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { useCurrentUser } from "../../components/context/context"
import api from '../../api/axios'
import styles from '../../styles/pages/User.module.scss'
import UserActivities from "../../components/UserActivities"
import UserSettings from "../../components/UserSettings"
import Modal from '../../components/Modal'
import EditProfile from "../../components/EditProfile"
import UserType from "../../types/UserType"
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import SnackMessage from "../../components/SnackMessage"

const User: NextPage = () => {
    const router = useRouter()
    const { query, isReady } = router
    const { id } = query
    const userId = Number(id)
    const [ tab, setTab ] = useState<Number>(0)
    const [ user , setUser ] = useState<UserType | null>(null)
    const context = useCurrentUser()
    const [ isCurrentUser, setIsCurrentUser ] = useState<boolean>(false)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const [ snackMessage, setSnackMessage ] = useState<string>('')
    const [ snackSeverity, setSnackSeverity ] = useState<"error" | "warning" | "info" | "success">("success")

    useEffect(() => {
        if(!isReady || modalOpen) {
            return
        }
        const fetchUser = () => {
            api.get(`/users/${userId}`, {
                headers: {
                    "authorization": localStorage.getItem("token") || ""
                }
            })
            .then((response) => {
                setUser(response.data)
                if (descriptionRef && descriptionRef.current) {
                    descriptionRef.current.value = response.data.description
                }
                
            })
            .catch((error:unknown) => {
                console.log(error)
                router.push("/login")
            })
        }
        fetchUser()
    }, [router, modalOpen])

    useEffect(() => {
        if (user && context?.currentUser) {
            setIsCurrentUser(user.id === context?.currentUser.id)
        } else {
            setIsCurrentUser(false)
        }
    }, [user, context])

    const closeModal = () => {
        setModalOpen(false)
    }

    const sendSnack = (message:string, severity:"error" | "warning" | "info" | "success") => {
        setSnackSeverity(severity)
        setSnackMessage(message)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Groupomania</title>
                <meta name="description" content="Groupomania propose à ces employés ce réseau social qui leur permet de faciliter les échanges et de partager les bons moments au sein de l'entreprise. Par cette démarche, Groupomania souhaite donner à ses employés un outil qu'ils aiment utiliser au quotidien et qui leur donne envie de poursuivre l'aventure Groupomania chaque jour" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            { isCurrentUser && context?.currentUser && modalOpen && 
                <Modal closeModal={closeModal}>
                    <EditProfile user={context?.currentUser} closeModal={closeModal} sendSnack={sendSnack}/> 
                </Modal>
            }
            <main className={styles.main}>
                <div className={styles.main__content}>
                    <div className={styles.header}>
                        { user && user.isAdmin && <Chip className={styles.admin} label="Admin" color="primary" /> }
                        <div className={styles.userpic}>
                            <Avatar alt={user ? user.name : "user pic"} src={user ? user.imageUrl : ""} sx={{ width: 250, height: 250 }} />
                        </div>
                        <span className={styles.username}>{user && user.name}</span>
                    </div>
                    { user && 
                        <>
                            <div className={styles.description}>
                                <Typography>{user.description}</Typography> 
                            </div>
                            { isCurrentUser && 
                                <div className={styles.change}>
                                    <Button variant="contained" onClick={() => setModalOpen(true)} >Modifier les informations</Button> 
                                </div>
                            }
                            <div className={styles.tabs}>
                                <div className={`${styles.tab} ${tab === 0 && styles.active}`} onClick={() => setTab(0)}>Activité</div>
                                { context?.currentUser && ( context.currentUser.id === user.id || context.currentUser.isAdmin )  && <div className={`${styles.tab} ${tab === 1 && styles.active}`} onClick={() => setTab(1)}>Paramètres</div> }
                            </div>
                    
                            <div className={styles['tab-content']}>
                                { context?.currentUser && tab === 0 && <UserActivities user={user} setUser={setUser} currentUser={context?.currentUser} sendSnack={sendSnack}/> }
                                { tab === 1 && <UserSettings user={user}/> }
                            </div>
                        </>
                    }
                </div>
            </main>
            <SnackMessage message={snackMessage} setMessage={setSnackMessage} severity={snackSeverity}/>
        </div>
    )
}
  
export default User
  