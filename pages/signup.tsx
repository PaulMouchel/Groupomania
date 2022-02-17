import { NextPage } from "next"
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import styles from '../styles/pages/signup.module.scss'
import bg from '../public/images/signup-bg.jpg'
import icon from '../public/images/logos/icon-left-font-monochrome-black.svg'


import api from '../api/axios'
import { useCurrentUser } from '../components/context/context'

const Signup: NextPage = () => {

    const router = useRouter()
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmationRef = useRef<HTMLInputElement>(null)
    const [ nameError, setNameError ] = useState<boolean>(false)
    const [ emailError, setEmailError ] = useState<boolean>(false)
    const [ passwordError, setPasswordError ] = useState<boolean>(false)
    const [ passwordConfirmationError, setPasswordConfirmationError ] = useState<boolean>(false)
    const [ nameHelper, setNameHelper ] = useState<string>("")
    const [ emailHelper, setEmailHelper ] = useState<string>("")
    const [ passwordHelper, setPasswordHelper ] = useState<string>("")
    const [ passwordConfirmationHelper, setPasswordConfirmationHelper ] = useState<string>("")
    const [ error, setError ] = useState<string>("")
    const context = useCurrentUser()

    const isValidName = (value:string) => {
        return value.length >= 3 && value.length < 100
    }

    const isValidEmail = (value:string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    const isValidPassword = (value:string) => {
        return value.length >= 8
    }

    const controlName = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.value
        if (isValidName(name) || name === "") {
            setNameError(false)
            setNameHelper("")
        } else {
            setNameError(true)
            setNameHelper("La longueur du nom doit être comprise entre 3 et 99 caractères")
        }
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

    const controlPassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const password = e.currentTarget.value
        if (isValidPassword(password) || password === "") {
            setPasswordError(false)
            setPasswordHelper("")
        } else {
            setPasswordError(true)
            setPasswordHelper("Le mot de passe doit contenir au moins 8 caratères")
        }
    }

    const controlPasswordConfirmation = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const password = passwordRef?.current?.value
        const passwordConfirmation = e.currentTarget.value
        if (password === passwordConfirmation || passwordConfirmation === "") {
            setPasswordConfirmationError(false)
            setPasswordConfirmationHelper("")
        } else {
            setPasswordConfirmationError(true)
            setPasswordConfirmationHelper("Les mots de passe ne sont pas identiques")
        }
    }

    const areValidData = (name:string, email:string, password:string, passwordConfirmation:string) => {
        const nameOk = isValidName(name)
        const emailOk = isValidEmail(email)
        const passwordOk = isValidPassword(password)
        const passwordConfirmationOk = password === passwordConfirmation
        return nameOk && emailOk && passwordOk && passwordConfirmationOk
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        const name = nameRef?.current?.value || ""
        const email = emailRef?.current?.value || ""
        const password = passwordRef?.current?.value || ""
        const passwordConfirmation = passwordConfirmationRef?.current?.value || ""
        const validData = areValidData(name, email, password, passwordConfirmation)
        if (validData) {
            createUser(name, email, password)
        }
    }

    const logUser = async (email:string, password:string) => {
        const user = { email, password }
        try {
            const response = await api.post('/auth/login', user)
            if (!response.data.error) {
                localStorage.setItem("token", `Bearer ${response.data.token}`)
                localStorage.setItem("user", response.data.user)
                context?.setCurrentUser(response.data.user)
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

    const createUser = async (name:string, email:string, password:string) => {
        const newUser = { name, email, password }
        try {
            const response = await api.post('/auth/signup', newUser)
            if (!response.data.error) {
                logUser(email, password)
            } else {
                console.log(response.data.error)
                // setError(response.data.message)
            }
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
            }
        }
    }

    return (
        <main className={styles.main}>
            <Head>
                <title>Groupomania</title>
                <meta name="description" content="Groupomania propose à ces employés ce réseau social qui leur permet de faciliter les échanges et de partager les bons moments au sein de l'entreprise. Par cette démarche, Groupomania souhaite donner à ses employés un outil qu'ils aiment utiliser au quotidien et qui leur donne envie de poursuivre l'aventure Groupomania chaque jour" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image src={bg} layout="fill" objectFit="cover"></Image>
            <a className={styles.credentials} href="https://www.pexels.com/fr-fr/photo/personne-mains-bureau-saisir-8867212/">Photo de Yan Krukov provenant de Pexels</a>
            <section className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.logo}>
                        <Image  src={icon} width={300} height={80} />
                    </div>
                    <h2>S'inscrire</h2>
                    <TextField id="name" type="text" label="Nom d'utilisateur" variant="outlined" inputRef={nameRef} onChange={controlName} error={nameError} helperText={nameHelper}/>
                    <TextField id="email" type="email" label="Email" variant="outlined" autoComplete="email" inputRef={emailRef} onChange={controlEmail} error={emailError} helperText={emailHelper}/>
                    <TextField id="password" type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef} onChange={controlPassword}  error={passwordError} helperText={passwordHelper}/>
                    <TextField id="password-confirmation" type="password" label="Confirmez le mot de passe" variant="outlined" inputRef={passwordConfirmationRef} onChange={controlPasswordConfirmation} error={passwordConfirmationError} helperText={passwordConfirmationHelper}/>
                    <Button variant="contained" size="large" type="submit">Inscription</Button>
                </form>
                <Typography className={styles.link}>
                    Vous avez déjà un compte ? <Link href='/login'><a>Connectez-vous !</a></Link>
                </Typography>
            </section>
        </main>
    )
}

export default Signup
  