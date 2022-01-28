import UserType from "./User";

export default interface CommentType {
    id: Number
    text: string
    createdAt: Date
    userId: Number
    user: UserType
}