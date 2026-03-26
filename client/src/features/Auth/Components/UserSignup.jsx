import React, { useState } from 'react'
import { InputField } from '../../../shared/Ui/InputField'
import { ButtonUi } from '../../../shared/Ui/ButtonUi'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useSignup } from '../hooks/useSignup'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


const UserSignup = () => {

    const [passwordType, setPasswordType] = useState({
        isPassword: false,
        type: "password"
    })

    const { handleSubmit, register } = useForm()

    const { userRegister, error, loading } = useSignup()

    const signupSubmit = (data) => {
        userRegister(data)
    }


    const handleChangeToText = () => {
        setPasswordType((prev) => ({ isPassword: true, type: "text" }))
    }
    const handleChangeToPassword = () => {
        setPasswordType((prev) => ({ isPassword: false, type: "password" }))
    }

    return (
        <div className='lg:min-h-screen lg:p-5 flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit(signupSubmit)} className='w-full max-w-sm  p-5 bg-gray-100 rounded-md'>
                <InputField
                    register={register}
                    registerName={"userName"}
                    label={"User name"}
                    labelClassNames={"label text-gray-700 my-3"}
                    type="text"
                    placeholder="eg:jack"
                    classNames={"input bg-slate-200 text-gray-800 input-neutral w-full border border-gray-400"} />
                <div className='h-2.5'>
                    <p className='text-red-500 w-full text-end'>{error[0]?.key === "userName" ? error[0]?.message : null}</p>
                </div>
                <InputField
                    register={register}
                    registerName={"email"}
                    label={"Email"}
                    labelClassNames={"label text-gray-700 my-3"}
                    type="text"
                    placeholder="abc@gmail.com"
                    classNames={"input  bg-slate-200  input-neutral w-full border border-gray-400"} />
                <div className='h-2.5'>
                    <p className='text-red-500 w-full text-end'>{error[0]?.key === "email" ? error[0]?.message : null}</p>
                </div>

                <div className='relative'>
                    <InputField
                        register={register}
                        registerName={"password"}
                        label={"Password"}
                        labelClassNames={"label text-gray-700 my-3"}
                        type={passwordType.type}
                        placeholder="password"
                        classNames={"input  bg-slate-200 input-neutral w-full border border-gray-400"} />
                    {passwordType.isPassword ? <IoMdEyeOff onClick={handleChangeToPassword} color='black' size={20} className='absolute bottom-2 right-3' /> : <IoMdEye onClick={handleChangeToText} color='black' size={20} className='absolute bottom-2 right-3' />}
                </div>

                <p className='text-gray-800 my-1 text-sm'>You have an account ? <Link to={"/"} className='text-blue-500'>Login</Link> </p>
                <ButtonUi
                    btnText={loading ? "Signing..." : "Signup"}
                    btnDisabled={loading}
                    classNames={"btn btn-neutral btn-md w-full mt-2 disabled:bg-gray-600"} />
                <div>
                    <p className='text-red-500 w-full text-end mt-2'>{error[0]?.key === "password" ? error[0]?.message : null}</p>
                    <p className='text-red-500 w-full text-start mt-2'>{error[0]?.key === "invalid" ? error[0]?.message : null}</p>
                </div>
            </form>
        </div>
    )
}


export default UserSignup