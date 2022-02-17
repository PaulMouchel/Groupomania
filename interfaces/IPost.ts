import UserType from "../types/UserType"
import PostType from "../types/PostType"

export default interface IPost {
    data: PostType
    currentUser: UserType | null
    deletePost: Function
    updatePost: Function
    sendSnack: Function
}