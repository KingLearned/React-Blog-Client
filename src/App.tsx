import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Register from './pages/Login-Register/Register'
import Login from './pages/Login-Register/Login'
import Home from './pages/Home'
import Single from './pages/Single'
import Write from './pages/Write'
import Footer from './components/Footer'

const Layout = () => {

    return (
        <>
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
    { path: "/login" , element: <Login  /> },
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
    return (
        <div >
            <RouterProvider router={router} />
        </div>
    )

}

export default App