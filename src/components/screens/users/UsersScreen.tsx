import {useEffect, useState} from "react";
import {SearchFilter, SearchRequest, UserDto} from "../../../interface/Interfaces";
import api from "../../../service/api";
import {Box, Typography} from "@mui/material";
import CustomButton from "../../common/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import FormInput from "../../common/FormInput";
import CustomTable from "../../common/CustomTable";
import CustomDialog from "../../common/CustomDialog";
import CustomNotification from "../../common/CustomNotification";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {COLORS} from "../../../constants/theme";
import CustomSelect from "../../common/CustomSelect";
import useDebounce from "../../../state/hooks/useDebounce";
import CustomSimpleSearch from "../../common/CustomSimpleSearch";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useMoreCustomSelects from "../../../state/hooks/useMoreCustomSelects";

const UsersScreen = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [apiCarrier, setApiCarrier] = useState<SearchRequest>({
        page: 0, size: 10,
        searchFilter: {
            searchCriteria: [
                {
                    filterKey: "deleted",
                    operation: "nu"
                }],
            logicalOperator: "AND"
        }
    });
    const [openDialogAddUser, setOpenDialogAddUser] = useState<boolean>(false);
    const [openConfirmDeleteNotification, setOpenConfirmDeleteNotification] = useState<boolean>(false);
    const [openDeletedNotification, setOpenDeletedNotification] = useState<boolean>(false);
    const [openAddNotification, setOpenAddNotification] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserDto | null>(null);

    const [userId, setUserId] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [searchInactive, setSearchInactive] = useState<boolean>(false);
    const [forcePasswordChange, setForcePasswordChange] = useState<boolean>(false);
    const [searchedString, setSearchedString] = useState<string>("");

    const userTypes = useSelector((state: any) => state.common.userTypes);
    const { codes, setCodes, addNewCode } = useMoreCustomSelects();

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorFullName, setErrorFullName] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const debounceValue = useDebounce(searchedString, 400);
    const navigate = useNavigate();

    function handleSearch() {
        const filter: SearchFilter = {
            searchCriteria: [
                {
                    filterKey: "deleted",
                    operation: "nu"
                }],
            logicalOperator: "AND",
            subFilters: [
                {
                    searchCriteria: [
                        {
                            filterKey: "username",
                            value: searchedString,
                            operation: "cn",
                        },
                        {
                            filterKey: "fullName",
                            value: searchedString,
                            operation: "cn",
                        }
                    ],
                    logicalOperator: "OR"
                }
            ]
        };

        setApiCarrier((prevApiCarrier) => ({
            ...prevApiCarrier,
            searchFilter: filter
        }));
    }

    const handleAddNewUser = () => {
        if (username === "" || password === "" || fullName === "") {
            if (username === "")
                setErrorUsername("Field must not be empty.");
            if (password === "")
                setErrorPassword("Field must not be empty.");
            if (fullName === "")
                setErrorFullName("Field must not be empty.");

            return;
        }

        const userTypeCommands = codes.map((x) => ({
            code: x.code
        }));

        api.user.createUser(username, fullName, password, userTypeCommands)
            .then((response) => {
                setOpenDialogAddUser(false);
                setOpenAddNotification(true);
                setUserInfo(response);
            })
            .catch(error => {
                setErrorUsername(error.response.data.message);
            });
    };

    const editRow = (userId: number) => {
        navigate("/users/" + userId);
    };

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setApiCarrier((prevApiCarrier) => ({
            ...prevApiCarrier, // Copy the existing state
            page: newPage
        }));
    };

    const handleDeleteUserClick = (id: number) => {
        setUserId(id);
        setOpenConfirmDeleteNotification(true);
    };

    const handleDeleteUser = () => {
        // Implement delete user functionality
    };

    const createUsersForTable = () => {
        return users.map((user) => ({
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            role: user.types.map((x) => x.name).join(", "),
            actions: [<ModeEditIcon/>, <DeleteOutlineIcon/>],
        }));
    };

    const fetchUsers = () => {
        api.user.getUsers(apiCarrier).then((response) => {
            setTotalUsers(response.total);
            setUsers(response.data);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, [apiCarrier]);

    // Reset form fields when dialog closes
    useEffect(() => {
        if (!openDialogAddUser) {
            setUsername('');
            setFullName('');
            setPassword('');
            setErrorUsername("");
            setErrorFullName("");
            setErrorPassword("");
            setCodes([]);
            setShowPassword(false);
        }
    }, [openDialogAddUser]);

    useEffect(() => {
        handleSearch();
    }, [debounceValue]);

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: "center",
                marginBottom: "60px",
                marginRight: "40px"
            }}>
                <Box sx={{margin: '0 40px 0', position: 'relative', zIndex: '100'}}>
                    <CustomSimpleSearch
                        handleSearch={setSearchedString} childrenChecked={[]} placeholder="Search user"
                    />
                </Box>
                <CustomButton
                    buttonColor={COLORS.secondary}
                    onHoverButtonColor="#0B2556"
                    buttonText="New user"
                    textColor="white"
                    Icon={<AddIcon/>}
                    handleClick={() => {setOpenDialogAddUser(true); addNewCode("");}}
                    width={160}
                />
            </Box>
            <Box sx={{margin: '-45px 40px 0'}}>
                <CustomTable
                    tableHead={["Username", "Full name", "Role", "Actions"]}
                    data={createUsersForTable()}
                    editRow={editRow}
                    deleteRow={handleDeleteUserClick}
                    totalSize={totalUsers}
                    handlePageChange={handlePageChange}
                    messageForEmptyDataBold={"No Users match your search"}
                    messageForEmptyDataRegular={"Try to search by another criteria"}
                />
            </Box>

            <CustomDialog
                title="New user"
                open={openDialogAddUser}
                handleOpen={setOpenDialogAddUser}
                childrenForms={[
                    <FormInput
                        label="Username"
                        type="text"
                        errorMessage={errorUsername}
                        setErrorMessage={setErrorUsername}
                        setData={setUsername}/>,
                    <FormInput
                        label="Full name"
                        type="text"
                        errorMessage={errorFullName}
                        setErrorMessage={setErrorFullName}
                        setData={setFullName}/>,
                    <FormInput
                        label="Password"
                        type="password"
                        errorMessage={errorPassword}
                        setErrorMessage={setErrorPassword}
                        setData={setPassword}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}/>,
                    ...codes.map((code, index) => (
                        <CustomSelect
                            label="User role"
                            setData={code.setCode}
                            data={userTypes}
                            key={index}
                        />
                    )),
                ]}
                childrenButton={
                    <CustomButton
                        buttonColor={COLORS.primary}
                        onHoverButtonColor={COLORS.tertiary}
                        buttonText="Add user"
                        textColor={COLORS.white}
                        width={130}
                        handleClick={handleAddNewUser}/>
                }
            />

            <CustomNotification
                open={openConfirmDeleteNotification}
                title="Delete user?"
                description="If you delete user, all of the user data will be lost. Are you sure you want to delete user?"
                childrenButtons={[
                    <CustomButton
                        buttonColor="#E6E6E6"
                        onHoverButtonColor="#CCCCCC"
                        buttonText="Cancel"
                        textColor="black"
                        handleClick={() => setOpenConfirmDeleteNotification(false)}
                    />,
                    <CustomButton
                        buttonColor="#D4423F"
                        onHoverButtonColor="#AA312E"
                        buttonText="Delete"
                        textColor="white"
                        handleClick={() => {
                            handleDeleteUser();
                            setOpenConfirmDeleteNotification(false)
                        }}
                    />
                ]}
                buttonAlignment="end"/>

            <CustomNotification
                open={openDeletedNotification}
                title="User Deleted"
                description={(
                    <Typography sx={{
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        fontFamily: 'Source Sans Pro, sans-serif',
                        color: '#0B2556'
                    }}>
                        User&nbsp;
                        <span style={{fontWeight: 600}}>
                            {userInfo?.username} ({userInfo?.fullName})
                        </span>
                        &nbsp;has been deleted.
                    </Typography>
                )}
                childrenButtons={[
                    <CustomButton
                        buttonColor="transparent"
                        onHoverButtonColor="transparent"
                        buttonText="OK"
                        textColor="#003E92"
                        handleClick={() => setOpenDeletedNotification(false)}
                    />,
                ]}
                buttonAlignment="end"/>

            <CustomNotification
                open={openAddNotification}
                title="User created"
                description={(
                    <Typography sx={{
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        fontFamily: 'Source Sans Pro, sans-serif',
                        color: '#0B2556'
                    }}>
                        User&nbsp;
                        <span style={{fontWeight: 600}}>
                            {userInfo?.username} ({userInfo?.fullName})
                        </span>
                        &nbsp;has been created.
                    </Typography>
                )}
                childrenButtons={[
                    <CustomButton
                        buttonColor="transparent"
                        onHoverButtonColor="transparent"
                        buttonText="OK"
                        textColor="#003E92"
                        handleClick={() => setOpenAddNotification(false)}
                    />,
                ]}
                buttonAlignment="end"/>
        </>
    );
};

export default UsersScreen;
