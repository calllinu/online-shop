import { useSelector } from "react-redux";
import { RootState } from "../redux-fetching/store";
import Home from "../home/Home";
import Admin from "../admin/admin-pannel";

const AdminRoute = () => {
    const isSignedIn = useSelector((state:RootState) => state.user.isSignedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

    return (
      <>
        {!isAdmin && !isSignedIn ? (
          <Home/>
        ) : (
          <Admin/>
        )}
      </>
    )
};

export default AdminRoute;
