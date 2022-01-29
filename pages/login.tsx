import { NextPage } from "next"
import { useRouter } from 'next/router'
import { useRef, useState, useEffect } from "react"
import styles from '../styles/pages/login.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Image from 'next/image'
import bg from '../public/images/login-bg.jpg'
import icon from '../public/images/logos/icon-left-font-monochrome-black.svg'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import api from '../api/axios'

const Login: NextPage = () => {

    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [ emailError, setEmailError ] = useState<boolean>(false)
    const [ emailHelper, setEmailHelper ] = useState<string>("")
    const [ error, setError ] = useState<string>("")

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(""), 5000)
        }
    }, [error])

    const isValidEmail = (value:string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    const controlEmail = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const email = e.currentTarget.value
        if (isValidEmail(email) || email === "") {
            setEmailError(false)
            setEmailHelper("")
        } else {
            setEmailError(true)
            setEmailHelper("Format d'adresse email non valide")
        }
    }

    const handleSubmit = (e:React.FormEvent) => {
        setError("")
        e.preventDefault()
        const email = emailRef?.current?.value || ""
        const password = passwordRef?.current?.value || ""
        if (isValidEmail(email)) {
            logUser(email, password)
        }
    }

    const logUser = async (email:string, password:string) => {
        const user = { email, password }
        try {
            const response = await api.post('/auth/login', user)
            if (!response.data.error) {
                localStorage.setItem("token", `Bearer ${response.data.token}`);
                router.push("/")
            } else {
                console.log(response.data.error)
                setError(response.data.message)
            }
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
                setError(error)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
                setError(error.message)
            }
        }
    }

    return (
        <main className={styles.main}>
            <Image src={bg} layout="fill" objectFit="cover"></Image>
            <a className={styles.credentials} href="https://www.pexels.com/fr-fr/photo/photo-de-personnes-faisant-des-coups-de-poing-3184430/">Photo de fauxels provenant de Pexels</a>
            <section className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.logo}>
                        <Image  src={icon} width={300} height={80} />
                    </div>
                    <h2>Se connecter</h2>
                    <TextField id="email" type="email" label="Email" variant="outlined" inputRef={emailRef} onChange={controlEmail} error={emailError} helperText={emailHelper}/>
                    <TextField id="password" type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef}/>
                    <Button variant="contained" size="large" type="submit">Connexion</Button>
                    { error ? <Alert severity="error">La connexion a échoué</Alert> : <div className={styles.space} /> }
                </form>
                <Typography>
                    Pas encore de compte ? <Link href='/signup'><a>Inscrivez-vous !</a></Link>
                </Typography>
            </section>
        </main>
    )
}

export default Login
  