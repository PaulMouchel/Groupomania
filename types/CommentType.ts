import PostType from "./PostType";
import UserType from "./User";

export default interface CommentType {
    id: Number
    text: string
    createdAt: string
    userId: Number
    user: UserType
    postId: Number
    post: PostType
}