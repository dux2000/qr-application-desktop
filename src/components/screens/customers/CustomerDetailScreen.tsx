import {Box, Typography} from "@mui/material";
import {CustomerDto, ProductDto, SearchRequest} from "../../../interface/Interfaces";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";
import CustomButton from "../../common/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomTable from "../../common/CustomTable";
const CustomerDetailScreen = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState<CustomerDto | null>(null);
    const [products, setProducts] = useState<ProductDto[]>([]);
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
    const navigate = useNavigate();
    const fetchCustomer = () => {
        if (customerId) {
            api.customer.getCustomerWithId(Number(customerId))
                .then((response) => {
                    console.log(response)
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
            status: product.status.code,
            user: product.currentUser.fullName,
            actions: [<VisibilityIcon/>],
        }));
    }

    const editRow = (productId: number) => {
        navigate(`/products/${productId}`)
    }

    useEffect(() => {
        fetchCustomer()
    }, []);

    return (
        <>
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
                {products.length > 0 &&
                    <CustomButton
                        buttonColor="#1E4B92"
                        onHoverButtonColor="#0B2556"
                        buttonText="New product"
                        textColor="white"
                        Icon={<AddIcon />}
                        handleClick={() => {

                        }}
                        width={190}
                    />}
            </Box>
            <Box sx={{margin: '30px 40px 0'}}>
                <CustomTable
                    tableHead={["Name", "Status", "Current worker", "Actions"]}
                    data={createProductsForTable()}
                    editRow={editRow}
                    totalSize={products.length}
                    deleteRow={() => {}}
                />
            </Box>
        </>
    )
}

export default CustomerDetailScreen;