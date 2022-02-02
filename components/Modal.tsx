import React, { FC } from 'react'
import styles from '../styles/components/Modal.module.scss'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IModal from '../interfaces/IModal'

const Modal: FC<IModal> = ({ children, closeModal }) => {

    return (
        <div className={styles.view}>
            <ClickAwayListener onClickAway={() => closeModal()}>
                <div>
                    { children }
                </div>
            </ClickAwayListener>
        </div>
    )
}
  
export default Modal
  