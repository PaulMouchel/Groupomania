import { Dispatch, SetStateAction } from "react"
import PostType from "../types/PostType"
import UserType from "../types/UserType"

export default interface ICreatePost {
    posts: PostType[]
    setPosts: Dispatch<SetStateAction<PostType[]>>
    currentUser: UserType | null
    sendSnack: Function
}