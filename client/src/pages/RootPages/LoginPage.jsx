import { lazy, Suspense } from "react"
import { LoaderUi } from "../../shared/Common/LoaderUi"


const UserLogin = lazy(() => import("../../features/Auth/Components/UserLogin"))

const LoginPage = () => {
    return (
        <Suspense fallback={
            <LoaderUi />
        }>
            <UserLogin />
        </Suspense>
    )
}


export default LoginPage