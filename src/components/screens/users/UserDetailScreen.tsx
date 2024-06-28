import {useNavigate, useParams} from "react-router-dom";
import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {UserDto, UserInterface} from "../../../interface/Interfaces";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormInput from "../../common/FormInput";
import CustomSwitch from "../../common/CustomSwitch";
import CustomButton from "../../common/CustomButton";
import {COLORS} from "../../../constants/theme";
import CustomDialog from "../../common/CustomDialog";
import CustomSelect from "../../common/CustomSelect";
import {useSelector} from "react-redux";
import useMoreCustomSelects from "../../../state/hooks/useMoreCustomSelects";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from "dayjs";
const UserDetailScreen = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const userTypes = useSelector((state: any) => state.common.userTypes);
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
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const { codes, setCodes, addNewCode } = useMoreCustomSelects();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleEditUser = () => {
        setUsername(user!.username)
        setFullName(user!.fullName)
        setForcePasswordChange(user!.update)
        user?.types.forEach(type => addNewCode(type.code));
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
            password: password,
            types: codes.map(code => ({ code: code.code, name: "" }))
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
            setCodes([])
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
            <Box
                sx={{
                    margin: '40px 40px 0',
                    height: '1px',
                    backgroundColor: '#E6E6E6'
                }}
            />

            <Box sx={{
                margin: '40px 40px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                {/* CALENDAR */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar sx={{margin:0}} value={date} onChange={(newDate) => {console.log(newDate)}} />
                </LocalizationProvider>

                <Box sx={{flex: 2}}>
                    <Typography sx={{
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                        fontFamily: 'Source Sans Pro, sans-serif',
                        color: '#0B2556',
                        textAlign: 'center'
                    }}>
                        User statistics for that day
                    </Typography>


                </Box>
            </Box>

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
                    ...codes.map((code, index) => (
                        <CustomSelect
                            key={index}
                            label="User role"
                            setData={code.setCode}
                            data={userTypes}
                            defaultValue={code.code}
                        />
                    ))
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