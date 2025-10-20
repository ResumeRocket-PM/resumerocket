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

const useVersionCheck = (intervalMs = 1 * 30 * 1000) => { // default to check every 30 seconds
  const [updateAvailable, setUpdateAvailable] = useState(false)

    useEffect(() => {
    const checkVersion = async () => {
      console.log('Checking for new version...')
      try {
        const res = await fetch(window.location.href, { cache: 'no-store' })
        const text = await res.text()
        const match = text.match(/__BUILD_TIME__ = "([^"]+)"/)
        if (!match) return
        const newBuildTime = match[1]
        if (newBuildTime !== __BUILD_TIME__) {
          setUpdateAvailable(true)
        }
        console.log('Current build time:', __BUILD_TIME__, 'New build time:', newBuildTime)
      } catch (e) {
        console.error('Version check failed', e)
      }
    }

    const interval = setInterval(checkVersion, intervalMs)
    return () => clearInterval(interval)
  }, [intervalMs])

  return updateAvailable
}

export {
  useApi,
  useApiWithoutToken,
  useAuth,
  useVersionCheck
};

