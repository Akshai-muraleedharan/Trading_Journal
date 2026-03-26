import React from 'react'

export const ButtonUi = ({ btnText, classNames, btnDisabled = false }) => {
    return (
        <button disabled={btnDisabled} className={classNames}>{btnText}</button>
    )
}
