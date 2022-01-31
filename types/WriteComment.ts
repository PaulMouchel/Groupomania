import { Dispatch, SetStateAction } from "react";
import UserType from "./User";
// import PostType from "./Post";
import CommentType from "./Comment";

export default interface CreatePostType {
    postId: Number
    comments: CommentType[]
    setComments: Dispatch<SetStateAction<CommentType[]>>
    currentUser: UserType
}