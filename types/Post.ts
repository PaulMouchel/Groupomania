import UserType from "./User"
import CommentType from "./Comment"
import ReactionType from "./Reaction"

export default interface PostType {
    id: Number
    text: string
    imageUrl?: string
    createdAt: string
    userId: Number
    user: UserType
    comments: CommentType[]
    currentUser: UserType | null
    reactions: ReactionType[]
    deleteSelf: Function
}