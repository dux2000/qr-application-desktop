import {Box, IconButton, Typography} from "@mui/material";
import {CustomerDto, ProductCommand, ProductDto, SearchRequest} from "../../../interface/Interfaces";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";
import CustomButton from "../../common/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomTable from "../../common/CustomTable";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QRCode from 'react-qr-code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomNotification from "../../common/CustomNotification";
import FormInput from "../../common/FormInput";
import {COLORS} from "../../../constants/theme";
import CustomDialog from "../../common/CustomDialog";
import {useSelector} from "react-redux";
import CustomTwoSelectAndInput from "../../common/CustomTwoSelectAndInput";
import CustomSelect from "../../common/CustomSelect";

const characteristics = {
    "VELIČINA": [{id: "VELIČINA", name: "VELIČINA"}],
    "BOJA": [{id: "BOJA", name: "BOJA"}],
}
const CustomerDetailScreen = () => {
    const {customerId} = useParams();
    const user = useSelector((state: any) => state.user);
    const productTypes = useSelector((state: any) => state.common.productType);
    const [customer, setCustomer] = useState<CustomerDto | null>(null);
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [productId, setProductId] = useState<number>();
    const [productTypeCode, setProductTypeCode] = useState<string>()
    const [showQrCodeDialog, setShowQrCodeDialog] = useState<boolean>(false);
    const [apiCarrier, setApiCarrier] = useState<SearchRequest>({
        page: 0, size: 10,
        searchFilter: {
            searchCriteria: [
                {
                    filterKey: "customer.id",
                    value: customerId,
                    operation: "eq"
                }],
            logicalOperator: "AND"
        }
    })
    const [openDialogAddProduct, setOpenDialogAddProduct] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [errorName, setErrorName] = useState<string>("");
    const [errorDescription, setErrorDescription] = useState<string>("");
    const [customTwoSelectStates, setCustomTwoSelectStates] = useState<Array<{
        dataFirstSelectId: any;
        dataFirstSelect: any;
        setDataFirstSelectId: Function;
        dataSecondSelectId: any,
        dataSecondSelect: any;
        setDataSecondSelectId: Function;
        dataInput: any;
        setDataInput: Function;
    }>>([]);
    const navigate = useNavigate();
    const fetchCustomer = () => {
        if (customerId) {
            api.customer.getCustomerWithId(Number(customerId))
                .then((response) => {
                    setCustomer(response)
                })

            api.products.getProducts(apiCarrier)
                .then((response) => {
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }

    const createProductsForTable = () => {
        return products.map((product) => ({
            id: product.id,
            product: product.name,
            status: product.status.name,
            user: product.currentUser.fullName,
            actions: [<VisibilityIcon/>, <DeleteOutlineIcon/>, <QrCode2Icon/>],
        }));
    }

    const editRow = (productId: number) => {
        navigate(`/products/${productId}`)
    }

    const showQrCode = (productId: number) => {
        setProductId(productId);
        setShowQrCodeDialog(true)
    }

    const handleAddProduct = () => {
        if (name === "") {
            if (name === "")
                setErrorName("Field must not be empty.")
            return
        }

        const product: ProductCommand = {
            name: name,
            description: description,
            customerId: Number(customerId),
            characteristics: customTwoSelectStates.map((state) => {
                return {
                    code: state.dataFirstSelectId as string,
                    globalCode: state.dataSecondSelectId as string,
                    value: state.dataInput as string
                }
            }),
            type: productTypeCode as string
        }

        api.products.createProduct(user.id, product)
            .then((response) => {
                setOpenDialogAddProduct(false)
                //mozda da ipak ne fetchas nego samo updejtas state
                fetchCustomer()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handeDeleteProduct = (productId: string) => {
        api.products.deleteProduct(productId)
            .then((response) => {
                setProducts(products.filter(product => product.id !== productId))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleAddCustomTwoSelect = () => {
        setCustomTwoSelectStates(prevState => [
            ...prevState,
            {
                dataFirstSelectId: "",
                dataFirstSelect: [{id: "BOJA", name: "BOJA"}, {id: "VELIČINA", name: "VELIČINA"}],
                setDataFirstSelectId: (value: any, index: number) => {
                    // Update the state for the current component
                    setCustomTwoSelectStates(prevState => {
                        const newState = [...prevState];
                        newState[index].dataSecondSelect = characteristics[value as keyof typeof characteristics] || [];
                        newState[index].dataFirstSelectId = value;
                        return newState;
                    });
                },
                dataSecondSelectId: "",
                dataSecondSelect: [],
                setDataSecondSelectId: (value: any, index: number) => {
                    // Update the state for the current component
                    setCustomTwoSelectStates(prevState => {
                        const newState = [...prevState];
                        newState[index].dataSecondSelectId = value;
                        return newState;
                    });
                },
                dataInput: '',
                setDataInput: (value: any, index: number) => {
                    // Update the state for the current component
                    setCustomTwoSelectStates(prevState => {
                        const newState = [...prevState];
                        newState[index].dataInput = value;
                        return newState;
                    });
                }
            }
        ]);
    };

    useEffect(() => {
        fetchCustomer()
    }, []);

    useEffect(() => {
        if (!openDialogAddProduct) {
            setName('')
            setDescription('')
            setCustomTwoSelectStates([])
        }
    }, [openDialogAddProduct])

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '40px 30px 0',
                }}>
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
                        Customer details
                    </Typography>
                </div>
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
                            Customer name
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
                            {customer?.fullName}
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
                            Contact 1 - {customer?.contacts[0]?.type}
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
                            {customer?.contacts[0]?.contactInfo}
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
                            Contact 2 - {customer?.contacts[1]?.type}
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
                            {customer?.contacts[1]?.contactInfo}
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
                display: 'flex',
                justifyContent: 'space-between',
                margin: '40px 40px 0',

            }}>
                <Typography sx={{
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    fontFamily: 'Source Sans Pro, sans-serif',
                    color: '#0B2556'
                }}>
                    Products
                </Typography>

                <CustomButton
                    buttonColor="#1E4B92"
                    onHoverButtonColor="#0B2556"
                    buttonText="New product"
                    textColor="white"
                    Icon={<AddIcon/>}
                    handleClick={() => setOpenDialogAddProduct(true)}
                    width={200}
                />
            </Box>
            <Box sx={{margin: '30px 40px 0'}}>
                <CustomTable
                    tableHead={["Name", "Status", "Current worker", "Actions"]}
                    data={createProductsForTable()}
                    editRow={editRow}
                    totalSize={products.length}
                    deleteRow={handeDeleteProduct}
                    customAction={showQrCode}
                />
            </Box>

            <CustomDialog
                title="New product"
                open={openDialogAddProduct}
                handleOpen={setOpenDialogAddProduct}
                childrenForms={[
                    <FormInput
                        label="Name"
                        type="text"
                        errorMessage={errorName}
                        setErrorMessage={setErrorName}
                        setData={setName}/>,
                    <CustomSelect
                        label={"Select type"}
                        data={productTypes}
                        setData={setProductTypeCode}/>,
                    <FormInput
                        label="Description"
                        type="description"
                        errorMessage={errorDescription}
                        setErrorMessage={setErrorDescription}
                        setData={setDescription}/>,
                    ...customTwoSelectStates.map((state: any, index: number) => {
                        return <CustomTwoSelectAndInput key={index} index={index}
                                                        dataFirstSelect={state.dataFirstSelect}
                                                        setDataFirstSelect={state.setDataFirstSelectId}
                                                        dataSecondSelect={state.dataSecondSelect}
                                                        setDataSecondSelect={state.setDataSecondSelectId}
                                                        dataInput={state.dataInput} setDataInput={state.setDataInput}/>
                    }),
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <IconButton
                            disabled={customTwoSelectStates.length !== 0 && customTwoSelectStates[customTwoSelectStates.length - 1].dataInput === ''}
                            sx={{
                                color: COLORS.primary,
                                '&:hover': {
                                    backgroundColor: '#E6E6E6',
                                },
                            }}
                            onClick={() => handleAddCustomTwoSelect()}>
                            <AddIcon/>
                        </IconButton>
                    </Box>
                ]}

                childrenButton={
                    <CustomButton
                        buttonColor={COLORS.primary}
                        onHoverButtonColor={COLORS.tertiary}
                        buttonText="Add product"
                        textColor={COLORS.white}
                        width={160}
                        handleClick={handleAddProduct}/>
                }
            />
            <CustomNotification
                title="QR Code"
                open={showQrCodeDialog}
                description={<QRCode value={`{"id":"${productId}"}`}/>}
                childrenButtons={[
                    <CustomButton
                        buttonColor="#E6E6E6"
                        onHoverButtonColor="#CCCCCC"
                        buttonText="Cancel"
                        textColor="black"
                        handleClick={() => setShowQrCodeDialog(false)}
                    />
                ]}/>
        </>
    )
}

export default CustomerDetailScreen;