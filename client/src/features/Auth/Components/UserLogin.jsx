import React, { useState } from 'react'
import { InputField } from '../../../shared/Ui/InputField'
import { ButtonUi } from '../../../shared/Ui/ButtonUi'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useLogin } from '../hooks/useLogin'

export const UserLogin = () => {
    const [passwordType, setPasswordType] = useState({
        isPassword: false,
        type: "password"
    })
    const { handleSubmit, register } = useForm()

    const { userLogin, error, loading } = useLogin()

    const loginSubmit = (data) => {
        userLogin(data)

    }


    const handleChangeToText = () => {
        setPasswordType((prev) => ({ isPassword: true, type: "text" }))
    }
    const handleChangeToPassword = () => {
        setPasswordType((prev) => ({ isPassword: false, type: "password" }))
    }


    return (
        <div className='lg:min-h-screen p-5 flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit(loginSubmit)} className='w-full max-w-sm shadow-sm  p-5 bg-gray-100 rounded-md'>
                <InputField
                    register={register}
                    registerName={"email"}
                    label={"Email"}
                    labelClassNames={"label text-gray-700 my-3"}
                    type="text"
                    placeholder="abc@gmail.com"
                    classNames={"input bg-slate-200  input-neutral w-full border border-gray-400"} />
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
                        classNames={"input bg-slate-200  input-neutral w-full border border-gray-400"} />
                    {passwordType.isPassword ? <IoMdEyeOff onClick={handleChangeToPassword} color='black' size={20} className='absolute bottom-2 right-3' /> : <IoMdEye onClick={handleChangeToText} color='black' size={20} className='absolute bottom-2 right-3' />}
                </div>

                <div className='h-2.5'>
                    <p className='text-red-500 w-full text-end'>{error[0]?.key === "password" ? error[0]?.message : null}</p>
                </div>
                <p className='text-gray-800 my-2 text-sm'>You don't have an account ? <Link to={"/signup"} className='text-blue-500'>Signup</Link> </p>
                <ButtonUi btnText={loading ? "Logging..." : "Login"} btnDisabled={loading} classNames={"btn btn-neutral btn-md w-full mt-2 disabled:bg-gray-600"} />
                <div>
                    <p className='text-red-500 w-full text-start mt-2'>{error[0]?.key === "invalid" ? error[0]?.message : null}</p>
                </div>
            </form>
        </div>
    )
}
