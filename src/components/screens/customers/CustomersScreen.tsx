import {useEffect, useState} from "react";
import {CustomerDto, SearchFilter, SearchRequest} from "../../../interface/Interfaces";
import api from "../../../service/api";
import {Box, Typography} from "@mui/material";
import CustomSearch from "../../common/CustomSearch";
import CustomButton from "../../common/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import FormInput from "../../common/FormInput";
import CustomDialog from "../../common/CustomDialog";
import {COLORS} from "../../../constants/theme";
import CustomTable from "../../common/CustomTable";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomNotification from "../../common/CustomNotification";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useNavigate} from "react-router-dom";

const CustomersScreen = () => {
    const [customerInfo, setCustomerInfo] = useState<CustomerDto>();
    const [customers, setCustomers] = useState<CustomerDto[]>([]);
    const [totalCustomers, setTotalCustomers] = useState<number>(0);
    const [searchedString, setSearchedString] = useState<string>("")
    const [customerId, setCustomerId] = useState<number>(0)
    const [fullName, setFullName] = useState<string>("");
    const [contact1, setContact1] = useState<string>("")
    const [contact2, setContact2] = useState<string>("")
    const [errorContact1, setErrorContact1] = useState<string>("")
    const [errorContact2, setErrorContact2] = useState<string>("")
    const [errorFullName, setErrorFullName] = useState<string>("")
    const [openDialogAddCustomer, setOpenDialogAddCustomer] = useState<boolean>(false);
    const [openDialogEditCustomer, setOpenDialogEditCustomer] = useState<boolean>(false);
    const [openConfirmDeleteNotification, setOpenConfirmDeleteNotification] = useState<boolean>(false);
    const [openDeletedNotification, setOpenDeletedNotification] = useState<boolean>(false);
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
    })
    const navigate = useNavigate();
    const fetchCustomers = () =>  {
        api.customer.getCustomers(apiCarrier)
            .then((response) => {
                setTotalCustomers(response.total);
                setCustomers(response.data);
            });
    };

    useEffect(() => {
        fetchCustomers();
    }, [apiCarrier]);

    const handleSearch = (searchedValue: string) => {
        setSearchedString(searchedValue)

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
                            filterKey: "fullName",
                            value: searchedValue,
                            operation: "cn",
                        }
                    ],
                    logicalOperator: "OR"
                }
            ]
        }

        setApiCarrier((prevApiCarrier) => ({
            ...prevApiCarrier,
            searchFilter: filter
        }))
    }

    const handleAddCustomer = () => {
        if (fullName === "" || contact1 === "" || contact2 === "") {
            if (contact1 === "")
                setContact1("Field must not be empty.")
            if (contact2 === "")
                setContact2("Field must not be empty.")
            if (fullName === "")
                setErrorFullName("Field must not be empty.")

            return
        }

        api.customer.createCustomer(fullName, "email", contact1, "phone", contact2)
            .then(() => {
                setOpenDialogAddCustomer(false)
                fetchCustomers()
            })
            .catch((error) => {
                setErrorFullName(error.response.data.message)
            })
    }

    const createCustomersForTable = () => {
        return customers.map((customer) => ({
            id: customer.id,
            fullName: customer.fullName,
            actions: [<VisibilityIcon/>, <DeleteOutlineIcon/>],
        }));
    }

    const editRow = (customerId: number) => {
        navigate(`/customers/${customerId}`)
    }

    const handleDeleteCustomerClick = (id: number) => {
        setCustomerId(id)
        setOpenConfirmDeleteNotification(true)
    }

    const handleDeleteCustomer = () => {
        api.customer.deleteCustomer(customerId).then((deletedCustomer) => {
            if (customers.length === 1 && apiCarrier.page !== 0) {
                setApiCarrier((prevApiCarrier) => ({
                    ...prevApiCarrier,
                    page: (prevApiCarrier.page || 0) - 1
                }));
            }

            setOpenDeletedNotification(true);
            setCustomerInfo(deletedCustomer);
        })
    }

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setApiCarrier((prevApiCarrier) => ({
            ...prevApiCarrier, // Copy the existing state
            page: newPage
        }));
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: "center",
                marginBottom: "10px",
                marginRight: "40px"
            }}>
                <Box sx={{margin: '24px 40px 0', position: 'relative', zIndex: '100'}}>
                    <CustomSearch
                        handleSearch={handleSearch} childrenChecked={[]} placeholder="Search customer"
                    />
                </Box>
                <CustomButton
                    buttonColor="#1E4B92"
                    onHoverButtonColor="#0B2556"
                    buttonText="New Customer"
                    textColor="white"
                    Icon={<AddIcon/>}
                    handleClick={() => setOpenDialogAddCustomer(true)}
                    width={220}
                />
            </Box>
            <Box sx={{margin: '-45px 40px 0'}}>
                <CustomTable
                    tableHead={["Full name", "Actions"]}
                    data={createCustomersForTable()}
                    editRow={editRow}
                    deleteRow={handleDeleteCustomerClick}
                    totalSize={totalCustomers}
                    handlePageChange={handlePageChange}
                    messageForEmptyDataBold={"No Customers match your search"}
                    messageForEmptyDataRegular={"Try to serach by another criteria"}
                />
            </Box>

            <CustomDialog
                title="New customer"
                open={openDialogAddCustomer}
                handleOpen={setOpenDialogAddCustomer}
                childrenForms={[
                    <FormInput
                        label="Full name"
                        type="text"
                        errorMessage={errorFullName}
                        setErrorMessage={setErrorFullName}
                        setData={setFullName}/>,
                    <FormInput
                        label="Contact - 1"
                        type="text"
                        errorMessage={errorContact1}
                        setErrorMessage={setErrorContact1}
                        setData={setContact1}/>,
                    <FormInput
                        label="Contact - 2"
                        type="text"
                        errorMessage={errorContact2}
                        setErrorMessage={setErrorContact2}
                        setData={setContact2}/>
                ]}
                childrenButton={
                    <CustomButton
                        buttonColor={COLORS.primary}
                        onHoverButtonColor={COLORS.tertiary}
                        buttonText="Add customer"
                        textColor={COLORS.white}
                        width={130}
                        handleClick={handleAddCustomer}/>
                }
            />

            <CustomNotification
                open={openConfirmDeleteNotification}
                title="Delete customer?"
                description="If you delete customer, all of the user data will be lost. Are you sure you want to delete customer?"
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
                            handleDeleteCustomer();
                            setOpenConfirmDeleteNotification(false)
                        }}
                    />
                ]}
                buttonAlignment="end"/>

            <CustomNotification
                open={openDeletedNotification}
                title="Customer Deleted"
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
              {customerInfo?.fullName}
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
        </>
    );
}

export default CustomersScreen;