import { useState, useContext, createContext, Dispatch, SetStateAction } from "react"
import UserType from '../../types/UserType'

type currentUserContextProps = {
    children: React.ReactNode
}

type currentUserType = {
    currentUser: UserType | null
    setCurrentUser: Dispatch<SetStateAction<UserType | null>>
}

type currentUserContextType = currentUserType | null

export const CurrentUserContext = createContext<currentUserContextType>(null)

export const useCurrentUser = () => {
    return useContext(CurrentUserContext)
}

export const CurrentUserContextProvider = ({ children }: currentUserContextProps) => {

    const [ currentUser, setCurrentUser ] = useState<UserType | null>(null)

    const value = {
        currentUser,
        setCurrentUser
    }

    return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}