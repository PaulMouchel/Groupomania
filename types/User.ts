import PostType from "./Post";

export default interface UserType {
    id: Number
    name: string
    email: string
    password: string
    description?: string
    imageUrl?: string
    createdAt: Date
    posts: PostType[]
}