import { useAuth } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
    const { isLoggedIn } = useAuth();

    return <main>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</main>;
};

export default Layout;