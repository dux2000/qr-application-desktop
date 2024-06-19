import {Container} from "@mui/material";
import { useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../common/HeaderComponent";
export default function MainLayout() {
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.isLoggedIn) {
            // Attempt to retrieve login information from local storage
            const localStorageLoginInfoStr = localStorage.getItem("plmLoginInfo");

            // If login information exists in local storage
            if (localStorageLoginInfoStr) {
                const localStorageLoginInfo = JSON.parse(localStorageLoginInfoStr);

                const lastLoginDate = Date.parse(localStorageLoginInfo.lastLogin);
                const currentTime = Date.now();

                const timeElapsedInDays =
                    (currentTime - lastLoginDate) / (1000 * 3600 * 24);
                const allowedDuration =
                    localStorageLoginInfo.automaticLoginDaysDuration;

                // If the time elapsed is within the allowed duration
                if (timeElapsedInDays < allowedDuration) {
                    const { username, password } = localStorageLoginInfo.data;
                    dispatch({
                        type: "LOGIN_USER",
                        payload: {
                            username,
                            password: atob(password),
                        },
                    });
                } else {
                    // Navigate to the login page if the time elapsed is beyond the allowed duration
                    navigate("/login");
                }
            } else {
                // Navigate to the login page if no login information is found in local storage
                navigate("/login");
            }
        } else {
            navigate("/overview")
        }
    }, [user.isLoggedIn]);

    return (
        user.isLoggedIn && (
            <>
                <HeaderComponent username={user.username} description={"Overview dashboard"}/>
                <Container maxWidth={false}>
                    <Outlet />
                </Container>
            </>
        )
    );
}
