import PostType from "./PostType";
import UserType from "./UserType";

type CommentType = {
    id: Number
    text: string
    createdAt: string
    userId: Number
    user: UserType
    postId: Number
    post: PostType
}

export default CommentType