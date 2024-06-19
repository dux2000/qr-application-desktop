import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  FormInputText  from "../../common/FormInput";
import { Box, Typography } from "@mui/material";
import HeaderComponent from "../../common/HeaderComponent";
import CustomButton from "../../common/CustomButton";

const ChangePasswordScreen = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [errorNewPassword, setErrorNewPassword] = useState<string>("")
    const [errorOldPassword, setErrorOldPassword] = useState<string>("")
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleSubmit = () => {
        if(oldPassword === "" || newPassword === "") {
            if(oldPassword === "")
                setErrorOldPassword("Field must not be empty.")
            if(newPassword === "")
                setErrorNewPassword("Field must not be empty.")

            return
        }

        if(newPassword === oldPassword) {
            setErrorNewPassword("New password can't be the same as old password.")

            return
        }

        const loginInfo = {
            data: { username: user.username, password: btoa(newPassword) },
            lastLogin: new Date(),
            automaticLoginDaysDuration: 7,
        };
        localStorage.setItem("plmLoginInfo", JSON.stringify(loginInfo));

        dispatch({
            type: "CHANGE_PASSWORD",
            payload: {
                id: user.id,
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
        });

        if(user.error !== "") {
            setErrorOldPassword(user.error)
        }
    };

    const clearOldErrorMessage = () => {
        dispatch({type: 'CLEAR_ERROR'})
        setErrorOldPassword("")
        setErrorNewPassword("")
    }

    useEffect(() => {
        if (user.isLoggedIn && !user.update) {
            navigate("/");
        } else if (!user.isLoggedIn) {
            navigate("/login");
        }
    }, [user.update, user.isLoggedIn, navigate]);

    useEffect(() => {
        if (user.error !== "") {
            setErrorOldPassword(user.error);
        }
    }, [user.error]);

    return (<>
            <Box sx={{
                maxWidth: "300px",
                display: "block",
                margin: "auto",
                marginTop: 20
            }}>
                <FormInputText
                    label="Old password"
                    setData={setOldPassword}
                    type="password"
                    errorMessage={errorOldPassword}
                    setErrorMessage={clearOldErrorMessage}
                    showPassword={showOldPassword}
                    handleClickShowPassword={handleClickShowOldPassword}/>
                <Box sx={{mb: 3}}/>
                <FormInputText
                    label="New password"
                    setData={setNewPassword}
                    type="password"
                    errorMessage={errorNewPassword}
                    setErrorMessage={setErrorNewPassword}
                    showPassword={showNewPassword}
                    handleClickShowPassword={handleClickShowNewPassword}/>
                <Box sx={{mb: '40px'}}/>
                <CustomButton
                    buttonColor="#1E4B92"
                    onHoverButtonColor="#0B2556"
                    buttonText="Submit"
                    textColor="white"
                    height={52}
                    width={300}
                    handleClick={handleSubmit}
                />
            </Box>
        </>
    );
};

export default ChangePasswordScreen;
