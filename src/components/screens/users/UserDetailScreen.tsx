import {useNavigate, useParams} from "react-router-dom";
import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {UserDto, UserInterface, UserTypeDto} from "../../../interface/Interfaces";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormInput from "../../common/FormInput";
import CustomSwitch from "../../common/CustomSwitch";
import CustomButton from "../../common/CustomButton";
import {COLORS} from "../../../constants/theme";
import CustomDialog from "../../common/CustomDialog";
import CustomSelect from "../../common/CustomSelect";
const UserDetailScreen = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDto>();
    const [openDialogEditUser, setOpenDialogEditUser] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const [forcePasswordChange, setForcePasswordChange] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorUsername, setErrorUsername] = useState<string>("")
    const [errorFullName, setErrorFullName] = useState<string>("")
    const [userTypes, setUserTypes] = useState<UserTypeDto[]>([{"code": "ADMIN", "name": "Administrator"}, {"code": "DOSTAVA", "name": "Dostava"}])
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleEditUser = () => {
        setUsername(user!.username)
        setFullName(user!.fullName)
        setForcePasswordChange(user!.update)
        setOpenDialogEditUser(true)
    }

    const handleUpdateUser = () => {
        if (username === "" || fullName === "") {
            if (username === "")
                setErrorUsername("Field must not be empty.")
            if (fullName === "")
                setErrorFullName("Field must not be empty.")

            return
        }

        const user: UserInterface = {
            id: parseInt(userId!),
            username: username,
            fullName: fullName,
            update: forcePasswordChange,
            password: password
        }

        api.user.updateUser(user)
            .then((response) => {
                setUser(response)
                setOpenDialogEditUser(false);
            })
            .catch(error => {
                console.log(error)
            })
    };

    useEffect(() => {
        api.user.getUser(userId!)
            .then((response) => {
                setUser(response)

            })
            .catch((error) => {
                console.error(error)
            })
    }, [userId]);

    //set username, fullname, password and also errors to empty when dialogs closes
    useEffect(() => {
        if (!openDialogEditUser) {
            setUsername('')
            setFullName('')
            setPassword('')
            setErrorUsername("")
            setErrorFullName("")
            setShowPassword(false)
        }
    }, [openDialogEditUser])

    // @ts-ignore
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '40px 30px 0',
                }}
            >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton
                        sx={{
                            color: '#003E92',
                            marginRight: 1,
                            '&:hover': {
                                backgroundColor: '#E6E6E6',
                            },
                        }}
                        onClick={() => navigate("/overview")}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography sx={{
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                        fontFamily: 'Source Sans Pro, sans-serif',
                        color: '#0B2556'
                    }}>
                        User details
                    </Typography>
                </div>
                <IconButton
                    sx={{
                        color: '#003E92',
                        marginRight: 1,
                        '&:hover': {
                            backgroundColor: '#E6E6E6',
                        },
                    }}
                    onClick={handleEditUser}>
                    <MoreVertIcon/>
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 40px'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyItems: 'center',
                        alignContent: 'start',
                        marginTop: '30px',
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                        <Typography
                            sx={{
                                marginBottom: '4px',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                fontFamily: 'Source Sans Pro, sans-serif',
                                color: '#0B2556'
                            }}>
                            Full name
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Source Sans Pro, sans-serif',
                                color: 'black'
                            }}>
                            {user?.fullName}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                        <Typography
                            sx={{
                                marginBottom: '4px',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                fontFamily: 'Source Sans Pro, sans-serif',
                                color: '#0B2556'
                            }}>
                            Username
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Source Sans Pro, sans-serif',
                                color: 'black'
                            }}>
                            {user?.username}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                        <Typography
                            sx={{
                                marginBottom: '4px',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                fontFamily: 'Source Sans Pro, sans-serif',
                                color: '#0B2556'
                            }}>
                            Role
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Source Sans Pro, sans-serif',
                                color: 'black'
                            }}>
                            {user?.types.map(type => type.name).join(", ")}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* divider */}
            <CustomDialog
                title="Edit user"
                open={openDialogEditUser}
                handleOpen={setOpenDialogEditUser}
                childrenForms={[
                    <FormInput
                        label="Username"
                        type="text"
                        data={username}
                        errorMessage={errorUsername}
                        setErrorMessage={setErrorUsername}
                        setData={setUsername}/>,
                    <FormInput
                        label="Full name"
                        type="text"
                        data={fullName}
                        errorMessage={errorFullName}
                        setErrorMessage={setErrorFullName}
                        setData={setFullName}/>,
                    <FormInput
                        label="New password"
                        type="password"
                        setData={setPassword}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}/>,
                    ...(user?.types?.map(type => (
                        <CustomSelect
                            label="User role"
                            setData={(value:any) => {
                                console.log(value)
                            }}
                            data={userTypes} // Assume you have a predefined list of user role options
                            defaultValue={type.code}
                        />
                    )) || [])
                ]}
                childrenSwitch={[
                    <CustomSwitch
                        label="Force password change"
                        checked={forcePasswordChange}
                        handleChange={setForcePasswordChange}/>,
                ]}
                childrenButton={
                    <CustomButton
                        buttonColor={COLORS.primary}
                        onHoverButtonColor="#0B2556"
                        buttonText="Save"
                        textColor="white"
                        handleClick={handleUpdateUser}/>
                }
            />
        </>
    )
}

export default UserDetailScreen;