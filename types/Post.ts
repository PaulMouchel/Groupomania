import UserType from "./User";

export default interface PostType {
    id: Number
    text: string
    imageUrl?: string
    createdAt: Date
    userId: Number
    user: UserType
}