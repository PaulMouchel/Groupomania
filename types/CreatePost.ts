import { Dispatch, SetStateAction } from "react";
import PostType from "./Post";

export default interface CreatePostType {
    posts: PostType[]
    setPosts: Dispatch<SetStateAction<PostType[]>>
}