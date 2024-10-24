import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );

    if(!isAuthenticated) {
        return <Navigate to='/login'></Navigate>
    }
    return (
        <>
            {children}
        </>
    );
}

export default ProtectedRoute;