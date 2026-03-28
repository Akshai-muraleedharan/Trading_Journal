import { BrowserRouter } from "react-router-dom"
import { Router } from "./routes/Router"
import { ToastContainer } from "react-toastify"
import { ScrollToTop } from "./shared/Common/ScrollToTop"
import { UseAuthReload } from "./hook/AuthReload/useAuthReload"

export const App = () => {
  return (
    <>
      <UseAuthReload />
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
