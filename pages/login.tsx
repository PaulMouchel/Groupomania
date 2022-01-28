import { NextPage } from "next"
import styles from '../styles/pages/login.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Image from 'next/image'
import bg from '../public/images/login-bg.jpg'
import icon from '../public/images/logos/icon-left-font-monochrome-black.svg'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

const Login: NextPage = () => {
    return (
        <main className={styles.main}>
            <Image src={bg} layout="fill" objectFit="cover"></Image>
            <a className={styles.credentials} href="https://www.pexels.com/fr-fr/photo/photo-de-personnes-faisant-des-coups-de-poing-3184430/">Photo de fauxels provenant de Pexels</a>
            <section className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.logo}>
                        <Image  src={icon} width={300} height={80} />
                    </div>
                    <h2>Se connecter</h2>
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Mot de passe" variant="outlined" />
                    <Button variant="contained" size="large">Connexion</Button>
                </form>
                <Typography>
                    Pas encore de compte ? <Link href='/signup'><a>Inscrivez-vous !</a></Link>
                </Typography>
            </section>
        </main>
    )
}

export default Login
  