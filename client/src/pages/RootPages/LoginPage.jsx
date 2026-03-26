import { lazy, Suspense } from "react"


const UserLogin = lazy(() => import("../../features/Auth/Components/UserLogin"))

const LoginPage = () => {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-cente bg-r bg-[#BBC9C4] ">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        }>
            <UserLogin />
        </Suspense>
    )
}


export default LoginPage