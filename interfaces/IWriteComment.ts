import UserType from "../types/User";

export default interface IWriteComment {
    postId: Number
    writeComment: Function
    currentUser: UserType
}