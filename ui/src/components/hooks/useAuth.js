import useToken from './useToken.js'
const useAuth = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    const { refreshTokenExpiry} = useToken();
    if (!refreshTokenExpiry || refreshTokenExpiry === "" || refreshTokenExpiry === undefined || parseInt(refreshTokenExpiry) < currentTime) {
      return false;
    }
    return true;
}

export default useAuth