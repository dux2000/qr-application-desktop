import CustomTable from "../../common/CustomTable";
import {Box, IconButton, Typography} from "@mui/material";
import {ProductDto} from "../../../interface/Interfaces";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../common/CustomButton";
import AddIcon from "@mui/icons-material/Add";

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDto>();
  const [productRevision, setProductRevision] = useState<ProductDto[]>([]);
  const navigate = useNavigate();
  const createProductRevisionForTable = () => {
    return productRevision.map((product) => ({
        name: product.name,
        status: product.status.name,
        worker: product.currentUser.fullName + ' - ' + product.currentUser.role,
        updated: product.updated
    }));
  };

  const createCharacteristicsForTable = () => {
      if (product?.characteristics === undefined || product?.characteristics === null)
          return [];

      return product?.characteristics.map((characteristic) => ({
          name: characteristic.globalCode,
          subname: characteristic.code,
          value: characteristic.value
      }));
  }
  const fetchProductRevision = () => {
    if (productId) {
      api.products.getProductRevision(productId)
          .then((response) => {
            setProductRevision(response.map((product) => ({
                ...product,
                updated: product.updated === null ? "-" : dayjs(product.updated).format("DD/MM/YYYY, H:mm")
            })))
          })
          .catch((error) => {
            console.log(error)
          })

    }
  }

  const fetchProduct = () => {
    if (productId) {
      api.products.getProductById(productId)
          .then((response) => {
            setProduct(response)
          })
          .catch((error) => {
            console.log(error)
          })
    }

  }
    useEffect(() => {
        fetchProductRevision()
        fetchProduct()
    }, []);

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
                      onClick={() => navigate(`/customers/${product?.customer.id}/`)}>
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
                      Product details
                  </Typography>
              </div>
          </Box>
          {/* price list detail box */}
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
                          Name
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
                          {product?.name}
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
                          Status
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
                          {product?.status.description}
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
                          Customer
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
                          {product?.customer.fullName}
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
                          Current worker
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
                          {product?.currentUser.fullName + ' - ' + product?.currentUser.role}
                      </Typography>
                  </Box>
              </Box>

              <Box
                  sx={{
                      display: 'flex',
                      justifyItems: 'center',
                      alignContent: 'start',
                      marginTop: '24px'
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
                          Created by
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
                          {product?.createdBy.fullName}
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
                          Created at
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
                          {dayjs(product?.created).format("DD/MM/YYYY, H:mm")}
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
                          Updated by
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
                          {product?.updatedBy === null ? '-' : product?.updatedBy?.fullName}
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
                          Updated at
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
                          {product?.updated === null ? "-" : dayjs(product?.updated).format("DD/MM/YYYY, H:mm")}
                      </Typography>
                  </Box>
              </Box>

              <Box
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      marginTop: '24px'
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
                      Description
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
                      {product?.description === "" ? '-' : product?.description}
                  </Typography>
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
                  Characteristics
              </Typography>
          </Box>
          <Box sx={{margin: '30px 40px 20px'}}>
              <CustomTable
                  tableHead={["Name", "Subname", "Value"]}
                  data={createCharacteristicsForTable()}
                  editRow={() => {}}
                  deleteRow={() => {}}
                  totalSize={product?.characteristics === null ? 0 : product?.characteristics.length || 0}
              />
          </Box>
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
                  Product history
              </Typography>
          </Box>
          <Box sx={{margin: '30px 40px 20px'}}>
            <CustomTable
                tableHead={["Name", "Status", "Current worker", "Updated"]}
                data={createProductRevisionForTable()}
                editRow={() => {}}
                deleteRow={() => {}}
                totalSize={productRevision.length}
            />
        </Box>
      </>
  )
}

export default ProductDetailScreen;