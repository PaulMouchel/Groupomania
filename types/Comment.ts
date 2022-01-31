import UserType from "./User";

export default interface CommentType {
    id: Number
    text: string
    createdAt: string
    userId: Number
    user: UserType
    currentUser: UserType
    deleteSelf: Function
}