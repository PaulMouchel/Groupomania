import { NextPage } from "next"
import styles from '../styles/pages/signup.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Image from 'next/image'
import bg from '../public/images/signup-bg.jpg'
import icon from '../public/images/logos/icon-left-font-monochrome-black.svg'

const Signup: NextPage = () => {
    return (
        <main className={styles.main}>
            <Image src={bg} layout="fill" objectFit="cover"></Image>
            <a className={styles.credentials} href="https://www.pexels.com/fr-fr/photo/personne-mains-bureau-saisir-8867212/">Photo de Yan Krukov provenant de Pexels</a>
            <section className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.logo}>
                        <Image  src={icon} width={300} height={80} />
                    </div>
                    <h2>S'inscrire</h2>
                    <TextField id="outlined-basic" label="Nom d'utilisateur" variant="outlined" />
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Mot de passe" variant="outlined" />
                    <Button variant="contained" size="large">Inscription</Button>
                </form>
            </section>
        </main>
    )
}

export default Signup
  