import UserType from "./User"
import CommentType from "./Comment"

export default interface PostType {
    id: Number
    text: string
    imageUrl?: string
    createdAt: Date
    userId: Number
    user: UserType
    comments: CommentType[]
}