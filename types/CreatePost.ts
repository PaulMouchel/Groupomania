import { Dispatch, SetStateAction } from "react";
import PostType from "./Post";
import UserType from "./User";

export default interface CreatePostType {
    posts: PostType[]
    setPosts: Dispatch<SetStateAction<PostType[]>>
    currentUser: UserType | null
}