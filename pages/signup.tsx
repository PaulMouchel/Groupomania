import { NextPage } from "next"
import { useRef } from 'react'
import styles from '../styles/pages/signup.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Image from 'next/image'
import bg from '../public/images/signup-bg.jpg'
import icon from '../public/images/logos/icon-left-font-monochrome-black.svg'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import api from '../api/posts'

const Signup: NextPage = () => {

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmationRef = useRef<HTMLInputElement>(null)

    const isValidName = (value:string) => {
        return value.length > 0 && value.length < 100
    }

    const isValidEmail = (value:string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    const isValidPassword = (value:string) => {
        return value.length > 8
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        const newUser = { name, email, password }
        try {
            const response = await api.post('/auth/signup', newUser)
            
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
            <Image src={bg} layout="fill" objectFit="cover"></Image>
            <a className={styles.credentials} href="https://www.pexels.com/fr-fr/photo/personne-mains-bureau-saisir-8867212/">Photo de Yan Krukov provenant de Pexels</a>
            <section className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.logo}>
                        <Image  src={icon} width={300} height={80} />
                    </div>
                    <h2>S'inscrire</h2>
                    <TextField id="name" type="text" label="Nom d'utilisateur" variant="outlined" inputRef={nameRef} />
                    <TextField id="email" type="email" label="Email" variant="outlined" autoComplete="email" inputRef={emailRef}/>
                    <TextField id="password" type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef}/>
                    <TextField id="password-confirmation" type="password" label="Confirmez le mot de passe" variant="outlined" inputRef={passwordConfirmationRef}/>
                    <Button variant="contained" size="large" type="submit">Inscription</Button>
                </form>
                <Typography>
                    Vous avez déjà un compte ? <Link href='/login'><a>Connectez-vous !</a></Link>
                </Typography>
            </section>
        </main>
    )
}

export default Signup
  