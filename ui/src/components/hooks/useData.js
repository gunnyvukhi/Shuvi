import { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from './useToken.js';

function useData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, handleAccessTokenExpired } = useToken();
  useEffect(() => {
    handleAccessTokenExpired();
    let isMounted = true; // avoid updating state if component unmounted

    axios({
            method: "GET",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useData;