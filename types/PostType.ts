import UserType from "./UserType"
import CommentType from "./CommentType"
import ReactionType from "./ReactionType"

type PostType = {
    id: Number
    text: string
    imageUrl?: string
    createdAt: string
    userId: Number
    user: UserType
    comments: CommentType[]
    reactions: ReactionType[]
}

export default PostType