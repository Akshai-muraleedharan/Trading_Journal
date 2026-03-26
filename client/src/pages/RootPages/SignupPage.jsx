import { lazy, Suspense } from "react"

const UserSignup = lazy(() => import("../../features/Auth/Components/UserSignup"))

const SignupPage = () => {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-cente bg-r bg-[#BBC9C4] h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        }>
            <UserSignup />
        </Suspense>
    )
}


export default SignupPage