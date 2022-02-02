import UserType from "../types/UserType"
import CommentType from "../types/CommentType"

export default interface IComment {
    data: CommentType
    currentUser: UserType
    deleteSelf: Function
    updateSelf: Function
}