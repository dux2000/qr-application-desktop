import {Box} from "@mui/material";
import FormInputText from "../../common/FormInput";
import {useEffect, useState} from "react";
import CustomButton from "../../common/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const LoginScreen = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch({
            type: "LOGIN_USER",
            payload: { username: username, password: password },
        });
    }

    useEffect(() => {
        if (user.update) {
            navigate("/change-password");
        } else if(user.isLoggedIn) {
            const loginInfo = {
                data: { username: username, password: btoa(password) },
                lastLogin: new Date(),
                automaticLoginDaysDuration: 1,
            };
            localStorage.setItem("plmLoginInfo", JSON.stringify(loginInfo));

            navigate("/overview");
        }

    }, [user.isLoggedIn]);

    return (
        <>
            <Box sx={{
                maxWidth: "300px",
                display: "block",
                margin: "auto",
                marginTop: 20
            }}>
                <FormInputText
                    label={"Username"}
                    type={"text"}
                    setData={setUsername}
                />
                <Box sx={{mb: 3}}/>
                <FormInputText
                    label="Password"
                    setData={setPassword}
                    type="password"
                    showPassword={showPassword}
                    handleClickShowPassword={handleClickShowPassword}
                />
                <Box sx={{mb: '40px'}}/>
                <CustomButton
                    buttonColor="#1E4B92"
                    onHoverButtonColor="#0B2556"
                    buttonText="Log in"
                    textColor="white"
                    height={52}
                    width={300}
                    handleClick={handleSubmit}
                />
                {user.error && <Box sx={{color: "red"}}>{user.error}</Box>}
            </Box>
        </>
    )
}

export default LoginScreen;