import PropTypes from 'prop-types';
import './Home.css';
import DefaultStyle from '../../components/layout/defaultStyle/defaultStyle.jsx';
import useData from '../../components/hooks/useData.js';
const Home = () => {
  const { data, loading, error } = useData('http://127.0.0.1:8000/users/profile/');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <DefaultStyle selected={1} data={data}>
      <h1>Welcome, {data.first_name} {data.last_name}</h1>
    </DefaultStyle>
  );
}

Home.PropTypes = {
  accessToken: PropTypes.string.isRequired,
  handleAccessTokenExpired: PropTypes.func.isRequired,
  removeTokens: PropTypes.func.isRequired,
};

export default Home;