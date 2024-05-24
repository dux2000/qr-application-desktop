import {Box} from "@mui/material";
import CustomSimpleSearch from "../../common/CustomSimpleSearch";
import {ProductDto, SearchFilter, SearchRequest} from "../../../interface/Interfaces";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import CustomTable from "../../common/CustomTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import {useNavigate} from "react-router-dom";
import CustomNotification from "../../common/CustomNotification";
import QRCode from "react-qr-code";
import CustomButton from "../../common/CustomButton";
import CircularProgress from '@mui/material/CircularProgress';

const ProductsScreen = () => {
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [products, setProducts] = useState<ProductDto[]>([])
    const [productId, setProductId] = useState<number>();
    const [showQrCodeDialog, setShowQrCodeDialog] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
    const handleSearch = (searchedValue: string) => {
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
                            filterKey: "name",
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
    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setApiCarrier((prevApiCarrier) => ({
            ...prevApiCarrier, // Copy the existing state
            page: newPage
        }));
    };

    const createProductsForTable = () => {
        return products.map((product) => ({
            id: product.id,
            product: product.name,
            status: product.status.name,
            user: product.currentUser.fullName,
            actions: [<VisibilityIcon/>, <QrCode2Icon/>],
        }));
    }

    const editRow = (productId: number) => {
        navigate(`/products/${productId}`)
    }

    const showQrCode = (productId: number) => {
        setProductId(productId);
        setShowQrCodeDialog(true)
    }
    const fetchProducts = () => {
        setIsLoading(true)
        api.products.getProducts(apiCarrier)
            .then((response) => {
                setProducts(response.data)
                setTotalProducts(response.total)
            })
            .catch((error) => {
                console.log(error)
            })
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProducts();
    }, [apiCarrier]);

    return(
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: "center",
                marginBottom: "60px",
                marginRight: "40px"
            }}>
                <Box sx={{margin: '24px 40px 0', position: 'relative', zIndex: '100'}}>
                    <CustomSimpleSearch
                        handleSearch={handleSearch} childrenChecked={[]} placeholder="Search product"
                    />
                </Box>
            </Box>
            <Box sx={{margin: '-45px 40px 0'}}>
                {isLoading ?
                    <CircularProgress sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-20px',
                        marginLeft: '-20px'
                    }}/>
                    :
                    <CustomTable
                    tableHead={["Name", "Status", "Current worker", "Actions"]}
                    data={createProductsForTable()}
                    editRow={editRow}
                    totalSize={totalProducts}
                    deleteRow={showQrCode}
                    handlePageChange={handlePageChange}
                    messageForEmptyDataBold={"No Products match your search"}
                    messageForEmptyDataRegular={"Try to search by another criteria"}/>
                }
            </Box>
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
    );
}

export default ProductsScreen;