import React from 'react'

export const InputField = ({ labelClassNames, label, type, placeholder, classNames, register, registerName }) => {
    return (
        <div>
            <label className={labelClassNames}>{label}</label>
            <input type={type} {...register(registerName)} placeholder={placeholder} className={`${classNames} outline-none text-sm lg:text-[16px] text-gray-800 tracking-wider`} />
        </div>
    )
}
