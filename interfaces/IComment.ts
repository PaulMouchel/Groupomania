import UserType from "../types/User"
import CommentType from "../types/CommentType"

export default interface IComment {
    data: CommentType
    currentUser: UserType
    deleteSelf: Function
}