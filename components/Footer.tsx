import { FC } from "react"
import styles from '../styles/components/Footer.module.scss'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.date}>2022 - Paul Mouchel</div>
            <div className={styles.links}>
                <a href="https://www.linkedin.com/in/paul-mouchel-54875216a/" target="_blank" rel="noreferrer">
                    <LinkedInIcon fontSize="large" className="text-2xl box-content p-1.5 m-0"/>
                </a>
                <a href="https://github.com/PaulMouchel" target="_blank" rel="noreferrer">
                    <GitHubIcon fontSize="large" className="text-2xl box-content p-1.5 m-0"/>
                </a>
                <a href="mailto:paulmouchel@live.fr" target="_blank" rel="noreferrer">
                    <EmailIcon fontSize="large" className="text-2xl box-content p-1.5 m-0"/>
                </a>
            </div>
        </footer>
    )
}

export default Footer
  