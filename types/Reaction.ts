import UserType from "./User"
import PostType from "./PostType"

export default interface ReactionType {
    id: Number
    type: string
    createdAt: Date
    userId: Number
    user: UserType
    postId: Number
    post: PostType
}