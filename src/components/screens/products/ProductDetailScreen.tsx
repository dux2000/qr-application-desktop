import CustomTable from "../../common/CustomTable";
import {Box} from "@mui/material";
import {ProductDto} from "../../../interface/Interfaces";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const [productRevision, setProductRevision] = useState<ProductDto[]>([]);
  const createProductRevisionForTable = () => {
    return productRevision.map((product) => ({
        name: product.name,
        status: product.status.description,
        worker: product.currentUser.fullName + ' - ' + product.currentUser.role,
        updated: product.updated
    }));
  };
  const fetchProductRevision = () => {
    if (productId) {
      api.products.getProductRevision(productId)
          .then((response) => {
            setProductRevision(response.map((product) => ({
                ...product,
                updated: product.updated === null ? "-" : dayjs(product.updated).format("HH:MM:ss DD/MM/YYYY")
            })))
          })
          .catch((error) => {
            console.log(error)
          })

    }
  }

    useEffect(() => {
        fetchProductRevision()
    }, []);

  return (
      <>
        <Box sx={{margin: '40px 0'}}>
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