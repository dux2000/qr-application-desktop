import { CssBaseline } from "@mui/material";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginScreen from "./components/screens/login/LoginScreen";
import MainLayout from "./components/layouts/MainLayout";
import CustomerDetailScreen from "./components/screens/customers/CustomerDetailScreen";
import ProductDetailScreen from "./components/screens/products/ProductDetailScreen";
import TabScreen from "./components/screens/TabScreen";
import ChangePasswordScreen from "./components/screens/change-password/ChangePasswordScreen";
import UserDetailScreen from "./components/screens/users/UserDetailScreen";

export default function App() {
  const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: <LoginScreen />,
        },
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/overview",
                    element: <TabScreen />
                },
                {
                    path: "/customers/:customerId",
                    element: <CustomerDetailScreen />
                },
                {
                    path: "/products/:productId",
                    element: <ProductDetailScreen />
                },
                {
                    path: "/users/:userId",
                    element: <UserDetailScreen />
                }
            ]
        },
        {
            path: "/change-password",
            element: <ChangePasswordScreen />
        }
    ]
  );

  return (
    <>
      <CssBaseline enableColorScheme />

      <RouterProvider router={router} />
    </>
  );
}
