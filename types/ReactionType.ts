import UserType from "./UserType"
import PostType from "./PostType"

type ReactionType = {
    id: Number
    type: string
    createdAt: Date
    userId: Number
    user: UserType
    postId: Number
    post: PostType
}

export default ReactionType