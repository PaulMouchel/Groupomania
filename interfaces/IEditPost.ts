import PostType from "../types/PostType"

export default interface IEditPost {
    post: PostType
    closeModal: Function
    updateSelf: Function
}