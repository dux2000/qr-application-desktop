import {Box, styled} from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UsersScreen from "./users/UsersScreen";
import CustomersScreen from "./customers/CustomersScreen";
import ProductsScreen from "./products/ProductsScreen";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import {COLORS} from "../../constants/theme";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

interface StyledTabProps {
    label: string;
    value: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontFamily: "QSBold",
    marginRight: theme.spacing(1),
    color: COLORS.primary,
    '&.Mui-selected': {
        color: COLORS.primary
    }
}));
const TabScreen = () => {
    const tabOverview = useSelector((state: any) => state.tabOverview);
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('1');
    console.log(tabOverview.value)
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        dispatch({
            type: "CHANGE_VALUE",
            payload: newValue,
        });
    };

  return (
      <TabContext value={tabOverview.value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <StyledTab label="Users" value="1"/>
                  <StyledTab label="Customers" value="2" />
                  <StyledTab label="Products" value="3" />
              </TabList>
          </Box>
          <TabPanel value="1"><UsersScreen /></TabPanel>
          <TabPanel value="2"><CustomersScreen /></TabPanel>
          <TabPanel value="3"><ProductsScreen /></TabPanel>
      </TabContext>
  )
}

export default TabScreen