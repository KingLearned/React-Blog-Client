import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Register from './pages/Login-Register/Register'
import Login from './pages/Login-Register/Login'
import Home from './pages/Home'
import Single from './pages/Single'
import Write from './pages/Write'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = () => {

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout  />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/post/:id",
                element: <Single />
            },
            {
                path: "/write",
                element: <Write />
            },
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    { path: "/login" , element: <Login />  },
    {
        path: "/single",
        element: <Single />
    },
    {
        path: "/write",
        element: <Write />
    },
])


const App = () => {

    const setTheme = () => {  return localStorage.getItem('theme') }
    return (
        <div className={`app ${setTheme() ? 'bg-black' :''}`}>
            <div className={``}>
                <RouterProvider router={router} />
            </div>
        </div>
    )

}



export default App