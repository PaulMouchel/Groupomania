import CommentType from '../types/CommentType'

export default interface IEditComment {
    comment: CommentType
    closeModal: Function
    updateSelf: Function
}