import useToken from './useToken.js'
const useAuth = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    const {refreshToken, refreshTokenExpiry} = useToken();
    if (!refreshToken || refreshToken === "" || refreshToken === undefined || !refreshTokenExpiry || refreshTokenExpiry === "" || refreshTokenExpiry === undefined || parseInt(refreshTokenExpiry) < currentTime) {
      return false;
    }
    return true;
}

export default useAuth