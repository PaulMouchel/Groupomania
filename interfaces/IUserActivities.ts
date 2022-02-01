import UserType from "../types/UserType"
import { Dispatch, SetStateAction } from "react"

export default interface IUserActivities {
    user: UserType
    setUser: Dispatch<SetStateAction<UserType[]>>
    currentUser: UserType
}