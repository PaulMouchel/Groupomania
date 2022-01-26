import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.scss'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar/>
                <div className={styles.main__content}>
                    <CreatePost/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                <Footer/>

            </main>


        </div>
    )
}

export default Home
