import { Dispatch, SetStateAction } from "react"

export default interface ISnackMessage {
    message: string
    setMessage: Dispatch<SetStateAction<string>>
    severity: "error" | "warning" | "info" | "success"
}