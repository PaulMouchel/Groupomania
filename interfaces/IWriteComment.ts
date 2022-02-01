import UserType from "../types/UserType";

export default interface IWriteComment {
    postId: Number
    writeComment: Function
    currentUser: UserType
}