import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/pages/Home.module.scss'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'
import api from '../api/axios'
import { useState, useEffect } from 'react'
import PostType from '../types/PostType'
import UserType from '../types/UserType'
import useLocalStorage from '../hooks/useLocalStorage'

const Home: NextPage = () => {

    const router = useRouter()
    const [ posts , setPosts ] = useState<PostType[]>([])
    const [ currentUser , setCurrentUser ] = useLocalStorage<UserType | null>("user", null);

    useEffect(() => {
        const fetchPosts = () => {
            api.get('/posts', {
                headers: {
                    "authorization": localStorage.getItem("token") || ""
                }
            })
            .then((response) => {
                console.log("reponse:", response)
                setPosts(response.data)
            })
            .catch((error:unknown) => {
                console.log(error)
                router.push('/login')
            })
        }
        fetchPosts()
    }, [])

    const sortPostsByDate = (a:PostType, b:PostType) => {
        if (a.createdAt > b.createdAt)
            return -1
        if (a.createdAt < b.createdAt)
            return 1
        return 0
    }

    const deletePost = (postId: Number) => {
        const newPosts = posts.filter(post => post.id !== postId)
        setPosts([...newPosts])
    }

    const updatePost = (post:PostType) => {
        const newPosts:PostType[] = [...posts]
        const index:number = newPosts.findIndex(existingPost => existingPost.id === post.id)
        newPosts[index] = post
        setPosts([...newPosts])
    }



    return (
        <div className={styles.container}>
            <Head>
                <title>Groupomania</title>
                <meta name="description" content="Groupomania propose à ces employés ce réseau social qui leur permet de faciliter les échanges et de partager les bons moments au sein de l'entreprise. Par cette démarche, Groupomania souhaite donner à ses employés un outil qu'ils aiment utiliser au quotidien et qui leur donne envie de poursuivre l'aventure Groupomania chaque jour" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.main__content}>
                    <CreatePost posts={posts} setPosts={setPosts} currentUser={currentUser}/>
                    { posts.sort(sortPostsByDate).map((post, index) => 
                        <Post key={JSON.stringify(post)} data={post} currentUser={currentUser} deletePost={deletePost} updatePost={updatePost}/>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Home