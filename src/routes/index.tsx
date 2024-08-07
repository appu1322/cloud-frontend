import { Navigate, createBrowserRouter } from "react-router-dom";
import PageNotFound from "../components/page-not-found";
import Layout from "../screens/layout";
import MyDrive from "../screens/layout/my-drive";
import Login from "../screens/auth/login";
import ForgetPassword from "../screens/auth/forgot-password";
import AuthGuard from "../components/guard";

export default createBrowserRouter([
    {
        path: "login",
        element: <Login />,
        errorElement: <PageNotFound />
    },
    {
        path: "forgot-password",
        element: <ForgetPassword />,
        errorElement: <PageNotFound />
    },
    {
        element: <AuthGuard />,
        errorElement: <PageNotFound />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: "home",
                        element: <MyDrive />,
                        errorElement: <PageNotFound />
                    },
                    {
                        path: "activity",
                        element: <MyDrive />,
                        errorElement: <PageNotFound />
                    },
                    {
                        path: "trash",
                        element: <MyDrive />,
                        errorElement: <PageNotFound />
                    },
                ],
                errorElement: <PageNotFound />
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to="/home" />,
        errorElement: <PageNotFound />
    },
]);  
