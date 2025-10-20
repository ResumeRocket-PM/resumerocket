/* global __BUILD_TIME__ */
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
// import { UserContext } from "./context/user";
import api from "./utils/api";
import { useEffect, useState } from 'react'

const useApi = () => {
    const { authToken } = useAuth();
    return api(authToken);
}

const useApiWithoutToken = () => {
  return api();
}

const useAuth = () => useContext(AuthContext);

export {
  useApi,
  useApiWithoutToken,
  useAuth
};

