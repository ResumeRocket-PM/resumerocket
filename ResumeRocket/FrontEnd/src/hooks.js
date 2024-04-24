import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
// import { UserContext } from "./context/user";
import api from "./utils/api";

const useApi = () => {
    const { authToken } = useAuth();
    return api(authToken);
}

const useApiWithoutToken = () => {
  return api();
}

const useAuth = () => useContext(AuthContext);

// const useUser = () => useContext(UserContext);

export {
  useApi,
  useApiWithoutToken,
  useAuth,
//   useUser,
};

