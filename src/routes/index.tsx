import { Navigate, createBrowserRouter } from "react-router-dom";
import PageNotFound from "../components/page-not-found";
import Layout from "../screens/layout";
import MyDrive from "../screens/layout/my-drive";
import Home from "../screens/Home";

export default createBrowserRouter([
    {
        path: "",
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
                path: "my-drive",
                element: <MyDrive />,
                errorElement: <PageNotFound />
            },
            {
                path: "test",
                element: <Home />,
                errorElement: <PageNotFound />
            }
        ],
        errorElement: <PageNotFound />
    },
    {
        path: "*",
        element: <Navigate to="/" />,
        errorElement: <PageNotFound />
    },
]);  
