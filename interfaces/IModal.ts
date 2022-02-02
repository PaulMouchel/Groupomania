import { ReactNode } from "react"

export default interface IModal {
    children: ReactNode
    closeModal: Function
}