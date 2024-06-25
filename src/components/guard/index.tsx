import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch, updateAuth } from "../../redux";
import { useLazyProfileQuery } from "../../services";

const AuthGuard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [getProfile, { isLoading }] = useLazyProfileQuery({});
    const user = useAppSelector(state => state.authSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.data) {
            console.log({ user: user.data });
        } else {
            getProfile({})
                .unwrap()
                .then(data => dispatch(updateAuth(data.data)))
                .catch((err: { status: number | string }) => {
                    if (err.status !== 200) {
                        dispatch(updateAuth(null));
                        navigate("/login");
                    }
                })
        }
    }, [location.pathname, user]);

    return (
        <div>
            {(isLoading || !user.data) ? "Loading..." : <Outlet />}
        </div>
    );
};

export default AuthGuard;