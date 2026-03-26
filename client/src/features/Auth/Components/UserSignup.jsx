import React from 'react'
import { InputField } from '../../../shared/Ui/InputField'
import { ButtonUi } from '../../../shared/Ui/ButtonUi'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

export const UserSignup = () => {

    const { handleSubmit, register } = useForm()

    const signupSubmit = (data) => {
        console.log(data);

    }

    return (
        <div className='lg:min-h-screen lg:p-5 flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit(signupSubmit)} className='w-full max-w-xl  p-5 bg-gray-100 rounded-md'>
                <InputField
                    register={register}
                    registerName={"userName"}
                    label={"User name"}
                    labelClassNames={"label text-gray-700 my-3"}
                    type="text"
                    placeholder="eg:jack"
                    classNames={"input bg-slate-200 text-gray-800 input-neutral w-full border border-gray-400"} />
                <InputField
                    register={register}
                    registerName={"email"}
                    label={"Email"}
                    labelClassNames={"label text-gray-700 my-3"}
                    type="text"
                    placeholder="abc@gmail.com"
                    classNames={"input  bg-slate-200  input-neutral w-full border border-gray-400"} />
                <InputField
                    register={register}
                    registerName={"password"}
                    label={"Password"}
                    labelClassNames={"label text-gray-700 my-3"
                    } type="password"
                    placeholder="password"
                    classNames={"input  bg-slate-200 input-neutral w-full border border-gray-400"} />

                <p className='text-gray-800 my-1 text-sm'>You have an account ? <Link to={"/"} className='text-blue-500'>Login</Link> </p>
                <ButtonUi
                    btnText={"Signup"}
                    btnDisabled={false}
                    classNames={"btn btn-neutral btn-md w-full mt-2 disabled:bg-gray-600"} />
            </form>
        </div>
    )
}
