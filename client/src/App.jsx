import { BrowserRouter } from "react-router-dom"
import { Router } from "./routes/Router"
import { ToastContainer } from "react-toastify"
import { ScrollToTop } from "./shared/Common/ScrollToTop"
import { useAuthReload } from "./hook/useAuthReload"
import { LoaderUi } from "./shared/Common/LoaderUi"

export const App = () => {
  const loading = useAuthReload()
  console.log(loading);

  if (loading) return <LoaderUi />


  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Router />
      </BrowserRouter>
    </>
  )
}
